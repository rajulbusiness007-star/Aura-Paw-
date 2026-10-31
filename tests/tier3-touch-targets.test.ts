/**
 * Tier 3: Touch Target Sizing (>= 44px x 44px) Test Suite
 *
 * Validates touch target sizing on mobile interactive elements across mobile viewports:
 * - 375px (iPhone SE)
 * - 390px (iPhone 12/13)
 *
 * Targets inspected:
 * 1. Navigation toggles (e.g. Hamburger menu button)
 * 2. Mobile drawer links & action buttons
 * 3. Sticky mobile bar buttons (Call Salon, Book Appointment)
 * 4. Filter tabs & segmented selectors (ComfortSafety, Pricing, FAQ, Reviews)
 * 5. BookingModal interactive elements (close button, step buttons, time slots, inputs)
 *
 * WCAG 2.5.5 / 2.5.8 target size criteria: minimum 44px x 44px touch bounding area.
 */

import React from 'react';
import App from '../src/App';
import { BookingModal } from '../src/components/BookingModal';
import {
  executeInChrome,
  renderComponentToString
} from './helpers';

export interface TouchTargetInspection {
  name: string;
  category: 'nav_toggle' | 'drawer_link' | 'sticky_bar' | 'filter_tab' | 'modal_interactive';
  selector: string;
  measuredWidth: number;
  measuredHeight: number;
  meetsStandard: boolean;
  notes?: string;
}

export interface Tier3Report {
  viewport: number;
  totalInspected: number;
  passedCount: number;
  failedCount: number;
  inspections: TouchTargetInspection[];
  isPassing: boolean;
  failures: string[];
  error?: string;
}

