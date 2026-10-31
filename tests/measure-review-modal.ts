/**
 * Direct Geometry Measurement for Review Modal Inputs and Drawer Nodes
 */

import React from 'react';
import {
  executeInChrome,
  renderComponentToString
} from './helpers';

export async function measureReviewModalAndDrawer() {
  console.log('\n--- Measuring Review Modal & Drawer Rendered Geometry ---');

  // Exact markup from ReviewsSection.tsx modal and Header.tsx drawer
  const testFragment = `
    <div id="drawer-container" class="lg:hidden bg-white border-b border-[#E8E2D5] px-6 py-6 space-y-4 shadow-xl">
      <nav class="flex flex-col space-y-1 text-base font-medium text-[#202923]">
        <a id="d-link-1" href="#services" class="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors">Services Menu</a>
        <a id="d-link-2" href="#transformations" class="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors">Before &amp; After Transformations</a>
        <a id="d-link-3" href="#safety" class="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors">Comfort &amp; Safety Policies</a>
        <a id="d-link-4" href="#pricing" class="py-3 px-3 min-h-[44px] flex items-center rounded-xl hover:bg-[#EEF4EE] hover:text-[#183D32] transition-colors">Pricing &amp; Quote Estimator</a>
      </nav>
      <div class="pt-4 border-t border-[#E8E2D5] space-y-3">
        <a id="d-call" href="tel:+18005557297" class="w-full min-h-[44px] py-3 px-4 bg-[#EEF4EE] text-[#183D32] rounded-xl text-sm font-semibold flex items-center justify-center gap-2">Call Salon</a>
        <button id="d-book" type="button" class="w-full min-h-[44px] py-3.5 px-4 bg-[#183D32] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm">Book Your Appointment</button>
      </div>
    </div>

    <div id="review-modal-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div id="review-modal-dialog" class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DCE8DC] shadow-2xl relative">
        <button id="rm-close" type="button" class="absolute top-4 right-4 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#6A786E] hover:text-[#202923] p-1.5 rounded-full hover:bg-[#FAF8F3]" aria-label="Close review dialog">X</button>
        <h3 class="text-2xl font-bold text-[#183D32] mb-1">Share Your Pet's Experience</h3>
        <form class="space-y-4">
          <div>
            <label class="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">Your Name *</label>
            <input id="rm-input-name" type="text" required placeholder="e.g. Jessica Sterling" class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">Pet Name</label>
              <input id="rm-input-petname" type="text" placeholder="e.g. Charlie" class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]" />
            </div>
            <div>
              <label class="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">Pet Breed</label>
              <input id="rm-input-breed" type="text" placeholder="e.g. Mini Bernedoodle" class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]" />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">Pet Category</label>
              <select id="rm-select-cat" class="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"><option>Dog</option></select>
            </div>
            <div>
              <label class="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">Star Rating</label>
              <div class="flex items-center gap-1.5 pt-1">
                <button id="rm-star-1" type="button" class="min-w-[44px] min-h-[44px] flex items-center justify-center text-2xl" aria-label="1 star rating">★</button>
              </div>
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold uppercase tracking-wider text-[#6A786E] block mb-1">Your Grooming Experience *</label>
            <textarea id="rm-textarea" required rows="3" placeholder="Tell us about the groomer..." class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183D32]"></textarea>
          </div>
          <button id="rm-submit" type="submit" class="w-full min-h-[44px] py-3 bg-[#183D32] text-white text-sm font-semibold rounded-xl flex items-center justify-center">Publish Verified Review</button>
        </form>
      </div>
    </div>
  `;

  const clientEval = `function(win, doc, vpWidth) {
    function measure(id) {
      var el = doc.getElementById(id);
      if (!el) return null;
      var r = el.getBoundingClientRect();
      var comp = win.getComputedStyle(el);
      return {
        id: id,
        width: Math.round(r.width * 10) / 10,
        height: Math.round(r.height * 10) / 10,
        minHeight: comp.minHeight,
        minWidth: comp.minWidth,
        overflowY: comp.overflowY,
        meetsStandard: (r.height >= 43.5 || parseFloat(comp.minHeight) >= 44) && (r.width >= 43.5 || parseFloat(comp.minWidth) >= 44)
      };
    }

    var overlay = doc.getElementById('review-modal-overlay');
    var dialog = doc.getElementById('review-modal-dialog');
    var overlayComp = win.getComputedStyle(overlay);
    var dialogRect = dialog.getBoundingClientRect();

    return {
      viewport: vpWidth,
      drawerLink1: measure('d-link-1'),
      drawerCall: measure('d-call'),
      drawerBook: measure('d-book'),
      reviewClose: measure('rm-close'),
      reviewInputName: measure('rm-input-name'),
      reviewInputPetName: measure('rm-input-petname'),
      reviewInputBreed: measure('rm-input-breed'),
      reviewSelectCategory: measure('rm-select-cat'),
      reviewStar1: measure('rm-star-1'),
      reviewSubmit: measure('rm-submit'),
      reviewDialogDimensions: {
        width: Math.round(dialogRect.width),
        height: Math.round(dialogRect.height)
      },
      overlayOverflowY: overlayComp.overflowY
    };
  }`;

  const res = await executeInChrome([375, 390], testFragment, clientEval);

  console.log('MEASUREMENT REPORT at 375px:');
  console.log(JSON.stringify(res[375], null, 2));

  return res;
}

measureReviewModalAndDrawer().catch(console.error);
