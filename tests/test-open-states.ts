/**
 * Targeted Open-State Stress Test
 * Tests Navigation Drawer when open and Review Modal when open.
 */

import React, { useState } from 'react';
import { Header } from '../src/components/Header';
import { ReviewsSection } from '../src/components/ReviewsSection';
import {
  executeInChrome,
  renderComponentToString
} from './helpers';

// Helper component that renders Header with mobileMenuOpen forced open
function OpenDrawerHeader() {
  return React.createElement('div', { id: 'drawer-test-root' }, [
    React.createElement(Header, {
      key: 'header',
      onOpenBooking: () => {}
    })
  ]);
}

// We can also extract the mobile drawer markup directly to inspect its rendered geometry
export async function runOpenStateTests() {
  console.log('\n--- Running Open-State Drawer & Review Modal Tests ---');

  // We craft a test page where:
  // 1. Mobile menu button is clicked in the DOM to open the drawer
  // 2. "Leave a Verified Review" button is clicked in the DOM to open the review modal
  const appHtml = renderComponentToString(
    React.createElement('div', { id: 'interactive-root' }, [
      React.createElement(Header, { key: 'h', onOpenBooking: () => {} }),
      React.createElement(ReviewsSection, { key: 'r' })
    ])
  );

  const clientEval = `function(win, doc, vpWidth) {
    var out = {
      drawerLinks: [],
      drawerActions: [],
      drawerA11y: {},
      reviewModalInputs: [],
      reviewModalStars: [],
      reviewModalSubmit: null,
      reviewModalOverlayOverflow: ''
    };

    // 1. Click Hamburger to toggle drawer open
    var hamburger = doc.querySelector('header button[aria-label="Toggle Navigation Menu"]');
    if (hamburger) {
      hamburger.click();
    }

    // Now inspect open drawer
    var drawer = doc.querySelector('header .lg\\\\:hidden.bg-white');
    if (drawer) {
      var links = Array.from(drawer.querySelectorAll('nav a'));
      links.forEach(function(l) {
        var r = l.getBoundingClientRect();
        out.drawerLinks.push({
          text: (l.textContent || '').trim(),
          width: Math.round(r.width),
          height: Math.round(r.height),
          pass: r.height >= 43.5 && r.width >= 43.5
        });
      });

      var actions = Array.from(drawer.querySelectorAll('.pt-4 a, .pt-4 button'));
      actions.forEach(function(a) {\n        var r = a.getBoundingClientRect();
        out.drawerActions.push({
          text: (a.textContent || '').trim(),
          width: Math.round(r.width),
          height: Math.round(r.height),
          pass: r.height >= 43.5 && r.width >= 43.5
        });
      });
    }

    // Check accessibility attributes on hamburger and drawer
    out.drawerA11y = {
      hasAriaLabel: hamburger ? hamburger.getAttribute('aria-label') : null,
      hasAriaExpanded: hamburger ? hamburger.hasAttribute('aria-expanded') : false,
      hasAriaControls: hamburger ? hamburger.hasAttribute('aria-controls') : false
    };

    // 2. Click "Leave a Verified Review" button to open review modal
    var reviewBtn = null;
    var allButtons = Array.from(doc.querySelectorAll('#reviews button'));
    allButtons.forEach(function(b) {
      if ((b.textContent || '').indexOf('Leave a Verified Review') !== -1) {
        reviewBtn = b;
      }
    });

    if (reviewBtn) {
      reviewBtn.click();
    }

    var reviewModal = doc.querySelector('#reviews .fixed.inset-0');
    if (reviewModal) {
      var comp = win.getComputedStyle(reviewModal);
      out.reviewModalOverlayOverflow = comp.overflowY;

      var inputs = Array.from(reviewModal.querySelectorAll('input, select, textarea'));
      inputs.forEach(function(inp) {
        var r = inp.getBoundingClientRect();
        out.reviewModalInputs.push({
          placeholder: inp.getAttribute('placeholder') || inp.tagName,
          width: Math.round(r.width),
          height: Math.round(r.height),
          pass: r.height >= 43.5 && r.width >= 43.5
        });
      });

      var stars = Array.from(reviewModal.querySelectorAll('button[aria-label*="star rating"]'));
      stars.forEach(function(s, idx) {
        var r = s.getBoundingClientRect();
        out.reviewModalStars.push({
          star: idx + 1,
          width: Math.round(r.width),
          height: Math.round(r.height),
          pass: r.height >= 43.5 && r.width >= 43.5
        });
      });

      var submit = reviewModal.querySelector('button[type=\"submit\"]');
      if (submit) {
        var r = submit.getBoundingClientRect();
        out.reviewModalSubmit = {
          text: (submit.textContent || '').trim(),
          width: Math.round(r.width),
          height: Math.round(r.height),
          pass: r.height >= 43.5 && r.width >= 43.5
        };
      }
    }

    return out;
  }`;

  const res = await executeInChrome(
    [375, 390],
    appHtml,
    clientEval
  );

  console.log('Results at 375px:');
  console.log(JSON.stringify(res[375], null, 2));

  console.log('Results at 390px:');
  console.log(JSON.stringify(res[390], null, 2));

  return res;
}

runOpenStateTests().catch(err => {
  console.error(err);
  process.exit(1);
});
