/* ================================================================
   BASILICO — JavaScript Trang Đặt Bàn (DatBan/js/main.js)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => (p || document).querySelectorAll(s);
  const header = $('.site-header');
  const fab = $('#fab-scroll-top');
  const today = new Date().toISOString().split('T')[0];

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

  /* 6. FORM ĐẶT BÀN — Validation & Confirmation Modal */
  const form=$('#rsvForm');
  const rsvDate=$('#rsv-date');
  rsvDate.setAttribute('min',today);
  rsvDate.value=today;

  const areaNames={indoor:'Trong nhà',outdoor:'Ngoài trời',vip:'Phòng VIP'};

  const rules=[
    {id:'rsv-name',check:v=>v.trim().length>=2,err:v=>v.trim()?'Họ tên phải có ít nhất 2 ký tự':'Vui lòng nhập họ tên'},
    {id:'rsv-phone',check:v=>/^[0-9]{10,11}$/.test(v.replace(/\D/g,'')),err:()=>'Số điện thoại hợp lệ (10-11 số)'},
    {id:'rsv-date',check:v=>v&&v>=today,err:()=>'Vui lòng chọn ngày hợp lệ'},
    {id:'rsv-time',check:v=>!!v,err:()=>'Vui lòng chọn giờ đến'},
    {id:'rsv-guests',check:v=>!!v,err:()=>'Vui lòng chọn số khách'}
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

    // Validate email nếu có điền
    const emailEl=$('#rsv-email');
    emailEl.classList.remove('is-invalid','is-valid');
    if(emailEl.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)){
      emailEl.classList.add('is-invalid');
      emailEl.nextElementSibling.textContent='Email không hợp lệ';
      valid=false;
    }else if(emailEl.value)emailEl.classList.add('is-valid');

    if(!valid){
      const first=form.querySelector('.is-invalid');
      if(first){first.focus();first.scrollIntoView({behavior:'smooth',block:'center'})}
      return;
    }

    // Hiển thị modal xác nhận
    const area=$('input[name="area"]:checked').value;
    const data={
      'Họ tên':$('#rsv-name').value,
      'Điện thoại':$('#rsv-phone').value,
      'Email':$('#rsv-email').value||'Không cung cấp',
      'Ngày':$('#rsv-date').value,
      'Giờ':$('#rsv-time').value,
      'Số khách':$('#rsv-guests').value,
      'Khu vực':areaNames[area]||area,
      'Ghi chú':$('#rsv-note').value||'Không có'
    };

    $('#confirmBody').innerHTML=Object.entries(data).map(([k,v])=>
      `<div class="confirm-row"><span class="confirm-label">${k}</span><span class="confirm-value">${v}</span></div>`
    ).join('');

    const modal=new bootstrap.Modal($('#confirmModal'));
    modal.show();

    // Xác nhận cuối cùng
    $('#confirmSubmit').onclick=()=>{
      modal.hide();
      const btn=$('#rsv-submit');
      btn.disabled=true;
      btn.innerHTML='<span class="spinner-border spinner-border-sm"></span> Đang xử lý...';

      setTimeout(()=>{
        showToast('Đặt bàn thành công! Chúng tôi sẽ gọi xác nhận trong 30 phút.','success');
        form.reset();
        rsvDate.value=today;
        rules.forEach(({id})=>$(`#${id}`).classList.remove('is-valid','is-invalid'));
        btn.disabled=false;
        btn.innerHTML='<i class="bi bi-check-circle"></i> XÁC NHẬN ĐẶT BÀN';
      },2000);
    };
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
