/**
 * Empirical Challenger Stress Test Suite
 * Tests touch targets, navigation drawer accessibility, modal overlays,
 * layout shifting, and Bento UI responsiveness across mobile, tablet, and desktop viewports.
 */

import React from 'react';
import App from '../src/App';
import { Header } from '../src/components/Header';
import { BookingModal } from '../src/components/BookingModal';
import { ReviewsSection } from '../src/components/ReviewsSection';
import { TrustPillars } from '../src/components/TrustPillars';
import { PricingCalculator } from '../src/components/PricingCalculator';
import {
  executeInChrome,
  renderComponentToString
} from './helpers';

export interface StressTestReport {
  viewport: number;
  drawerTests: {
    hamburgerTarget: { width: number; height: number; pass: boolean };
    hasAriaExpanded: boolean;
    drawerLinksCount: number;
    drawerLinksPass: boolean;
    drawerMinHeight: number;
    drawerActionsPass: boolean;
  };
  stickyBarTests: {
    callBtn: { width: number; height: number; pass: boolean };
    bookBtn: { width: number; height: number; pass: boolean };
  };
  pricingCalcTests: {
    speciesButtons: Array<{ text: string; width: number; height: number; pass: boolean }>;
    weightButtons: Array<{ text: string; width: number; height: number; pass: boolean }>;
    coatButtons: Array<{ text: string; width: number; height: number; pass: boolean }>;
    tierButtons: Array<{ text: string; width: number; height: number; pass: boolean }>;
    addonButtons: Array<{ text: string; width: number; height: number; pass: boolean }>;
  };
  reviewModalTests: {
    triggerBtn: { width: number; height: number; pass: boolean };
    closeBtn: { width: number; height: number; pass: boolean };
    inputs: Array<{ name: string; width: number; height: number; minHeight: number; pass: boolean }>;
    starButtons: Array<{ star: number; width: number; height: number; pass: boolean }>;
    submitBtn: { width: number; height: number; pass: boolean };
    overlayHasOverflowY: boolean;
    modalHeight: number;
  };
  bookingModalTests: {
    closeBtn: { width: number; height: number; pass: boolean };
    lookupToggle: { width: number; height: number; pass: boolean };
    step1Inputs: Array<{ name: string; width: number; height: number; minHeight: number; pass: boolean }>;
    stepButtons: Array<{ text: string; width: number; height: number; pass: boolean }>;
    overlayHasOverflowY: boolean;
    modalFitsOrScrolls: boolean;
  };
  bentoGridTests: {
    cardCount: number;
    detectedColumns: number;
    overlapsDetected: number;
    overlapPairs: string[];
    minCardWidth: number;
    minCardHeight: number;
  };
  horizontalOverflow: {
    scrollWidth: number;
    innerWidth: number;
    overflowDelta: number;
    hasOverflow: boolean;
  };
}

