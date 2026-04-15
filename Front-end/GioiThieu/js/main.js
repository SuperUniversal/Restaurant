/* ================================================================
   BASILICO — JavaScript Trang Giới Thiệu (GioiThieu/js/main.js)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => (p || document).querySelectorAll(s);
  const header = $('.site-header');
  const fab = $('#fab-scroll-top');

  /* 1. PRELOADER */
  const preloader=$('#preloader'),bar=$('#preloaderBar');let progress=0;
  const pi=setInterval(()=>{progress=Math.min(progress+Math.random()*15+5,92);bar.style.width=progress+'%'},150);
  function hp(){clearInterval(pi);bar.style.width='100%';setTimeout(()=>{preloader.classList.add('hidden');document.body.classList.add('loaded')},400)}
  window.addEventListener('load',hp);setTimeout(hp,4000);

  /* 2. HEADER + FAB */
  window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',scrollY>80);fab.classList.toggle('visible',scrollY>300)},{passive:true});
  fab.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  /* 3. SIDEBAR */
  const sidebar=$('#mobileSidebar'),overlay=$('#sidebarOverlay'),hamBtn=$('#hd-10');
  function openSB(){sidebar.classList.add('open');overlay.classList.add('open');document.body.style.overflow='hidden';hamBtn.setAttribute('aria-expanded','true')}
  function closeSB(){sidebar.classList.remove('open');overlay.classList.remove('open');document.body.style.overflow='';hamBtn.setAttribute('aria-expanded','false')}
  hamBtn.addEventListener('click',openSB);
  $('#sidebarClose').addEventListener('click',closeSB);
  overlay.addEventListener('click',closeSB);
  $$('.sidebar-nav a,.sidebar-cta a').forEach(a=>a.addEventListener('click',closeSB));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar.classList.contains('open'))closeSB()});

  /* 4. SCROLL REVEAL */
  const revEls=$$('.reveal-up,.reveal-left,.reveal-right,.reveal-scale');
  if('IntersectionObserver' in window){
    const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');ro.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
    revEls.forEach(el=>ro.observe(el));
  } else revEls.forEach(el=>el.classList.add('revealed'));

  /* 5. STATS COUNTER — Animation đếm số */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / duration, 1);
      // Easing: ease-out-cubic
      const eased = 1 - Math.pow(1 - ratio, 3);
      const current = Math.floor(eased * target);

      if (target >= 10000) {
        el.textContent = Math.floor(current / 1000).toLocaleString('vi-VN') + '.' + String(current % 1000).padStart(3, '0').slice(0, 3);
        if (ratio >= 1) el.textContent = target.toLocaleString('vi-VN');
      } else {
        el.textContent = current.toLocaleString('vi-VN');
      }

      if (ratio < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Observe stats section
  const statNumbers = $$('.stat-number[data-target]');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => statsObserver.observe(el));
  }

  /* 6. RIPPLE */
  document.addEventListener('click',e=>{
    const btn=e.target.closest('.btn');if(!btn)return;
    const r=document.createElement('span');r.className='btn-ripple';
    const rect=btn.getBoundingClientRect();const s=Math.max(rect.width,rect.height);
    Object.assign(r.style,{width:s+'px',height:s+'px',left:(e.clientX-rect.left-s/2)+'px',top:(e.clientY-rect.top-s/2)+'px'});
    btn.appendChild(r);r.addEventListener('animationend',()=>r.remove());
  });
});
