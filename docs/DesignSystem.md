# BASILICO RESTAURANT – Design System

> **Mục đích**: Tệp này là nguồn sự thật duy nhất (Single Source of Truth) cho toàn bộ giao diện website.
> **Áp dụng cho**: TrangChu, ThucDon, DatBan, GioiThieu, Blog, LienHe
> **Theme**: Tươi sáng, sang trọng, hiện đại
> **Stack**: HTML5 + Bootstrap 5.3 + Vanilla CSS + Vanilla JS
> **Cập nhật**: 2026-04-13

---

## 1. Bảng Màu Chính (Color Palette)

> Giao diện **tươi sáng** – nền sáng ấm, accent gold sang trọng, CTA cam nổi bật.

### Primary Colors

| Token CSS | Hex | RGB | Vai trò |
|-----------|-----|-----|---------|
| `--bs-primary` | `#C9A96E` | `201, 169, 110` | Gold – accent chính, links active, borders |
| `--bs-primary-dark` | `#B8943F` | `184, 148, 63` | Gold đậm – hover states |
| `--bs-primary-light` | `#E8D5A8` | `232, 213, 168` | Gold nhạt – backgrounds subtle |

### CTA & Action Colors

| Token CSS | Hex | RGB | Vai trò |
|-----------|-----|-----|---------|
| `--color-cta` | `#F97316` | `249, 115, 22` | CTA chính (Reservation, Order) |
| `--color-cta-hover` | `#EA580C` | `234, 88, 12` | CTA hover |
| `--color-cta-light` | `#FFF7ED` | `255, 247, 237` | CTA background nhẹ |

### Background Colors (Tươi sáng)

| Token CSS | Hex | RGB | Vai trò |
|-----------|-----|-----|---------|
| `--bg-body` | `#FAFAF5` | `250, 250, 245` | Body background – trắng ấm |
| `--bg-section-cream` | `#FDF8F0` | `253, 248, 240` | Section xen kẽ – cream |
| `--bg-section-warm` | `#F5F0E8` | `245, 240, 232` | Section About, Hours |
| `--bg-hero-overlay` | `rgba(26,26,46,0.55)` | — | Hero overlay (tối vừa đủ đọc text) |
| `--bg-dark-section` | `#1A1A2E` | `26, 26, 46` | Menu section, Testimonials (accent tối) |
| `--bg-footer` | `#1A1A2E` | `26, 26, 46` | Footer |

### Text Colors

| Token CSS | Hex | Contrast ratio | Vai trò |
|-----------|-----|----------------|---------|
| `--text-heading` | `#1A1A2E` | 15.2:1 on white | Headings – tối đậm |
| `--text-body` | `#374151` | 10.3:1 on white | Body text – xám đậm |
| `--text-muted` | `#6B7280` | 5.6:1 on white | Text phụ, meta |
| `--text-light` | `#9CA3AF` | — | Placeholder text only |
| `--text-on-dark` | `#FFFFFF` | — | Text trên nền tối |
| `--text-on-dark-muted` | `#D1D5DB` | — | Text phụ trên nền tối |

### Semantic Colors

| Token CSS | Hex | Vai trò |
|-----------|-----|---------|
| `--color-success` | `#059669` | Toast thành công, validation pass |
| `--color-error` | `#DC2626` | Toast lỗi, validation fail |
| `--color-warning` | `#D97706` | Cảnh báo (ngày lễ đóng cửa) |
| `--color-info` | `#2563EB` | Thông tin |

---

## 2. Typography

