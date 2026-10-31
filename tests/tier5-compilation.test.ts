/**
 * Tier 5: Compilation Check Test Suite
 *
 * Validates:
 * 1. TypeScript compiler checks pass cleanly (`tsc --noEmit`) with 0 errors.
 * 2. Vite production build succeeds (`npm run build`) with exit code 0.
 * 3. Production build artifacts are present and well-formed (`dist/index.html`, `dist/assets/*.css`, `dist/assets/*.js`).
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export interface Tier5Report {
  typeScriptClean: boolean;
  typeScriptOutput: string;
  buildClean: boolean;
  buildOutput: string;
  artifactsPresent: {
    html: boolean;
    css: boolean;
    js: boolean;
  };
  artifactSizes: {
    htmlBytes: number;
    cssBytes: number;
    jsBytes: number;
  };
  isPassing: boolean;
  failureReasons: string[];
}

export async function runTier5Tests(): Promise<{
  passed: boolean;
  report: Tier5Report;
}> {
  console.log('\n--- Running Tier 5: Compilation Check (tsc & npm run build) ---');

  const failureReasons: string[] = [];

  // 1. TypeScript compilation check
  let typeScriptClean = false;
  let typeScriptOutput = '';
  try {
    const out = execSync('npx tsc --noEmit', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    typeScriptClean = true;
    typeScriptOutput = out || 'Clean (0 errors)';
    console.log('  [Tier 5] TypeScript: [PASS] (tsc --noEmit zero errors)');
  } catch (err: any) {
    typeScriptClean = false;
    typeScriptOutput = (err.stdout || '') + '\n' + (err.stderr || '') + '\n' + (err.message || '');
    failureReasons.push('TypeScript compiler error: ' + typeScriptOutput.slice(0, 200));
    console.log('  [Tier 5] TypeScript: [FAIL]');
  }

  // 2. Vite Production Build check
  let buildClean = false;
  let buildOutput = '';
  try {
    const out = execSync('npm run build', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    buildClean = true;
    buildOutput = out;
    console.log('  [Tier 5] Production Build: [PASS] (vite build successful)');
  } catch (err: any) {
    buildClean = false;
    buildOutput = (err.stdout || '') + '\n' + (err.stderr || '') + '\n' + (err.message || '');
    failureReasons.push('Build execution failed: ' + buildOutput.slice(0, 200));
    console.log('  [Tier 5] Production Build: [FAIL]');
  }

  // 3. Artifact verification
  const distDir = path.join(process.cwd(), 'dist');
  const distAssets = path.join(distDir, 'assets');

  const htmlPath = path.join(distDir, 'index.html');
  const hasHtml = fs.existsSync(htmlPath);
  const htmlSize = hasHtml ? fs.statSync(htmlPath).size : 0;

  let hasCss = false;
  let cssSize = 0;
  let hasJs = false;
  let jsSize = 0;

  if (fs.existsSync(distAssets)) {
    const files = fs.readdirSync(distAssets);
    const cssFile = files.find((f) => f.endsWith('.css'));
    if (cssFile) {
      hasCss = true;
      cssSize = fs.statSync(path.join(distAssets, cssFile)).size;
    }
    const jsFile = files.find((f) => f.endsWith('.js'));
    if (jsFile) {
      hasJs = true;
      jsSize = fs.statSync(path.join(distAssets, jsFile)).size;
    }
  }

  if (!hasHtml || htmlSize === 0) failureReasons.push('dist/index.html is missing or empty');
  if (!hasCss || cssSize < 1000) failureReasons.push('dist/assets/*.css is missing or too small');
  if (!hasJs || jsSize < 1000) failureReasons.push('dist/assets/*.js is missing or too small');

  console.log(
    `  [Tier 5] Artifact Verification: [${hasHtml && hasCss && hasJs ? 'PASS' : 'FAIL'}] (HTML: ${htmlSize} bytes, CSS: ${cssSize} bytes, JS: ${jsSize} bytes)`
  );

  const isPassing = typeScriptClean && buildClean && hasHtml && hasCss && hasJs;

  const report: Tier5Report = {
    typeScriptClean,
    typeScriptOutput,
    buildClean,
    buildOutput,
    artifactsPresent: {
      html: hasHtml,
      css: hasCss,
      js: hasJs
    },
    artifactSizes: {
      htmlBytes: htmlSize,
      cssBytes: cssSize,
      jsBytes: jsSize
    },
    isPassing,
    failureReasons
  };

  return { passed: isPassing, report };
}

// Allow standalone execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/') || '')) {
  runTier5Tests()
    .then(({ passed }) => process.exit(passed ? 0 : 1))
    .catch((err) => {
      console.error('Tier 5 Execution Error:', err);
      process.exit(1);
    });
}
