/* ================================================================
   BASILICO — JavaScript Trang Chủ (main.js)
   Phân chia rõ ràng theo từng chức năng
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==============================================================
     HÀM TIỆN ÍCH — Dùng chung cho toàn bộ file
     ============================================================== */
  const $ = (selector, parent) => (parent || document).querySelector(selector);
  const $$ = (selector, parent) => (parent || document).querySelectorAll(selector);

  // Các phần tử dùng nhiều lần
  const header   = $('.site-header');
  const fab      = $('#fab-scroll-top');
  const today    = new Date().toISOString().split('T')[0];


  /* ==============================================================
     1. PRELOADER — Màn hình chờ tải trang
     ============================================================== */
  const preloader = $('#preloader');
  const bar       = $('#preloaderBar');
  let progress    = 0;

  // Tăng thanh tiến trình mỗi 150ms
  const progressInterval = setInterval(() => {
    progress = Math.min(progress + Math.random() * 15 + 5, 92);
    bar.style.width = progress + '%';
  }, 150);

  // Ẩn preloader khi trang tải xong
  function hidePreloader() {
    clearInterval(progressInterval);
    bar.style.width = '100%';
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 400);
  }

  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 4000); // Dự phòng: tối đa 4 giây


  /* ==============================================================
     2. HEADER — Đổi giao diện khi cuộn trang
     ============================================================== */
  function handleScroll() {
    // Header thu gọn khi cuộn > 80px
    header.classList.toggle('scrolled', scrollY > 80);
    // Nút cuộn lên hiện khi cuộn > 300px
    fab.classList.toggle('visible', scrollY > 300);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Gọi ngay khi tải trang


  /* ==============================================================
     3. SIDEBAR — Menu di động (trên điện thoại)
     ============================================================== */
  const sidebar = $('#mobileSidebar');
  const overlay = $('#sidebarOverlay');
  const hamBtn  = $('#hd-10');

  // Mở sidebar
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamBtn.setAttribute('aria-expanded', 'true');
  }

  // Đóng sidebar
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamBtn.setAttribute('aria-expanded', 'false');
  }

  // Sự kiện
  hamBtn.addEventListener('click', openSidebar);
  $('#sidebarClose').addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Đóng sidebar khi bấm vào link
  $$('.sidebar-nav a, .sidebar-cta a').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // Đóng sidebar khi nhấn phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });


  /* ==============================================================
     4. NÚT CUỘN LÊN ĐẦU TRANG (FAB)
     ============================================================== */
  fab.addEventListener('click', () => {
    scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hỗ trợ bàn phím (Enter / Space)
  fab.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollTo({ top: 0, behavior: 'smooth' });
    }
  });


  /* ==============================================================
     5. CUỘN HIỆN (Scroll Reveal) — Animation khi phần tử vào viewport
     ============================================================== */
  const revealElements = $$('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .reveal-zoom, .stagger-grid, .img-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // Chỉ chạy 1 lần
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback cho trình duyệt cũ
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* ==============================================================
     5b. TEXT REVEAL — Hiện chữ từng từ với stagger effect
     ============================================================== */
  $$('[data-text-reveal]').forEach(heading => {
    const words = heading.textContent.trim().split(/\s+/);
    heading.innerHTML = words.map(w =>
      `<span class="text-reveal-word">${w}</span>`
    ).join(' ');

    const wordEls = heading.querySelectorAll('.text-reveal-word');

    if ('IntersectionObserver' in window) {
      const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            wordEls.forEach((word, i) => {
              setTimeout(() => word.classList.add('revealed'), i * 80);
            });
            textObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      textObserver.observe(heading);
    } else {
      wordEls.forEach(w => w.classList.add('revealed'));
    }
  });


  /* ==============================================================
     5c. SMOOTH PARALLAX — Ảnh di chuyển nhẹ khi scroll
     ============================================================== */
  const parallaxImages = $$('.parallax-subtle');
  if (parallaxImages.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const speed = parseFloat(img.dataset.speed || 0.08);
            if (rect.top < innerHeight && rect.bottom > 0) {
              const offset = (rect.top - innerHeight / 2) * speed;
              img.style.transform = `translateY(${offset}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  /* ==============================================================
     5d. SMOOTH COUNTER — Số liệu đếm lên khi enter viewport
     ============================================================== */


  /* ==============================================================
     6. HERO — Hiệu ứng song song (Parallax) & Hạt sáng (Particles)
     ============================================================== */

  // 6a. Parallax: ảnh nền di chuyển chậm hơn khi cuộn
  const heroBgImg = $('#sec-02 .hero-bg img');
  window.addEventListener('scroll', () => {
    if (scrollY < innerHeight) {
      heroBgImg.style.transform = `translateY(${scrollY * 0.35}px) scale(1.05)`;
    }
  }, { passive: true });

  // 6b. Hạt sáng bay (particles)
  (() => {
    const container = document.createElement('div');
    container.className = 'hero-particles';
    container.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-duration: ${8 + Math.random() * 12}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${0.2 + Math.random() * 0.4}
      `;
      container.appendChild(particle);
    }

    $('#sec-02 .hero-overlay').insertAdjacentElement('afterend', container);
  })();


  /* ==============================================================
     7. BỘ ĐẾM SỐ LIỆU — Animation đếm số khi vào viewport
     ============================================================== */
  const statNumbers  = $$('.stat-number');
  let statsAnimated  = false;

  function animateCounters() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(numEl => {
      const target = +numEl.dataset.target;
      const suffix = numEl.dataset.suffix || '';
      let startTime = null;

      // Hàm easing: chậm dần ở cuối
      const easeOut = (t) => 1 - Math.pow(1 - t, 4);

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = Math.min((timestamp - startTime) / 2000, 1);

        numEl.textContent = Math.floor(easeOut(elapsed) * target) + suffix;

        if (elapsed < 1) {
          requestAnimationFrame(step);
        } else {
          numEl.textContent = target + suffix; // Đảm bảo kết quả chính xác
        }
      };

      requestAnimationFrame(step);
    });
  }

  // Theo dõi phần Stats vào viewport
  if ('IntersectionObserver' in window && statNumbers.length) {
    const statsSection = $('#sec-09b');
    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      statsObserver.observe(statsSection);
    }
  }


  /* ==============================================================
     8. HIỆU ỨNG GỢN SÓNG (Ripple) — Khi bấm nút
     ============================================================== */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    Object.assign(ripple.style, {
      width:  size + 'px',
      height: size + 'px',
      left:   (e.clientX - rect.left - size / 2) + 'px',
      top:    (e.clientY - rect.top  - size / 2) + 'px'
    });

    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });


  /* ==============================================================
     9. CON TRỎ THEO DÕI (Cursor Trail) — Chỉ trên máy tính
     ============================================================== */
  if (matchMedia('(hover: hover)').matches) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.setAttribute('aria-hidden', 'true');
    document.body.appendChild(trail);

    let trailX = 0, trailY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      trail.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      trail.classList.remove('active');
    });

    // Vòng lặp mượt mà (lerp)
    (function updateTrail() {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      trail.style.left = trailX + 'px';
      trail.style.top  = trailY + 'px';
      requestAnimationFrame(updateTrail);
    })();
  }


  /* ==============================================================
     10. THỰC ĐƠN — Chuyển tab và hiển thị danh sách món
     ============================================================== */

  // Dữ liệu thực đơn (tiếng Việt)
  const menuData = {
    special: [
      ['Cá Hồi Nướng Thảo Mộc',    '580.000₫'],
      ['Bò Thăn Nội Bít Tết',       '850.000₫'],
      ['Tôm Hùm Thermidor',         '1.380.000₫'],
      ['Cơm Nấm Truffle',           '650.000₫'],
      ['Vịt Confit Truyền Thống',   '980.000₫'],
      ['Cá Ngừ Tataki Áp Chảo',     '720.000₫']
    ],
    drinks: [
      ['Mojito Cổ Điển',            '180.000₫'],
      ['Cocktail French 75',        '250.000₫'],
      ['Espresso Martini',          '220.000₫'],
      ['Rượu Rosé Provence (Ly)',   '200.000₫'],
      ['Champagne Brut',            '380.000₫'],
      ['Nước Chanh Thủ Công',       '120.000₫']
    ],
    seafood: [
      ['Súp Hải Sản Bouillabaisse', '680.000₫'],
      ['Sò Điệp Áp Chảo',          '620.000₫'],
      ['Bạch Tuộc Nướng Địa Trung Hải', '520.000₫'],
      ['Hàu Rockefeller (6 con)',   '580.000₫'],
      ['Súp Tôm Hùm Bisque',       '320.000₫'],
      ['Sò Saint-Jacques',          '650.000₫']
    ],
    desserts: [
      ['Bánh Soufflé Sô-cô-la',    '220.000₫'],
      ['Crème Brûlée',              '180.000₫'],
      ['Bánh Tarte Tatin',          '200.000₫'],
      ['Choux Profiteroles',        '170.000₫'],
      ['Bánh Mille-Feuille',        '200.000₫'],
      ['Soufflé Grand Marnier',     '250.000₫']
    ]
  };

  const menuTabs = $$('.menu-tab');
  const menuList = $('#menuList');

  // Render danh sách món ăn theo tab
  function renderMenu(category) {
    const items = menuData[category];
    if (!items) return;

    // Hiệu ứng fade out
    menuList.style.opacity = '0';
    menuList.style.transform = 'translateY(10px)';

    setTimeout(() => {
      menuList.innerHTML = items.map(([name, price]) =>
        `<div class="menu-item">
          <span class="menu-item-name">${name}</span>
          <span class="menu-item-dots"></span>
          <span class="menu-item-price">${price}</span>
        </div>`
      ).join('');

      // Hiệu ứng fade in
      menuList.style.opacity = '1';
      menuList.style.transform = 'translateY(0)';
    }, 250);
  }

  // Gán sự kiện cho từng tab
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderMenu(tab.dataset.tab);
    });
  });

  // Hiển thị tab mặc định
  renderMenu('special');

  // Điều hướng bằng phím mũi tên
  setupArrowNav('.menu-tabs', menuTabs);


  /* ==============================================================
     11. TẠI SAO CHỌN CHÚNG TÔI — Chuyển tab nội dung
     ============================================================== */

  // Dữ liệu nội dung (tiếng Việt)
  const whyData = {
    luxury: {
      text: 'Tận hưởng không gian sang trọng được thiết kế tỉ mỉ từng chi tiết, mang đến sự thoải mái và đẳng cấp.',
      list: [
        'Phòng ăn riêng với tầm nhìn ra vườn',
        'Ánh sáng và âm nhạc được bố trí tinh tế',
        'Bộ bàn ăn cao cấp và đồ sứ thủ công',
        'Sân thượng với hệ thống điều hòa'
      ]
    },
    safety: {
      text: 'Sức khỏe của bạn là ưu tiên hàng đầu. BASILICO duy trì tiêu chuẩn an toàn thực phẩm cao nhất.',
      list: [
        'Bếp đạt chứng nhận HACCP',
        'Kiểm tra độ tươi nguyên liệu hàng ngày',
        'Nhân viên được đào tạo vệ sinh an toàn',
        'Thực đơn ghi rõ thành phần gây dị ứng'
      ]
    },
    event: {
      text: 'Tổ chức những dịp quan trọng nhất tại BASILICO. Đội ngũ sự kiện sẽ thiết kế trải nghiệm riêng cho bạn.',
      list: [
        'Gói sự kiện riêng tư tùy chỉnh',
        'Điều phối viên sự kiện chuyên trách',
        'Thực đơn thử nếm theo yêu cầu',
        'Trang thiết bị âm thanh và nhạc sống'
      ]
    }
  };

  const whyTabs    = $$('.why-tab');
  const whyContent = $('#whyContent');

  // Render nội dung "Tại sao chọn chúng tôi"
  function renderWhy(key) {
    const data = whyData[key];
    if (!data) return;

    // Hiệu ứng fade out
    whyContent.style.opacity = '0';
    whyContent.style.transform = 'translateY(8px)';

    setTimeout(() => {
      whyContent.innerHTML = `
        <p>${data.text}</p>
        <ul>${data.list.map(item => `<li>${item}</li>`).join('')}</ul>
      `;

      // Hiệu ứng fade in
      whyContent.style.opacity = '1';
      whyContent.style.transform = 'translateY(0)';
    }, 250);
  }

  // Gán sự kiện cho từng tab
  whyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      whyTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderWhy(tab.dataset.why);
    });
  });

  // Hiển thị tab mặc định
  renderWhy('luxury');

  // Điều hướng bằng phím mũi tên
  setupArrowNav('.why-tabs', whyTabs);


  /* ==============================================================
     HÀM DÙNG CHUNG: Điều hướng tab bằng phím mũi tên
     ============================================================== */
  function setupArrowNav(containerSelector, tabs) {
    const container = $(containerSelector);
    if (!container) return;

    container.addEventListener('keydown', (e) => {
      const arr = Array.from(tabs);
      const current = arr.findIndex(t => t.classList.contains('active'));
      let next = current;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = (current + 1) % arr.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = (current - 1 + arr.length) % arr.length;
      }

      if (next !== current) {
        arr[next].click();
        arr[next].focus();
      }
    });
  }


  /* ==============================================================
     12. ĐÁNH GIÁ — Carousel tự động xoay
     ============================================================== */
  const slides   = $$('.testimonial-slide');
  const dots     = $$('.testimonial-dots .dot');
  const carousel = $('#testimonialsCarousel');
  let currentSlide = 0;
  let autoPlayTimer;

  // Chuyển đến slide chỉ định
  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => {
      d.classList.remove('active');
      d.setAttribute('aria-selected', 'false');
    });

    currentSlide = index;
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    dots[index].setAttribute('aria-selected', 'true');
  }

  // Bắt đầu / dừng tự động chuyển slide
  const startAutoPlay = () => {
    autoPlayTimer = setInterval(() => {
      showSlide((currentSlide + 1) % slides.length);
    }, 5000);
  };
  const stopAutoPlay = () => clearInterval(autoPlayTimer);

  // Bấm chấm điều hướng
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(+dot.dataset.dot);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Tạm dừng khi trỏ chuột vào carousel
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Vuốt trên mobile (swipe)
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    stopAutoPlay();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      // Vuốt trái: slide tiếp | Vuốt phải: slide trước
      const nextIndex = diff > 0
        ? (currentSlide + 1) % slides.length
        : (currentSlide - 1 + slides.length) % slides.length;
      showSlide(nextIndex);
    }
    startAutoPlay();
  }, { passive: true });

  // Khởi chạy tự động
  startAutoPlay();


  /* ==============================================================
     13. THÔNG BÁO (Toast) — Hệ thống hiển thị thông báo
     ============================================================== */
  const toastContainer = $('#toastContainer');

  function showToast(message, type = 'info') {
    const icons = {
      success: 'bi-check-circle-fill',
      error:   'bi-exclamation-triangle-fill',
      info:    'bi-info-circle-fill'
    };

    const toast = document.createElement('div');
    toast.className = 'toast-item ' + type;
    toast.innerHTML = `
      <i class="bi ${icons[type] || icons.info}"></i>
      <span>${message}</span>
      <button class="toast-close" aria-label="Đóng"><i class="bi bi-x"></i></button>
    `;

    toastContainer.appendChild(toast);

    // Tự động ẩn sau 5 giây
    const dismiss = () => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('.toast-close').addEventListener('click', dismiss);
    setTimeout(() => { if (toast.parentNode) dismiss(); }, 5000);
  }


  /* ==============================================================
     14. FORM ĐẶT BÀN — Xác thực và gửi
     ============================================================== */
  const rsvForm = $('#reservationForm');
  const rsvDate = $('#rsv-date');

  // Đặt ngày tối thiểu là hôm nay
  rsvDate.setAttribute('min', today);
  rsvDate.value = today;

  rsvForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Quy tắc xác thực từng trường
    const validationRules = [
      {
        id: 'rsv-name',
        check: (v) => v.trim().length >= 2,
        errorMsg: (v) => v.trim() ? 'Họ tên phải có ít nhất 2 ký tự' : 'Vui lòng nhập họ tên'
      },
      {
        id: 'rsv-phone',
        check: (v) => /^[0-9]{10,11}$/.test(v.replace(/\D/g, '')),
        errorMsg: () => 'Vui lòng nhập số điện thoại hợp lệ (10-11 số)'
      },
      {
        id: 'rsv-time',
        check: (v) => !!v,
        errorMsg: () => 'Vui lòng chọn giờ đến'
      },
      {
        id: 'rsv-guests',
        check: (v) => !!v,
        errorMsg: () => 'Vui lòng chọn số khách'
      },
      {
        id: 'rsv-date',
        check: (v) => v && v >= today,
        errorMsg: () => 'Vui lòng chọn ngày hợp lệ (không được trong quá khứ)'
      }
    ];

    let isValid = true;

    // Kiểm tra từng trường
    validationRules.forEach(({ id, check, errorMsg }) => {
      const el = $(`#${id}`);
      el.classList.remove('is-invalid', 'is-valid');

      const feedback = el.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = '';
      }

      if (!check(el.value)) {
        el.classList.add('is-invalid');
        if (feedback) feedback.textContent = errorMsg(el.value);
        isValid = false;
      } else {
        el.classList.add('is-valid');
      }
    });

    // Nếu có lỗi, focus vào trường đầu tiên bị lỗi
    if (!isValid) {
      const firstError = rsvForm.querySelector('.is-invalid');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Giả lập gửi form (loading → thành công)
    const submitBtn = $('#rsv-submit');
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Đang xử lý...';

    setTimeout(() => {
      showToast('Đặt bàn thành công! Chúng tôi sẽ gọi xác nhận trong 30 phút.', 'success');

      // Reset form
      rsvForm.reset();
      rsvDate.value = today;
      validationRules.forEach(({ id }) => {
        $(`#${id}`).classList.remove('is-valid', 'is-invalid');
      });

      // Khôi phục nút
      submitBtn.disabled = false;
      submitBtn.setAttribute('aria-busy', 'false');
      submitBtn.textContent = 'ĐẶT BÀN NGAY';
    }, 2000);
  });


  /* ==============================================================
     15. ĐĂNG KÝ NHẬN TIN (Newsletter) — Xác thực email
     ============================================================== */
  const nlForm     = $('#newsletterForm');
  const nlFeedback = nlForm.querySelector('.newsletter-feedback');

  nlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    nlFeedback.textContent = '';
    nlFeedback.className = 'newsletter-feedback';

    // Kiểm tra checkbox đồng ý
    if (!$('#ft-policy').checked) {
      nlFeedback.textContent = 'Vui lòng đồng ý với Chính sách bảo mật';
      nlFeedback.classList.add('error');
      return;
    }

    // Kiểm tra email hợp lệ
    const emailValue = $('#ft-email').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nlFeedback.textContent = 'Vui lòng nhập email hợp lệ';
      nlFeedback.classList.add('error');
      return;
    }

    // Giả lập gửi
    nlFeedback.textContent = 'Đang đăng ký...';
    setTimeout(() => {
      nlFeedback.textContent = '✅ Cảm ơn bạn đã đăng ký nhận tin!';
      nlFeedback.classList.add('success');
      nlForm.reset();
    }, 1200);
  });


  /* ==============================================================
     16. CUỘN MƯỢT — Smooth scroll cho các link nội bộ
     ============================================================== */
  $$('a[href^="#sec-"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = $(link.getAttribute('href'));

      if (targetSection) {
        scrollTo({
          top: targetSection.getBoundingClientRect().top + scrollY - header.offsetHeight,
          behavior: 'smooth'
        });

        // Đóng sidebar nếu đang mở
        if (sidebar.classList.contains('open')) {
          closeSidebar();
        }
      }
    });
  });

}); // Kết thúc DOMContentLoaded
