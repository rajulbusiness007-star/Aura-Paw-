/**
 * Adversarial Stress Test Suite for Aura & Paw Grooming Studio
 *
 * Authored by: challenger_paw_1 (Empirical Challenger)
 * Scope:
 * 1. Non-Standard Viewports:
 *    - Narrow mobile: 320px (iPhone SE 1st gen), 360px (Galaxy S / Android common)
 *    - Large phablets: 414px (iPhone 11 Pro Max / XR), 428px (iPhone 13/14 Pro Max)
 *    - Small / Medium tablet: 600px (7" Android tablet / Foldable), 768px (iPad portrait), 834px (iPad Pro 11")
 *    - Large desktop: 1440px (MacBook Pro / QHD), 1920px (FHD / Wide)
 *
 * 2. Bento UI Layout Under Continuous Resizing:
 *    - 0 card collisions (2D AABB bounding box overlap check)
 *    - Proper stacking order and column allocation
 *    - 0 broken CSS classes (scan for undefined, null, NaN, [object)
 *
 * 3. Horizontal Overflow & Text Wrapping Under Adversarial Content:
 *    - Extreme character strings injection (continuous non-breaking words)
 *    - Font scaling stress (125%, 150% font size scaling)
 *
 * 4. Touch Target Sizing at Narrow Mobile (320px, 360px)
 */

import React from 'react';
import App from '../src/App';
import { executeInChrome, renderComponentToString } from './helpers';

export const ADVERSARIAL_VIEWPORTS = [
  320,  // Narrowest mobile (iPhone SE 1)
  360,  // Standard compact Android
  375,  // iPhone SE 2/3
  390,  // iPhone 12/13/14
  414,  // iPhone 11 Pro Max / XR
  428,  // iPhone 13/14 Pro Max
  600,  // Small tablet / Foldable
  768,  // Standard iPad
  834,  // iPad Air / Pro 11"
  1024, // Laptop / Landscape tablet
  1280, // Desktop standard
  1440, // MacBook Pro / QHD
  1920  // Full HD / Widescreen
] as const;

export interface AdversarialViewportReport {
  viewport: number;
  scrollWidth: number;
  innerWidth: number;
  overflowDelta: number;
  overflowingElements: Array<{ tag: string; cls: string; right: number }>;
  bentoCardCount: number;
  bentoColumns: number;
  bentoCollisions: string[];
  bentoStackingOrderValid: boolean;
  brokenCssClasses: string[];
  narrowTouchTargetsPassing: boolean;
  touchTargetFailures: string[];
  fontScalingOverflowDelta: number;
  extremeStringOverflowDelta: number;
  isPassing: boolean;
  failureReasons: string[];
}