### Font Stack

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Karla:wght@300;400;500;600;700&display=swap');
```

| Vai trò | Font | Fallback | Weight | Ghi chú |
|---------|------|----------|--------|---------|
| Heading (H1-H3) | `Playfair Display` | `Georgia, serif` | 600–700 | Serif sang trọng cho tiêu đề |
| Eyebrow labels | `Karla` | `system-ui, sans-serif` | 500 | Uppercase, letter-spacing: 3px |
| Body text | `Karla` | `system-ui, sans-serif` | 400 | Line-height: 1.7 |
| Buttons | `Karla` | `system-ui, sans-serif` | 600 | Uppercase, letter-spacing: 2px |
| Navigation | `Karla` | `system-ui, sans-serif` | 500 | 14px, uppercase |

### Font Sizes

| Token | Desktop | Tablet | Mobile | Sử dụng |
|-------|---------|--------|--------|---------|
| `--fs-hero` | `64px` | `48px` | `36px` | H1 Hero |
| `--fs-h2` | `42px` | `36px` | `28px` | Section headings |
| `--fs-h3` | `24px` | `22px` | `20px` | Sub-headings |
| `--fs-eyebrow` | `13px` | `12px` | `12px` | Label nhỏ trên heading |
| `--fs-body` | `16px` | `16px` | `15px` | Paragraph text |
| `--fs-small` | `14px` | `14px` | `13px` | Meta text, captions |
| `--fs-btn` | `14px` | `13px` | `13px` | Button labels |

---

## 3. Spacing & Layout

### Grid System

| Token | Giá trị | Sử dụng |
|-------|---------|---------|
| `--container-max` | `1200px` | Max-width container (Bootstrap `.container`) |
| `--gutter` | `24px` | Khoảng cách giữa columns |
| `--section-py` | `100px` | Padding-y section desktop |
| `--section-py-md` | `80px` | Padding-y section tablet |
| `--section-py-sm` | `60px` | Padding-y section mobile |

### Spacing Scale

| Token | Giá trị | Sử dụng |
|-------|---------|---------|
| `--space-xs` | `4px` | Tight spacing |
| `--space-sm` | `8px` | Small gaps |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Card padding |
| `--space-xl` | `32px` | Between elements |
| `--space-2xl` | `48px` | Between component groups |
| `--space-3xl` | `64px` | Section title to content |

### Border & Radius

| Token | Giá trị | Sử dụng |
|-------|---------|---------|
| `--radius-sm` | `4px` | Inputs, small buttons |
| `--radius-md` | `8px` | Cards, modals |
| `--radius-lg` | `16px` | Feature cards |
| `--radius-pill` | `100px` | Pill buttons, tags |
| `--radius-circle` | `50%` | Avatar, circular images |
| `--border-default` | `1px solid #E5E7EB` | Card borders, dividers |
| `--border-gold` | `1px solid #C9A96E` | CTA buttons outline |

---

## 4. Shadows & Effects

| Token | Giá trị | Sử dụng |
|-------|---------|---------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.1)` | Cards default |
| `--shadow-lg` | `0 8px 30px rgba(0,0,0,0.12)` | Cards hover, modals |
| `--shadow-xl` | `0 20px 60px rgba(0,0,0,0.15)` | Lightbox, dropdowns |
| `--shadow-gold` | `0 8px 25px rgba(201,169,110,0.3)` | CTA button hover |

---

## 5. Animation Tokens

| Token | Giá trị | Sử dụng |
|-------|---------|---------|
| `--transition-fast` | `150ms ease` | Color, opacity changes |
| `--transition-base` | `250ms ease` | Hover states, tab switch |
| `--transition-slow` | `400ms ease-in-out` | Slide, lightbox open |
| `--transition-entrance` | `600ms ease-out` | Scroll reveal animations |
| `--hover-lift` | `translateY(-4px)` | Card hover lift |
| `--hover-scale` | `scale(1.05)` | Image hover zoom |
| `--hover-scale-subtle` | `scale(1.03)` | Gallery image hover |

### Scroll Reveal Config

```
Mọi section:
  - Trigger: vào viewport 20% (Intersection Observer threshold: 0.2)
  - Animation: fadeInUp 600ms ease-out
  - Stagger: 100ms giữa các child elements
  - Chỉ chạy 1 lần (một khi đã reveal thì giữ nguyên)
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Component Patterns (Dùng chung)

### 6.1 Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary (CTA)** | `--color-cta` | `#FFF` | none | `--color-cta-hover` + shadow-gold |
| **Primary Gold** | `--bs-primary` | `#FFF` | none | `--bs-primary-dark` |
| **Outline Gold** | transparent | `--bs-primary` | `--border-gold` | bg gold, text dark |
| **Outline Dark** | transparent | `--text-heading` | `1px solid #1A1A2E` | bg dark, text white |
| **Ghost Light** | transparent | `#FFF` | `1px solid rgba(255,255,255,0.5)` | bg white/20, text white |

