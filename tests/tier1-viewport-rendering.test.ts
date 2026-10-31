/**
 * Tier 1: Viewport Rendering & Layout Integrity Test Suite
 *
 * Validates layout integrity across target viewports:
 * - 375px (iPhone SE)
 * - 390px (iPhone 12/13)
 * - 768px (iPad/Tablet)
 * - 1024px (Small Desktop / Tablet Landscape)
 * - 1280px (Full Desktop)
 *
 * Verifies that all key sections and landmarks render cleanly with readable typography
 * and non-zero dimensions.
 */

import React from 'react';
import App from '../src/App';
import {
  TARGET_VIEWPORTS,
  executeInChrome,
  renderComponentToString
} from './helpers';

export interface Tier1ViewportReport {
  viewport: number;
  bodyWidth: number;
  bodyHeight: number;
  hasHeader: boolean;
  hasMain: boolean;
  hasFooter: boolean;
  sectionsFound: {
    services: boolean;
    safety: boolean;
    pricing: boolean;
    about: boolean;
    reviews: boolean;
    faq: boolean;
  };
  headingFontSizes: number[];
  bodyRendered: boolean;
  isPassing: boolean;
  failureReasons: string[];
}

export async function runTier1Tests(): Promise<{
  passed: boolean;
  results: Record<number, Tier1ViewportReport>;
}> {
  console.log('\n--- Running Tier 1: Viewport Rendering & Layout Integrity ---');

  const appHtml = renderComponentToString(React.createElement(App));

  const clientCheck = `function(win, doc, vpWidth) {
    var reasons = [];
    var body = doc.body;
    var bRect = body.getBoundingClientRect();

    var header = doc.querySelector('header');
    var main = doc.querySelector('main');
    var footer = doc.querySelector('footer');

    var services = doc.getElementById('services');
    var safety = doc.getElementById('safety');
    var pricing = doc.getElementById('pricing');
    var about = doc.getElementById('about');
    var reviews = doc.getElementById('reviews');
    var faq = doc.getElementById('faq');

    var hasHeader = !!header && header.offsetHeight > 0;
    var hasMain = !!main && main.offsetHeight > 0;
    var hasFooter = !!footer && footer.offsetHeight > 0;

    if (!hasHeader) reasons.push('Header is missing or has 0 height');
    if (!hasMain) reasons.push('Main content area is missing or has 0 height');
    if (!hasFooter) reasons.push('Footer is missing or has 0 height');

    var sectionsFound = {
      services: !!services && services.offsetHeight > 0,
      safety: !!safety && safety.offsetHeight > 0,
      pricing: !!pricing && pricing.offsetHeight > 0,
      about: !!about && about.offsetHeight > 0,
      reviews: !!reviews && reviews.offsetHeight > 0,
      faq: !!faq && faq.offsetHeight > 0
    };

    for (var sec in sectionsFound) {
      if (!sectionsFound[sec]) {
        reasons.push('Key section #' + sec + ' is missing or has 0 height');
      }
    }

    var headings = Array.from(doc.querySelectorAll('h1, h2, h3'));
    var headingFontSizes = headings.slice(0, 10).map(function(h) {
      var fs = win.getComputedStyle(h).fontSize;
      return parseFloat(fs) || 0;
    });

    var hasTinyHeadings = headingFontSizes.some(function(sz) { return sz < 16; });
    if (hasTinyHeadings) {
      reasons.push('Some major headings have computed font-size under 16px');
    }

    var bodyRendered = bRect.width > 0 && bRect.height > 1000;
    if (!bodyRendered) {
      reasons.push('Body failed to render full vertical content (height=' + bRect.height + ')');
    }

    return {
      viewport: vpWidth,
      bodyWidth: Math.round(bRect.width),
      bodyHeight: Math.round(bRect.height),
      hasHeader: hasHeader,
      hasMain: hasMain,
      hasFooter: hasFooter,
      sectionsFound: sectionsFound,
      headingFontSizes: headingFontSizes,
      bodyRendered: bodyRendered,
      isPassing: reasons.length === 0,
      failureReasons: reasons
    };
  }`;

  const rawResults = await executeInChrome<Tier1ViewportReport>(
    [...TARGET_VIEWPORTS],
    appHtml,
    clientCheck
  );

  let allPassed = true;

  for (const vp of TARGET_VIEWPORTS) {
    const rep = rawResults[vp];
    const status = rep.isPassing ? 'PASS' : 'FAIL';
    console.log(
      `  [Tier 1] Viewport ${vp}px: [${status}] (Rendered height: ${rep.bodyHeight}px, Landmarks: Header=${rep.hasHeader}, Main=${rep.hasMain}, Footer=${rep.hasFooter})`
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
  runTier1Tests()
    .then(({ passed }) => process.exit(passed ? 0 : 1))
    .catch((err) => {
      console.error('Tier 1 Execution Error:', err);
      process.exit(1);
    });
}
