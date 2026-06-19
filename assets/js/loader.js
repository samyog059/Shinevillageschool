/* ============================================================
   loader.js — Splash screen loader for SVIA
   Plays once per session (won't show again on page navigation)
   ============================================================ */

(function () {
  // Only show on first visit of the session
  // Comment out the if/sessionStorage lines to show on every page load
  if (sessionStorage.getItem('svia_loaded')) return;
  sessionStorage.setItem('svia_loaded', '1');

  // Inject loader HTML
  const loader = document.createElement('div');
  loader.id = 'svia-loader';
  loader.innerHTML = `
    <div class="svia-loader-inner">

      <!-- Animated ring -->
      <div class="svia-ring">
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>
          <circle cx="80" cy="80" r="72" stroke="url(#ringGrad)" stroke-width="3"
                  stroke-linecap="round" stroke-dasharray="452" stroke-dashoffset="452"
                  class="svia-ring-arc"/>
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#F57C00"/>
              <stop offset="100%" stop-color="#FF9800"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Logo -->
      <div class="svia-logo-wrap">
        <img src="assets/images/logo.png" alt="Shine Village International Academy" class="svia-logo" />
      </div>

      <!-- School name -->
      <div class="svia-name">
        <span class="svia-name-shine">Shine Village</span>
        <span class="svia-name-academy">International Academy</span>
      </div>

      <!-- Tagline -->
      <div class="svia-tagline">
        <span class="svia-tagline-text">✦ Shine For Children Shine ✦</span>
      </div>

      <!-- ISO badge -->
      <div class="svia-iso">
        <i class="fas fa-award"></i> ISO 21001:2018 Certified
      </div>

      <!-- Progress bar -->
      <div class="svia-progress-wrap">
        <div class="svia-progress-bar" id="sviaProgress"></div>
      </div>

      <!-- Loading text -->
      <div class="svia-loading-text" id="sviaLoadingText">Preparing your experience…</div>

    </div>
  `;
  document.body.prepend(loader);
  document.body.style.overflow = 'hidden';

  // Loading messages sequence
  const messages = [
    'Preparing your experience…',
    'Loading school resources…',
    'Almost ready…',
    'Welcome to SVIA!'
  ];
  let msgIndex = 0;
  const textEl = document.getElementById('sviaLoadingText');
  const progressEl = document.getElementById('sviaProgress');

  // Progress animation
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress > 100) progress = 100;
    progressEl.style.width = progress + '%';

    // Update message based on progress
    if (progress > 25  && msgIndex === 0) { msgIndex = 1; textEl.textContent = messages[1]; }
    if (progress > 60  && msgIndex === 1) { msgIndex = 2; textEl.textContent = messages[2]; }
    if (progress > 90  && msgIndex === 2) { msgIndex = 3; textEl.textContent = messages[3]; }

    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(hideLoader, 600);
    }
  }, 220);

  function hideLoader() {
    loader.classList.add('svia-loader-hide');
    document.body.style.overflow = '';
    setTimeout(() => loader.remove(), 700);
  }

  // Safety fallback — always hide after 4s max
  setTimeout(() => {
    clearInterval(progressInterval);
    hideLoader();
  }, 4000);
})();
