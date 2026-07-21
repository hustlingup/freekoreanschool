/* Centralized AdSense pushes — one place, visibility-guarded (adsense/GUIDE.md §7.3).
   Zones are inserted by scripts/inject-ad-zones.cjs with no inline push.
   Dynamic renderers call window.KSAds.push() after
   inserting new .ad-zone slots. */
(function () {
  'use strict';
  function pushVisibleAds() {
    var slots = document.querySelectorAll('.ad-zone .adsbygoogle');
    for (var i = 0; i < slots.length; i++) {
      var ins = slots[i];
      if (ins.getAttribute('data-ad-status') !== null) continue; // already rendered
      if (ins.dataset.adPushed === '1') continue;                 // never re-push
      if (ins.offsetParent === null) continue;                    // hidden (e.g. rail <1500px)
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        ins.dataset.adPushed = '1';
      } catch (e) { /* AdSense not ready / blocked — leave zone collapsed */ }
    }
  }
  window.KSAds = { push: pushVisibleAds };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pushVisibleAds);
  } else {
    pushVisibleAds();
  }
})();
