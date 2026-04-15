/* ================================================================
   BASILICO — JavaScript Trang Thực Đơn (ThucDon/js/main.js)
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==============================================================
     HÀM TIỆN ÍCH
     ============================================================== */
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => (p || document).querySelectorAll(s);
  const header = $('.site-header');
  const fab = $('#fab-scroll-top');


  /* ==============================================================
     1. PRELOADER
     ============================================================== */
  const preloader = $('#preloader');
  const bar = $('#preloaderBar');
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress = Math.min(progress + Math.random() * 15 + 5, 92);
    bar.style.width = progress + '%';
  }, 150);
  function hidePreloader() {
    clearInterval(progressInterval);
    bar.style.width = '100%';
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 400);
  }
  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 4000);


  /* ==============================================================
     2. HEADER SCROLL + FAB
     ============================================================== */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', scrollY > 80);
    fab.classList.toggle('visible', scrollY > 300);
    // Sticky filter bar shadow
    const filterBar = $('.section-filter');
    if (filterBar) filterBar.classList.toggle('scrolled', scrollY > 400);
  }, { passive: true });

  fab.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));


  /* ==============================================================
     3. SIDEBAR — Menu di động
     ============================================================== */
  const sidebar = $('#mobileSidebar');
  const overlay = $('#sidebarOverlay');
  const hamBtn = $('#hd-10');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamBtn.setAttribute('aria-expanded', 'false');
  }

  hamBtn.addEventListener('click', openSidebar);
  $('#sidebarClose').addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  $$('.sidebar-nav a, .sidebar-cta a').forEach(a => a.addEventListener('click', closeSidebar));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
  });


  /* ==============================================================
     4. DỮ LIỆU THỰC ĐƠN — 30 món ăn mẫu
     ============================================================== */
  const menuItems = [
    // — KHAI VỊ —
    { name: 'Súp Hành Pháp Gratinée', cat: 'khai-vi', tags: ['dac-san'], price: '180.000₫', desc: 'Súp hành truyền thống Pháp phủ phô mai Gruyère nướng vàng, thơm nức.', img: '../../assets/real_french_soup.png' },
    { name: 'Nấm Truffle Crostini', cat: 'khai-vi', tags: ['chay','dac-san'], price: '220.000₫', desc: 'Bánh mì nướng giòn phủ nấm truffle đen và kem phô mai ricotta tươi.', img: '../../assets/real_risotto_truffle.png' },
    { name: 'Salad Niçoise Hải Sản', cat: 'khai-vi', tags: ['hai-san','it-calo'], price: '250.000₫', desc: 'Salad tươi kiểu Nice với cá ngừ áp chảo, trứng luộc và ô liu đen.', img: '../../assets/real_garden_salad.png' },
    { name: 'Foie Gras Poêlé', cat: 'khai-vi', tags: ['dac-san'], price: '480.000₫', desc: 'Gan ngỗng áp chảo hoàn hảo, phục vụ kèm mứt quả sung tươi.', img: '../../assets/real_foie_gras.png' },
    { name: 'Rau Củ Nướng Provence', cat: 'khai-vi', tags: ['chay','it-calo'], price: '160.000₫', desc: 'Rau củ theo mùa nướng với thảo mộc Provence và dầu ô liu extra virgin.', img: '../../assets/real_garden_salad.png' },

    // — MÓN CHÍNH —
    { name: 'Cá Hồi Nướng Thảo Mộc', cat: 'mon-chinh', tags: ['hai-san','it-calo'], price: '580.000₫', desc: 'Cá hồi Na Uy nướng hoàn hảo với rau củ theo mùa và sốt bơ chanh.', img: '../../assets/real_grilled_salmon.png' },
    { name: 'Bò Thăn Nội Bít Tết', cat: 'mon-chinh', tags: ['dac-san'], price: '850.000₫', desc: 'Bò thăn nội Úc hảo hạng nướng theo yêu cầu, kèm khoai tây nghiền truffle.', img: '../../assets/real_beef_tenderloin.png' },
    { name: 'Tôm Hùm Thermidor', cat: 'mon-chinh', tags: ['hai-san','dac-san'], price: '1.380.000₫', desc: 'Tôm hùm Maine nhồi nhân phô mai nướng vàng, phong cách Thermidor cổ điển.', img: '../../assets/real_lobster_thermidor.png' },
    { name: 'Vịt Confit Truyền Thống', cat: 'mon-chinh', tags: ['dac-san'], price: '980.000₫', desc: 'Đùi vịt Confit chậm 12 giờ, da giòn hoàn hảo kèm rau xanh seasonal.', img: '../../assets/real_duck_confit.png' },
    { name: 'Cơm Nấm Truffle Đen', cat: 'mon-chinh', tags: ['chay','dac-san'], price: '650.000₫', desc: 'Risotto kem mịn với nấm truffle Périgord đen, phô mai Parmigiano 24 tháng.', img: '../../assets/real_risotto_truffle.png' },
    { name: 'Cá Ngừ Tataki Áp Chảo', cat: 'mon-chinh', tags: ['hai-san','it-calo'], price: '720.000₫', desc: 'Cá ngừ đại dương tươi áp chảo tái, phục vụ kèm wasabi và gừng ngâm.', img: '../../assets/real_tuna_tartare.png' },
    { name: 'Sườn Cừu Nướng Rosemary', cat: 'mon-chinh', tags: ['dac-san'], price: '920.000₫', desc: 'Sườn cừu New Zealand nướng tái hồng, ướp húng tây và tỏi nướng.', img: '../../assets/real_lamb_chops.png' },
    { name: 'Bạch Tuộc Nướng Địa Trung Hải', cat: 'mon-chinh', tags: ['hai-san'], price: '520.000₫', desc: 'Bạch tuộc nướng mềm mại kiểu Địa Trung Hải với khoai tây và ớt paprika.', img: '../../assets/real_octopus_grilled.png' },

    // — TRÁNG MIỆNG —
    { name: 'Bánh Soufflé Sô-cô-la', cat: 'trang-mieng', tags: ['dac-san'], price: '220.000₫', desc: 'Soufflé sô-cô-la đen Valrhona nóng hổi, tan chảy từ bên trong.', img: '../../assets/real_chocolate_souffle.png' },
    { name: 'Crème Brûlée Vanilla', cat: 'trang-mieng', tags: [], price: '180.000₫', desc: 'Kem trứng Pháp cổ điển với lớp caramel giòn tan, hương vanilla Madagascar.', img: '../../assets/real_creme_brulee.png' },
    { name: 'Bánh Tarte Tatin Táo', cat: 'trang-mieng', tags: [], price: '200.000₫', desc: 'Bánh táo lật úp kiểu Pháp với caramel bơ và kem tươi Chantilly.', img: '../../assets/real_chocolate_souffle.png' },
    { name: 'Choux Profiteroles', cat: 'trang-mieng', tags: [], price: '170.000₫', desc: 'Bánh su kem nhỏ nhồi kem vani, phủ sốt sô-cô-la ấm Belgium.', img: '../../assets/real_creme_brulee.png' },
    { name: 'Sorbet Trái Cây Tươi', cat: 'trang-mieng', tags: ['chay','it-calo'], price: '150.000₫', desc: 'Sorbet từ trái cây mùa vụ: chanh dây, xoài và dâu tây hữu cơ.', img: '../../assets/real_garden_salad.png' },

    // — ĐỒ UỐNG —
    { name: 'Mojito Cổ Điển', cat: 'do-uong', tags: [], price: '180.000₫', desc: 'Rum trắng, lá bạc hà tươi, chanh xanh và soda — tươi mát hoàn hảo.', img: '../../assets/real_cocktail_bar.png' },
    { name: 'Cocktail French 75', cat: 'do-uong', tags: ['dac-san'], price: '250.000₫', desc: 'Gin cao cấp kết hợp champagne, nước chanh tươi và syrup đường mía.', img: '../../assets/real_cocktail_bar.png' },
    { name: 'Espresso Martini', cat: 'do-uong', tags: [], price: '220.000₫', desc: 'Vodka premium blend với espresso tươi, Kahlúa và chút vanilla.', img: '../../assets/real_wine_cheese.png' },
    { name: 'Rượu Rosé Provence (Ly)', cat: 'do-uong', tags: [], price: '200.000₫', desc: 'Rượu vang hồng Côtes de Provence — tươi nhẹ, hương hoa và trái cây.', img: '../../assets/real_wine_cheese.png' },
    { name: 'Champagne Brut (Ly)', cat: 'do-uong', tags: ['dac-san'], price: '380.000₫', desc: 'Champagne Brut Pháp tuyển chọn, bọt mịn vàng rơm, vị thanh lịch.', img: '../../assets/real_cocktail_bar.png' },
    { name: 'Nước Chanh Thủ Công', cat: 'do-uong', tags: ['it-calo'], price: '120.000₫', desc: 'Nước chanh tươi ép tay với mật ong rừng và lá bạc hà, không đường tinh.', img: '../../assets/real_garden_salad.png' },
    { name: 'Sinh Tố Bơ Sầu Riêng', cat: 'do-uong', tags: [], price: '95.000₫', desc: 'Sinh tố blend bơ sáp và sầu riêng Musang King, béo ngậy thơm lừng.', img: '../../assets/real_garden_salad.png' },

    // — COMBO —
    { name: 'Set Lunch Văn Phòng', cat: 'combo', tags: ['it-calo'], price: '350.000₫', desc: 'Salad hoặc súp + 1 món chính + 1 đồ uống + 1 tráng miệng nhỏ.', img: '../../assets/real_pasta_fresh.png' },
    { name: 'Combo Hải Sản Đôi', cat: 'combo', tags: ['hai-san'], price: '1.728.000₫', desc: 'Cá hồi nướng + Tôm hùm Thermidor + 2 đồ uống + 1 tráng miệng.', img: '../../assets/real_seafood_platter.png' },
    { name: 'Combo Gia Đình 4 Người', cat: 'combo', tags: ['dac-san'], price: '3.150.000₫', desc: 'Bò bít tết + Vịt Confit + Risotto + 4 đồ uống + 2 tráng miệng.', img: '../../assets/real_beef_tenderloin.png' },
    { name: 'Combo Date Night', cat: 'combo', tags: ['dac-san'], price: '2.625.000₫', desc: '2 khai vị + 2 món chính tự chọn + 1 chai rượu vang + 2 tráng miệng.', img: '../../assets/real_wine_cheese.png' },
    { name: 'Combo Tiệc Sinh Nhật', cat: 'combo', tags: ['dac-san'], price: '5.500.000₫', desc: '6 người: 3 khai vị + 6 món chính + bánh sinh nhật + 6 đồ uống.', img: '../../assets/real_seafood_platter.png' },
  ];


  /* ==============================================================
     5. RENDER LƯỚI MÓN ĂN
     ============================================================== */
  const menuGrid = $('#menuGrid');
  const menuEmpty = $('#menuEmpty');
  const resultCount = $('#resultCount');

  const tagIconMap = {
    'hai-san': 'bi-water',
    'chay': 'bi-leaf',
    'dac-san': 'bi-star-fill',
    'it-calo': 'bi-heart-pulse'
  };

  const catNameMap = {
    'khai-vi': 'Khai Vị',
    'mon-chinh': 'Món Chính',
    'trang-mieng': 'Tráng Miệng',
    'do-uong': 'Đồ Uống',
    'combo': 'Combo'
  };

  function renderMenu(items) {
    if (items.length === 0) {
      menuGrid.innerHTML = '';
      menuEmpty.style.display = 'block';
      resultCount.textContent = 'Không tìm thấy món ăn';
      return;
    }

    menuEmpty.style.display = 'none';
    resultCount.textContent = `Hiển thị ${items.length} món`;

    // Build a lookup to find original index for chi-tiet link
    const allItems = menuItems;

    menuGrid.innerHTML = items.map(item => {
      const idx = allItems.indexOf(item);
      const tagIcons = item.tags.map(t =>
        tagIconMap[t] ? `<span class="dish-tag-icon" title="${t}"><i class="bi ${tagIconMap[t]}"></i></span>` : ''
      ).join('');

      return `
        <a href="chi-tiet.html?id=${idx}" class="dish-card" data-cat="${item.cat}" data-tags="${item.tags.join(',')}">
          <div class="dish-card-img">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <span class="dish-cat-badge">${catNameMap[item.cat] || item.cat}</span>
            ${tagIcons ? `<div class="dish-tag-icons">${tagIcons}</div>` : ''}
            <span class="dish-detail-hint"><i class="bi bi-eye"></i> Xem chi tiết</span>
          </div>
          <div class="dish-card-body">
            <h3>${item.name}</h3>
            <p class="dish-desc">${item.desc}</p>
            <div class="dish-price-row">
              <span class="dish-price">${item.price}</span>
              <span class="dish-order-btn" aria-label="Xem ${item.name}">
                <i class="bi bi-arrow-right"></i>
              </span>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }


  /* ==============================================================
     6. BỘ LỌC — Filter theo danh mục & tag
     ============================================================== */
  let activeCat = 'all';
  let activeTag = 'all';

  function filterItems() {
    let items = menuItems;

    // Lọc theo danh mục
    if (activeCat !== 'all') {
      items = items.filter(i => i.cat === activeCat);
    }

    // Lọc theo tag
    if (activeTag !== 'all') {
      items = items.filter(i => i.tags.includes(activeTag));
    }

    renderMenu(items);
  }

  // Tab danh mục
  $$('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.filter-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCat = tab.dataset.cat;
      filterItems();
    });
  });

  // Tag đặc tính
  $$('.filter-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      $$('.filter-tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      activeTag = tag.dataset.tag;
      filterItems();
    });
  });

  // Nút reset
  $('#resetFilter').addEventListener('click', () => {
    activeCat = 'all';
    activeTag = 'all';
    $$('.filter-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    $$('.filter-tag').forEach(t => t.classList.remove('active'));
    $('.filter-tab[data-cat="all"]').classList.add('active');
    $('.filter-tag[data-tag="all"]').classList.add('active');
    filterItems();
  });

  // Render ban đầu
  filterItems();


  /* ==============================================================
     7. SCROLL REVEAL — Animation khi phần tử vào viewport
     ============================================================== */
  const revealElements = $$('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* ==============================================================
     8. HIỆU ỨNG RIPPLE — Khi bấm nút
     ============================================================== */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    Object.assign(ripple.style, {
      width: size + 'px', height: size + 'px',
      left: (e.clientX - rect.left - size / 2) + 'px',
      top: (e.clientY - rect.top - size / 2) + 'px'
    });
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

}); // Kết thúc DOMContentLoaded