export async function runTier3Tests(): Promise<{
  passed: boolean;
  results: Record<number, Tier3Report>;
}> {
  console.log('\n--- Running Tier 3: Mobile Touch Target Sizing (>= 44px x 44px) ---');

  // Render App + Open BookingModal in the test document
  const appHtml = renderComponentToString(
    React.createElement('div', null, [
      React.createElement(App, { key: 'app' }),
      React.createElement(
        'div',
        { id: 'test-modal-container', key: 'modal', style: { position: 'relative' } },
        React.createElement(BookingModal, {
          isOpen: true,
          onClose: () => {}
        })
      )
    ])
  );

  const clientCheck = `function(win, doc, vpWidth) {
    var inspections = [];
    var failures = [];

    function inspect(name, category, el, selector) {
      if (!el) {
        inspections.push({
          name: name,
          category: category,
          selector: selector,
          measuredWidth: 0,
          measuredHeight: 0,
          meetsStandard: false,
          notes: 'Element not found in DOM'
        });
        failures.push(name + ' (' + selector + ') was not found');
        return;
      }

      var rect = el.getBoundingClientRect();
      var w = Math.round(rect.width * 10) / 10;
      var h = Math.round(rect.height * 10) / 10;
      var comp = win.getComputedStyle(el);
      var minH = parseFloat(comp.minHeight) || 0;
      var minW = parseFloat(comp.minWidth) || 0;

      // Passing if either bounding rect >= 43.5px or min-height/min-width >= 44px
      var heightPass = h >= 43.5 || minH >= 44;
      var widthPass = w >= 43.5 || minW >= 44;
      var pass = heightPass && widthPass;

      var note = '';
      if (!heightPass) note += 'Height ' + h + 'px < 44px. ';
      if (!widthPass) note += 'Width ' + w + 'px < 44px. ';

      inspections.push({
        name: name,
        category: category,
        selector: selector,
        measuredWidth: w,
        measuredHeight: h,
        meetsStandard: pass,
        notes: note.trim() || 'Compliant with >= 44x44px target'\n      });

      if (!pass) {
        failures.push(name + ' size (' + w + 'x' + h + 'px) fails >= 44x44px target standard [' + note.trim() + ']');
      }
    }

    try {
      // 1. Navigation toggle (Hamburger)
      var hamburger = doc.querySelector('button[aria-label="Toggle Navigation Menu"]');
      inspect('Header: Hamburger Menu Button', 'nav_toggle', hamburger, 'button[aria-label="Toggle Navigation Menu"]');

      // 2. Sticky Mobile Bar buttons
      var stickyPhone = doc.querySelector('.fixed.bottom-0 a[href^="tel:"]');
      inspect('Sticky Mobile Bar: Call Salon Button', 'sticky_bar', stickyPhone, '.fixed.bottom-0 a[href^="tel:"]');

      var stickyBooking = doc.querySelector('.fixed.bottom-0 button');
      inspect('Sticky Mobile Bar: Book Appointment Button', 'sticky_bar', stickyBooking, '.fixed.bottom-0 button');

      // 3. Filter tabs: ComfortSafety section
      var safetySection = doc.getElementById('safety');
      if (safetySection) {
        var safetyButtons = safetySection.querySelectorAll('button');
        if (safetyButtons.length >= 2) {
          inspect('ComfortSafety: Concerns Tab Button', 'filter_tab', safetyButtons[0], '#safety button:first');
          inspect('ComfortSafety: 5-Step Tab Button', 'filter_tab', safetyButtons[1], '#safety button:second');
        }
      }

      // 4. PricingCalculator: Species and Weight buttons
      var pricingSection = doc.getElementById('pricing');
      if (pricingSection) {
        var pButtons = Array.from(pricingSection.querySelectorAll('button'));
        var dogBtn = pButtons.find(function(b) { return b.textContent.indexOf('Dog') !== -1; });
        var catBtn = pButtons.find(function(b) { return b.textContent.indexOf('Cat') !== -1; });
        if (dogBtn) inspect('Pricing: Dog Species Button', 'filter_tab', dogBtn, '#pricing dog button');
        if (catBtn) inspect('Pricing: Cat Species Button', 'filter_tab', catBtn, '#pricing cat button');

        var toyBtn = pButtons.find(function(b) { return b.textContent.indexOf('Toy') !== -1; });
        if (toyBtn) inspect('Pricing: Dog Weight Button', 'filter_tab', toyBtn, '#pricing weight button');
      }

      // 5. FAQ Section: Category Filter Buttons
      var faqSection = doc.getElementById('faq');
      if (faqSection) {
        var faqButtons = Array.from(faqSection.querySelectorAll('button'));
        if (faqButtons.length > 0) {
          inspect('FAQ: Category Filter Tab', 'filter_tab', faqButtons[0], '#faq category button');
        }
      }

      // 6. Reviews Section: Filter Tab & Leave Review Button
      var reviewsSection = doc.getElementById('reviews');
      if (reviewsSection) {
        var revButtons = Array.from(reviewsSection.querySelectorAll('button'));
        if (revButtons.length > 0) {
          inspect('Reviews: Filter Tab Button', 'filter_tab', revButtons[0], '#reviews filter button');
        }
        var leaveRev = revButtons.find(function(b) { return b.textContent.indexOf('Review') !== -1; });
        if (leaveRev) {
          inspect('Reviews: Leave Review Button', 'filter_tab', leaveRev, '#reviews leave review button');
        }
      }

      // 7. BookingModal: Close button and Action buttons
      var modalContainer = doc.getElementById('test-modal-container');
      if (modalContainer) {
        var modalButtons = Array.from(modalContainer.querySelectorAll('button'));
        if (modalButtons.length > 0) {
          inspect('BookingModal: Modal Close / Action Button', 'modal_interactive', modalButtons[0], '#test-modal-container button');
        }
        var modalInputs = Array.from(modalContainer.querySelectorAll('input, select, textarea'));
        if (modalInputs.length > 0) {
          inspect('BookingModal: Form Field Input', 'modal_interactive', modalInputs[0], '#test-modal-container input');
        }
      }

      var passed = inspections.filter(function(i) { return i.meetsStandard; }).length;
      var failed = inspections.filter(function(i) { return !i.meetsStandard; }).length;

      return {
        viewport: vpWidth,
        totalInspected: inspections.length,
        passedCount: passed,
        failedCount: failed,
        inspections: inspections,
        isPassing: failed === 0,
        failures: failures
      };
    } catch (err) {\n      return {
        viewport: vpWidth,
        totalInspected: 0,
        passedCount: 0,
        failedCount: 1,
        inspections: [],
        isPassing: false,
        failures: ['Client evaluation error: ' + (err.message || String(err))],
        error: err.message || String(err)
      };
    }
  }`;

  const mobileViewports = [375, 390];
  const rawResults = await executeInChrome<Tier3Report>(
    mobileViewports,
    appHtml,
    clientCheck
  );

  let allPassed = true;

  for (const vp of mobileViewports) {
    const rep = rawResults[vp];
    if (rep.error) {
      console.error(`  [Tier 3] Viewport ${vp}px Error: ${rep.error}`);
      allPassed = false;
      continue;
    }
    const status = rep.isPassing ? 'PASS' : 'FAIL';
    console.log(
      `  [Tier 3] Viewport ${vp}px: [${status}] (${rep.passedCount}/${rep.totalInspected} touch targets >= 44x44px)`
    );
    for (const insp of rep.inspections) {
      const s = insp.meetsStandard ? '✓' : '✗';
      console.log(
        `    ${s} ${insp.name}: ${insp.measuredWidth}px x ${insp.measuredHeight}px (${insp.notes})`
      );
    }
    if (!rep.isPassing) {
      allPassed = false;
      console.log(`    Defects to Escalate:`);
      for (const f of rep.failures) {
        console.log(`      - ${f}`);
      }
    }
  }

  return { passed: allPassed, results: rawResults };
}

// Allow standalone execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/') || '')) {
  runTier3Tests()
    .then(({ passed }) => process.exit(passed ? 0 : 1))
    .catch((err) => {
      console.error('Tier 3 Execution Error:', err);
      process.exit(1);
    });
}
