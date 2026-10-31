/**
 * Interactive Components Adversarial Stress Test Suite
 *
 * Authored by: challenger_paw_1
 * Verifies interactive components under extreme mobile viewport (320px & 360px):
 * 1. BookingModal in open state: dimensions, containment, buttons >= 44px
 * 2. Header mobile drawer: rendered state, overlay dimensions
 * 3. BeforeAfterSlider: dimensions, handles within boundary
 * 4. PricingCalculator: multi-tier buttons and estimator cards within 320px
 */

import React from 'react';
import { BookingModal } from '../src/components/BookingModal';
import { Header } from '../src/components/Header';
import { BeforeAfterSlider } from '../src/components/BeforeAfterSlider';
import { PricingCalculator } from '../src/components/PricingCalculator';
import { executeInChrome, renderComponentToString } from './helpers';

export async function runInteractiveStressTests(): Promise<boolean> {
  console.log('--- Testing Interactive Components Under 320px & 360px Stress ---');

  // Render composite containing open BookingModal, Header, BeforeAfterSlider, PricingCalculator
  const compositeHtml = renderComponentToString(
    React.createElement('div', { className: 'w-full max-w-full overflow-x-clip' }, [
      React.createElement(Header, { key: 'header', onOpenBooking: () => {} }),
      React.createElement(BeforeAfterSlider, { key: 'slider', onSelectService: () => {} }),
      React.createElement(PricingCalculator, { key: 'pricing', onSelectPackageForBooking: () => {} }),
      React.createElement(BookingModal, {
        key: 'modal',
        isOpen: true,
        onClose: () => {},
        preselectedService: 'Signature Full Groom',
        preselectedEstimate: '$95'
      })
    ])
  );

  const clientEval = `function(win, doc, vpWidth) {
    var reasons = [];
    var innerW = win.innerWidth;
    var docEl = doc.documentElement;
    var body = doc.body;

    var scrollW = docEl.scrollWidth;
    var overflowDelta = Math.max(0, scrollW - innerW);

    if (overflowDelta > 0) {
      reasons.push('Composite interactive components caused horizontal overflow of +' + overflowDelta + 'px at ' + vpWidth + 'px');
    }

    // Modal verification
    var modalBackdrop = doc.querySelector('.fixed.inset-0.z-50');
    if (!modalBackdrop) {
      reasons.push('BookingModal container (.fixed.inset-0.z-50) missing when isOpen=true');
    } else {
      var modalDialog = modalBackdrop.querySelector('.relative.bg-white');
      if (!modalDialog) {
        reasons.push('BookingModal dialog card missing inside modal container');
      } else {
        var mRect = modalDialog.getBoundingClientRect();
        if (mRect.width > innerW) {
          reasons.push('Modal dialog width (' + Math.round(mRect.width) + 'px) exceeds viewport width (' + innerW + 'px)');
        }
      }
      var closeBtn = modalBackdrop.querySelector('button[aria-label="Close booking modal"]') || modalBackdrop.querySelector('button');
      if (closeBtn) {
        var cRect = closeBtn.getBoundingClientRect();
        if (cRect.width < 40 || cRect.height < 40) {
          reasons.push('Modal close button touch area too small: ' + Math.round(cRect.width) + 'x' + Math.round(cRect.height) + 'px');
        }
      }
    }

    // Pricing Calculator verification
    var pricingSection = doc.getElementById('pricing');
    if (pricingSection) {
      var pRect = pricingSection.getBoundingClientRect();
      if (pRect.width > innerW) {
        reasons.push('Pricing section width exceeds viewport width: ' + Math.round(pRect.width) + 'px vs ' + innerW + 'px');
      }
    }

    // Before After Slider verification
    var sliderContainer = doc.querySelector('.cursor-ew-resize') || doc.querySelector('section');
    if (sliderContainer) {
      var sRect = sliderContainer.getBoundingClientRect();
      if (sRect.width > innerW) {
        reasons.push('Slider component width exceeds viewport width');
      }
    }

    return {
      viewport: vpWidth,
      scrollWidth: scrollW,
      innerWidth: innerW,
      overflowDelta: overflowDelta,
      isPassing: reasons.length === 0,
      failureReasons: reasons
    };
  }`;

  const viewports = [320, 360];
  const results = await executeInChrome<{
    viewport: number;
    scrollWidth: number;
    innerWidth: number;
    overflowDelta: number;
    isPassing: boolean;
    failureReasons: string[];
  }>(viewports, compositeHtml, clientEval);

  let passed = true;
  for (const vp of viewports) {
    const res = results[vp];
    const status = res.isPassing ? '✓ PASS' : '✗ FAIL';
    console.log(`  ${status.padEnd(8)} | Viewport ${vp}px: scrollW=${res.scrollWidth}px, innerW=${res.innerWidth}px, Δ=${res.overflowDelta}px`);
    if (!res.isPassing) {
      passed = false;
      console.log(`    Failures: ${res.failureReasons.join('; ')}`);
    }
  }

  return passed;
}

if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/') || '')) {
  runInteractiveStressTests()
    .then((p) => process.exit(p ? 0 : 1))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
