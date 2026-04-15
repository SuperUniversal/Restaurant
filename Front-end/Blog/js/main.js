/* ================================================================
   BASILICO — JavaScript Trang Blog (Blog/js/main.js)
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
  window.addEventListener('scroll',()=>{
    header.classList.toggle('scrolled',scrollY>80);
    fab.classList.toggle('visible',scrollY>300);
    const filterBar=$('.section-blog-filter');
    if(filterBar) filterBar.classList.toggle('scrolled',scrollY>400);
  },{passive:true});
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


  /* 5. DỮ LIỆU BÀI VIẾT — 9 bài mẫu */
  const blogPosts = [
    {
      id:1, featured:true, cat:'khuyen-mai',
      title:'Ưu Đãi Tháng 4: Giảm 30% Combo Hải Sản Cho Nhóm 4 Người',
      excerpt:'Nhân dịp kỷ niệm 16 năm BASILICO, chúng tôi dành tặng ưu đãi đặc biệt cho các nhóm bạn và gia đình. Combo hải sản tươi sống bao gồm Tôm hùm, Cá hồi và Bạch tuộc..',
      date:'10/04/2026', author:'BASILICO Team', readTime:'2 phút',
      img:'../../assets/french_terrace_garden.png'
    },
    {
      id:2, cat:'cong-thuc',
      title:'Bí Quyết Nấu Soufflé Sô-cô-la Hoàn Hảo Tại Nhà',
      excerpt:'Chef Trang chia sẻ 5 bí quyết quan trọng để soufflé sô-cô-la luôn nở đều, mượt mà và tan chảy từ bên trong.',
      date:'08/04/2026', author:'Chef Trang', readTime:'5 phút',
      img:'../../assets/real_dessert_table.png'
    },
    {
      id:3, cat:'su-kien',
      title:'Đêm Nhạc Jazz & Wine Tasting Mỗi Thứ 6 Tại BASILICO',
      excerpt:'Thưởng thức âm nhạc jazz sống động cùng bộ sưu tập rượu vang Pháp tuyển chọn trong khung cảnh ấm cúng.',
      date:'05/04/2026', author:'BASILICO Events', readTime:'3 phút',
      img:'../../assets/real_wine_dinner.png'
    },
    {
      id:4, cat:'tin-nha-hang',
      title:'BASILICO Đạt Chứng Nhận Vệ Sinh An Toàn Thực Phẩm Loại A',
      excerpt:'Niềm tự hào khi nhà hàng được Sở Y tế TP.HCM cấp chứng nhận loại A — tiêu chuẩn cao nhất về an toàn thực phẩm.',
      date:'01/04/2026', author:'Ban Quản Lý', readTime:'2 phút',
      img:'../../assets/real_restaurant_exterior.png'
    },
    {
      id:5, cat:'cong-thuc',
      title:'Cách Làm Sốt Béarnaise — Linh Hồn Của Bít Tết Pháp',
      excerpt:'Hướng dẫn chi tiết pha chế sốt Béarnaise chuẩn Pháp — từ cách đánh trứng đến canh nhiệt hoàn hảo.',
      date:'28/03/2026', author:'Chef Đức', readTime:'7 phút',
      img:'../../assets/real_steak_sauce.png'
    },
    {
      id:6, cat:'khuyen-mai',
      title:'Happy Hour Thứ 6: Giảm 20% Tất Cả Đồ Uống 17:00-19:00',
      excerpt:'Giờ Vàng mỗi thứ 6 tại BASILICO — cocktail, rượu vang và đồ uống signature giảm 20%. Đặt bàn ngay!',
      date:'25/03/2026', author:'BASILICO Team', readTime:'1 phút',
      img:'../../assets/real_happy_hour.png'
    },
    {
      id:7, cat:'tin-nha-hang',
      title:'Khai Trương Khu Vực Sân Vườn Mới — Lãng Mạn Hơn Bao Giờ Hết',
      excerpt:'Không gian ngoài trời mới được thiết kế với đèn fairy lights, cây xanh tự nhiên và quạt phun sương for summer dining.',
      date:'20/03/2026', author:'Ban Quản Lý', readTime:'3 phút',
      img:'../../assets/french_fresh_ingredients.png'
    },
    {
      id:8, cat:'su-kien',
      title:'Workshop Nấu Ăn Cuối Tuần: Học Làm Pasta Tươi Cùng Chef Đức',
      excerpt:'Tham gia workshop 3 giờ vào Chủ Nhật hàng tuần — học cách nhào bột, cán mỏng và nấu pasta tươi kiểu Ý.',
      date:'15/03/2026', author:'BASILICO Events', readTime:'4 phút',
      img:'../../assets/real_chef_plating.png'
    },
    {
      id:9, cat:'cong-thuc',
      title:'5 Loại Nước Sốt Pháp Kinh Điển Bạn Nên Biết',
      excerpt:'Từ Béchamel, Hollandaise đến Velouté — 5 "mother sauces" nền tảng của ẩm thực Pháp mà bạn có thể nấu tại nhà.',
      date:'10/03/2026', author:'Chef Đức', readTime:'8 phút',
      img:'../../assets/french_bar_lounge.png'
    }
  ];

  const catNameMap = {
    'khuyen-mai':'Khuyến mãi','su-kien':'Sự kiện',
    'cong-thuc':'Công thức','tin-nha-hang':'Tin nhà hàng'
  };


  /* 6. RENDER BÀI NỔI BẬT */
  const featuredEl = $('#featuredPost');
  function renderFeatured(post) {
    featuredEl.innerHTML = `
      <div class="featured-img">
        <img src="${post.img}" alt="${post.title}" loading="lazy">
      </div>
      <div class="featured-body">
        <span class="featured-cat"><i class="bi bi-tag"></i> ${catNameMap[post.cat]||post.cat}</span>
        <h2>${post.title}</h2>
        <div class="featured-meta">
          <span><i class="bi bi-calendar3"></i>${post.date}</span>
          <span><i class="bi bi-person"></i>${post.author}</span>
          <span><i class="bi bi-clock"></i>${post.readTime}</span>
        </div>
        <p class="featured-excerpt">${post.excerpt}</p>
        <a href="bai-viet.html?id=${post.id}" class="featured-read-more">Đọc tiếp <i class="bi bi-arrow-right"></i></a>
      </div>
    `;
  }


  /* 7. RENDER LƯỚI BÀI VIẾT */
  const blogGrid = $('#blogGrid');
  const blogEmpty = $('#blogEmpty');
  const resultCount = $('#blogResultCount');
  const paginationUI = $('#paginationUI');
  const POSTS_PER_PAGE = 3;
  let currentPage = 1;

  function renderPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    if (totalPages <= 1) { paginationUI.innerHTML = ''; return; }

    let html = '';
    // Prev button
    html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <button class="page-link" data-page="${currentPage - 1}" aria-label="Trang trước"><i class="bi bi-chevron-left"></i></button></li>`;
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
        <button class="page-link" data-page="${i}">${i}</button></li>`;
    }
    // Next button
    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <button class="page-link" data-page="${currentPage + 1}" aria-label="Trang sau"><i class="bi bi-chevron-right"></i></button></li>`;

    paginationUI.innerHTML = html;

    // Bind click events
    paginationUI.querySelectorAll('.page-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(btn.dataset.page);
        if (page >= 1 && page <= totalPages && page !== currentPage) {
          currentPage = page;
          filterPosts();
          // Scroll to grid
          const gridSection = $('.section-blog-grid');
          if (gridSection) gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function renderBlogGrid(posts) {
    // Loại bài nổi bật
    const gridPosts = posts.filter(p => !p.featured);

    if (gridPosts.length === 0) {
      blogGrid.innerHTML = '';
      blogEmpty.style.display = 'block';
      resultCount.textContent = 'Không tìm thấy bài viết';
      renderPagination(0);
      return;
    }

    blogEmpty.style.display = 'none';
    resultCount.textContent = `Hiển thị ${gridPosts.length} bài viết`;

    // Paginate
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const pagePosts = gridPosts.slice(start, start + POSTS_PER_PAGE);

    blogGrid.innerHTML = pagePosts.map(post => `
      <article class="blog-card">
        <a href="bai-viet.html?id=${post.id}" class="blog-card-link">
          <div class="blog-card-img">
            <img src="${post.img}" alt="${post.title}" loading="lazy">
            <span class="blog-card-read-hint"><i class="bi bi-book"></i> Đọc bài</span>
          </div>
          <div class="blog-card-body">
            <span class="blog-card-cat">${catNameMap[post.cat]||post.cat}</span>
            <h3>${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <div class="blog-card-footer">
              <span><i class="bi bi-calendar3"></i>${post.date}</span>
              <span><i class="bi bi-clock"></i>${post.readTime}</span>
            </div>
          </div>
        </a>
      </article>
    `).join('');

    renderPagination(gridPosts.length);
  }


  /* 8. BỘ LỌC + TÌM KIẾM */
  let activeCat = 'all';
  let searchQuery = '';

  function filterPosts() {
    let posts = blogPosts;

    // Lọc danh mục
    if (activeCat !== 'all') {
      posts = posts.filter(p => p.cat === activeCat);
    }

    // Lọc tìm kiếm
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }

    // Render featured (bài đầu tiên có flag hoặc bài đầu)
    const featured = posts.find(p => p.featured) || posts[0];
    if (featured) {
      featuredEl.parentElement.style.display = '';
      renderFeatured(featured);
    } else {
      featuredEl.parentElement.style.display = 'none';
    }

    // Render grid (bỏ featured)
    renderBlogGrid(posts.filter(p => p !== featured));
  }

  // Tab danh mục
  $$('.blog-cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.blog-cat-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false') });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      activeCat = tab.dataset.cat;
      currentPage = 1;
      filterPosts();
    });
  });

  // Tìm kiếm
  let searchTimeout;
  $('#blogSearch').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = e.target.value.trim();
      currentPage = 1;
      filterPosts();
    }, 300);
  });

  // Reset
  $('#resetBlog').addEventListener('click', () => {
    activeCat = 'all';
    searchQuery = '';
    currentPage = 1;
    $('#blogSearch').value = '';
    $$('.blog-cat-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false') });
    $('.blog-cat-tab[data-cat="all"]').classList.add('active');
    filterPosts();
  });

  // Render ban đầu
  filterPosts();


  /* 9. RIPPLE */
  document.addEventListener('click',e=>{
    const btn=e.target.closest('.btn');if(!btn)return;
    const r=document.createElement('span');r.className='btn-ripple';
    const rect=btn.getBoundingClientRect();const s=Math.max(rect.width,rect.height);
    Object.assign(r.style,{width:s+'px',height:s+'px',left:(e.clientX-rect.left-s/2)+'px',top:(e.clientY-rect.top-s/2)+'px'});
    btn.appendChild(r);r.addEventListener('animationend',()=>r.remove());
  });
});
