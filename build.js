import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';

console.log('🔨 Building Prompter...\n');

// Clean dist directory
if (existsSync('dist')) {
  console.log('Cleaning dist directory...');
  rmSync('dist', { recursive: true });
}

// Compile TypeScript
console.log('Compiling TypeScript...');
try {
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('\n✅ Build completed successfully!');
} catch (error) {
  console.error('\n❌ Build failed');
  process.exit(1);
}
