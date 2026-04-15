/* ================================================================
   BASILICO — Dish Detail Page JS (ThucDon/js/chi-tiet.js)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => (p || document).querySelectorAll(s);

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
    setTimeout(() => { preloader.classList.add('hidden'); document.body.classList.add('loaded'); }, 400);
  }
  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 4000);

  /* ==============================================================
     2. HEADER + FAB + SIDEBAR
     ============================================================== */
  const header = $('.site-header');
  const fab = $('#fab-scroll-top');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', scrollY > 80);
    fab.classList.toggle('visible', scrollY > 300);
  }, { passive: true });
  fab.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const sidebar = $('#mobileSidebar');
  const overlay = $('#sidebarOverlay');
  const hamBtn = $('#hd-10');
  function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; hamBtn.setAttribute('aria-expanded', 'true'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; hamBtn.setAttribute('aria-expanded', 'false'); }
  hamBtn.addEventListener('click', openSidebar);
  $('#sidebarClose').addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  $$('.sidebar-nav a, .sidebar-cta a').forEach(a => a.addEventListener('click', closeSidebar));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar(); });

  /* ==============================================================
     3. DỮ LIỆU MÓN ĂN — Expanded detail data
     ============================================================== */
  const catNameMap = {
    'khai-vi': 'Khai Vị', 'mon-chinh': 'Món Chính',
    'trang-mieng': 'Tráng Miệng', 'do-uong': 'Đồ Uống', 'combo': 'Combo'
  };

  const tagNameMap = {
    'hai-san': '🐟 Hải Sản', 'chay': '🌱 Chay',
    'dac-san': '⭐ Đặc Sản', 'it-calo': '💚 Ít Calo'
  };

  const menuItems = [
    {
      id: 0, name: 'Súp Hành Pháp Gratinée', cat: 'khai-vi', tags: ['dac-san'],
      price: '180.000₫', desc: 'Súp hành truyền thống Pháp phủ phô mai Gruyère nướng vàng, thơm nức. Hành tây được caramel hóa chậm trong 2 giờ với bơ Normandy, chan nước dùng bò hầm 8 tiếng và hoàn thiện với lớp phô mai Gruyère Thụy Sĩ nướng giòn.',
      img: '../../assets/real_french_soup.png',
      time: '25 phút', cal: '320 kcal', serve: '1 người', rating: '4.9/5',
      ingredients: ['Hành tây Đà Lạt', 'Phô mai Gruyère Thụy Sĩ', 'Bơ Normandy', 'Nước dùng bò 8 tiếng', 'Rượu vang trắng', 'Bánh mì baguette'],
      allergens: [{ name: 'Sữa', type: 'warning' }, { name: 'Gluten', type: 'warning' }, { name: 'Không Hạt', type: 'safe' }],
      pairing: 'Kết hợp hoàn hảo với một ly Chardonnay Bourgogne hoặc Beaujolais nhẹ nhàng. Nếu thích bia, hãy thử Belgian Witbier.',
      chefNote: '"Bí quyết của món súp này nằm ở sự kiên nhẫn — hành phải được caramel hóa đủ 2 giờ để ra được vị ngọt tự nhiên sâu lắng nhất."'
    },
    {
      id: 1, name: 'Nấm Truffle Crostini', cat: 'khai-vi', tags: ['chay', 'dac-san'],
      price: '220.000₫', desc: 'Bánh mì nướng giòn phủ nấm truffle đen và kem phô mai ricotta tươi. Nấm truffle Périgord thu hoạch theo mùa, bào mỏng lên lớp ricotta tươi nhập từ Ý, rắc thêm húng tây tím và dầu truffle thượng hạng.',
      img: '../../assets/real_risotto_truffle.png',
      time: '15 phút', cal: '280 kcal', serve: '1 người', rating: '4.7/5',
      ingredients: ['Nấm truffle Périgord', 'Phô mai Ricotta Ý', 'Bánh mì Ciabatta', 'Dầu truffle', 'Húng tây tím', 'Muối Maldon'],
      allergens: [{ name: 'Sữa', type: 'warning' }, { name: 'Gluten', type: 'warning' }, { name: 'Không Trứng', type: 'safe' }],
      pairing: 'Một ly Prosecco Ý hoặc Pinot Grigio sẽ tôn lên hương thơm tinh tế của truffle.',
      chefNote: '"Truffle phải được bào ngay trước khi phục vụ — mỗi giây trôi qua đều làm giảm hương thơm quý giá."'
    },
    {
      id: 2, name: 'Salad Niçoise Hải Sản', cat: 'khai-vi', tags: ['hai-san', 'it-calo'],
      price: '250.000₫', desc: 'Salad tươi kiểu Nice với cá ngừ áp chảo, trứng luộc và ô liu đen. Rau xanh hữu cơ Đà Lạt, khoai tây baby luộc, đậu que Pháp, cà chua cherry và anchovy, trộn với vinaigrette mù tạt Dijon cổ điển.',
      img: '../../assets/real_garden_salad.png',
      time: '20 phút', cal: '350 kcal', serve: '1 người', rating: '4.6/5',
      ingredients: ['Cá ngừ đại dương', 'Trứng gà ta', 'Ô liu đen Kalamata', 'Khoai tây baby', 'Đậu que Pháp', 'Mù tạt Dijon'],
      allergens: [{ name: 'Hải sản', type: 'warning' }, { name: 'Trứng', type: 'warning' }, { name: 'Không Sữa', type: 'safe' }],
      pairing: 'Rosé de Provence là sự kết hợp kinh điển cho Salad Niçoise — tươi mát và harmonious.',
      chefNote: '"Cá ngừ phải được áp chảo ở nhiệt cao, chỉ 30 giây mỗi mặt để giữ được lõi tái hồng."'
    },
    {
      id: 3, name: 'Foie Gras Poêlé', cat: 'khai-vi', tags: ['dac-san'],
      price: '480.000₫', desc: 'Gan ngỗng áp chảo hoàn hảo, phục vụ kèm mứt quả sung tươi. Foie gras loại A từ vùng Périgord, áp chảo nhanh ở nhiệt cao để giữ lớp ngoài giòn caramel và bên trong tan chảy mềm mượt.',
      img: '../../assets/real_foie_gras.png',
      time: '15 phút', cal: '520 kcal', serve: '1 người', rating: '4.9/5',
      ingredients: ['Foie gras Périgord loại A', 'Quả sung tươi', 'Mật ong hoa lavender', 'Muối Fleur de Sel', 'Bánh brioche nướng', 'Rau mầm micro'],
      allergens: [{ name: 'Gan', type: 'warning' }, { name: 'Gluten', type: 'warning' }, { name: 'Không Hải Sản', type: 'safe' }],
      pairing: 'Sauternes hoặc Monbazillac — vang ngọt Pháp là bạn đồng hành không thể thiếu của Foie Gras.',
      chefNote: '"Foie gras phải ở nhiệt độ phòng 15 phút trước khi nấu. Chảo gang phải nóng đỏ — 45 giây mỗi mặt, không hơn."'
    },
    {
      id: 4, name: 'Rau Củ Nướng Provence', cat: 'khai-vi', tags: ['chay', 'it-calo'],
      price: '160.000₫', desc: 'Rau củ theo mùa nướng với thảo mộc Provence và dầu ô liu extra virgin. Cà tím, ớt chuông, zucchini và cà chua bi nướng than hoa, rắc thảo mộc Herbes de Provence và dầu ô liu Arbequina.',
      img: '../../assets/real_garden_salad.png',
      time: '30 phút', cal: '180 kcal', serve: '1–2 người', rating: '4.5/5',
      ingredients: ['Cà tím baby', 'Ớt chuông 3 màu', 'Zucchini Ý', 'Cà chua bi', 'Herbes de Provence', 'Dầu ô liu Arbequina'],
      allergens: [{ name: 'Không Gluten', type: 'safe' }, { name: 'Không Sữa', type: 'safe' }, { name: 'Thuần Chay', type: 'safe' }],
      pairing: 'Một ly Sauvignon Blanc Loire hoặc nước chanh thủ công để giữ cảm giác nhẹ nhàng.',
      chefNote: '"Mỗi loại rau cần thời gian nướng khác nhau — cà tím trước, zucchini sau — để tất cả chín đều hoàn hảo."'
    },
    {
      id: 5, name: 'Cá Hồi Nướng Thảo Mộc', cat: 'mon-chinh', tags: ['hai-san', 'it-calo'],
      price: '580.000₫', desc: 'Cá hồi Na Uy nướng hoàn hảo với rau củ theo mùa và sốt bơ chanh. Phi lê cá hồi Atlantic nguyên khối 250g, ướp thảo mộc tươi, nướng ở 200°C đến khi vỏ giòn, ruột vẫn moist — phục vụ kèm măng tây nướng và sốt beurre blanc.',
      img: '../../assets/real_grilled_salmon.png',
      time: '25 phút', cal: '450 kcal', serve: '1 người', rating: '4.8/5',
      ingredients: ['Cá hồi Na Uy 250g', 'Măng tây xanh', 'Bơ Échiré', 'Chanh vàng Menton', 'Thì là tươi', 'Khoai tây baby nướng'],
      allergens: [{ name: 'Hải sản', type: 'warning' }, { name: 'Sữa', type: 'warning' }, { name: 'Không Gluten', type: 'safe' }],
      pairing: 'Chablis Premier Cru hoặc Sancerre — mineral, crisp và tôn lên vị ngọt tự nhiên của cá hồi.',
      chefNote: '"Bí quyết cá hồi hoàn hảo: da phải thật khô trước khi đặt lên chảo nóng, và chỉ lật MỘT lần duy nhất."'
    },
    {
      id: 6, name: 'Bò Thăn Nội Bít Tết', cat: 'mon-chinh', tags: ['dac-san'],
      price: '850.000₫', desc: 'Bò thăn nội Úc hảo hạng nướng theo yêu cầu, kèm khoai tây nghiền truffle. Wagyu MBS 4-5 được ủ khô 28 ngày, nướng than Binchotan và phục vụ kèm khoai tây nghiền truffle, rau seasonal và sốt au poivre.',
      img: '../../assets/real_beef_tenderloin.png',
      time: '35 phút', cal: '680 kcal', serve: '1 người', rating: '4.9/5',
      ingredients: ['Bò Wagyu Úc MBS 4-5', 'Khoai tây Agria', 'Nấm truffle đen', 'Tiêu đen Kampot', 'Bơ Échiré', 'Cognac XO'],
      allergens: [{ name: 'Sữa', type: 'warning' }, { name: 'Rượu', type: 'warning' }, { name: 'Không Gluten', type: 'safe' }],
      pairing: 'Bordeaux Grand Cru Classé, Cabernet Sauvignon Napa Valley hoặc Barolo Piemonte.',
      chefNote: '"Bò phải nghỉ (rest) ít nhất 5 phút sau khi nướng. Đây là bước quan trọng nhất mà nhiều người bỏ qua — nó giữ nước thịt bên trong thay vì chảy ra đĩa."'
    },
    {
      id: 7, name: 'Tôm Hùm Thermidor', cat: 'mon-chinh', tags: ['hai-san', 'dac-san'],
      price: '1.380.000₫', desc: 'Tôm hùm Maine nhồi nhân phô mai nướng vàng, phong cách Thermidor cổ điển. Tôm hùm Maine 500g luộc nhanh, tách thịt, trộn với sốt kem mù tạt, nhồi lại vỏ và gratinée với phô mai Gruyère đến vàng.',
      img: '../../assets/real_lobster_thermidor.png',
      time: '40 phút', cal: '580 kcal', serve: '1 người', rating: '5.0/5',
      ingredients: ['Tôm hùm Maine 500g', 'Phô mai Gruyère', 'Mù tạt Dijon', 'Kem tươi Normandy', 'Rượu Cognac', 'Hành shallot Pháp'],
      allergens: [{ name: 'Hải sản', type: 'warning' }, { name: 'Sữa', type: 'warning' }, { name: 'Rượu', type: 'warning' }],
      pairing: 'Meursault hoặc Puligny-Montrachet — Burgundy trắng cao cấp xứng đôi với Lobster Thermidor.',
      chefNote: '"Thermidor là đỉnh cao của ẩm thực Pháp cổ điển. Mỗi con tôm hùm được tuyển chọn riêng từ tank sống tại nhà hàng."'
    },
    {
      id: 8, name: 'Vịt Confit Truyền Thống', cat: 'mon-chinh', tags: ['dac-san'],
      price: '980.000₫', desc: 'Đùi vịt Confit chậm 12 giờ, da giòn hoàn hảo kèm rau xanh seasonal. Đùi vịt Moulard ướp muối thảo mộc 24 giờ, sau đó confit chậm trong mỡ vịt ở 85°C suốt 12 tiếng, hoàn thiện bằng nướng giòn da trước khi phục vụ.',
      img: '../../assets/real_duck_confit.png',
      time: '15 phút (đã confit sẵn)', cal: '750 kcal', serve: '1 người', rating: '4.8/5',
      ingredients: ['Đùi vịt Moulard', 'Mỡ vịt nguyên chất', 'Tỏi đen', 'Thyme tươi', 'Khoai tây Sarladaises', 'Rau mùa'],
      allergens: [{ name: 'Không Gluten', type: 'safe' }, { name: 'Không Sữa', type: 'safe' }, { name: 'Không Hải Sản', type: 'safe' }],
      pairing: 'Cahors (Malbec) hoặc Madiran — rượu vang đỏ đậm từ Tây Nam Pháp, quê hương của Confit.',
      chefNote: '"Confit là kỹ thuật bảo quản cổ xưa nhất của Pháp. Chúng tôi vẫn giữ nguyên phương pháp 200 năm tuổi."'
    },
    {
      id: 9, name: 'Cơm Nấm Truffle Đen', cat: 'mon-chinh', tags: ['chay', 'dac-san'],
      price: '650.000₫', desc: 'Risotto kem mịn với nấm truffle Périgord đen, phô mai Parmigiano 24 tháng. Gạo Arborio Ý nấu chậm với nước dùng rau, từng muỗng một, đến khi đạt độ kem mượt mà, rắc truffle bào và Parmigiano Reggiano.',
      img: '../../assets/real_risotto_truffle.png',
      time: '30 phút', cal: '520 kcal', serve: '1 người', rating: '4.7/5',
      ingredients: ['Gạo Arborio Ý', 'Nấm truffle Périgord', 'Parmigiano Reggiano 24th', 'Hành shallot', 'Rượu vang trắng', 'Bơ Normandy'],
      allergens: [{ name: 'Sữa', type: 'warning' }, { name: 'Rượu', type: 'warning' }, { name: 'Chay', type: 'safe' }],
      pairing: 'Barolo hoặc Nebbiolo — earthiness của rượu sẽ complement truffle một cách tuyệt vời.',
      chefNote: '"Risotto phải đƯợc khuấy liên tục 18 phút — đây không phải món có thể làm vội vàng."'
    },
    {
      id: 10, name: 'Cá Ngừ Tataki Áp Chảo', cat: 'mon-chinh', tags: ['hai-san', 'it-calo'],
      price: '720.000₫', desc: 'Cá ngừ đại dương tươi áp chảo tái, phục vụ kèm wasabi và gừng ngâm.',
      img: '../../assets/real_tuna_tartare.png',
      time: '15 phút', cal: '280 kcal', serve: '1 người', rating: '4.8/5',
      ingredients: ['Cá ngừ vây xanh', 'Wasabi tươi', 'Gừng ngâm', 'Nước tương Tamari', 'Mè rang', 'Hành lá'],
      allergens: [{ name: 'Hải sản', type: 'warning' }, { name: 'Đậu nành', type: 'warning' }, { name: 'Mè', type: 'warning' }],
      pairing: 'Sake Junmai Daiginjo hoặc Grüner Veltliner Áo — tươi mát, herbal.',
      chefNote: '"Cá ngừ sashimi-grade phải được áp chảo dưới 10 giây mỗi mặt ở nhiệt cực cao."'
    },
    {
      id: 11, name: 'Sườn Cừu Nướng Rosemary', cat: 'mon-chinh', tags: ['dac-san'],
      price: '920.000₫', desc: 'Sườn cừu New Zealand nướng tái hồng, ướp húng tây và tỏi nướng.',
      img: '../../assets/real_lamb_chops.png',
      time: '30 phút', cal: '620 kcal', serve: '1 người', rating: '4.8/5',
      ingredients: ['Sườn cừu New Zealand', 'Rosemary tươi', 'Tỏi nướng', 'Dầu ô liu', 'Khoai tây gratin', 'Ratatouille'],
      allergens: [{ name: 'Không Gluten', type: 'safe' }, { name: 'Không Sữa', type: 'safe' }],
      pairing: 'Châteauneuf-du-Pape hoặc Rioja Gran Reserva — đậm đà, ấm áp, xứng với cừu.',
      chefNote: '"Sườn cừu phải được đưa về nhiệt độ phòng 30 phút trước khi nướng — nếu không, bên ngoài cháy mà bên trong vẫn lạnh."'
    },
    {
      id: 12, name: 'Bạch Tuộc Nướng Địa Trung Hải', cat: 'mon-chinh', tags: ['hai-san'],
      price: '520.000₫', desc: 'Bạch tuộc nướng mềm mại kiểu Địa Trung Hải với khoai tây và ớt paprika.',
      img: '../../assets/real_octopus_grilled.png',
      time: '45 phút', cal: '320 kcal', serve: '1 người', rating: '4.6/5',
      ingredients: ['Bạch tuộc Địa Trung Hải', 'Khoai tây fingerling', 'Ớt paprika hun khói', 'Chanh vàng', 'Tỏi', 'Rau mùi tây'],
      allergens: [{ name: 'Hải sản', type: 'warning' }, { name: 'Không Gluten', type: 'safe' }],
      pairing: 'Albariño Tây Ban Nha hoặc Vermentino Sardinia — minerally, saline.',
      chefNote: '"Bạch tuộc phải được luộc mềm trước 90 phút rồi mới nướng — đây là bước không thể bỏ qua."'
    },
    {
      id: 13, name: 'Bánh Soufflé Sô-cô-la', cat: 'trang-mieng', tags: ['dac-san'],
      price: '220.000₫', desc: 'Soufflé sô-cô-la đen Valrhona nóng hổi, tan chảy từ bên trong. Được nướng theo order, phục vụ ngay khi ra lò kèm kem vanilla Madagascar.',
      img: '../../assets/real_chocolate_souffle.png',
      time: '20 phút', cal: '380 kcal', serve: '1 người', rating: '4.9/5',
      ingredients: ['Sô-cô-la Valrhona 70%', 'Bơ Échiré', 'Trứng gà ta', 'Đường mía organic', 'Vanilla Madagascar', 'Kem tươi'],
      allergens: [{ name: 'Sữa', type: 'warning' }, { name: 'Trứng', type: 'warning' }, { name: 'Gluten', type: 'warning' }],
      pairing: 'Banyuls hoặc Port Ruby — vang ngọt đỏ đậm, perfect match cho chocolate.',
      chefNote: '"Soufflé chỉ giữ được 90 giây sau khi ra lò — vì vậy chúng tôi luôn phục vụ ngay lập tức, không chờ đợi."'
    },
    {
      id: 14, name: 'Crème Brûlée Vanilla', cat: 'trang-mieng', tags: [],
      price: '180.000₫', desc: 'Kem trứng Pháp cổ điển với lớp caramel giòn tan, hương vanilla Madagascar.',
      img: '../../assets/real_creme_brulee.png',
      time: '10 phút', cal: '320 kcal', serve: '1 người', rating: '4.8/5',
      ingredients: ['Kem tươi Normandy', 'Lòng đỏ trứng', 'Vanilla Madagascar', 'Đường mía', 'Muối biển'],
      allergens: [{ name: 'Sữa', type: 'warning' }, { name: 'Trứng', type: 'warning' }],
      pairing: 'Muscat de Beaumes-de-Venise hoặc trà Earl Grey nóng.',
      chefNote: '"Lớp caramel phải được đốt torch ngay trước khi phục vụ — giòn ở trên, mềm mượt bên dưới."'
    },
    {
      id: 15, name: 'Bánh Tarte Tatin Táo', cat: 'trang-mieng', tags: [],
      price: '200.000₫', desc: 'Bánh táo lật úp kiểu Pháp với caramel bơ và kem tươi Chantilly.',
      img: '../../assets/real_chocolate_souffle.png',
      time: '15 phút', cal: '350 kcal', serve: '1 người', rating: '4.6/5',
      ingredients: ['Táo Pink Lady', 'Bơ Échiré', 'Đường caramel', 'Bột mì T55', 'Kem Chantilly', 'Quế Ceylon'],
      allergens: [{ name: 'Sữa', type: 'warning' }, { name: 'Gluten', type: 'warning' }],
      pairing: 'Calvados hoặc Cidre Breton — hương táo với táo, thật harmonious.',
      chefNote: '"Tarte Tatin được phát minh do một sai lầm may mắn — và chúng tôi giữ nguyên công thức gốc từ 1880."'
    },
  ];

  /* ==============================================================
     4. LẤY DISH ID TỪ URL → RENDER
     ============================================================== */
  const params = new URLSearchParams(window.location.search);
  const dishId = parseInt(params.get('id'), 10);
  const dish = menuItems.find(d => d.id === dishId);

  if (!dish) {
    // Fallback to first dish if no valid ID
    window.location.href = 'index.html';
    return;
  }

  // Update page title
  document.title = `${dish.name} | BASILICO Nhà Hàng`;

  // Breadcrumb
  $('#breadcrumbDish').textContent = dish.name;

  // Main image
  const mainImg = $('#dishMainImg');
  mainImg.src = dish.img;
  mainImg.alt = dish.name;

  // Badges
  const badgesEl = $('#dishBadges');
  badgesEl.innerHTML = `<span class="detail-badge detail-badge--cat">${catNameMap[dish.cat]}</span>` +
    dish.tags.map(t => `<span class="detail-badge detail-badge--tag">${tagNameMap[t] || t}</span>`).join('');

  // Info
  $('#dishCat').textContent = catNameMap[dish.cat];
  $('#dishName').textContent = dish.name;
  $('#dishDesc').textContent = dish.desc;
  $('#dishPrice').textContent = dish.price;

  // Meta
  $('#metaTime').textContent = dish.time;
  $('#metaCal').textContent = dish.cal;
  $('#metaServe').textContent = dish.serve;
  $('#metaRating').textContent = dish.rating;

  // Ingredients
  $('#ingredientList').innerHTML = dish.ingredients.map(i => `<li>${i}</li>`).join('');

  // Allergens
  $('#allergenTags').innerHTML = dish.allergens.map(a =>
    `<span class="allergen-tag allergen-tag--${a.type}"><i class="bi bi-${a.type === 'warning' ? 'exclamation-triangle' : 'check-circle'}"></i> ${a.name}</span>`
  ).join('');

  // Pairing
  $('#pairingText').textContent = dish.pairing;

  // Chef note
  $('#chefNote').textContent = dish.chefNote;

  /* ==============================================================
     5. RELATED DISHES — 4 món cùng danh mục (trừ món hiện tại)
     ============================================================== */
  const related = menuItems
    .filter(d => d.cat === dish.cat && d.id !== dish.id)
    .slice(0, 4);

  // If not enough from same category, fill from others
  if (related.length < 4) {
    const others = menuItems.filter(d => d.cat !== dish.cat && d.id !== dish.id);
    while (related.length < 4 && others.length > 0) {
      related.push(others.shift());
    }
  }

  const relatedGrid = $('#relatedGrid');
  relatedGrid.innerHTML = related.map(r => `
    <a href="chi-tiet.html?id=${r.id}" class="related-card">
      <img src="${r.img}" alt="${r.name}" loading="lazy">
      <div class="related-card-body">
        <h4>${r.name}</h4>
        <span class="related-price">${r.price}</span>
      </div>
    </a>
  `).join('');

  /* ==============================================================
     6. REVEAL ANIMATIONS
     ============================================================== */
  const revealElements = $$('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); ro.unobserve(e.target); } });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => ro.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

}); // DOMContentLoaded
