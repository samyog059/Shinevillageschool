/* ============================================================
   include.js — Loads shared header & footer into every page
   ============================================================
   USAGE in each HTML page, add these placeholders where the
   header/footer should appear:

     <div id="site-header"></div>
     ... page content ...
     <div id="site-footer"></div>

   And include this script BEFORE script.js and contact-info.js:
     <script src="assets/js/include.js"></script>

   IMPORTANT: Because this uses fetch(), the site must be viewed
   through a local web server (not by double-clicking the HTML
   file). See README for how to run a quick local server.
   ============================================================ */

(function () {
  function loadPartial(selector, url, callback) {
    const el = document.querySelector(selector);
    if (!el) return;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load ' + url);
        return res.text();
      })
      .then(html => {
        el.innerHTML = html;
        if (callback) callback();
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = '<p style="text-align:center;padding:1rem;color:#c00;">'
          + 'Could not load ' + url + '. Make sure you are running this site '
          + 'through a local web server (not by double-clicking the file).'
          + '</p>';
      });
  }

  function setActiveNavLink() {
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html')
      .replace('.html', '') || 'index';
    document.querySelectorAll('.main-navbar .nav-link[data-page]').forEach(link => {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  function initNavbarBehavior() {
    // Sticky navbar shadow on scroll
    const navbar = document.querySelector('.main-navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
      });
    }
    setActiveNavLink();

    // Close mobile nav when a (non-dropdown-toggle) link is clicked
    document.querySelectorAll('.main-navbar .nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        const collapseEl = document.querySelector('#mainNav');
        if (collapseEl && collapseEl.classList.contains('show') && window.bootstrap) {
          const bsCollapse = window.bootstrap.Collapse.getInstance(collapseEl)
            || new window.bootstrap.Collapse(collapseEl, { toggle: false });
          bsCollapse.hide();
        }
      });
    });

    // Measure and set header height now that navbar HTML exists
    if (typeof window.updateHeaderHeight === 'function') {
      window.updateHeaderHeight();
      setTimeout(window.updateHeaderHeight, 100);
      setTimeout(window.updateHeaderHeight, 400);
    }

    // Re-run contact-info fill for newly injected elements
    if (typeof SCHOOL_INFO !== 'undefined') {
      document.querySelectorAll('[data-info]').forEach(el => {
        const key = el.getAttribute('data-info');
        if (SCHOOL_INFO[key] !== undefined) {
          if (el.tagName === 'A') {
            if (key.toLowerCase().includes('email')) {
              el.href = 'mailto:' + SCHOOL_INFO[key];
            } else if (key.toLowerCase().includes('phone')) {
              el.href = 'tel:' + SCHOOL_INFO[key].replace(/[^0-9+]/g, '');
            } else if (['facebook','youtube','instagram','twitter','linkedin'].includes(key)) {
              el.href = SCHOOL_INFO[key];
            }
          }
          el.textContent = SCHOOL_INFO[key];
        }
      });
    }
  }

  function initFooterBehavior() {
    if (typeof SCHOOL_INFO !== 'undefined') {
      document.querySelectorAll('[data-info]').forEach(el => {
        const key = el.getAttribute('data-info');
        if (SCHOOL_INFO[key] !== undefined) {
          if (el.tagName === 'A') {
            if (key.toLowerCase().includes('email')) {
              el.href = 'mailto:' + SCHOOL_INFO[key];
            } else if (key.toLowerCase().includes('phone')) {
              el.href = 'tel:' + SCHOOL_INFO[key].replace(/[^0-9+]/g, '');
            } else if (['facebook','youtube','instagram','twitter','linkedin'].includes(key)) {
              el.href = SCHOOL_INFO[key];
            }
          }
          el.textContent = SCHOOL_INFO[key];
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadPartial('#site-header', 'partials/header.html', initNavbarBehavior);
    loadPartial('#site-footer', 'partials/footer.html', initFooterBehavior);
  });
})();
