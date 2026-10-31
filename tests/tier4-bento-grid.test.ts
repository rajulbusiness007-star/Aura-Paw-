/**
 * Tier 4: Bento UI Grid Architecture Test Suite
 *
 * Validates the presence, structure, responsiveness, and non-overlapping layout
 * of the modular Bento UI grid in `TrustPillars.tsx` across target viewports:
 * - 375px (Mobile 1-col stack)
 * - 390px (Mobile 1-col stack)
 * - 768px (Tablet 2-col distribution)
 * - 1024px (Desktop multi-col grid)
 * - 1280px (Desktop wide multi-col grid)
 *
 * Verifies:
 * 1. Presence of modular bento cards
 * 2. Proper column adaptation (1-col mobile, 2-col tablet, multi-col desktop)
 * 3. Absence of visual collisions / card overlaps
 * 4. Card geometry integrity (minimum dimensions, proper styling attributes)
 */

import React from 'react';
import App from '../src/App';
import {
  TARGET_VIEWPORTS,
  executeInChrome,
  renderComponentToString
} from './helpers';

export interface BentoCardMetrics {
  index: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface Tier4ViewportReport {
  viewport: number;
  cardCount: number;
  detectedColumns: number;
  expectedColumns: string;
  hasOverlaps: boolean;
  overlappingPairs: string[];
  cards: BentoCardMetrics[];
  isPassing: boolean;
  failureReasons: string[];
}

export async function runTier4Tests(): Promise<{
  passed: boolean;
  results: Record<number, Tier4ViewportReport>;
}> {
  console.log('\n--- Running Tier 4: Bento UI Grid Architecture & Responsiveness ---');

  const appHtml = renderComponentToString(React.createElement(App));

  const clientCheck = `function(win, doc, vpWidth) {
    var reasons = [];

    // Locate the Bento Grid container in TrustPillars
    // Look for grid container following "The Atelier Standard" or "Why Pet Owners Entrust"
    var headings = Array.from(doc.querySelectorAll('h2'));
    var trustHeading = headings.find(function(h) {
      return h.textContent.indexOf('Entrust') !== -1 || h.textContent.indexOf('Why Pet Owners') !== -1;
    });

    var bentoSection = trustHeading ? trustHeading.closest('section') : null;
    if (!bentoSection) {
      return {
        viewport: vpWidth,\n        cardCount: 0,
        detectedColumns: 0,
        expectedColumns: '',
        hasOverlaps: false,
        overlappingPairs: [],
        cards: [],
        isPassing: false,
        failureReasons: ['TrustPillars Bento section not found in document']
      };
    }

    var gridContainer = bentoSection.querySelector('.grid');
    if (!gridContainer) {
      return {
        viewport: vpWidth,
        cardCount: 0,
        detectedColumns: 0,
        expectedColumns: '',
        hasOverlaps: false,
        overlappingPairs: [],
        cards: [],
        isPassing: false,
        failureReasons: ['Grid container (.grid) missing in TrustPillars']
      };
    }

    var cardElements = Array.from(gridContainer.children);
    var cards = cardElements.map(function(el, idx) {\n      var r = el.getBoundingClientRect();
      return {
        index: idx,
        left: Math.round(r.left),
        top: Math.round(r.top),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom),
        width: Math.round(r.width),
        height: Math.round(r.height)
      };
    });

    if (cards.length < 6) {
      reasons.push('Bento grid contains only ' + cards.length + ' cards (expected >= 6 modular cards)');
    }

    // Determine distinct column lanes by clustering left coordinates (within 16px tolerance)
    var uniqueLefts = [];
    cards.forEach(function(c) {
      var matched = uniqueLefts.some(function(l) { return Math.abs(l - c.left) <= 16; });
      if (!matched) uniqueLefts.push(c.left);
    });
    var detectedCols = uniqueLefts.length;

    var expectedColDesc = '';
    if (vpWidth <= 430) {
      expectedColDesc = '1 column (mobile stack)';
      if (detectedCols !== 1) {
        reasons.push('Mobile ' + vpWidth + 'px should be 1 column, but detected ' + detectedCols + ' columns');
      }
    } else if (vpWidth >= 768 && vpWidth < 1024) {
      expectedColDesc = '2 columns (tablet balanced)';
      if (detectedCols < 2) {
        reasons.push('Tablet ' + vpWidth + 'px should be at least 2 columns, but detected ' + detectedCols + ' columns');
      }
    } else if (vpWidth >= 1024) {
      expectedColDesc = 'multi-column grid (desktop >= 3 cols)';
      if (detectedCols < 3) {
        reasons.push('Desktop ' + vpWidth + 'px should be at least 3 columns, but detected ' + detectedCols + ' columns');
      }
    }

    // Mathematical overlap test between cards
    var overlappingPairs = [];
    for (var i = 0; i < cards.length; i++) {
      for (var j = i + 1; j < cards.length; j++) {
        var a = cards[i];
        var b = cards[j];
        // 2D AABB collision detection with 4px margin
        var overlapX = (a.left < b.right - 4) && (a.right > b.left + 4);
        var overlapY = (a.top < b.bottom - 4) && (a.bottom > b.top + 4);
        if (overlapX && overlapY) {
          overlappingPairs.push('Card ' + (i + 1) + ' overlaps with Card ' + (j + 1));
        }
      }
    }

    if (overlappingPairs.length > 0) {
      reasons.push('Broken layout: ' + overlappingPairs.length + ' card overlap collision(s) detected: ' + overlappingPairs.join('; '));
    }

    // Card dimensions check
    var crushedCards = cards.filter(function(c) { return c.width < 120 || c.height < 50; });
    if (crushedCards.length > 0) {
      reasons.push(crushedCards.length + ' card(s) have crushed/collapsed dimensions');
    }

    return {
      viewport: vpWidth,
      cardCount: cards.length,
      detectedColumns: detectedCols,
      expectedColumns: expectedColDesc,
      hasOverlaps: overlappingPairs.length > 0,
      overlappingPairs: overlappingPairs,
      cards: cards,
      isPassing: reasons.length === 0,
      failureReasons: reasons
    };
  }`;

  const rawResults = await executeInChrome<Tier4ViewportReport>(
    [...TARGET_VIEWPORTS],
    appHtml,
    clientCheck
  );

  let allPassed = true;

  for (const vp of TARGET_VIEWPORTS) {
    const rep = rawResults[vp];
    const status = rep.isPassing ? 'PASS' : 'FAIL';
    console.log(
      `  [Tier 4] Viewport ${vp}px: [${status}] (${rep.cardCount} cards, ${rep.detectedColumns} col(s) detected [Expected: ${rep.expectedColumns}], Overlaps: ${rep.hasOverlaps})`
    );
    if (!rep.isPassing) {
      allPassed = false;
      console.log(`    Failures: ${rep.failureReasons.join('; ')}`);
    }
  }

  return { passed: allPassed, results: rawResults };
}

// Allow standalone execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/') || '')) {
  runTier4Tests()
    .then(({ passed }) => process.exit(passed ? 0 : 1))\n    .catch((err) => {
      console.error('Tier 4 Execution Error:', err);
      process.exit(1);
    });
}
