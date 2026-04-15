/* ================================================================
   BASILICO — JavaScript Trang Liên Hệ (LienHe/js/main.js)
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

  /* 5. TOAST */
  const toastContainer=$('#toastContainer');
  function showToast(msg,type='info'){
    const icons={success:'bi-check-circle-fill',error:'bi-exclamation-triangle-fill',info:'bi-info-circle-fill'};
    const t=document.createElement('div');t.className='toast-item '+type;
    t.innerHTML=`<i class="bi ${icons[type]||icons.info}"></i><span>${msg}</span><button class="toast-close" aria-label="Đóng"><i class="bi bi-x"></i></button>`;
    toastContainer.appendChild(t);
    const dismiss=()=>{t.style.opacity='0';setTimeout(()=>t.remove(),300)};
    t.querySelector('.toast-close').addEventListener('click',dismiss);
    setTimeout(()=>{if(t.parentNode)dismiss()},5000);
  }

  /* 6. FORM LIÊN HỆ — Validation */
  const form=$('#contactForm');
  const rules=[
    {id:'ct-name',check:v=>v.trim().length>=2,err:v=>v.trim()?'Họ tên phải có ít nhất 2 ký tự':'Vui lòng nhập họ tên'},
    {id:'ct-email',check:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),err:()=>'Vui lòng nhập email hợp lệ'},
    {id:'ct-message',check:v=>v.trim().length>=10,err:v=>v.trim()?'Nội dung phải có ít nhất 10 ký tự':'Vui lòng nhập nội dung tin nhắn'}
  ];

  form.addEventListener('submit',e=>{
    e.preventDefault();
    let valid=true;

    rules.forEach(({id,check,err})=>{
      const el=$(`#${id}`);
      el.classList.remove('is-invalid','is-valid');
      const fb=el.nextElementSibling;
      if(fb&&fb.classList.contains('invalid-feedback'))fb.textContent='';
      if(!check(el.value)){
        el.classList.add('is-invalid');
        if(fb)fb.textContent=err(el.value);
        valid=false;
      }else el.classList.add('is-valid');
    });

    if(!valid){
      const first=form.querySelector('.is-invalid');
      if(first){first.focus();first.scrollIntoView({behavior:'smooth',block:'center'})}
      return;
    }

    // Giả lập gửi
    const btn=$('#ct-submit');
    btn.disabled=true;
    btn.innerHTML='<span class="spinner-border spinner-border-sm"></span> Đang gửi...';

    setTimeout(()=>{
      showToast('Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi trong 24 giờ.','success');
      form.reset();
      rules.forEach(({id})=>$(`#${id}`).classList.remove('is-valid','is-invalid'));
      btn.disabled=false;
      btn.innerHTML='<i class="bi bi-send"></i> GỬI TIN NHẮN';
    },1500);
  });

  /* 7. RIPPLE */
  document.addEventListener('click',e=>{
    const btn=e.target.closest('.btn');if(!btn)return;
    const r=document.createElement('span');r.className='btn-ripple';
    const rect=btn.getBoundingClientRect();const s=Math.max(rect.width,rect.height);
    Object.assign(r.style,{width:s+'px',height:s+'px',left:(e.clientX-rect.left-s/2)+'px',top:(e.clientY-rect.top-s/2)+'px'});
    btn.appendChild(r);r.addEventListener('animationend',()=>r.remove());
  });
});
