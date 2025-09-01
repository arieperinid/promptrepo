/**
 * SQL Runner Utility for Supabase Database Setup
 * 
 * This utility provides instructions and helpers for applying SQL migrations
 * to your Supabase database. It does NOT execute SQL automatically for security.
 */

/* eslint-disable no-console */

import fs from "node:fs";
import path from "node:path";

// Get current directory - when running from root, need to adjust path
const isRunningFromRoot = process.cwd().endsWith('promptrepo');
const __dirname = isRunningFromRoot 
  ? path.resolve(process.cwd(), 'apps/api/src/utils')
  : path.resolve(process.cwd(), 'src/utils');

// Path to SQL files directory
const SQL_DIR = path.resolve(__dirname, "../sql");

/**
 * Get list of SQL files in order
 */
export function getSqlFiles(): string[] {
  if (!fs.existsSync(SQL_DIR)) {
    console.warn(`SQL directory not found: ${SQL_DIR}`);
    return [];
  }

  const files = fs.readdirSync(SQL_DIR)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Files are named with prefixes (01_, 02_, etc.) for ordering

  return files.map(file => path.join(SQL_DIR, file));
}

/**
 * Read SQL file content
 */
export function readSqlFile(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(`SQL file not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Print instructions for applying SQL files to Supabase
 */
export function printSetupInstructions(): void {
  const sqlFiles = getSqlFiles();
  
  console.log('\n🗄️  PromptRepo Database Setup Instructions');
  console.log('==========================================\n');
  
  console.log('📋 SQL Files Found:');
  sqlFiles.forEach((file, _index) => {
    const _fileName = path.basename(file);
    console.log(`  ${_index + 1}. ${_fileName}`);
  });
  
  console.log('\n🚀 Setup Options:\n');
  
  console.log('Option 1: Supabase Dashboard (Recommended for first setup)');
  console.log('--------------------------------------------------------');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to SQL Editor');
  console.log('4. Create a new query');
  console.log('5. Copy and paste each SQL file content in order:');
  sqlFiles.forEach((file, _index) => {
    const _fileName = path.basename(file);
    console.log(`   ${_index + 1}. ${_fileName}`);
  });
  console.log('6. Run each file separately');
  console.log('7. Verify no errors in the output\n');
  
  console.log('Option 2: Supabase CLI (For developers)');
  console.log('---------------------------------------');
  console.log('1. Install Supabase CLI: npm install -g supabase');
  console.log('2. Login: supabase login');
  console.log('3. Link to your project: supabase link --project-ref YOUR_PROJECT_REF');
  console.log('4. Apply migrations:');
  sqlFiles.forEach((file) => {
    console.log(`   supabase db push --file ${file}`);
  });
  console.log('\n');
  
  console.log('Option 3: Manual psql (Advanced)');
  console.log('--------------------------------');
  console.log('1. Get your database URL from Supabase dashboard');
  console.log('2. Connect: psql "YOUR_DATABASE_URL"');
  console.log('3. Run files in order:');
  sqlFiles.forEach((file) => {
    console.log(`   \\i ${file}`);
  });
  console.log('\n');
  
  console.log('⚠️  Important Notes:');
  console.log('- Run files in the exact order shown (01_, 02_, etc.)');
  console.log('- Do NOT run 99_seed_dev.sql in production');
  console.log('- Backup your database before applying changes');
  console.log('- Test in a development environment first');
  console.log('- Some operations may require SUPERUSER privileges\n');
  
  console.log('🔍 Verification:');
  console.log('After setup, verify with these queries:');
  console.log('- SELECT * FROM profiles LIMIT 1;');
  console.log('- SELECT * FROM public_list_projects(5, 0);');
  console.log('- SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';');
  console.log('\n');
}

/**
 * Generate migration summary
 */
export function generateMigrationSummary(): void {
  const sqlFiles = getSqlFiles();
  
  console.log('\n📊 Migration Summary');
  console.log('===================\n');
  
  sqlFiles.forEach((file) => {
    const fileName = path.basename(file);
    const content = readSqlFile(file);
    
    // Count different types of SQL statements
    const createTables = (content.match(/create table/gi) || []).length;
    const createIndexes = (content.match(/create index/gi) || []).length;
    const createPolicies = (content.match(/create policy/gi) || []).length;
    const createFunctions = (content.match(/create or replace function/gi) || []).length;
    const createTriggers = (content.match(/create trigger/gi) || []).length;
    const createViews = (content.match(/create or replace view/gi) || []).length;
    
    console.log(`📄 ${fileName}:`);
    if (createTables > 0) console.log(`   - ${createTables} tables`);
    if (createIndexes > 0) console.log(`   - ${createIndexes} indexes`);
    if (createPolicies > 0) console.log(`   - ${createPolicies} RLS policies`);
    if (createFunctions > 0) console.log(`   - ${createFunctions} functions`);
    if (createTriggers > 0) console.log(`   - ${createTriggers} triggers`);
    if (createViews > 0) console.log(`   - ${createViews} views`);
    console.log('');
  });
}

/**
 * Validate SQL files exist and are readable
 */
export function validateSqlFiles(): boolean {
  const sqlFiles = getSqlFiles();
  
  if (sqlFiles.length === 0) {
    console.error('❌ No SQL files found');
    return false;
  }
  
  let allValid = true;
  
  console.log('🔍 Validating SQL files...\n');
  
  sqlFiles.forEach((file) => {
    const fileName = path.basename(file);
    try {
      const content = readSqlFile(file);
      if (content.trim().length === 0) {
        console.error(`❌ ${fileName}: File is empty`);
        allValid = false;
      } else {
        console.log(`✅ ${fileName}: OK (${content.length} characters)`);
      }
    } catch (error) {
      console.error(`❌ ${fileName}: ${error}`);
      allValid = false;
    }
  });
  
  console.log('');
  return allValid;
}

/**
 * Main function to run when script is executed directly
 */
export function main(): void {
  console.log('🗄️  PromptRepo SQL Runner\n');
  
  // Validate files first
  if (!validateSqlFiles()) {
    throw new Error('SQL file validation failed');
  }
  
  // Show setup instructions
  printSetupInstructions();
  
  // Show migration summary
  generateMigrationSummary();
  
  console.log('✅ Ready to apply database migrations!');
  console.log('Choose one of the setup options above to proceed.\n');
}

// Run main function if this file is executed directly
// For ES modules, we need to check process.argv
if (process.argv[1] && process.argv[1].includes('sqlRunner')) {
  main();
}
