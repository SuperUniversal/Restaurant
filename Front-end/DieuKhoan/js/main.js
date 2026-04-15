/* ============================================================
   BASILICO — Legal Page JS (Shared: BaoMat + DieuKhoan)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* 1. PRELOADER */
  const pl = document.getElementById('preloader');
  const plBar = document.getElementById('preloaderBar');
  if (pl && plBar) {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) { p = 100; clearInterval(iv); }
      plBar.style.width = p + '%';
      if (p >= 100) setTimeout(() => { pl.classList.add('hidden'); document.body.style.overflow = ''; }, 400);
    }, 120);
  }

  /* 2. HEADER SCROLL */
  const hdr = document.querySelector('.site-header');
  if (hdr) {
    window.addEventListener('scroll', () => {
      hdr.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* 3. MOBILE SIDEBAR */
  const hb = document.getElementById('hd-10');
  const sb = document.getElementById('mobileSidebar');
  const so = document.getElementById('sidebarOverlay');
  const sc = document.getElementById('sidebarClose');
  if (hb && sb && so && sc) {
    const openSidebar = () => { sb.classList.add('open'); so.classList.add('active'); hb.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const closeSidebar = () => { sb.classList.remove('open'); so.classList.remove('active'); hb.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
    hb.addEventListener('click', openSidebar);
    sc.addEventListener('click', closeSidebar);
    so.addEventListener('click', closeSidebar);
  }

  /* 4. REVEAL ANIMATIONS */
  const revEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .animate-entry');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); ro.unobserve(e.target); }
      });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    revEls.forEach(el => ro.observe(el));
  } else {
    revEls.forEach(el => el.classList.add('revealed'));
  }

  /* 5. SCROLL TO TOP FAB */
  const fab = document.getElementById('fab-scroll-top');
  if (fab) {
    window.addEventListener('scroll', () => {
      fab.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* 6. SMOOTH SCROLL FOR ANCHOR LINKS */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id && id !== '#') {
        e.preventDefault();
        const target = document.querySelector(id);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
