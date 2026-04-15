/* ================================================================
   BASILICO — Blog Article Detail JS (Blog/js/bai-viet.js)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => (p || document).querySelectorAll(s);

  /* 1. PRELOADER */
  const preloader = $('#preloader');
  const bar = $('#preloaderBar');
  let progress = 0;
  const pi = setInterval(() => { progress = Math.min(progress + Math.random() * 15 + 5, 92); bar.style.width = progress + '%'; }, 150);
  function hide() { clearInterval(pi); bar.style.width = '100%'; setTimeout(() => { preloader.classList.add('hidden'); document.body.classList.add('loaded'); }, 400); }
  window.addEventListener('load', hide); setTimeout(hide, 4000);

  /* 2. HEADER + SIDEBAR */
  const header = $('.site-header'), fab = $('#fab-scroll-top');
  window.addEventListener('scroll', () => { header.classList.toggle('scrolled', scrollY > 80); fab.classList.toggle('visible', scrollY > 300); }, { passive: true });
  fab.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const sidebar = $('#mobileSidebar'), overlay = $('#sidebarOverlay'), hamBtn = $('#hd-10');
  function openSB() { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; hamBtn.setAttribute('aria-expanded', 'true'); }
  function closeSB() { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; hamBtn.setAttribute('aria-expanded', 'false'); }
  hamBtn.addEventListener('click', openSB);
  $('#sidebarClose').addEventListener('click', closeSB);
  overlay.addEventListener('click', closeSB);
  $$('.sidebar-nav a, .sidebar-cta a').forEach(a => a.addEventListener('click', closeSB));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSB(); });

  /* 3. DỮ LIỆU BÀI VIẾT */
  const catNameMap = {
    'khuyen-mai': 'Khuyến Mãi', 'su-kien': 'Sự Kiện',
    'cong-thuc': 'Công Thức', 'tin-nha-hang': 'Tin Nhà Hàng'
  };

  const blogPosts = [
    {
      id: 1, cat: 'khuyen-mai',
      title: 'Ưu Đãi Tháng 4: Giảm 30% Combo Hải Sản Cho Nhóm 4 Người',
      date: '10/04/2026', author: 'BASILICO Team', readTime: '2 phút',
      img: '../../assets/french_terrace_garden.png',
      content: `
        <p>Nhân dịp kỷ niệm <strong>16 năm thành lập BASILICO</strong>, chúng tôi trân trọng dành tặng ưu đãi đặc biệt cho các nhóm bạn bè và gia đình yêu thương.</p>

        <h2>Chi Tiết Ưu Đãi</h2>
        <p>Combo Hải Sản Hoàng Gia dành cho nhóm 4 người bao gồm:</p>
        <ul>
          <li><strong>Tôm hùm Maine Thermidor</strong> — nướng phô mai Gruyère, sốt kem mù tạt</li>
          <li><strong>Cá hồi Na Uy nướng thảo mộc</strong> — kèm sốt beurre blanc</li>
          <li><strong>Bạch tuộc Địa Trung Hải</strong> — nướng paprika hun khói</li>
          <li><strong>Salad Niçoise</strong> — với cá ngừ áp chảo tái</li>
          <li>4 ly cocktail hoặc mocktail tự chọn</li>
          <li>2 phần tráng miệng chọn từ Crème Brûlée hoặc Soufflé</li>
        </ul>

        <blockquote>"Đây là dịp để chúng tôi cảm ơn những vị khách đã đồng hành cùng BASILICO suốt 16 năm qua." — Quản lý nhà hàng</blockquote>

        <h2>Điều Kiện Áp Dụng</h2>
        <p>Ưu đãi có giá trị từ <strong>01/04 đến 30/04/2026</strong>, áp dụng cho nhóm từ 4 người trở lên. Cần đặt bàn trước ít nhất 24 giờ qua hotline hoặc website.</p>

        <h3>Lưu Ý Quan Trọng</h3>
        <ul>
          <li>Không áp dụng chung với các chương trình khuyến mãi khác</li>
          <li>Áp dụng cho dine-in, không áp dụng takeaway</li>
          <li>Số lượng combo mỗi ngày có giới hạn</li>
        </ul>

        <p>Hãy gọi ngay <strong>090-123-4567</strong> hoặc đặt bàn online để không bỏ lỡ ưu đãi tuyệt vời này!</p>
      `
    },
    {
      id: 2, cat: 'cong-thuc',
      title: 'Bí Quyết Nấu Soufflé Sô-cô-la Hoàn Hảo Tại Nhà',
      date: '08/04/2026', author: 'Chef Trang', readTime: '5 phút',
      img: '../../assets/real_dessert_table.png',
      content: `
        <p>Soufflé sô-cô-la — món tráng miệng kinh điển của Pháp mà nhiều người e ngại khi thử nấu tại nhà. Nhưng với 5 bí quyết từ <strong>Chef Trang</strong>, bạn hoàn toàn có thể làm được!</p>

        <h2>Nguyên Liệu Cần Chuẩn Bị</h2>
        <ul>
          <li>200g sô-cô-la đen Valrhona 70%</li>
          <li>100g bơ Échiré</li>
          <li>4 lòng trắng trứng + 2 lòng đỏ</li>
          <li>60g đường mía organic</li>
          <li>1 thìa cà phê vanilla extract Madagascar</li>
          <li>Bơ và đường để phủ khuôn</li>
        </ul>

        <h2>5 Bí Quyết Vàng</h2>

        <h3>1. Nhiệt Độ Lò Phải Chính Xác</h3>
        <p>Lò phải được làm nóng trước ở <strong>190°C</strong> ít nhất 20 phút. Nhiệt không đều sẽ khiến soufflé nở lệch hoặc xẹp sớm.</p>

        <h3>2. Lòng Trắng Trứng Phải Sạch Tuyệt Đối</h3>
        <p>Bất kỳ vệt dầu hay lòng đỏ nào trong lòng trắng sẽ ngăn trứng đánh bông. Sử dụng tô inox hoặc đồng, lau khô hoàn toàn.</p>

        <h3>3. Kỹ Thuật Trộn Fold</h3>
        <p>Khi trộn lòng trắng vào hỗn hợp chocolate, dùng spatula silicon, múc từ dưới lên và xoay nhẹ. <strong>Không khuấy tròn</strong> — sẽ mất bọt khí.</p>

        <h3>4. Phủ Khuôn Đúng Cách</h3>
        <p>Phết bơ theo hướng từ dưới lên trên, rồi rắc đường. Điều này tạo "đường ray" giúp soufflé leo lên đều.</p>

        <h3>5. Phục Vụ Ngay Lập Tức</h3>
        <p>Soufflé chỉ giữ được <strong>90 giây</strong> sau khi ra lò. Chuẩn bị bàn ăn trước, và gọi mọi người ngồi sẵn!</p>

        <blockquote>"Soufflé không phải là món ăn chờ người — người phải chờ soufflé." — Chef Trang</blockquote>

        <p>Chúc bạn thành công với món tráng miệng hoàng gia này! Nếu muốn thưởng thức phiên bản nhà hàng, hãy đặt bàn tại BASILICO.</p>
      `
    },
    {
      id: 3, cat: 'su-kien',
      title: 'Đêm Nhạc Jazz & Wine Tasting Mỗi Thứ 6 Tại BASILICO',
      date: '05/04/2026', author: 'BASILICO Events', readTime: '3 phút',
      img: '../../assets/real_wine_dinner.png',
      content: `
        <p>Mỗi tối thứ Sáu, BASILICO biến hóa thành một <strong>jazz bar</strong> đầy mê hoặc — nơi âm nhạc sống động hòa quyện cùng những ly rượu vang tuyển chọn.</p>

        <h2>Chương Trình Chi Tiết</h2>
        <ul>
          <li><strong>18:00 – 19:00:</strong> Welcome cocktail và canapes</li>
          <li><strong>19:00 – 20:30:</strong> Wine tasting guide bởi sommelier Minh Quân — 5 loại vang Pháp</li>
          <li><strong>20:30 – 22:30:</strong> Live jazz band — The Saigon Swing Quartet</li>
        </ul>

        <h2>Wine List Đặc Biệt</h2>
        <p>Mỗi tuần, sommelier Minh Quân chọn 5 loại vang khác nhau từ các vùng trồng nho nổi tiếng:</p>
        <ul>
          <li>Bordeaux — Château Margaux 2018</li>
          <li>Burgundy — Domaine Romanée-Conti</li>
          <li>Champagne — Dom Pérignon Vintage</li>
          <li>Côtes du Rhône — Guigal Hermitage</li>
          <li>Loire Valley — Sancerre Blanc</li>
        </ul>

        <blockquote>"Ốt âm nhạc tuyệt vời nhất là khi nó được thưởng thức cùng một ly vang hoàn hảo." — Sommelier Minh Quân</blockquote>

        <h2>Thông Tin Đặt Chỗ</h2>
        <p>Giá vé: <strong>890.000₫/người</strong> (đã bao gồm welcome drink + 5 ly wine tasting + canapes). Số lượng giới hạn 30 khách/buổi.</p>
        <p>Đặt chỗ qua hotline <strong>090-123-4567</strong> — ưu tiên thành viên VIP BASILICO.</p>
      `
    },
    {
      id: 4, cat: 'tin-nha-hang',
      title: 'BASILICO Đạt Chứng Nhận Vệ Sinh An Toàn Thực Phẩm Loại A',
      date: '01/04/2026', author: 'Ban Quản Lý', readTime: '2 phút',
      img: '../../assets/real_restaurant_exterior.png',
      content: `
        <p>Chúng tôi vô cùng tự hào thông báo rằng <strong>BASILICO</strong> đã chính thức được Sở Y tế TP. Hồ Chí Minh cấp chứng nhận <strong>Vệ sinh an toàn thực phẩm Loại A</strong> — tiêu chuẩn cao nhất trong ngành F&B.</p>

        <h2>Tiêu Chí Đánh Giá</h2>
        <p>Đoàn thanh tra đã đánh giá nghiêm ngặt trên các tiêu chí:</p>
        <ul>
          <li>Quy trình bảo quản và xử lý thực phẩm</li>
          <li>Hệ thống cold chain (chuỗi lạnh) từ nhập kho đến chế biến</li>
          <li>Vệ sinh nhà bếp, dụng cụ và khu vực phục vụ</li>
          <li>Đào tạo nhân viên về an toàn thực phẩm</li>
          <li>Hệ thống truy xuất nguồn gốc nguyên liệu</li>
        </ul>

        <blockquote>"An toàn thực phẩm là nền tảng, không phải tùy chọn. Mỗi nguyên liệu tại BASILICO đều có thể truy xuất nguồn gốc trong vòng 24 giờ." — Bếp trưởng Chef Đức</blockquote>

        <h2>Cam Kết Của BASILICO</h2>
        <p>Chúng tôi cam kết duy trì và nâng cao hơn nữa các tiêu chuẩn an toàn thực phẩm, bởi sức khỏe và sự tin tưởng của khách hàng là ưu tiên hàng đầu.</p>
      `
    },
    {
      id: 5, cat: 'cong-thuc',
      title: 'Cách Làm Sốt Béarnaise — Linh Hồn Của Bít Tết Pháp',
      date: '28/03/2026', author: 'Chef Đức', readTime: '7 phút',
      img: '../../assets/real_steak_sauce.png',
      content: `
        <p><strong>Béarnaise</strong> — "nữ hoàng" của các loại nước sốt Pháp, người bạn đồng hành không thể thiếu của mọi miếng bít tết hoàn hảo.</p>

        <h2>Nguyên Liệu</h2>
        <ul>
          <li>3 lòng đỏ trứng gà ta</li>
          <li>200g bơ Échiré, đun chảy và tách váng</li>
          <li>2 muỗng canh giấm vang trắng</li>
          <li>1 muỗng canh hành shallot băm mịn</li>
          <li>1 muỗng canh estragon (húng tây) tươi, xắt nhuyễn</li>
          <li>Muối Maldon, tiêu trắng xay mịn</li>
        </ul>

        <h2>Các Bước Thực Hiện</h2>

        <h3>Bước 1: Chuẩn Bị Reduction</h3>
        <p>Đun giấm vang với hành shallot và cuống estragon trên lửa nhỏ cho đến khi còn 1 muỗng canh. Lọc gạn, để nguội.</p>

        <h3>Bước 2: Đánh Trứng Bain-Marie</h3>
        <p>Cho lòng đỏ trứng cùng reduction vào tô đặt trên nồi nước sôi nhẹ. Đánh bông liên tục bằng whisk cho đến khi hỗn hợp sánh đặc, nhấc whisk lên thấy dòng sốt chảy nhẹ nhàng.</p>

        <h3>Bước 3: Thêm Bơ Tách Váng</h3>
        <p>Rót từng chút bơ tách váng vào, đánh đều liên tục. Nếu sốt quá đặc, thêm vài giọt nước ấm. Nếu quá loãng, tăng tốc độ đánh.</p>

        <h3>Bước 4: Hoàn Thiện</h3>
        <p>Nêm muối, tiêu trắng. Thêm lá estragon tươi xắt nhuyễn. Phục vụ ngay lập tức!</p>

        <blockquote>"Béarnaise là bài thi cuối kỳ của mọi đầu bếp Pháp. Nếu bạn làm được sốt này, bạn có thể nấu bất cứ thứ gì." — Chef Đức</blockquote>
      `
    },
    {
      id: 6, cat: 'khuyen-mai',
      title: 'Happy Hour Thứ 6: Giảm 20% Tất Cả Đồ Uống 17:00-19:00',
      date: '25/03/2026', author: 'BASILICO Team', readTime: '1 phút',
      img: '../../assets/real_happy_hour.png',
      content: `
        <p>Mỗi chiều thứ Sáu từ <strong>17:00 đến 19:00</strong>, BASILICO mang đến "Giờ Vàng" — chương trình Happy Hour với giảm giá <strong>20%</strong> cho tất cả đồ uống.</p>

        <h2>Đồ Uống Trong Chương Trình</h2>
        <ul>
          <li>Tất cả cocktail signature và classic</li>
          <li>Rượu vang đỏ, trắng và rosé (theo ly)</li>
          <li>Bia thủ công nhập khẩu</li>
          <li>Mocktail và đồ uống không cồn</li>
        </ul>

        <h2>Gợi Ý Đặc Biệt</h2>
        <p>Bartender Minh gợi ý cocktail <strong>BASILICO Sunset</strong> — sáng tạo riêng của nhà hàng, gồm Aperol, champagne, passion fruit và basil tươi. Chỉ <strong>200.000₫</strong> trong Happy Hour (giá gốc 250.000₫).</p>

        <blockquote>"Giờ Vàng là khoảnh khắc tuyệt nhất để unwind sau một tuần bận rộn — đặc biệt khi có cocktail ngon trong tay." — Bartender Minh</blockquote>

        <p>Không cần đặt trước cho Happy Hour. Đến sớm để có chỗ ngồi tốt nhất tại quầy bar!</p>
      `
    },
    {
      id: 7, cat: 'tin-nha-hang',
      title: 'Khai Trương Khu Vực Sân Vườn Mới — Lãng Mạn Hơn Bao Giờ Hết',
      date: '20/03/2026', author: 'Ban Quản Lý', readTime: '3 phút',
      img: '../../assets/french_fresh_ingredients.png',
      content: `
        <p>BASILICO tự hào giới thiệu <strong>không gian sân vườn ngoài trời</strong> hoàn toàn mới — được thiết kế để mang đến trải nghiệm ẩm thực giữa thiên nhiên ngay tại trung tâm Sài Gòn.</p>

        <h2>Đặc Điểm Không Gian Mới</h2>
        <ul>
          <li><strong>Cây xanh tự nhiên:</strong> Hơn 50 loại cây nhiệt đới và thảo mộc ẩm thực</li>
          <li><strong>Fairy lights:</strong> Hệ thống đèn LED ấm áp tạo không gian lãng mạn</li>
          <li><strong>Quạt phun sương:</strong> Hệ thống làm mát ngoài trời thông minh</li>
          <li><strong>Sức chứa:</strong> 40 chỗ ngồi, bao gồm 2 khu VIP riêng tư</li>
          <li><strong>Nhạc sống:</strong> Acoustic guitar mỗi tối cuối tuần</li>
        </ul>

        <h2>Menu Đặc Biệt Cho Sân Vườn</h2>
        <p>Chúng tôi ra mắt menu <strong>"Garden Grill"</strong> riêng cho khu vực ngoài trời, tập trung vào các món nướng BBQ kiểu Pháp và salad tươi.</p>

        <blockquote>"Sân vườn mới là lời tri ân cho những ai yêu thiên nhiên và muốn tìm một góc bình yên giữa Sài Gòn." — Chủ nhà hàng</blockquote>

        <p>Khu vực sân vườn mở cửa từ <strong>17:00 – 22:00 mỗi tối</strong>. Đặt bàn trước để đảm bảo có chỗ tốt nhất!</p>
      `
    },
    {
      id: 8, cat: 'su-kien',
      title: 'Workshop Nấu Ăn Cuối Tuần: Học Làm Pasta Tươi Cùng Chef Đức',
      date: '15/03/2026', author: 'BASILICO Events', readTime: '4 phút',
      img: '../../assets/real_chef_plating.png',
      content: `
        <p>Bạn muốn tự tay làm pasta tươi kiểu Ý? Hãy tham gia <strong>workshop nấu ăn</strong> mỗi Chủ Nhật tại BASILICO — hướng dẫn trực tiếp bởi Bếp trưởng Chef Đức!</p>

        <h2>Nội Dung Workshop</h2>
        <ul>
          <li><strong>Phần 1 (60 phút):</strong> Học cách nhào bột, nghỉ bột và cán mỏng bằng tay</li>
          <li><strong>Phần 2 (60 phút):</strong> Tạo hình — fettuccine, ravioli, pappardelle</li>
          <li><strong>Phần 3 (60 phút):</strong> Nấu 2 loại sốt: Carbonara và Pomodoro</li>
          <li><strong>Thưởng thức:</strong> Ăn trưa với pasta bạn tự tay làm!</li>
        </ul>

        <h2>Thông Tin Chi Tiết</h2>
        <ul>
          <li><strong>Thời gian:</strong> Mỗi Chủ Nhật, 09:00 – 12:00</li>
          <li><strong>Giá vé:</strong> 650.000₫/người (bao gồm nguyên liệu + bữa trưa)</li>
          <li><strong>Số lượng:</strong> Tối đa 12 người/buổi</li>
          <li><strong>Phù hợp:</strong> Mọi trình độ, kể cả người mới bắt đầu</li>
        </ul>

        <blockquote>"Pasta tươi khác pasta khô như đêm khác ngày. Khi bạn tự tay nhào bột và cảm nhận kết cấu mềm mại, bạn sẽ không bao giờ muốn quay lại pasta đóng hộp." — Chef Đức</blockquote>

        <p>Đăng ký ngay qua hotline <strong>090-123-4567</strong> hoặc inbox fanpage BASILICO. Nhận quà tặng tạp dề BASILICO cho 5 người đăng ký sớm nhất!</p>
      `
    },
    {
      id: 9, cat: 'cong-thuc',
      title: '5 Loại Nước Sốt Pháp Kinh Điển Bạn Nên Biết',
      date: '10/03/2026', author: 'Chef Đức', readTime: '8 phút',
      img: '../../assets/french_bar_lounge.png',
      content: `
        <p>Ẩm thực Pháp được xây dựng trên hệ thống <strong>5 "mother sauces"</strong> — 5 loại nước sốt nền tảng mà từ đó hàng trăm biến thể được sinh ra. Đây là kiến thức bắt buộc cho bất kỳ đầu bếp nghiêm túc nào.</p>

        <h2>1. Béchamel — Sốt Trắng</h2>
        <p>Bơ + Bột mì + Sữa. Đơn giản nhưng thanh lịch. Dùng trong Croque Monsieur, Lasagna, Gratin. Bí quyết: khuấy liên tục trên lửa nhỏ, nêm nhục đậu khấu mài tươi.</p>

        <h2>2. Velouté — Sốt Nhung</h2>
        <p>Bơ + Bột mì + Nước dùng sáng (gà/cá/bê). Mượt mà như nhung, là nền cho sốt nấm, sốt kem tôm hùm. Lọc qua rây mịn để đạt độ smooth hoàn hảo.</p>

        <h2>3. Espagnole — Sốt Nâu</h2>
        <p>Bơ + Bột mì + Nước dùng bò đậm + Mirepoix + Cà chua. Hầm chậm 4-6 tiếng. Khi kết hợp với rượu vang và demi-glace, trở thành sốt Bordelaise huyền thoại.</p>

        <h2>4. Hollandaise — Sốt Trứng Bơ</h2>
        <p>Lòng đỏ trứng + Bơ tách váng + Chanh. Đánh bain-marie ở 65°C chính xác. Sốt cho Eggs Benedict, măng tây, cá nướng. Phiên bản thêm estragon = Béarnaise.</p>

        <h2>5. Sauce Tomate — Sốt Cà Chua</h2>
        <p>Cà chua San Marzano + Hành + Tỏi + Thảo mộc. Nấu chậm 2 giờ để cà chua caramel hóa tự nhiên. Dùng trong Ratatouille, Pasta, Pizza và vô số biến thể.</p>

        <blockquote>"Nắm vững 5 mother sauces, bạn có chìa khóa mở mọi cánh cửa ẩm thực Pháp." — Chef Đức</blockquote>
      `
    }
  ];

  /* 4. LẤY POST ID TỪ URL */
  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get('id'), 10);
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    window.location.href = 'index.html';
    return;
  }

  // Update title
  document.title = `${post.title} | BASILICO Tin Tức`;

  // Hero
  $('#articleHeroImg').src = post.img;
  $('#articleHeroImg').alt = post.title;
  $('#breadcrumbTitle').textContent = post.title.length > 30 ? post.title.slice(0, 30) + '…' : post.title;
  $('#articleCat').textContent = catNameMap[post.cat] || post.cat;
  $('#articleTitle').textContent = post.title;
  $('#articleDate').textContent = post.date;
  $('#articleAuthor').textContent = post.author;
  $('#articleReadTime').textContent = post.readTime;

  // Body
  $('#articleBody').innerHTML = post.content;

  // Share buttons
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(post.title);
  const fbBtn = $('.share-fb');
  const twBtn = $('.share-tw');
  const linkBtn = $('.share-link');
  fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  fbBtn.target = '_blank';
  twBtn.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
  twBtn.target = '_blank';
  linkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
      linkBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
      setTimeout(() => { linkBtn.innerHTML = '<i class="bi bi-link-45deg"></i>'; }, 2000);
    });
  });

  /* 5. PREV/NEXT NAVIGATION */
  const navEl = $('#articleNav');
  const idx = blogPosts.findIndex(p => p.id === postId);
  const prev = idx > 0 ? blogPosts[idx - 1] : null;
  const next = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;

  let navHTML = '';
  if (prev) {
    navHTML += `<a href="bai-viet.html?id=${prev.id}" class="article-nav-item">
      <span class="nav-label"><i class="bi bi-arrow-left"></i> Bài trước</span>
      <span class="nav-title">${prev.title}</span>
    </a>`;
  } else {
    navHTML += '<div></div>';
  }
  if (next) {
    navHTML += `<a href="bai-viet.html?id=${next.id}" class="article-nav-item article-nav-item--next">
      <span class="nav-label">Bài sau <i class="bi bi-arrow-right"></i></span>
      <span class="nav-title">${next.title}</span>
    </a>`;
  }
  navEl.innerHTML = navHTML;

  /* 6. RELATED POSTS */
  const related = blogPosts
    .filter(p => p.cat === post.cat && p.id !== post.id)
    .slice(0, 3);
  if (related.length < 3) {
    const others = blogPosts.filter(p => p.cat !== post.cat && p.id !== post.id);
    while (related.length < 3 && others.length > 0) related.push(others.shift());
  }

  $('#relatedPostsGrid').innerHTML = related.map(r => `
    <a href="bai-viet.html?id=${r.id}" class="related-post-card">
      <img src="${r.img}" alt="${r.title}" loading="lazy">
      <div class="related-post-card-body">
        <h4>${r.title}</h4>
        <span class="rp-meta"><i class="bi bi-calendar3"></i> ${r.date} · ${r.readTime}</span>
      </div>
    </a>
  `).join('');

  /* 7. REVEAL */
  const revealElements = $$('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); ro.unobserve(e.target); } });
    }, { threshold: .15 });
    revealElements.forEach(el => ro.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

}); // DOMContentLoaded