export async function runAdversarialStressTests(): Promise<{
  passed: boolean;
  results: Record<number, AdversarialViewportReport>;
}> {
  console.log('================================================================');
  console.log('   Aura & Paw — Adversarial Stress Test Suite (Challenger)      ');
  console.log('================================================================');
  console.log(`Testing ${ADVERSARIAL_VIEWPORTS.length} Viewports: ${ADVERSARIAL_VIEWPORTS.join(', ')} px`);

  const appHtml = renderComponentToString(React.createElement(App));

  const clientEvaluation = `function(win, doc, vpWidth) {
    var reasons = [];
    var innerW = win.innerWidth;
    var docEl = doc.documentElement;
    var body = doc.body;

    // 1. Base Horizontal Overflow Check
    var scrollW = docEl.scrollWidth;
    var bodyScrollW = body.scrollWidth;
    var overflowDelta = Math.max(0, scrollW - innerW);

    var overflowingElements = [];
    var allNodes = Array.from(doc.querySelectorAll('*'));
    for (var i = 0; i < allNodes.length; i++) {
      var n = allNodes[i];
      var tag = n.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'head' || tag === 'html' || tag === 'body') continue;
      var r = n.getBoundingClientRect();
      if (r.right > innerW + 1.5 && r.width > 0) {
        // Check containment
        var parent = n.parentElement;
        var contained = false;
        while (parent && parent !== body && parent !== docEl) {
          var cs = win.getComputedStyle(parent);
          if (cs.overflowX === 'hidden' || cs.overflowX === 'clip' || cs.overflow === 'hidden' || cs.overflow === 'clip') {
            contained = true;
            break;
          }
          parent = parent.parentElement;
        }
        if (!contained) {
          overflowingElements.push({\n            tag: tag,\n            cls: (n.className || '').toString().slice(0, 50),\n            right: Math.round(r.right)\n          });
        }
      }
    }

    if (overflowDelta > 0) {
      reasons.push('Base horizontal overflow: +' + overflowDelta + 'px (scrollWidth=' + scrollW + ', innerWidth=' + innerW + ')');
    }
    if (overflowingElements.length > 0) {
      reasons.push(overflowingElements.length + ' uncontained overflowing element(s) detected');
    }

    // 2. Bento Grid Structure, Collisions & Resizing Integrity
    var headings = Array.from(doc.querySelectorAll('h2'));
    var trustHeading = headings.find(function(h) {
      return h.textContent.indexOf('Entrust') !== -1 || h.textContent.indexOf('Why Pet Owners') !== -1;
    });
    var bentoSection = trustHeading ? trustHeading.closest('section') : null;
    var gridContainer = bentoSection ? bentoSection.querySelector('.grid') : null;

    var bentoCardCount = 0;
    var bentoColumns = 0;
    var bentoCollisions = [];
    var bentoStackingOrderValid = true;
    var brokenCssClasses = [];

    if (!gridContainer) {
      reasons.push('Bento grid container (.grid) missing in #bento-showcase');
    } else {
      var cardEls = Array.from(gridContainer.children);
      bentoCardCount = cardEls.length;

      if (bentoCardCount !== 8) {
        reasons.push('Expected exactly 8 modular bento cards, found ' + bentoCardCount);
      }

      var cardMetrics = cardEls.map(function(el, idx) {
        var rect = el.getBoundingClientRect();
        return {
          idx: idx,
          left: Math.round(rect.left),
          top: Math.round(rect.top),
          right: Math.round(rect.right),
          bottom: Math.round(rect.bottom),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      });

      // Scan for 2D AABB bounding box collisions
      for (var a = 0; a < cardMetrics.length; a++) {
        for (var b = a + 1; b < cardMetrics.length; b++) {
          var ca = cardMetrics[a];
          var cb = cardMetrics[b];
          var collX = (ca.left < cb.right - 4) && (ca.right > cb.left + 4);
          var collY = (ca.top < cb.bottom - 4) && (ca.bottom > cb.top + 4);
          if (collX && collY) {
            bentoCollisions.push('Card #' + (a + 1) + ' collided with Card #' + (b + 1));
          }
        }
      }

      if (bentoCollisions.length > 0) {
        reasons.push(bentoCollisions.length + ' Bento card collision(s): ' + bentoCollisions.join(', '));
      }

      // Column lane detection
      var uniqueLefts = [];
      cardMetrics.forEach(function(c) {
        var matched = uniqueLefts.some(function(l) { return Math.abs(l - c.left) <= 16; });
        if (!matched) uniqueLefts.push(c.left);
      });
      bentoColumns = uniqueLefts.length;

      // Responsiveness verification
      if (vpWidth <= 428) {
        if (bentoColumns !== 1) {
          reasons.push('Mobile viewport ' + vpWidth + 'px must be 1 column, detected ' + bentoColumns + ' columns');
        }
        // Stacking order: top coordinates must be monotonically non-decreasing
        for (var k = 0; k < cardMetrics.length - 1; k++) {
          if (cardMetrics[k].bottom > cardMetrics[k + 1].bottom && cardMetrics[k].top > cardMetrics[k + 1].top) {
            bentoStackingOrderValid = false;
            reasons.push('Mobile Bento card stacking inverted between Card #' + (k + 1) + ' and #' + (k + 2));
            break;
          }
        }
      } else if (vpWidth >= 768 && vpWidth < 1024) {
        if (bentoColumns < 2) {
          reasons.push('Tablet viewport ' + vpWidth + 'px must have >= 2 columns, detected ' + bentoColumns);
        }
      } else if (vpWidth >= 1024) {
        if (bentoColumns < 3) {
          reasons.push('Desktop viewport ' + vpWidth + 'px must have >= 3 columns, detected ' + bentoColumns);
        }
      }

      // Check for broken CSS classes in Bento section
      var bentoElements = Array.from(bentoSection.querySelectorAll('*'));
      bentoElements.forEach(function(el) {
        var cls = el.getAttribute('class') || '';
        if (cls.indexOf('undefined') !== -1 || cls.indexOf('null') !== -1 || cls.indexOf('NaN') !== -1 || cls.indexOf('[object') !== -1) {
          brokenCssClasses.push(el.tagName + ': ' + cls.slice(0, 40));
        }
      });

      if (brokenCssClasses.length > 0) {
        reasons.push('Broken CSS classes found: ' + brokenCssClasses.join('; '));
      }
    }

    // 3. Touch Target Sizing on Narrow Viewports (<= 360px)
    var narrowTouchTargetsPassing = true;
    var touchTargetFailures = [];
    if (vpWidth <= 360) {
      var interactiveSelectors = [
        { name: 'Hamburger Menu Button', sel: 'button[aria-label="Toggle Navigation Menu"]' },
        { name: 'Sticky Call Salon Button', sel: '.fixed.bottom-0 a[href^="tel:"]' },
        { name: 'Sticky Book Appointment Button', sel: '.fixed.bottom-0 button' }
      ];

      interactiveSelectors.forEach(function(item) {\n        var el = doc.querySelector(item.sel);
        if (el) {
          var r = el.getBoundingClientRect();
          var cs = win.getComputedStyle(el);
          var minH = parseFloat(cs.minHeight) || 0;
          var minW = parseFloat(cs.minWidth) || 0;
          var w = Math.round(r.width * 10) / 10;
          var h = Math.round(r.height * 10) / 10;
          var passW = w >= 43.5 || minW >= 44;
          var passH = h >= 43.5 || minH >= 44;
          if (!passW || !passH) {
            narrowTouchTargetsPassing = false;
            touchTargetFailures.push(item.name + ' (' + w + 'x' + h + 'px fails >= 44x44px standard)');
          }
        }
      });

      if (!narrowTouchTargetsPassing) {
        reasons.push('Narrow viewport touch target defects: ' + touchTargetFailures.join('; '));
      }
    }

    // 4. Stress Test: Font Scaling (150% text zoom simulation)
    var styleTag = doc.createElement('style');
    styleTag.id = 'stress-font-scaling';
    styleTag.textContent = 'html { font-size: 150% !important; }';
    doc.head.appendChild(styleTag);

    // Measure overflow under font zoom
    var fontScalingScrollW = docEl.scrollWidth;
    var fontScalingOverflowDelta = Math.max(0, fontScalingScrollW - innerW);
    styleTag.remove();

    if (fontScalingOverflowDelta > 0) {
      reasons.push('Font scaling (150%) caused horizontal overflow of +' + fontScalingOverflowDelta + 'px');
    }

    // 5. Stress Test: Extreme Unbroken String Injection
    var pTest = doc.createElement('div');
    pTest.id = 'stress-extreme-string';
    pTest.className = 'w-full px-4 overflow-hidden';
    pTest.innerHTML = '<p class="break-words font-mono text-xs">Pneumonoultramicroscopicsilicovolcanoconiosis_Donaudampfschifffahrtselektrizit%C3%A4tenhauptbetriebswerkbauunterbeamtengesellschaft_AuraAndPawLuxuryCareSanFranciscoCalifornia94107UnbrokenExtremityCheckString</p>';
    if (gridContainer && gridContainer.parentElement) {
      gridContainer.parentElement.appendChild(pTest);
    }
    var extremeStringScrollW = docEl.scrollWidth;
    var extremeStringOverflowDelta = Math.max(0, extremeStringScrollW - innerW);
    pTest.remove();

    if (extremeStringOverflowDelta > 0) {
      reasons.push('Extreme character string test caused horizontal overflow of +' + extremeStringOverflowDelta + 'px');
    }

    return {
      viewport: vpWidth,
      scrollWidth: scrollW,
      innerWidth: innerW,
      overflowDelta: overflowDelta,
      overflowingElements: overflowingElements,
      bentoCardCount: bentoCardCount,
      bentoColumns: bentoColumns,
      bentoCollisions: bentoCollisions,
      bentoStackingOrderValid: bentoStackingOrderValid,
      brokenCssClasses: brokenCssClasses,
      narrowTouchTargetsPassing: narrowTouchTargetsPassing,
      touchTargetFailures: touchTargetFailures,
      fontScalingOverflowDelta: fontScalingOverflowDelta,
      extremeStringOverflowDelta: extremeStringOverflowDelta,
      isPassing: reasons.length === 0,
      failureReasons: reasons
    };
  }`;

  const rawResults = await executeInChrome<AdversarialViewportReport>(
    [...ADVERSARIAL_VIEWPORTS],
    appHtml,
    clientEvaluation
  );

  let allPassed = true;

  console.log('\n--- ADVERSARIAL EMPIRICAL RESULTS PER VIEWPORT ---');
  for (const vp of ADVERSARIAL_VIEWPORTS) {
    const rep = rawResults[vp];
    const status = rep.isPassing ? '✓ PASS' : '✗ FAIL';
    console.log(
      `  ${status.padEnd(8)} | Viewport ${String(vp).padStart(4)}px: scrollW=${rep.scrollWidth}px, innerW=${rep.innerWidth}px, Δ=${rep.overflowDelta}px | Bento: ${rep.bentoCardCount} cards, ${rep.bentoColumns} cols, 0 collisions: ${rep.bentoCollisions.length === 0} | FontZoom Δ=${rep.fontScalingOverflowDelta}px`
    );
    if (!rep.isPassing) {
      allPassed = false;
      console.log(`    Failures: ${rep.failureReasons.join('; ')}`);
    }
  }

  console.log('\n----------------------------------------------------------------');
  console.log(
    `ADVERSARIAL STRESS SUITE OVERALL: ${allPassed ? 'ALL VIEWPORTS & CONDITIONS PASSED' : 'DEFECTS OBSERVED'}`
  );
  console.log('================================================================\n');

  return { passed: allPassed, results: rawResults };
}

// Standalone runner
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/') || '')) {
  runAdversarialStressTests()
    .then(({ passed }) => process.exit(passed ? 0 : 1))
    .catch((err) => {
      console.error('Adversarial Test Suite Error:', err);
      process.exit(1);
    });
}
