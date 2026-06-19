/* ============================================================
   SCHOOL WEBSITE — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Fixed Navbar — add shadow on scroll ── */
  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── Dynamic header height → sets body padding-top precisely ── */
  function updateHeaderHeight() {
    const topBar = document.querySelector('.top-bar');
    const navbar = document.querySelector('.main-navbar');
    let h = 0;
    if (topBar && getComputedStyle(topBar).display !== 'none') h += topBar.offsetHeight;
    if (navbar) h += navbar.offsetHeight;
    document.documentElement.style.setProperty('--header-height', h + 'px');
  }
  window.updateHeaderHeight = updateHeaderHeight; // expose globally for include.js
  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener('load', updateHeaderHeight);
  setTimeout(updateHeaderHeight, 100);
  setTimeout(updateHeaderHeight, 500);

  /* ── (Mobile nav auto-close is handled in include.js after header injects) ── */

  /* ── Set Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Hero Slider ── */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideTimer;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startTimer() {
    slideTimer = setInterval(nextSlide, 5000);
  }
  function resetTimer() {
    clearInterval(slideTimer);
    startTimer();
  }

  if (slides.length > 0) {
    startTimer();
    document.querySelector('.hero-next')?.addEventListener('click', () => { nextSlide(); resetTimer(); });
    document.querySelector('.hero-prev')?.addEventListener('click', () => { prevSlide(); resetTimer(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetTimer(); });
    });
  }

  /* ── Ticker Duplication ── */
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    tickerInner.innerHTML += tickerInner.innerHTML;
  }

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ── Back to Top ── */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Gallery Lightbox ── */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  let currentLightbox = 0;

  function openLightbox(index) {
    currentLightbox = index;
    lightboxImg.src = galleryItems[index].getAttribute('data-lightbox');
    lightbox?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.querySelector('.lightbox-next')?.addEventListener('click', () => {
    currentLightbox = (currentLightbox + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentLightbox].getAttribute('data-lightbox');
  });
  document.querySelector('.lightbox-prev')?.addEventListener('click', () => {
    currentLightbox = (currentLightbox - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentLightbox].getAttribute('data-lightbox');
  });
  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') document.querySelector('.lightbox-next')?.click();
    if (e.key === 'ArrowLeft') document.querySelector('.lightbox-prev')?.click();
  });

  /* ── Faculty Department Filter ── */
  const filterBtns = document.querySelectorAll('.dept-filter .btn');
  const facultyCards = document.querySelectorAll('.faculty-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const dept = this.getAttribute('data-dept');
      facultyCards.forEach(card => {
        if (dept === 'all' || card.getAttribute('data-dept') === dept) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── Notice Filter ── */
  const noticeFilterBtns = document.querySelectorAll('.filter-btn-item');
  const noticeItems = document.querySelectorAll('.notice-listing-card');
  noticeFilterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      noticeFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const cat = this.getAttribute('data-cat');
      noticeItems.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-cat') === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ── Gallery Filter ── */
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter .btn');
  const galleryMasonryItems = document.querySelectorAll('.gallery-masonry-item');
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const cat = this.getAttribute('data-cat');
      galleryMasonryItems.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-cat') === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        btn.style.background = '#2E7D32';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Add stagger delay to cards ── */
  document.querySelectorAll('.row .reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
  });

});

/* ── CSS Keyframe for filter ── */
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }';
document.head.appendChild(style);