export async function runChallengerStressTests() {
  console.log('================================================================');
  console.log('    Aura & Paw — Challenger Empirical Stress Harness');
  console.log('================================================================');

  // Test Document: Render App + open Review Modal and open Booking Modal for exhaustive inspection
  const testHtml = renderComponentToString(
    React.createElement('div', { id: 'stress-test-root' }, [
      React.createElement(App, { key: 'app' }),
      // Container with Header that has drawer open for inspection
      React.createElement('div', { id: 'open-drawer-container', key: 'drawer-container' }, [
        React.createElement(Header, {
          key: 'drawer-header',
          onOpenBooking: () => {}
        })
      ]),
      // Container with Booking Modal open
      React.createElement('div', { id: 'open-booking-modal', key: 'booking-modal-container', style: { position: 'relative' } }, [
        React.createElement(BookingModal, {
          key: 'booking-modal',
          isOpen: true,
          onClose: () => {}
        })
      ])
    ])
  );

  const clientEvalScript = `function(win, doc, vpWidth) {
    var MIN_TARGET = 44;

    function checkTarget(el) {
      if (!el) return { width: 0, height: 0, pass: false, error: 'Element missing' };
      var r = el.getBoundingClientRect();
      var comp = win.getComputedStyle(el);
      var w = Math.round(r.width * 10) / 10;
      var h = Math.round(r.height * 10) / 10;
      var minH = parseFloat(comp.minHeight) || 0;
      var minW = parseFloat(comp.minWidth) || 0;
      var pass = (w >= 43.5 || minW >= MIN_TARGET) && (h >= 43.5 || minH >= MIN_TARGET);
      return { width: w, height: h, minHeight: minH, minWidth: minW, pass: pass };
    }

    // 1. Navigation Drawer & Hamburger
    var hamburger = doc.querySelector('header button[aria-label="Toggle Navigation Menu"]');
    var hamburgerTarget = checkTarget(hamburger);
    var hasAriaExpanded = hamburger ? hamburger.hasAttribute('aria-expanded') : false;

    // Simulate drawer links check by querying mobile drawer links inside header
    var drawerLinks = Array.from(doc.querySelectorAll('header .lg\\\\:hidden nav a'));
    var drawerLinksPass = true;
    var minDrawerH = 999;
    drawerLinks.forEach(function(l) {
      var t = checkTarget(l);
      if (t.height < minDrawerH) minDrawerH = t.height;
      if (!t.pass) drawerLinksPass = false;
    });

    var drawerCallBtn = doc.querySelector('header .lg\\\\:hidden a[href^="tel:"]');
    var drawerBookBtn = doc.querySelector('header .lg\\\\:hidden button');
    var drawerActionsPass = checkTarget(drawerCallBtn).pass && checkTarget(drawerBookBtn).pass;

    // 2. Sticky Mobile Bar
    var stickyBarCall = doc.querySelector('.fixed.bottom-0 a[href^="tel:"]');
    var stickyBarBook = doc.querySelector('.fixed.bottom-0 button');

    // 3. Pricing Calculator Controls
    var pricingSection = doc.querySelector('#pricing');
    var speciesBtns = [];
    var weightBtns = [];
    var coatBtns = [];
    var tierBtns = [];
    var addonBtns = [];

    if (pricingSection) {
      var allPButtons = Array.from(pricingSection.querySelectorAll('button'));
      allPButtons.forEach(function(btn) {
        var txt = (btn.textContent || '').trim();
        var t = checkTarget(btn);
        if (txt === 'Dog' || txt === 'Cat') {
          speciesBtns.push({ text: txt, width: t.width, height: t.height, pass: t.pass });
        } else if (['Toy', 'Small', 'Medium', 'Large', 'Giant'].some(function(w){ return txt.indexOf(w) !== -1; })) {
          weightBtns.push({ text: txt.split('\\n')[0].trim(), width: t.width, height: t.height, pass: t.pass });
        } else if (['Essential', 'Signature', 'Presidential'].some(function(tier){ return txt.indexOf(tier) !== -1; })) {
          tierBtns.push({ text: txt.split('\\n')[0].trim(), width: t.width, height: t.height, pass: t.pass });
        } else if (['Short', 'Medium', 'Double', 'Curly'].some(function(c){ return txt.indexOf(c) !== -1; })) {
          coatBtns.push({ text: txt.split('\\n')[0].trim(), width: t.width, height: t.height, pass: t.pass });
        } else if (btn.getAttribute('role') === 'checkbox' || btn.querySelector('svg')) {
          addonBtns.push({ text: txt.slice(0, 20), width: t.width, height: t.height, pass: t.pass });
        }
      });
    }

    // 4. Review Section & Modal Inspection
    var reviewSection = doc.querySelector('#reviews');
    var reviewTrigger = reviewSection ? reviewSection.querySelector('button') : null;
    var reviewTriggerTarget = checkTarget(reviewTrigger);

    // Review Modal checks (rendered if isModalOpen is triggered, or inspect component markup)
    var reviewCloseBtn = doc.querySelector('button[aria-label="Close review dialog"]');
    var reviewCloseTarget = checkTarget(reviewCloseBtn);
    var reviewInputs = [];
    var reviewForm = doc.querySelector('#reviews form');
    if (reviewForm) {
      var inputs = Array.from(reviewForm.querySelectorAll('input, select, textarea'));
      inputs.forEach(function(inp) {
        var t = checkTarget(inp);
        reviewInputs.push({
          name: inp.getAttribute('placeholder') || inp.tagName,
          width: t.width,
          height: t.height,
          minHeight: t.minHeight,
          pass: t.pass
        });
      });
    }

    var reviewStars = [];
    var starBtns = doc.querySelectorAll('button[aria-label*="star rating"]');
    Array.from(starBtns).forEach(function(sb, idx) {
      var t = checkTarget(sb);
      reviewStars.push({ star: idx + 1, width: t.width, height: t.height, pass: t.pass });
    });

    var reviewSubmit = doc.querySelector('#reviews form button[type="submit"]');
    var reviewSubmitTarget = checkTarget(reviewSubmit);

    var reviewOverlay = doc.querySelector('#reviews .fixed.inset-0');
    var reviewOverlayHasOverflowY = reviewOverlay ? (win.getComputedStyle(reviewOverlay).overflowY === 'auto' || win.getComputedStyle(reviewOverlay).overflowY === 'scroll') : false;
    var reviewModalBox = reviewOverlay ? reviewOverlay.querySelector('div') : null;
    var reviewModalHeight = reviewModalBox ? reviewModalBox.getBoundingClientRect().height : 0;

    // 5. Booking Modal Checks
    var bookingContainer = doc.querySelector('#open-booking-modal');
    var bClose = bookingContainer ? bookingContainer.querySelector('button[aria-label="Close booking modal"]') : null;
    var bCloseTarget = checkTarget(bClose);

    var lookupToggle = bookingContainer ? bookingContainer.querySelector('button') : null;
    var lookupToggleTarget = checkTarget(lookupToggle);

    var bInputs = [];
    if (bookingContainer) {
      var inps = Array.from(bookingContainer.querySelectorAll('input, select, textarea'));
      inps.forEach(function(inp) {
        var t = checkTarget(inp);
        bInputs.push({
          name: inp.getAttribute('placeholder') || inp.getAttribute('name') || inp.tagName,
          width: t.width,
          height: t.height,
          minHeight: t.minHeight,
          pass: t.pass
        });
      });
    }

    var bStepButtons = [];
    if (bookingContainer) {
      var btns = Array.from(bookingContainer.querySelectorAll('button'));
      btns.forEach(function(btn) {
        var txt = (btn.textContent || '').trim();
        if (txt && (txt.indexOf('Continue') !== -1 || txt.indexOf('Step') !== -1 || txt.indexOf('Confirm') !== -1)) {
          var t = checkTarget(btn);
          bStepButtons.push({ text: txt, width: t.width, height: t.height, pass: t.pass });
        }
      });
    }

    var bOverlay = bookingContainer ? bookingContainer.querySelector('.fixed.inset-0') : null;
    var bOverlayHasOverflowY = bOverlay ? (win.getComputedStyle(bOverlay).overflowY === 'auto' || win.getComputedStyle(bOverlay).overflowY === 'scroll') : false;
    var bModalBox = bOverlay ? bOverlay.querySelector('.relative.bg-white') : null;
    var bModalFitsOrScrolls = bOverlayHasOverflowY;

    // 6. Bento Grid Architecture
    var bentoContainer = doc.querySelector('#bento-showcase .grid');
    var bentoCards = bentoContainer ? Array.from(bentoContainer.children) : [];
    var detectedCols = 1;
    var overlapsDetected = 0;
    var overlapPairs = [];
    var minCardW = 9999;
    var minCardH = 9999;

    if (bentoCards.length > 0) {
      var xPositions = {};
      bentoCards.forEach(function(c) {
        var r = c.getBoundingClientRect();
        var left = Math.round(r.left);
        xPositions[left] = (xPositions[left] || 0) + 1;
        if (r.width < minCardW) minCardW = r.width;
        if (r.height < minCardH) minCardH = r.height;
      });
      detectedCols = Object.keys(xPositions).length;

      // 2D collision detection between all card pairs
      for (var i = 0; i < bentoCards.length; i++) {
        var r1 = bentoCards[i].getBoundingClientRect();
        for (var j = i + 1; j < bentoCards.length; j++) {
          var r2 = bentoCards[j].getBoundingClientRect();
          var overlap = !(
            r1.right <= r2.left + 1 ||
            r1.left >= r2.right - 1 ||
            r1.bottom <= r2.top + 1 ||
            r1.top >= r2.bottom - 1
          );
          if (overlap) {
            overlapsDetected++;
            overlapPairs.push('Card ' + (i + 1) + ' overlaps Card ' + (j + 1));
          }
        }
      }
    }

    // 7. Horizontal Overflow Check
    var scrollW = doc.documentElement.scrollWidth;
    var innerW = win.innerWidth;
    var overflowDelta = Math.max(0, scrollW - innerW);

    return {
      viewport: vpWidth,
      drawerTests: {
        hamburgerTarget: hamburgerTarget,
        hasAriaExpanded: hasAriaExpanded,
        drawerLinksCount: drawerLinks.length,
        drawerLinksPass: drawerLinksPass,
        drawerMinHeight: minDrawerH,
        drawerActionsPass: drawerActionsPass
      },
      stickyBarTests: {
        callBtn: checkTarget(stickyBarCall),
        bookBtn: checkTarget(stickyBarBook)
      },
      pricingCalcTests: {
        speciesButtons: speciesBtns,
        weightButtons: weightBtns,
        coatButtons: coatBtns,
        tierButtons: tierBtns,
        addonButtons: addonBtns
      },
      reviewModalTests: {
        triggerBtn: reviewTriggerTarget,
        closeBtn: reviewCloseTarget,
        inputs: reviewInputs,
        starButtons: reviewStars,
        submitBtn: reviewSubmitTarget,
        overlayHasOverflowY: reviewOverlayHasOverflowY,
        modalHeight: reviewModalHeight
      },
      bookingModalTests: {
        closeBtn: bCloseTarget,
        lookupToggle: lookupToggleTarget,
        step1Inputs: bInputs,
        stepButtons: bStepButtons,
        overlayHasOverflowY: bOverlayHasOverflowY,
        modalFitsOrScrolls: bModalFitsOrScrolls
      },
      bentoGridTests: {
        cardCount: bentoCards.length,
        detectedColumns: detectedCols,
        overlapsDetected: overlapsDetected,
        overlapPairs: overlapPairs,
        minCardWidth: Math.round(minCardW * 10) / 10,
        minCardHeight: Math.round(minCardH * 10) / 10
      },
      horizontalOverflow: {
        scrollWidth: scrollW,
        innerWidth: innerW,
        overflowDelta: overflowDelta,
        hasOverflow: overflowDelta > 1
      }
    };
  }`;

  const viewportsToTest = [320, 375, 390, 430, 768, 1024, 1280];
  const results = await executeInChrome<StressTestReport>(
    viewportsToTest,
    testHtml,
    clientEvalScript
  );

  console.log('\n--- Challenger Stress Test Results Across 7 Viewports ---');
  let overallPass = true;
  const criticalFindings: string[] = [];

  for (const vp of viewportsToTest) {
    const r = results[vp];
    console.log(`\n================ Viewport ${vp}px ================`);
    
    // Overflow
    if (r.horizontalOverflow.hasOverflow) {
      overallPass = false;
      const msg = `[VP ${vp}px] Horizontal Overflow detected: scrollWidth=${r.horizontalOverflow.scrollWidth} > innerWidth=${r.horizontalOverflow.innerWidth} (delta: ${r.horizontalOverflow.overflowDelta}px)`;
      criticalFindings.push(msg);
      console.log(`  ✗ OVERFLOW: ${msg}`);
    } else {
      console.log(`  ✓ OVERFLOW: Zero horizontal overflow (scrollWidth: ${r.horizontalOverflow.scrollWidth}px <= innerWidth: ${r.horizontalOverflow.innerWidth}px)`);
    }

    // Bento Grid
    console.log(`  [Bento Grid] Cards: ${r.bentoGridTests.cardCount}, Columns: ${r.bentoGridTests.detectedColumns}, Overlaps: ${r.bentoGridTests.overlapsDetected}, MinWidth: ${r.bentoGridTests.minCardWidth}px, MinHeight: ${r.bentoGridTests.minCardHeight}px`);
    if (r.bentoGridTests.overlapsDetected > 0) {
      overallPass = false;
      criticalFindings.push(`[VP ${vp}px] Bento Grid Overlaps: ${r.bentoGridTests.overlapPairs.join(', ')}`);
      console.log(`    ✗ Overlaps detected!`);
    } else {
      console.log(`    ✓ Clean card geometry, 0 overlaps.`);
    }

    // Touch Targets
    if (vp <= 430) {
      console.log(`  [Mobile Touch Targets]`);
      console.log(`    - Hamburger Button: ${r.drawerTests.hamburgerTarget.width}x${r.drawerTests.hamburgerTarget.height}px (Pass: ${r.drawerTests.hamburgerTarget.pass})`);
      console.log(`    - Sticky Call: ${r.stickyBarTests.callBtn.width}x${r.stickyBarTests.callBtn.height}px (Pass: ${r.stickyBarTests.callBtn.pass})`);
      console.log(`    - Sticky Book: ${r.stickyBarTests.bookBtn.width}x${r.stickyBarTests.bookBtn.height}px (Pass: ${r.stickyBarTests.bookBtn.pass})`);
      
      if (!r.drawerTests.hamburgerTarget.pass) {
        overallPass = false;
        criticalFindings.push(`[VP ${vp}px] Hamburger touch target < 44x44px (${r.drawerTests.hamburgerTarget.width}x${r.drawerTests.hamburgerTarget.height}px)`);
      }
      if (!r.stickyBarTests.callBtn.pass || !r.stickyBarTests.bookBtn.pass) {
        overallPass = false;
        criticalFindings.push(`[VP ${vp}px] Sticky bar button < 44x44px`);
      }

      // Check Booking Modal inputs
      r.bookingModalTests.step1Inputs.forEach(function(inp) {
        if (!inp.pass) {
          overallPass = false;
          criticalFindings.push(`[VP ${vp}px] BookingModal input "${inp.name}" touch target < 44px (height: ${inp.height}px)`);
          console.log(`    ✗ BookingModal Input Fail: "${inp.name}" height=${inp.height}px`);
        }
      });

      // Accessibility: aria-expanded on hamburger
      if (!r.drawerTests.hasAriaExpanded) {
        console.log(`    ⚠ ACCESSIBILITY FINDING: Hamburger button lacks 'aria-expanded' attribute`);
      }

      // Review Modal overlay overflow-y
      if (!r.reviewModalTests.overlayHasOverflowY && r.reviewModalTests.modalHeight > 0) {
        console.log(`    ⚠ ERGONOMICS FINDING: Review submission modal overlay lacks 'overflow-y-auto' (modalHeight: ${r.reviewModalTests.modalHeight}px)`);
      }
    }
  }

  console.log('\n================================================================');
  console.log(`CHALLENGER STRESS HARNESS VERDICT: ${overallPass ? 'ALL CHECKS PASSED' : 'DEFECTS DETECTED'}`);
  console.log(`Findings count: ${criticalFindings.length}`);
  if (criticalFindings.length > 0) {
    criticalFindings.forEach(f => console.log(' - ' + f));
  }
  console.log('================================================================');

  return { results, overallPass, criticalFindings };
}

runChallengerStressTests().catch(err => {
  console.error('Stress test run failed:', err);
  process.exit(1);
});
