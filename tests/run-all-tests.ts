/**
 * Unified Automated Test Runner for Aura & Paw Grooming Studio
 *
 * Runs all 5 verification tiers:
 * - Tier 1: Viewport Rendering & Layout Integrity across target viewports (375px, 390px, 768px, 1024px, 1280px)
 * - Tier 2: Horizontal Overflow & Scroll Checking (scrollWidth <= innerWidth, 0 overflow)
 * - Tier 3: Mobile Touch Target Sizing (>= 44px x 44px on interactive elements)
 * - Tier 4: Bento UI Grid Architecture (1-col mobile, 2-col tablet, multi-col desktop, 0 collisions)
 * - Tier 5: Compilation Check (tsc --noEmit & npm run build zero errors)
 *
 * Usage:
 *   npx tsx tests/run-all-tests.ts
 *   npx tsx tests/run-all-tests.ts --tier=1
 *   npx tsx tests/run-all-tests.ts --tier=2
 *   npx tsx tests/run-all-tests.ts --tier=3
 *   npx tsx tests/run-all-tests.ts --tier=4
 *   npx tsx tests/run-all-tests.ts --tier=5
 */

import fs from 'fs';
import path from 'path';
import { runTier1Tests } from './tier1-viewport-rendering.test';
import { runTier2Tests } from './tier2-horizontal-overflow.test';
import { runTier3Tests } from './tier3-touch-targets.test';
import { runTier4Tests } from './tier4-bento-grid.test';
import { runTier5Tests } from './tier5-compilation.test';

async function main() {
  const args = process.argv.slice(2);
  const tierArg = args.find((a) => a.startsWith('--tier='));
  const selectedTier = tierArg ? parseInt(tierArg.split('=')[1], 10) : null;

  console.log('================================================================');
  console.log('       Aura & Paw Grooming Studio — E2E Test Suite Runner       ');
  console.log('================================================================');
  console.log(`Execution Mode: ${selectedTier ? `Tier ${selectedTier} Only` : 'All 5 Tiers'}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);

  const resultsSummary: Record<string, { passed: boolean; details?: any }> = {};

  // Tier 1
  if (!selectedTier || selectedTier === 1) {
    try {
      const t1 = await runTier1Tests();
      resultsSummary['Tier 1: Viewport Rendering'] = { passed: t1.passed, details: t1.results };
    } catch (err: any) {
      console.error('Tier 1 Error:', err.message || err);
      resultsSummary['Tier 1: Viewport Rendering'] = { passed: false, details: err.message };
    }
  }

  // Tier 2
  if (!selectedTier || selectedTier === 2) {
    try {
      const t2 = await runTier2Tests();
      resultsSummary['Tier 2: Horizontal Overflow'] = { passed: t2.passed, details: t2.results };
    } catch (err: any) {
      console.error('Tier 2 Error:', err.message || err);
      resultsSummary['Tier 2: Horizontal Overflow'] = { passed: false, details: err.message };
    }
  }

  // Tier 3
  if (!selectedTier || selectedTier === 3) {
    try {
      const t3 = await runTier3Tests();
      resultsSummary['Tier 3: Mobile Touch Targets'] = { passed: t3.passed, details: t3.results };
    } catch (err: any) {
      console.error('Tier 3 Error:', err.message || err);
      resultsSummary['Tier 3: Mobile Touch Targets'] = { passed: false, details: err.message };
    }
  }

  // Tier 4
  if (!selectedTier || selectedTier === 4) {
    try {
      const t4 = await runTier4Tests();
      resultsSummary['Tier 4: Bento UI Grid'] = { passed: t4.passed, details: t4.results };
    } catch (err: any) {
      console.error('Tier 4 Error:', err.message || err);
      resultsSummary['Tier 4: Bento UI Grid'] = { passed: false, details: err.message };
    }
  }

  // Tier 5
  if (!selectedTier || selectedTier === 5) {
    try {
      const t5 = await runTier5Tests();
      resultsSummary['Tier 5: Compilation Check'] = { passed: t5.passed, details: t5.report };
    } catch (err: any) {
      console.error('Tier 5 Error:', err.message || err);
      resultsSummary['Tier 5: Compilation Check'] = { passed: false, details: err.message };
    }
  }

  console.log('\n================================================================');
  console.log('                      TEST RESULTS SUMMARY                      ');
  console.log('================================================================');

  let allSuitesPassed = true;
  for (const [suiteName, status] of Object.entries(resultsSummary)) {
    const badge = status.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`  ${badge.padEnd(8)} | ${suiteName}`);
    if (!status.passed) allSuitesPassed = false;
  }
  console.log('----------------------------------------------------------------');
  console.log(
    `OVERALL VERDICT: ${allSuitesPassed ? '100% SUITE PASS' : 'DEFECTS DETECTED (See tier logs above)'}`
  );
  console.log('================================================================\n');

  // Write machine-readable JSON results
  try {
    const jsonPath = path.join(process.cwd(), 'tests', 'test-results.json');
    fs.writeFileSync(jsonPath, JSON.stringify(resultsSummary, null, 2), 'utf-8');
    console.log(`Artifact saved: ${jsonPath}`);
  } catch (e) {}\

  if (!allSuitesPassed) {
    console.log('Note: Non-zero exit code returned due to detected defects requiring escalation.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal Runner Error:', err);
  process.exit(1);
});
