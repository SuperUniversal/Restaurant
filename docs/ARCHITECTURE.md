# Architecture — TrangChu (Landing Page)

> Auto-generated on 2026-04-13

## Overview

Website nhà hàng BASILICO xây dựng bằng HTML/CSS/JS thuần (vanilla) với Bootstrap 5.3 làm UI framework. Kiến trúc đơn giản, không có build step, không framework JS — phù hợp cho static landing page hiệu suất cao.

```
┌───────────────────────────────────────────────────────────────┐
│                       USER (Browser)                          │
└─────────────────────────┬─────────────────────────────────────┘
                          │  HTTP Request
                          ▼
┌───────────────────────────────────────────────────────────────┐
│              Static File Server (index.html)                  │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐     │
│  │  style.css   │  │   main.js    │  │  assets/*.png    │     │
│  │  (Custom     │  │  (Vanilla    │  │  (Food images,   │     │
│  │   + Design   │  │   DOM APIs)  │  │   hero, chef)    │     │
│  │   Tokens)    │  │              │  │                  │     │
│  └─────────────┘  └──────────────┘  └──────────────────┘     │
└───────────────────────────────────────────────────────────────┘
                          │
                          ▼  CDN (External)
┌───────────────────────────────────────────────────────────────┐
│  Bootstrap 5.3 CSS + JS  │  Bootstrap Icons  │  Google Fonts  │
└───────────────────────────────────────────────────────────────┘
```

## Components

### Front-end/TrangChu/ (Main Page)
- **Purpose:** Landing page hoàn chỉnh với 14 sections
- **Location:** `Front-end/TrangChu/`
- **Files:** 3 files (index.html, css/style.css, js/main.js)
- **Pattern:** Single-page, section-based layout

| File | Purpose | Priority |
|------|---------|----------|
| `index.html` | Cấu trúc 14 sections, semantic HTML5, Bootstrap grid | High |
| `css/style.css` | Design tokens, custom styles, section-specific overrides | High |
| `js/main.js` | Sticky header, tab switch, carousel, form validation, FAB, scroll reveal | High |

### docs/ (Specifications)
- **Purpose:** Tài liệu thiết kế và quy chuẩn
- **Location:** `docs/`

| File | Purpose | Priority |
|------|---------|----------|
| `TrangChu.md` | UI/UX spec đầy đủ 14 sections — element catalogs, interaction specs, state management | High |
| `DesignSystem.md` | Bảng màu, typography, spacing, animation tokens — nguồn sự thật duy nhất cho styling | High |
| `SPEC.md` | GSD specification — vision, goals, constraints, success criteria | Medium |
| `ARCHITECTURE.md` | Tệp này — kiến trúc hệ thống | Medium |
| `STACK.md` | Technology stack reference | Low |
| `ROADMAP.md` | Tiến trình phát triển | Low |
| `STATE.md` | Trạng thái session hiện tại | Low |

### assets/ (Media)
- **Purpose:** Hình ảnh món ăn, nhà hàng, chefs
- **Location:** `assets/`

| File | Purpose | Used In Section |
|------|---------|-----------------|
| `french_restaurant_hero.png` | Hero background | SEC-02 |
| `french_salmon.png` | Món cá hồi | SEC-03, SEC-05 |
| `french_beef_steak.png` | Bò steak | SEC-05 |
| `french_lobster.png` | Tôm hùm Thermidor | SEC-05 |
| `french_duck_confit.png` | Vịt confit | SEC-05 |
| `french_truffle_risotto.png` | Risotto truffle | SEC-05 |
| `french_tuna_tataki.png` | Cá ngừ tataki | SEC-05 |
| `french_dessert_souffle.png` | Soufflé chocolate | SEC-05 |
| `french_cocktail_mojito.png` | Cocktail mojito | SEC-05 |
| `french_octopus_dish.png` | Bạch tuộc nướng | SEC-12 |
| `french_chef_cooking.png` | Chef đang nấu | SEC-09 |
| `french_dining_experience.png` | Trải nghiệm dining | SEC-07 |

## Data Flow

1. **User truy cập URL** → Browser tải `index.html`
2. **Browser parse HTML** → Tải Bootstrap CSS/JS từ CDN, Google Fonts, style.css
3. **DOMContentLoaded** → `main.js` khởi tạo:
   - Sticky header scroll listener
   - Intersection Observer cho scroll reveal
   - Tab click handlers cho menu section
   - Testimonials carousel auto-play
   - Form validation listeners
   - FAB scroll-to-top visibility toggle
4. **User tương tác** → DOM manipulation thuần (no virtual DOM, no state library)
5. **Form submit** → Client-side validation → Toast notification (mock, không gọi API thật)

## Data Flow Diagram — Interactions

```
User Action                    JS Handler                   DOM Update
─────────────────────────────────────────────────────────────────────
Scroll > 80px          →  onScroll()              →  Header bg + shadow
Scroll > 300px         →  onScroll()              →  FAB visible
Click Tab              →  handleTabClick()        →  Swap menu list content
Click Nav Link         →  smoothScroll()          →  Scroll to section
Submit Form            →  handleFormSubmit()      →  Validate → Toast
Hover Card             →  CSS :hover              →  Lift + shadow
Section enters view    →  IntersectionObserver    →  Add .revealed class
Click Hamburger        →  toggleMobileMenu()      →  Sidebar slide-in
Click FAB ↑            →  scrollToTop()           →  Smooth scroll top
```

## Conventions

**Naming:**
- CSS classes: BEM-like (`section-hero__cta`, `menu-tab--active`)
- JS functions: camelCase (`handleTabClick`, `scrollToTop`)
- HTML IDs: kebab-case (`sec-10-reservation`, `fab-scroll-top`)
- Section IDs match spec: `sec-01` through `sec-14`

**Structure:**
- Mỗi section là `<section>` tag với `id` tương ứng
- Bootstrap grid cho layout (`container`, `row`, `col-*`)
- Custom CSS variables override Bootstrap defaults
- Không inline styles — tất cả trong style.css
- Không jQuery — Vanilla JS only

## Technical Debt

- [ ] Images chưa convert sang WebP (hiện tại PNG)
- [ ] Chưa có Service Worker cho offline/caching
- [ ] Blog data hardcoded — cần API endpoint khi có backend
- [ ] Form chỉ mock submit — cần backend API cho reservation thật

---

*Last updated: 2026-04-13*
