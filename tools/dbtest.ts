/**
 * PromptRepo P1 Database Validation Runner
 * 
 * Executes SQL test files to validate RLS policies and version triggers
 * against a Supabase database instance.
 */

import fs from "node:fs";
import path from "node:path";
import { Pool } from "pg";

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

interface TestResult {
  file: string;
  status: 'OK' | 'FAIL';
  error?: string;
  duration: number;
  failedAssertions?: string[];
}

/**
 * Get database connection from environment
 */
function getDatabaseUrl(): string {
  const dbUrl = process.env.SUPABASE_DB_URL;
  
  if (!dbUrl) {
    console.error(`${colors.red}❌ SUPABASE_DB_URL environment variable is required${colors.reset}`);
    console.error(`${colors.yellow}💡 Set it to your Supabase database connection string:${colors.reset}`);
    console.error(`   export SUPABASE_DB_URL="postgresql://postgres:password@localhost:54322/postgres"`);
    console.error(`   or for remote: "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"`);
    process.exit(1);
  }
  
  return dbUrl;
}

/**
 * Get list of test SQL files in order
 */
function getTestFiles(): string[] {
  const testDir = path.resolve(process.cwd(), 'apps/api/src/sql/tests');
  
  if (!fs.existsSync(testDir)) {
    console.error(`${colors.red}❌ Test directory not found: ${testDir}${colors.reset}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(testDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Files are prefixed with numbers for ordering
  
  if (files.length === 0) {
    console.error(`${colors.red}❌ No test files found in ${testDir}${colors.reset}`);
    process.exit(1);
  }
  
  return files.map(file => path.join(testDir, file));
}

/**
 * Read SQL file content
 */
function readSqlFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to read ${filePath}: ${error}`);
  }
}

/**
 * Execute SQL file and check for FAIL assertions
 */
async function executeTestFile(pool: Pool, filePath: string): Promise<TestResult> {
  const fileName = path.basename(filePath);
  const startTime = Date.now();
  
  try {
    const sql = readSqlFile(filePath);
    
    // Execute the SQL file
    const result = await pool.query(sql);
    
    // Check for FAIL results in any of the result sets
    const failedAssertions: string[] = [];
    
    // PostgreSQL returns an array of results for multiple statements
    // We need to check all result sets for FAIL values
    if (Array.isArray(result)) {
      for (const res of result) {
        if (res.rows) {
          for (const row of res.rows) {
            for (const [key, value] of Object.entries(row)) {
              if (value === 'FAIL') {
                failedAssertions.push(`${key}: ${JSON.stringify(row)}`);
              }
            }
          }
        }
      }
    } else if (result.rows) {
      for (const row of result.rows) {
        for (const [key, value] of Object.entries(row)) {
          if (value === 'FAIL') {
            failedAssertions.push(`${key}: ${JSON.stringify(row)}`);
          }
        }
      }
    }
    
    const duration = Date.now() - startTime;
    
    if (failedAssertions.length > 0) {
      return {
        file: fileName,
        status: 'FAIL',
        duration,
        failedAssertions
      };
    }
    
    return {
      file: fileName,
      status: 'OK',
      duration
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      file: fileName,
      status: 'FAIL',
      duration,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Print test result
 */
function printTestResult(result: TestResult): void {
  const statusColor = result.status === 'OK' ? colors.green : colors.red;
  const statusIcon = result.status === 'OK' ? '✅' : '❌';
  
  console.log(`${statusIcon} [${statusColor}${result.status}${colors.reset}] ${result.file} (${result.duration}ms)`);
  
  if (result.error) {
    console.log(`   ${colors.red}Error: ${result.error}${colors.reset}`);
  }
  
  if (result.failedAssertions && result.failedAssertions.length > 0) {
    console.log(`   ${colors.red}Failed assertions:${colors.reset}`);
    for (const assertion of result.failedAssertions) {
      console.log(`   ${colors.red}  • ${assertion}${colors.reset}`);
    }
  }
}

/**
 * Print summary
 */
function printSummary(results: TestResult[]): void {
  const passed = results.filter(r => r.status === 'OK').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bold}P1 Database Validation Summary${colors.reset}`);
  console.log('='.repeat(60));
  
  if (failed === 0) {
    console.log(`${colors.green}🎉 All tests passed!${colors.reset}`);
    console.log(`${colors.green}✅ P1-validate: PASS${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ Some tests failed${colors.reset}`);
    console.log(`${colors.red}❌ P1-validate: FAIL${colors.reset}`);
  }
  
  console.log(`\n📊 Results:`);
  console.log(`   ${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`   ${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`   Total: ${results.length}`);
  console.log(`   Duration: ${totalDuration}ms`);
  
  if (failed > 0) {
    console.log(`\n${colors.yellow}💡 Failed tests indicate issues with:${colors.reset}`);
    console.log(`   • RLS policies not working correctly`);
    console.log(`   • Version triggers not creating snapshots`);
    console.log(`   • Profile access controls not enforced`);
    console.log(`   • Database schema or test data issues`);
  }
  
  console.log('\n' + '='.repeat(60));
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log(`${colors.blue}🗄️  PromptRepo P1 Database Validation${colors.reset}`);
  console.log(`${colors.blue}=====================================\n${colors.reset}`);
  
  // Get database connection
  const dbUrl = getDatabaseUrl();
  console.log(`${colors.blue}🔗 Connecting to database...${colors.reset}`);
  
  const pool = new Pool({
    connectionString: dbUrl,
    // Connection settings for testing
    max: 1, // Single connection for sequential test execution
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
  
  try {
    // Test connection
    await pool.query('SELECT 1');
    console.log(`${colors.green}✅ Database connection established${colors.reset}\n`);
    
    // Get test files
    const testFiles = getTestFiles();
    console.log(`${colors.blue}📋 Found ${testFiles.length} test files:${colors.reset}`);
    testFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${path.basename(file)}`);
    });
    console.log('');
    
    // Execute tests sequentially
    const results: TestResult[] = [];
    
    for (const testFile of testFiles) {
      console.log(`${colors.blue}🧪 Running ${path.basename(testFile)}...${colors.reset}`);
      const result = await executeTestFile(pool, testFile);
      results.push(result);
      printTestResult(result);
      
      // Add small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Print summary
    printSummary(results);
    
    // Exit with appropriate code
    const hasFailures = results.some(r => r.status === 'FAIL');
    process.exit(hasFailures ? 1 : 0);
    
  } catch (error) {
    console.error(`${colors.red}❌ Database connection failed:${colors.reset}`);
    console.error(`   ${error}`);
    console.error(`\n${colors.yellow}💡 Make sure:${colors.reset}`);
    console.error(`   • SUPABASE_DB_URL is set correctly`);
    console.error(`   • Database is running and accessible`);
    console.error(`   • Schema has been applied (run pnpm db:push first)`);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Handle uncaught errors
process.on('unhandledRejection', (error) => {
  console.error(`${colors.red}❌ Unhandled error:${colors.reset}`, error);
  process.exit(1);
});

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`${colors.red}❌ Validation failed:${colors.reset}`, error);
    process.exit(1);
  });
}