```
Tất cả buttons:
  - padding: 14px 32px
  - font: Karla 600, 14px, uppercase, letter-spacing: 2px
  - border-radius: var(--radius-sm)
  - cursor: pointer
  - transition: all var(--transition-base)
  - min-height: 48px (touch target)
  - focus: outline 2px solid gold, offset 2px
```

### 6.2 Cards (Blog, Menu Item)

```
.card {
  background: #FFFFFF;
  border: var(--border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-base);
  cursor: pointer;
}
.card:hover {
  transform: var(--hover-lift);
  box-shadow: var(--shadow-lg);
}
.card img:hover {
  transform: var(--hover-scale);
}
```

### 6.3 Section Eyebrow Pattern

```
Eyebrow label phía trên mỗi section heading:
  - Font: Karla 500, 13px, uppercase
  - Letter-spacing: 3px
  - Color: var(--bs-primary) (gold)
  - Margin-bottom: 12px
  
Heading H2:
  - Font: Playfair Display 700, var(--fs-h2)
  - Color: var(--text-heading)
  - Margin-bottom: 16px

Description:
  - Font: Karla 400, 16px
  - Color: var(--text-body)  
  - Max-width: 600px (centered)
  - Line-height: 1.7
```

### 6.4 Icon System

```
Sử dụng: Bootstrap Icons (đi kèm Bootstrap 5)
CDN:  https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css

KHÔNG dùng emoji làm icon.
Dùng <i class="bi bi-xxx"></i> hoặc SVG inline.

Icon sizes:
  - Small: 16px (trong text)
  - Medium: 20px (buttons, nav)
  - Large: 24px (features)
  - XL: 48px (feature icons)
```

---

## 7. Responsive Breakpoints

| Breakpoint | Bootstrap class | Giá trị | Layout |
|------------|----------------|---------|--------|
| Mobile | `default` | `< 576px` | 1 cột, stack dọc |
| Mobile L | `sm` | `≥ 576px` | 1 cột, wider padding |
| Tablet | `md` | `≥ 768px` | 2 cột |
| Desktop | `lg` | `≥ 992px` | 3-4 cột |
| Wide | `xl` | `≥ 1200px` | Max container, optimal |
| Ultra-wide | `xxl` | `≥ 1400px` | Same as xl |

---

## 8. Accessibility Checklist (WCAG 2.1 AA)

- [x] Color contrast 4.5:1 cho normal text, 3:1 cho large text
- [x] Touch target ≥ 44×44px
- [x] Focus visible trên tất cả interactive elements
- [x] Alt text cho meaningful images
- [x] `aria-label` cho icon-only buttons
- [x] Keyboard navigation: Tab order = visual order
- [x] Form inputs có `<label>` (không chỉ placeholder)
- [x] `prefers-reduced-motion` respected
- [x] Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- [x] `aria-current="page"` cho active nav link

---

## 9. Z-Index Scale

| Level | z-index | Sử dụng |
|-------|---------|---------|
| Base | `1` | Decorative elements |
| Card | `10` | Elevated cards |
| Dropdown | `20` | Nav dropdown |
| Sticky | `30` | Sticky header |
| Overlay | `50` | Modal overlay |
| Modal | `60` | Modal content |
| Toast | `80` | Toast notifications |
| FAB | `90` | Floating action button |
| Lightbox | `100` | Lightbox overlay |

---

## 10. Pre-Delivery Checklist (UI/UX Pro Max)

- [ ] Không dùng emoji làm icon – dùng Bootstrap Icons / SVG
- [ ] `cursor: pointer` trên mọi element clickable
- [ ] Hover states có smooth transition (150–300ms)
- [ ] Text contrast ≥ 4.5:1 (light mode)
- [ ] Focus states visible cho keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Không có horizontal scroll trên mobile
- [ ] Images có alt text mô tả
- [ ] Form inputs có labels rõ ràng
- [ ] Loading states cho async operations
- [ ] Touch targets ≥ 44px

---

> **Quy tắc vàng**: Mọi trang phải dùng cùng bảng màu, typography, và spacing từ tệp này. Không tạo giá trị mới ngoài hệ thống đã định nghĩa.
