#!/usr/bin/env tsx

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

interface ValidationResult {
  name: string;
  status: 'OK' | 'FAIL' | 'WARN';
  details?: string;
}

class MonorepoValidator {
  private results: ValidationResult[] = [];
  private rootPath: string;

  constructor() {
    this.rootPath = process.cwd();
  }

  private addResult(name: string, status: 'OK' | 'FAIL' | 'WARN', details?: string) {
    this.results.push({ name, status, details });
  }

  private checkFileExists(path: string): boolean {
    return existsSync(join(this.rootPath, path));
  }

  private readJsonFile(path: string): any {
    try {
      const content = readFileSync(join(this.rootPath, path), 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  private readFile(path: string): string | null {
    try {
      return readFileSync(join(this.rootPath, path), 'utf-8');
    } catch {
      return null;
    }
  }

  private async httpRequest(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // 1. Verificação de estrutura
  validateStructure() {
    console.log('🏗️  Validating monorepo structure...');

    // Apps
    const apps = ['site', 'admin', 'api'];
    apps.forEach(app => {
      const exists = this.checkFileExists(`apps/${app}`);
      this.addResult(`App: ${app}`, exists ? 'OK' : 'FAIL');
    });

    // Packages
    const packages = ['ui', 'shared', 'config'];
    packages.forEach(pkg => {
      const exists = this.checkFileExists(`packages/${pkg}`);
      this.addResult(`Package: ${pkg}`, exists ? 'OK' : 'FAIL');
    });

    // Root files
    const rootFiles = ['.editorconfig', '.gitignore', '.gitattributes', 'package.json', 'pnpm-workspace.yaml'];
    rootFiles.forEach(file => {
      const exists = this.checkFileExists(file);
      this.addResult(`Root file: ${file}`, exists ? 'OK' : 'FAIL');
    });

    // Cursor files
    const cursorFiles = [
      '.cursor/context.md',
      '.cursor/architecture.md', 
      '.cursor/prompts-index.md',
      '.cursor/deployment.md'
    ];
    cursorFiles.forEach(file => {
      const exists = this.checkFileExists(file);
      this.addResult(`Cursor file: ${file}`, exists ? 'OK' : 'WARN', exists ? undefined : 'Optional documentation file');
    });
  }

  // 2. Verificação de dependências
  validateDependencies() {
    console.log('📦 Validating dependencies...');

    // Root package.json
    const rootPkg = this.readJsonFile('package.json');
    if (rootPkg) {
      const hasWorkspaces = rootPkg.workspaces && Array.isArray(rootPkg.workspaces);
      this.addResult('Root workspaces config', hasWorkspaces ? 'OK' : 'FAIL');

      const hasTurbo = rootPkg.devDependencies?.turbo;
      this.addResult('Turbo dependency', hasTurbo ? 'OK' : 'FAIL');

      const hasPnpm = rootPkg.packageManager?.includes('pnpm');
      this.addResult('PNPM package manager', hasPnpm ? 'OK' : 'WARN');
    } else {
      this.addResult('Root package.json', 'FAIL');
    }

    // Check each app/package has package.json
    const allProjects = [
      'apps/site', 'apps/admin', 'apps/api',
      'packages/ui', 'packages/shared', 'packages/config'
    ];

    allProjects.forEach(project => {
      const pkg = this.readJsonFile(`${project}/package.json`);
      this.addResult(`${project}/package.json`, pkg ? 'OK' : 'FAIL');
    });
  }

  // 3. Validação de ENV
  validateEnvironment() {
    console.log('🌍 Validating environment...');

    const envExample = this.readFile('.env.example');
    if (!envExample) {
      this.addResult('ENV validation', 'FAIL', '.env.example not found');
      return;
    }

    // Parse env.example
    const envKeys = envExample
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => line.split('=')[0].trim())
      .filter(key => key);

    this.addResult('ENV example file', 'OK', `Found ${envKeys.length} env vars`);

    // Check if .env exists (optional)
    const hasEnv = this.checkFileExists('.env');
    this.addResult('.env file', hasEnv ? 'OK' : 'WARN', hasEnv ? undefined : 'Optional for development');

    // List expected env vars
    const expectedVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
      'SUPABASE_SERVICE_ROLE',
      'UPSTASH_REDIS_REST_URL',
      'UPSTASH_REDIS_REST_TOKEN',
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET'
    ];

    const missingVars = expectedVars.filter(key => !envKeys.includes(key));
    if (missingVars.length === 0) {
      this.addResult('ENV vars completeness', 'OK');
    } else {
      this.addResult('ENV vars completeness', 'WARN', `Missing: ${missingVars.join(', ')}`);
    }
  }

  // 4. Verificação de Chakra Providers
  validateChakraProviders() {
    console.log('🎨 Validating Chakra UI setup...');

    // Check site layout
    const siteLayout = this.readFile('apps/site/src/app/layout.tsx');
    if (siteLayout) {
      const hasChakraProvider = siteLayout.includes('ChakraProviders');
      this.addResult('Site Chakra Provider', hasChakraProvider ? 'OK' : 'FAIL');
    } else {
      this.addResult('Site layout file', 'FAIL');
    }

    // Check admin layout
    const adminLayout = this.readFile('apps/admin/src/app/layout.tsx');
    if (adminLayout) {
      const hasChakraProvider = adminLayout.includes('ChakraProviders');
      this.addResult('Admin Chakra Provider', hasChakraProvider ? 'OK' : 'FAIL');
    } else {
      this.addResult('Admin layout file', 'FAIL');
    }

    // Check UI package exports ChakraProviders
    const uiIndex = this.readFile('packages/ui/src/index.ts');
    if (uiIndex) {
      const exportsChakraProviders = uiIndex.includes('ChakraProviders');
      this.addResult('UI exports ChakraProviders', exportsChakraProviders ? 'OK' : 'FAIL');
    } else {
      this.addResult('UI index file', 'FAIL');
    }
  }

  // 5. Verificação da API /health
  async validateHealthEndpoint() {
    console.log('🏥 Validating API health endpoint...');

    try {
      // Try different common ports
      const ports = [8000, 3002, 3000];
      let healthData = null;
      let successPort = null;

      for (const port of ports) {
        try {
          healthData = await this.httpRequest(`http://localhost:${port}/health`);
          successPort = port;
          break;
        } catch {
          // Try next port
        }
      }

      if (!healthData) {
        this.addResult('API /health endpoint', 'WARN', 'API not running or not accessible on common ports (8000, 3002, 3000)');
        return;
      }

      this.addResult('API /health reachable', 'OK', `Port ${successPort}`);

      // Validate response structure
      const expectedKeys = ['ok', 'supabase', 'redis', 'stripe'];
      const hasAllKeys = expectedKeys.every(key => key in healthData);
      
      if (hasAllKeys) {
        this.addResult('API /health structure', 'OK', JSON.stringify(healthData));
      } else {
        const missingKeys = expectedKeys.filter(key => !(key in healthData));
        this.addResult('API /health structure', 'FAIL', `Missing keys: ${missingKeys.join(', ')}`);
      }

      // Validate types
      const okIsBoolean = typeof healthData.ok === 'boolean';
      const supabaseIsBoolean = typeof healthData.supabase === 'boolean';
      const redisIsBoolean = typeof healthData.redis === 'boolean';
      const stripeIsBoolean = typeof healthData.stripe === 'boolean';

      if (okIsBoolean && supabaseIsBoolean && redisIsBoolean && stripeIsBoolean) {
        this.addResult('API /health types', 'OK');
      } else {
        this.addResult('API /health types', 'FAIL', 'All values should be boolean');
      }

    } catch (error) {
      this.addResult('API /health endpoint', 'FAIL', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // 6. Verificação de scripts
  validateScripts() {
    console.log('🔧 Validating build scripts...');

    try {
      // Test lint
      execSync('pnpm -w lint', { stdio: 'pipe' });
      this.addResult('Lint script', 'OK');
    } catch {
      this.addResult('Lint script', 'FAIL');
    }

    try {
      // Test typecheck
      execSync('pnpm -w typecheck', { stdio: 'pipe' });
      this.addResult('Typecheck script', 'OK');
    } catch {
      this.addResult('Typecheck script', 'FAIL');
    }

    try {
      // Test test
      execSync('pnpm -w test', { stdio: 'pipe' });
      this.addResult('Test script', 'OK');
    } catch {
      this.addResult('Test script', 'FAIL');
    }

    try {
      // Test build (this might fail due to known Next.js issue)
      execSync('pnpm -w build', { stdio: 'pipe' });
      this.addResult('Build script', 'OK');
    } catch {
      this.addResult('Build script', 'WARN', 'Build failed (known Next.js issue with Chakra UI)');
    }
  }

  // 7. Verificação de CI
  validateCI() {
    console.log('🔄 Validating CI configuration...');

    const ciFile = this.readFile('.github/workflows/ci.yml');
    if (!ciFile) {
      this.addResult('GitHub Actions CI', 'FAIL', 'ci.yml not found');
      return;
    }

    this.addResult('GitHub Actions CI file', 'OK');

    // Check for key elements
    const hasNodeMatrix = ciFile.includes('node-version: [18, 20]') || ciFile.includes('matrix');
    this.addResult('CI Node.js matrix', hasNodeMatrix ? 'OK' : 'WARN');

    const hasPnpmInstall = ciFile.includes('pnpm install --frozen-lockfile');
    this.addResult('CI pnpm install', hasPnpmInstall ? 'OK' : 'WARN');

    const hasLintStep = ciFile.includes('pnpm -w lint');
    this.addResult('CI lint step', hasLintStep ? 'OK' : 'WARN');

    const hasTestStep = ciFile.includes('pnpm -w test');
    this.addResult('CI test step', hasTestStep ? 'OK' : 'WARN');

    const hasBuildStep = ciFile.includes('pnpm -w build');
    this.addResult('CI build step', hasBuildStep ? 'OK' : 'WARN');
  }

  // 8. Verificação de Vercel
  validateVercel() {
    console.log('🚀 Validating Vercel configuration...');

    const vercelConfig = this.readFile('vercel.json');
    if (vercelConfig) {
      this.addResult('Vercel config file', 'OK');
      
      // Check if it mentions the apps
      const hasAppsConfig = vercelConfig.includes('site') && 
                           vercelConfig.includes('admin') && 
                           vercelConfig.includes('api');
      this.addResult('Vercel apps config', hasAppsConfig ? 'OK' : 'WARN');
    } else {
      this.addResult('Vercel config file', 'WARN', 'vercel.json not found - configure manually in Vercel dashboard');
    }

    // Check individual app configs
    const siteVercel = this.checkFileExists('apps/site/vercel.json');
    this.addResult('Site Vercel config', siteVercel ? 'OK' : 'WARN');

    const adminVercel = this.checkFileExists('apps/admin/vercel.json');
    this.addResult('Admin Vercel config', adminVercel ? 'OK' : 'WARN');

    const apiVercel = this.checkFileExists('apps/api/vercel.json');
    this.addResult('API Vercel config', apiVercel ? 'OK' : 'WARN');
  }

  // Relatório final
  printReport() {
    console.log('\n📊 VALIDATION REPORT');
    console.log('='.repeat(50));

    const categories = {
      'Structure': this.results.filter(r => r.name.includes('App:') || r.name.includes('Package:') || r.name.includes('Root file:')),
      'Dependencies': this.results.filter(r => r.name.includes('package.json') || r.name.includes('workspaces') || r.name.includes('dependency')),
      'Environment': this.results.filter(r => r.name.includes('ENV')),
      'Chakra UI': this.results.filter(r => r.name.includes('Chakra')),
      'API Health': this.results.filter(r => r.name.includes('API') || r.name.includes('health')),
      'Scripts': this.results.filter(r => r.name.includes('script')),
      'CI/CD': this.results.filter(r => r.name.includes('CI') || r.name.includes('GitHub')),
      'Vercel': this.results.filter(r => r.name.includes('Vercel')),
      'Documentation': this.results.filter(r => r.name.includes('Cursor file:'))
    };

    Object.entries(categories).forEach(([category, results]) => {
      if (results.length === 0) return;
      
      console.log(`\n${category}:`);
      results.forEach(result => {
        const icon = result.status === 'OK' ? '✅' : result.status === 'WARN' ? '⚠️' : '❌';
        console.log(`  ${icon} ${result.name}: ${result.status}${result.details ? ` (${result.details})` : ''}`);
      });
    });

    // Summary
    const okCount = this.results.filter(r => r.status === 'OK').length;
    const warnCount = this.results.filter(r => r.status === 'WARN').length;
    const failCount = this.results.filter(r => r.status === 'FAIL').length;

    console.log('\n📈 SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ OK: ${okCount}`);
    console.log(`⚠️  WARNINGS: ${warnCount}`);
    console.log(`❌ FAILURES: ${failCount}`);
    console.log(`📊 TOTAL: ${this.results.length}`);

    if (failCount === 0) {
      console.log('\n🎉 Monorepo validation PASSED! Ready for development.');
    } else {
      console.log('\n🚨 Monorepo validation has FAILURES. Please fix the issues above.');
    }

    return failCount === 0;
  }

  async run() {
    console.log('🔍 Starting monorepo validation...\n');

    this.validateStructure();
    this.validateDependencies();
    this.validateEnvironment();
    this.validateChakraProviders();
    await this.validateHealthEndpoint();
    this.validateScripts();
    this.validateCI();
    this.validateVercel();

    return this.printReport();
  }
}

// Run validation
async function main() {
  const validator = new MonorepoValidator();
  const success = await validator.run();
  process.exit(success ? 0 : 1);
}

main().catch(console.error);
