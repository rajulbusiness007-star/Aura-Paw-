/**
 * Tier 2: Horizontal Overflow & Scroll Checking Test Suite
 *
 * Mathematical validation that `scrollWidth <= innerWidth` across all target viewports:
 * - 375px (iPhone SE)
 * - 390px (iPhone 12/13)
 * - 768px (iPad/Tablet)
 * - 1024px (Small Desktop)
 * - 1280px (Desktop)
 *
 * Requires 0 horizontal overflow (overflowDelta === 0).
 * Scans all DOM nodes for elements protruding beyond the viewport edge without overflow containment.
 */

import React from 'react';
import App from '../src/App';
import {
  TARGET_VIEWPORTS,
  executeInChrome,
  renderComponentToString
} from './helpers';

export interface OverflowingElement {
  tag: string;
  id: string;
  className: string;
  right: number;
  width: number;
  overflowPx: number;
}

export interface Tier2ViewportReport {
  viewport: number;
  innerWidth: number;
  scrollWidth: number;
  bodyScrollWidth: number;
  overflowDelta: number;
  hasRootOverflowConstraint: boolean;
  uncontainedOffendingElements: OverflowingElement[];
  isPassing: boolean;
  failureReasons: string[];
}

export async function runTier2Tests(): Promise<{
  passed: boolean;
  results: Record<number, Tier2ViewportReport>;
}> {
  console.log('\n--- Running Tier 2: Horizontal Overflow & Scroll Checking ---');

  const appHtml = renderComponentToString(React.createElement(App));

  const clientCheck = `function(win, doc, vpWidth) {
    var reasons = [];
    var innerW = win.innerWidth;
    var docEl = doc.documentElement;
    var body = doc.body;

    var scrollW = docEl.scrollWidth;
    var bodyScrollW = body.scrollWidth;

    var overflowDelta = Math.max(0, scrollW - innerW);

    // Root container check
    var rootDiv = doc.querySelector('div.min-h-screen');
    var rootCls = rootDiv ? (rootDiv.className || '') : '';
    var hasRootConstraint = rootCls.indexOf('overflow-x-clip') !== -1 || rootCls.indexOf('overflow-x-hidden') !== -1;
    if (!hasRootConstraint) {
      reasons.push('Root container is missing overflow-x-clip / overflow-x-hidden contract');
    }

    // Helper: check if element is inside an overflow-contained ancestor
    function isOverflowContained(el) {
      var curr = el.parentElement;
      while (curr && curr !== body && curr !== docEl) {
        var style = win.getComputedStyle(curr);
        var ox = style.overflowX;
        var o = style.overflow;
        if (ox === 'hidden' || ox === 'clip' || ox === 'auto' || ox === 'scroll' ||
            o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') {
          return true;
        }
        curr = curr.parentElement;
      }
      return false;
    }

    // Uncontained offending element scanner
    var uncontainedOffending = [];
    var allElements = Array.from(doc.querySelectorAll('*'));
    for (var i = 0; i < allElements.length; i++) {
      var el = allElements[i];
      var tag = el.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'head' || tag === 'html' || tag === 'body') continue;

      var rect = el.getBoundingClientRect();
      // Tolerance for subpixel anti-aliasing / layout rounding
      if (rect.right > innerW + 1.5 && rect.width > 0) {
        if (!isOverflowContained(el)) {
          uncontainedOffending.push({
            tag: tag,
            id: el.id || '',
            className: (el.className || '').toString().slice(0, 60),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            overflowPx: Math.round(rect.right - innerW)
          });
        }
      }
    }

    // Primary mathematical requirement: scrollWidth <= innerWidth (overflowDelta === 0)
    if (overflowDelta > 0) {
      reasons.push('Mathematical overflow detected: scrollWidth (' + scrollW + 'px) > innerWidth (' + innerW + 'px). Overflow: +' + overflowDelta + 'px');
    }

    if (bodyScrollW > innerW) {
      reasons.push('Body scrollWidth (' + bodyScrollW + 'px) exceeds viewport innerWidth (' + innerW + 'px)');
    }

    if (uncontainedOffending.length > 0) {
      reasons.push(uncontainedOffending.length + ' uncontained element(s) protrude beyond viewport edge (max overflow: +' + uncontainedOffending[0].overflowPx + 'px on <' + uncontainedOffending[0].tag + ' class="' + uncontainedOffending[0].className + '">)');
    }

    return {
      viewport: vpWidth,
      innerWidth: innerW,
      scrollWidth: scrollW,
      bodyScrollWidth: bodyScrollW,
      overflowDelta: overflowDelta,
      hasRootOverflowConstraint: hasRootConstraint,
      uncontainedOffendingElements: uncontainedOffending.slice(0, 5),
      isPassing: reasons.length === 0,
      failureReasons: reasons
    };
  }`;

  const rawResults = await executeInChrome<Tier2ViewportReport>(
    [...TARGET_VIEWPORTS],
    appHtml,
    clientCheck
  );

  let allPassed = true;

  for (const vp of TARGET_VIEWPORTS) {
    const rep = rawResults[vp];
    const status = rep.isPassing ? 'PASS' : 'FAIL';
    console.log(
      `  [Tier 2] Viewport ${vp}px: [${status}] (innerWidth: ${rep.innerWidth}px, scrollWidth: ${rep.scrollWidth}px, overflowDelta: ${rep.overflowDelta}px, rootConstraint: ${rep.hasRootOverflowConstraint})`
    );
    if (!rep.isPassing) {
      allPassed = false;
      console.log(`    Failures: ${rep.failureReasons.join('; ')}`);
      if (rep.uncontainedOffendingElements.length > 0) {
        console.log(`    Uncontained sample: <${rep.uncontainedOffendingElements[0].tag} class="${rep.uncontainedOffendingElements[0].className}"> (+${rep.uncontainedOffendingElements[0].overflowPx}px)`);
      }
    }
  }

  return { passed: allPassed, results: rawResults };
}

// Allow standalone execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/') || '')) {
  runTier2Tests()
    .then(({ passed }) => process.exit(passed ? 0 : 1))
    .catch((err) => {
      console.error('Tier 2 Execution Error:', err);
      process.exit(1);
    });
}
