/* ============================================================
   loader.js — SVIA Page Loader
   Style: Circular spinning ring around logo (white background)
   Shows on every page, auto-hides after page loads
   ============================================================ */

(function () {

  const logoPath = '/assets/images/logo.png';

  // ── Inject CSS ──
  const style = document.createElement('style');
  style.textContent = `
    #svia-loader {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 0.5s ease;
    }
    #svia-loader.hide {
      opacity: 0;
      pointer-events: none;
    }

    /* Ring container */
    .svia-ring-wrap {
      position: relative;
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    /* Spinning SVG */
    .svia-ring-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      animation: sviaSpinRing 1.4s linear infinite;
    }
    @keyframes sviaSpinRing {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* Logo inside ring */
    .svia-ring-logo {
      width: 96px;
      height: 96px;
      object-fit: contain;
      position: relative;
      z-index: 2;
    }

    /* Name */
    .svia-loader-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;
      font-weight: 800;
      color: #1565C0;
      text-align: center;
      line-height: 1.15;
      margin-bottom: 4px;
    }
    .svia-loader-sub {
      font-family: 'Inter', Arial, sans-serif;
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #8A93A8;
      text-align: center;
      margin-bottom: 16px;
    }

    /* Bouncing dots */
    .svia-dots {
      display: flex;
      gap: 7px;
      align-items: center;
      justify-content: center;
    }
    .svia-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #F57C00;
      animation: sviaBounce 1.2s ease-in-out infinite;
    }
    .svia-dot:nth-child(2) { animation-delay: 0.2s; background: #1565C0; }
    .svia-dot:nth-child(3) { animation-delay: 0.4s; background: #2E7D32; }
    @keyframes sviaBounce {
      0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
      40%           { transform: scale(1.2); opacity: 1; }
    }

    @media (max-width: 480px) {
      .svia-ring-wrap { width: 110px; height: 110px; }
      .svia-ring-logo { width: 76px; height: 76px; }
      .svia-loader-name { font-size: 1.1rem; }
    }
  `;
  document.head.appendChild(style);

  // ── Inject HTML ──
  const loader = document.createElement('div');
  loader.id = 'svia-loader';
  loader.innerHTML = `
    <div class="svia-ring-wrap">
      <svg class="svia-ring-svg" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="64" stroke="#EEF1F8" stroke-width="6"/>
        <circle cx="70" cy="70" r="64"
          stroke="url(#loaderGrad)"
          stroke-width="6"
          stroke-linecap="round"
          stroke-dasharray="402"
          stroke-dashoffset="300"/>
        <defs>
          <linearGradient id="loaderGrad" x1="0" y1="0" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stop-color="#F57C00"/>
            <stop offset="50%"  stop-color="#1565C0"/>
            <stop offset="100%" stop-color="#F57C00" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
      <img src="${logoPath}" alt="SVIA" class="svia-ring-logo" />
    </div>
    <div class="svia-loader-name">Shine Village</div>
    <div class="svia-loader-sub">International Academy</div>
    <div class="svia-dots">
      <div class="svia-dot"></div>
      <div class="svia-dot"></div>
      <div class="svia-dot"></div>
    </div>
  `;

  // Lock scroll
  document.documentElement.style.overflow = 'hidden';

  // Prepend to body
  if (document.body) {
    document.body.prepend(loader);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.prepend(loader));
  }

  // ── Hide function ──
  function hideLoader() {
    const el = document.getElementById('svia-loader');
    if (!el || el.classList.contains('hide')) return;
    el.classList.add('hide');
    document.documentElement.style.overflow = '';
    setTimeout(() => { if (el && el.parentNode) el.remove(); }, 550);
  }

  // Hide when everything is fully loaded
  window.addEventListener('load', function () {
    setTimeout(hideLoader, 350);
  });

  // Safety fallback — force hide after 4s no matter what
  setTimeout(hideLoader, 4000);

})();
