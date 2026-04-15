# TRANG CHỦ – Homepage Specification

> **Loại tài liệu**: UI/UX Specification – AI-Friendly Format
> **Trang**: Landing Page (Entry Point)
> **Trạng thái**: `FINALIZED`
> **Cập nhật**: 2026-04-13
> **Tệp triển khai**: `Front-end/TrangChu/`
>
> **Tài liệu liên quan:**
> | Tệp | Vai trò |
> |------|---------|
> | [`DesignSystem.md`](DesignSystem.md) | Bảng màu, typography, spacing, animations — Single Source of Truth |
> | [`SPEC.md`](SPEC.md) | GSD Specification — vision, goals, constraints, success criteria |
> | [`ARCHITECTURE.md`](ARCHITECTURE.md) | Kiến trúc hệ thống, data flow, file mapping, conventions |
> | [`STACK.md`](STACK.md) | Technology stack — Bootstrap 5.3, Google Fonts, CDN dependencies |
> | [`ROADMAP.md`](ROADMAP.md) | 4-phase roadmap: Foundation → Styling → Interactions → Polish |
> | [`STATE.md`](STATE.md) | Session state — "save game" cho project |

---

## MỤC LỤC

- [1. Tổng Quan Trang](#1-tổng-quan-trang)
- [2. Design Tokens](#2-design-tokens)
- [3. Thành Phần Global](#3-thành-phần-global)
- [4. Các Section Chi Tiết](#4-các-section-chi-tiết)
  - [SEC-01: Header Navigation](#sec-01-header-navigation)
  - [SEC-02: Hero Section](#sec-02-hero-section)
  - [SEC-03: About Restaurant](#sec-03-about-restaurant)
  - [SEC-04: Opening Time Hours](#sec-04-opening-time-hours)
  - [SEC-05: Special Menu](#sec-05-special-menu)
  - [SEC-06: Why Choose Us](#sec-06-why-choose-us)
  - [SEC-07: Testimonials](#sec-07-testimonials)
  - [SEC-08: Order Online + Gift Vouchers](#sec-08-order-online--gift-vouchers)
  - [SEC-09: Chef Section](#sec-09-chef-section)
  - [SEC-10: Reservation Form](#sec-10-reservation-form)
  - [SEC-11: Blog Section](#sec-11-blog-section)
  - [SEC-12: Gallery / Featured Dish](#sec-12-gallery--featured-dish)
  - [SEC-13: Location / How To Find Us](#sec-13-location--how-to-find-us)
  - [SEC-14: Footer](#sec-14-footer)
- [5. Luồng Người Dùng Toàn Trang](#5-luồng-người-dùng-toàn-trang)
- [6. API Endpoints](#6-api-endpoints)
- [7. UX Backlog – Cải Tiến](#7-ux-backlog--cải-tiến)
- [8. Tài Liệu Liên Quan (GSD Ecosystem)](#8-tài-liệu-liên-quan-gsd-ecosystem)

---

## 1. Tổng Quan Trang

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Landing page – gây ấn tượng đầu tiên, chuyển đổi khách thành đặt bàn/order |
| **User Persona chính** | Khách mới đang tìm nhà hàng để đặt chỗ / order online |
| **User Persona phụ** | Khách cũ quay lại kiểm tra giờ mở cửa, menu, hoặc đặt bàn lại |
| **Thương hiệu** | BASILICO – Restaurant . Bar . Coffee . Bistro |
| **Theme** | Tươi sáng (nền ấm `#FAFAF5`, accent gold `#C9A96E`) — xem [`DesignSystem.md`](DesignSystem.md) |
| **Conversion Goal** | Click "BOOK A TABLE" hoặc "ORDER NOW" |
| **Entry Points** | Direct URL, Google Search, Social Media links |
| **Vị trí trong flow** | Trang đầu tiên → phân luồng sang /menu, /reservation, /about, /blog, /contact |

### Cấu Trúc Section (Thứ tự từ trên xuống)

```
┌─────────────────────────────────────────────┐
│  SEC-01: Header Navigation (sticky)         │
├─────────────────────────────────────────────┤
│  SEC-02: Hero Section (full viewport)       │
├─────────────────────────────────────────────┤
│  SEC-03: About Restaurant                   │
├─────────────────────────────────────────────┤
│  SEC-04: Opening Time Hours                 │
├─────────────────────────────────────────────┤
│  SEC-05: Special Menu (tabs)                │
├─────────────────────────────────────────────┤
│  SEC-06: Why Choose Us (tabs + slider)      │
├─────────────────────────────────────────────┤
│  SEC-07: Testimonials (carousel)            │
├─────────────────────────────────────────────┤
│  SEC-08: Order Online + Gift Vouchers       │
├─────────────────────────────────────────────┤
│  SEC-09: Chef Section                       │
├─────────────────────────────────────────────┤
│  SEC-10: Reservation Form (conversion)      │
├─────────────────────────────────────────────┤
│  SEC-11: Blog Section (3 cards)             │
├─────────────────────────────────────────────┤
│  SEC-12: Gallery / Featured Dish Slider     │
├─────────────────────────────────────────────┤
│  SEC-13: Location / How To Find Us          │
├─────────────────────────────────────────────┤
│  SEC-14: Footer (4 cột)                     │
└─────────────────────────────────────────────┘
│  FAB: Scroll-to-top (fixed bottom-right)    │
```

---

## 2. Design Tokens

### Bảng Màu

| Token | Hex | Sử dụng |
|-------|-----|---------|
| `--color-primary-gold` | `#C9A96E` | CTA buttons, active states, accent text |
| `--color-primary-dark` | `#1A1A2E` | Background chính, header, footer |
| `--color-secondary-navy` | `#16213E` | Panel nội dung, card overlay |
| `--color-bg-section-light` | `#F5F0E8` | Section About, sáng tương phản |
| `--color-bg-section-beige` | `#E8DFD0` | Decorative blocks, image backdrop |
| `--color-text-white` | `#FFFFFF` | Text trên nền tối |
| `--color-text-light` | `#CCCCCC` | Paragraph text phụ |
| `--color-text-dark` | `#1A1A1A` | Text trên nền sáng |
| `--color-error` | `#E74C3C` | Validation errors, toast lỗi |
| `--color-success` | `#27AE60` | Toast thành công |
| `--color-warning` | `#F39C12` | Cảnh báo (ngày lễ đóng cửa) |

### Typography

| Token | Font | Weight | Size | Sử dụng |
|-------|------|--------|------|---------|
| `--font-heading` | Playfair Display | 700 | 42–64px | H1, H2 headings |
| `--font-subheading` | Playfair Display | 600 | 24–32px | H3, section titles |
| `--font-eyebrow` | Montserrat | 500 | 12–14px | Label nhỏ trên heading (letter-spacing: 3px, uppercase) |
| `--font-body` | Montserrat | 400 | 15–16px | Paragraphs, descriptions |
| `--font-button` | Montserrat | 600 | 13–14px | Button labels (uppercase, letter-spacing: 2px) |
| `--font-nav` | Montserrat | 500 | 14px | Navigation links |

### Spacing & Layout

| Token | Giá trị | Sử dụng |
|-------|---------|---------|
| `--section-padding-y` | `100px` | Padding trên/dưới mỗi section |
| `--section-padding-y-mobile` | `60px` | Responsive padding |
| `--container-max-width` | `1200px` | Max-width nội dung |
| `--gutter` | `30px` | Khoảng cách giữa columns |
| `--border-radius-sm` | `4px` | Input fields, small cards |
| `--border-radius-md` | `8px` | Cards, modals |
| `--border-radius-circle` | `50%` | Avatar, circular images |

### Animation Tokens

| Token | Giá trị | Sử dụng |
|-------|---------|---------|
| `--transition-fast` | `200ms ease` | Hover states, color changes |
| `--transition-medium` | `400ms ease-in-out` | Tab content change, slide |
| `--transition-slow` | `600ms ease-in-out` | Section entrance, lightbox |
| `--hover-scale` | `scale(1.05)` | Card hover, image hover |
| `--hover-scale-subtle` | `scale(1.03)` | Image panel hover |

---

## 3. Thành Phần Global

### 3.1 FAB – Scroll To Top

| Thuộc tính | Giá trị |
|------------|---------|
| **ID** | `fab-scroll-top` |
| **Vị trí** | Fixed, bottom-right (`right: 30px; bottom: 30px`) |
| **Icon** | `↑` (arrow-up) |
| **Kích thước** | `48×48px`, border-radius: 50% |
| **Hiển thị** | Ẩn mặc định. Hiện khi `window.scrollY > 300px` |
| **Animation xuất hiện** | `fadeIn + slideUp` 300ms |
| **Hover** | Background → `--color-primary-gold` |
| **Click** | `window.scrollTo({ top: 0, behavior: 'smooth' })` |
| **z-index** | `999` |
| **Accessibility** | `aria-label="Cuộn lên đầu trang"`, `role="button"`, `tabindex="0"` |

### 3.2 Lightbox Component (Dùng chung)

| Thuộc tính | Giá trị |
|------------|---------|
| **Trigger** | Click vào ảnh có class `.lightbox-trigger` |
| **Overlay** | Background `rgba(0,0,0,0.9)`, z-index `1000` |
| **Controls** | Arrow left/right, nút X đóng (top-right) |
| **Keyboard** | `Esc` = đóng, `←` `→` = chuyển ảnh |
| **Animation** | fadeIn overlay `300ms`, scale image `400ms` |
| **Đóng** | Click overlay / nút X / phím Esc |

### 3.3 Toast Notification (Dùng chung)

| Thuộc tính | Giá trị |
|------------|---------|
| **Vị trí** | Fixed, top-right (`top: 20px; right: 20px`) |
| **Variants** | `success` (xanh lá), `error` (đỏ), `info` (xanh dương) |
| **Duration** | Tự ẩn sau `5000ms` |
| **Animation** | slideIn từ phải `300ms`, fadeOut `300ms` |
| **Đóng thủ công** | Nút X hoặc swipe right (mobile) |

---

## 4. Các Section Chi Tiết

---

### SEC-01: Header Navigation

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Điều hướng chính + CTA đặt bàn |
| **Vị trí** | Top – sticky khi scroll |
| **Layout** | 3 cột: Logo (trái) – Nav links (giữa) – Actions (phải) |
| **Background** | Transparent trên Hero → chuyển `--color-primary-dark` khi scroll > 80px |
| **z-index** | `100` |
| **Chiều cao** | `80px` (desktop), `60px` (mobile) |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái mặc định |
|----|-------|------|--------|---------------------|
| `hd-01` | Logo "BASILICO" | Text logo + link | Header – trái | Enabled |
| `hd-02` | Tagline "Restaurant . Bar . Coffee . Bistro" | Sub-text | Dưới logo | Static |
| `hd-03` | HOME | Nav link | Nav – giữa | **Active** (trang hiện tại) |
| `hd-04` | PAGES | Nav link + Dropdown | Nav – giữa | Enabled |
| `hd-05` | MENU | Nav link | Nav – giữa | Enabled |
| `hd-06` | PORTFOLIO | Nav link | Nav – giữa | Enabled |
| `hd-07` | BLOG | Nav link | Nav – giữa | Enabled |
| `hd-08` | CONTACT | Nav link | Nav – giữa | Enabled |
| `hd-09` | BOOK A TABLE | Button (outline gold) | Header – phải | Enabled |
| `hd-10` | Hamburger menu `≡` | Icon button | Header – phải cuối | Hidden desktop / Visible mobile |

#### Interaction Spec

##### `hd-01`: Logo "BASILICO"
- **Click** → Navigate `/` (reload hoặc scroll to top nếu đã ở trang chủ)
- **Cursor** → `pointer`

##### `hd-03`: HOME (Active)
- **Trạng thái Active** → text color: `--color-primary-gold`, font-weight: 600
- **Hover** (các nav link khác) → color chuyển `--color-primary-gold`, `transition: 200ms`
- **Click** → Navigate đến trang tương ứng hoặc smooth scroll đến section

##### `hd-04`: PAGES (Dropdown)
- **Hover** → Dropdown menu xuất hiện với `slideDown 300ms ease`
- **Nội dung dropdown** → About, Chef, Gallery, Reservation, 404
- **Click outside** → Dropdown đóng `fadeOut 200ms`
- **Keyboard** → `Enter/Space` mở dropdown, `Esc` đóng, `↑↓` di chuyển giữa items

##### `hd-09`: BOOK A TABLE
- **Default** → Border `1px solid --color-primary-gold`, text gold, bg transparent
- **Hover** → Background `--color-primary-gold`, text `--color-primary-dark`
- **Click** → Navigate `/reservation` hoặc smooth scroll đến `#sec-10-reservation`
- **Animation** → `transition: all 200ms ease`

##### `hd-10`: Hamburger Menu
- **Click** → Sidebar overlay trượt vào từ phải (`translateX(100%) → translateX(0)`, `400ms ease`)
- **Sidebar chứa** → Full navigation + social links + contact info
- **Nút đóng** → Icon `X` ở top-right sidebar
- **Overlay** → Background `rgba(0,0,0,0.5)`, click đóng sidebar
- **Body** → `overflow: hidden` khi sidebar mở

#### Responsive

| Breakpoint | Thay đổi |
|------------|----------|
| `≥1024px` | Full nav links hiện, hamburger ẩn |
| `768–1023px` | Giấu 2 nav links cuối, hamburger hiện |
| `<768px` | Chỉ hiện Logo + BOOK A TABLE + Hamburger |

#### Accessibility

- Nav bọc trong `<nav role="navigation" aria-label="Main navigation">`
- Active link có `aria-current="page"`
- Dropdown có `aria-expanded`, `aria-haspopup="true"`
- Hamburger có `aria-label="Mở menu điều hướng"`, `aria-expanded="false/true"`
- Focus visible trên tất cả links (outline gold)

---

### SEC-02: Hero Section

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Ấn tượng đầu tiên – định vị thương hiệu cao cấp, drive CTA |
| **Persona** | Khách trung-cao cấp tìm trải nghiệm ẩm thực đẳng cấp |
| **Layout** | Full viewport height (`100vh`), content center-left |
| **Background** | Video/Image full viewport với dark overlay `rgba(0,0,0,0.4)` |
| **Vị trí** | Ngay dưới Header (section đầu tiên) |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `hero-01` | Background media | Video / Image | Full viewport | Auto-play (muted, loop) |
| `hero-02` | Dark overlay | Div overlay | Full viewport | Static |
| `hero-03` | Eyebrow "Discover Your Taste" | Label text | Content – trên H1 | Static |
| `hero-04` | H1 Headline | Typography (64px) | Content – center-left | Static |
| `hero-05` | Mô tả ngắn | Paragraph | Dưới H1 | Static |
| `hero-06` | RESERVATION | Button (Primary – Orange/Gold) | CTA chính | Enabled |
| `hero-07` | DISCOVERY MENU | Button (Ghost / outline) | CTA phụ | Enabled |
| `hero-08` | Phone icon + "978-212-8600" | Icon + text link | Bottom-right corner | Enabled |
| `hero-09` | "CALL US BOOK A TABLE & DELIVERY" | Label | Bottom-right | Static |

#### Interaction Spec

##### `hero-06`: RESERVATION (CTA CHÍNH – Quan trọng nhất)
- **Default** → Background `--color-primary-gold`, text white, `padding: 16px 40px`
- **Hover** → `scale(1.05)`, box-shadow `0 8px 25px rgba(201,169,110,0.4)`
- **Active** → `scale(0.98)`, ripple effect
- **Click** → Smooth scroll đến `#sec-10-reservation` hoặc navigate `/reservation`
- **Animation** → Entry: `fadeInUp 600ms` (delay 400ms sau H1)

##### `hero-07`: DISCOVERY MENU
- **Default** → Border `1px solid white`, text white, bg transparent
- **Hover** → Border `--color-primary-gold`, text `--color-primary-gold`
- **Click** → Navigate `/menu`

##### `hero-08`: Số điện thoại
- **Mobile** → `href="tel:9782128600"` – mở dialer
- **Desktop** → Click → copy số vào clipboard → Toast "📋 Đã sao chép số điện thoại"
- **Hover** → Underline + color gold

#### Entry Animation (khi trang load)

| Element | Animation | Delay |
|---------|-----------|-------|
| `hero-03` Eyebrow | `fadeInDown` | `0ms` |
| `hero-04` H1 | `fadeInUp` | `200ms` |
| `hero-05` Paragraph | `fadeInUp` | `400ms` |
| `hero-06` CTA chính | `fadeInUp + scaleIn` | `600ms` |
| `hero-07` CTA phụ | `fadeInUp` | `800ms` |
| `hero-08` Phone | `fadeIn` | `1000ms` |

#### Responsive

| Breakpoint | Thay đổi |
|------------|----------|
| `≥1024px` | H1: 64px, 2 CTA ngang hàng, phone ở bottom-right |
| `768–1023px` | H1: 48px, CTA stack dọc, phone ẩn |
| `<768px` | H1: 36px, CTA full-width stack dọc, text-align center |

---

### SEC-03: About Restaurant

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Giới thiệu thương hiệu, xây dựng niềm tin (trust building) |
| **Persona** | Khách đang tìm hiểu trước khi quyết định đặt bàn |
| **Layout** | 2 cột: Image (trái 45%) – Content (phải 55%) |
| **Background** | `--color-bg-section-light` (`#F5F0E8`) |
| **Scroll animation** | Reveal on scroll (fadeIn khi vào viewport) |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `about-01` | Ảnh món ăn (cá) | Image + lightbox | Left panel | Clickable |
| `about-02` | Khối decorative beige | Background div | Behind image | Static |
| `about-03` | "ABOUT RESTAURANT" | Eyebrow text | Content – top | Static |
| `about-04` | H2 Headline | Typography | Content | Static |
| `about-05` | Đoạn văn mô tả (2 đoạn) | Paragraph | Content | Static |
| `about-06` | READ MORE ABOUT US | Button (outline/ghost) | Content – bottom | Enabled |

#### Interaction Spec

##### `about-01`: Ảnh món ăn
- **Hover** → `scale(1.03)`, overflow hidden trên container
- **Click** → Mở Lightbox component (xem ảnh phóng to)

##### `about-06`: READ MORE ABOUT US
- **Default** → Border `1px solid --color-text-dark`, text dark
- **Hover** → Background `--color-text-dark`, text white + underline slide-in từ trái (`width: 0 → 100%, 300ms`)
- **Click** → Navigate `/about`

#### Scroll Reveal Animation

| Element | Animation | Trigger |
|---------|-----------|---------|
| `about-01` Image | `fadeInLeft` | Khi section vào viewport 20% |
| `about-02` Decorative | `fadeIn` (delay 200ms) | Cùng trigger |
| `about-03–05` Text | `fadeInRight` | Cùng trigger |
| `about-06` Button | `fadeInUp` (delay 400ms) | Cùng trigger |

---

### SEC-04: Opening Time Hours

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Thông báo giờ hoạt động → giảm friction cho khách muốn đến |
| **Persona** | Khách muốn kiểm tra giờ mở cửa trước khi đến |
| **Layout** | 2 cột: Schedule info (trái 55%) – Image (phải 45%) |
| **Background** | `--color-bg-section-light` hoặc white |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `hours-01` | "OPENING TIME HOURS" | H2 Title | Content – trái | Static |
| `hours-02` | Bảng giờ tổng quát | Text list | Content | Static |
| `hours-03` | "BREAKFAST" | Sub-heading | Content – cột trái | Static |
| `hours-04` | Bảng giờ Breakfast | Text list | Content – cột trái | Static |
| `hours-05` | "LUNCH AND DINNER" | Sub-heading | Content – cột phải | Static |
| `hours-06` | Bảng giờ Lunch & Dinner | Text list | Content – cột phải | Static |
| `hours-07` | BOOK A TABLE | Button (outline) | Content – bottom left | Enabled |
| `hours-08` | Ảnh bàn ăn | Image | Right panel | Static |

#### Dữ Liệu Giờ Mở Cửa

```
Tổng quát:
  Monday - Friday:  08:00 - 22:00
  Saturday:         10:00 - 23:00
  Sunday:           10:00 - 21:00
  Holidays:         CLOSED ← highlight --color-warning

Breakfast:
  Monday - Friday:  08:00 - 10:30
  Saturday:         09:00 - 11:00
  Sunday:           09:00 - 11:00

Lunch & Dinner:
  Monday - Friday:  11:30 - 22:00
  Saturday:         12:00 - 23:00
  Sunday:           12:00 - 21:00
```

#### Interaction Spec

##### `hours-07`: BOOK A TABLE
- **Default** → Border dark, text dark
- **Hover** → Background black, text white
- **Click** → Smooth scroll đến `#sec-10-reservation` hoặc navigate `/reservation`

#### UX Note
> "Holidays: Closed" sử dụng `color: --color-warning` + `font-weight: 600` → visual warning cue rõ ràng cho khách.

---

### SEC-05: Special Menu

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Showcase thực đơn đặc biệt → kích thích appetite, thúc đẩy order |
| **Persona** | Khách đang browse menu, quyết định gọi món |
| **Layout** | Full width, centered. Tab bar trên, menu list dưới, ảnh trang trí 2 bên |
| **Background** | `--color-primary-dark` |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `menu-01` | "OUR SPECIAL MENU" | H2 Title | Top center | Static |
| `menu-02` | Tagline + description | Paragraph | Below H2 | Static |
| `menu-03` | SPECIAL MENU | Tab button | Tab bar | **Active** (mặc định) |
| `menu-04` | DRINKS | Tab button | Tab bar | Inactive |
| `menu-05` | SEAFOOD | Tab button | Tab bar | Inactive |
| `menu-06` | DESSERTS | Tab button | Tab bar | Inactive |
| `menu-07` | Danh sách 6 món ăn | Menu item list | Center | Dynamic (theo tab) |
| `menu-08` | Giá từng món | Price text | Right mỗi item | Dynamic |
| `menu-09` | Ảnh trang trí trái | Circular image | Left side | Static |
| `menu-10` | Ảnh trang trí phải | Circular image | Right side | Static |
| `menu-11` | VIEW ALL MENU | Button (outline gold) | Bottom center | Enabled |

#### State Management

```
State: activeTab = "SPECIAL MENU" | "DRINKS" | "SEAFOOD" | "DESSERTS"

Khi activeTab thay đổi:
  1. Tab cũ → remove class .active (border-bottom gold, font bold)
  2. Tab mới → add class .active
  3. Menu list → fadeOut 200ms → swap content → fadeIn 200ms
  4. Giá thay đổi theo data set tương ứng
```

#### Interaction Spec

##### `menu-03` đến `menu-06`: Tab Buttons
- **Default (inactive)** → Text `--color-text-light`, no border-bottom
- **Active** → Text `--color-primary-gold`, border-bottom `2px solid gold`, font-weight: 700
- **Hover (inactive)** → Text `--color-primary-gold`, opacity 0.8
- **Click** → Đổi `activeTab`, filter nội dung (KHÔNG reload trang)
- **Animation** → Tab content: `fadeIn 300ms ease-in-out`

##### `menu-07`: Menu Items (từng món)
- **Layout** → Tên món..........(dots)..........Giá
- **Hover** → Text color gold, cursor pointer
- **Click** → Modal chi tiết món: ảnh lớn, mô tả đầy đủ, nút "Add to Order"
- **Tooltip** (optional) → Hiển thị nguyên liệu chính

##### `menu-11`: VIEW ALL MENU
- **Default** → Border gold, text gold
- **Hover** → Background gold, text dark
- **Click** → Navigate `/menu`

#### Dữ Liệu Mẫu

```
SPECIAL MENU:
  - Grilled Salmon with Herbs .............. $25
  - Beef Tenderloin Steak .................. $36
  - Lobster Thermidor ...................... $59
  - Truffle Risotto ........................ $28
  - Duck Confit ............................ $42
  - Seared Tuna Tataki .................... $31

DRINKS:
  - Classic Mojito ......................... $12
  - ... (load from API/data)

SEAFOOD:
  - ... (load from API/data)

DESSERTS:
  - ... (load from API/data)
```

---

### SEC-06: Why Choose Us

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Trust building – thuyết phục khách lựa chọn nhà hàng (USP) |
| **Persona** | Khách đang so sánh, chưa quyết định |
| **Layout** | 2 cột: Content (trái 50%) – Image slider (phải 50%) |
| **Background** | `--color-bg-section-light` |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `why-01` | "WHY CHOOSE US" | Eyebrow label | Left – top | Static |
| `why-02` | H2 Headline | Typography | Left | Static |
| `why-03` | YOUR PRIVATE EVENT | Tab button | Center | Inactive |
| `why-04` | FOOD SAFETY | Tab button | Center | Inactive |
| `why-05` | LUXURY SPACE | Tab button | Center | **Active** (mặc định) |
| `why-06` | Mô tả (theo tab) | Paragraph | Left content | Dynamic |
| `why-07` | Bullet list (4 items) | List | Left content | Dynamic |
| `why-08` | READ MORE | Button (outline) | Left – bottom | Enabled |
| `why-09` | Ảnh (theo tab) | Image slider | Right panel | Dynamic |
| `why-10` | NEXT IMAGE | Circle button (→) | On image – right | Enabled |
| `why-11` | Khối decorative beige | Background div | Behind image | Static |

#### State Management

```
State: {
  activeTab: "LUXURY SPACE" | "FOOD SAFETY" | "YOUR PRIVATE EVENT",
  imageIndex: 0  // index trong image array của tab hiện tại
}

Tab change:
  1. Swap mô tả + bullet list (fadeIn 300ms)
  2. Reset imageIndex = 0
  3. Slide image sang ảnh đầu tiên của tab mới

NEXT IMAGE click:
  1. imageIndex += 1 (mod total images)
  2. Image slide-left transition 400ms
```

#### Interaction Spec

##### `why-03` đến `why-05`: Tabs
- Tương tự SEC-05 tab behavior
- Click → Đổi nội dung mô tả + ảnh bên phải
- Animation: `fadeIn content 300ms + slideLeft image 400ms`

##### `why-10`: NEXT IMAGE
- **Default** → Circle border white, icon `→` trắng
- **Hover** → Background gold, icon white
- **Click** → Slider chuyển sang ảnh tiếp theo (slide-left `400ms`)
- **Touch** (mobile) → Swipe left cũng chuyển ảnh

##### `why-08`: READ MORE
- **Hover** → Invert màu (bg dark, text white)
- **Click** → Navigate `/about` hoặc scroll xuống section chi tiết

---

### SEC-07: Testimonials

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Social proof – lời chứng thực từ khách hàng/food critic |
| **Persona** | Khách đã bị thuyết phục, cần thêm niềm tin cuối cùng |
| **Layout** | Full width centered, carousel auto-play |
| **Background** | `--color-primary-dark` |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `review-01` | Icon dấu nháy `" "` | Decorative icon | Top center | Static |
| `review-02` | Tiêu đề quote | H3 | Center | Dynamic (theo slide) |
| `review-03` | Nội dung testimonial | Paragraph | Center | Dynamic |
| `review-04` | ★★★★★ (5 sao) | Rating stars | Center | Static |
| `review-05` | Tên + vai trò (e.g. "MARGARET – FOOD CRITIC") | Author label | Center | Dynamic |
| `review-06` | Dots navigation | Dot indicators | Bottom center | Enabled |

#### State Management

```
State: {
  currentSlide: 0,
  totalSlides: N,
  autoPlayInterval: 5000ms,
  isPaused: false
}

Auto-play:
  - Mỗi 5 giây → currentSlide = (currentSlide + 1) % totalSlides
  - Pause khi user hover vào section
  - Resume khi mouse leave

Manual navigation:
  - Click dot → set currentSlide = dot index
  - Swipe left/right (mobile) → prev/next slide
```

#### Interaction Spec

##### Carousel behavior
- **Auto-play** → Chuyển slide mỗi `5000ms`
- **Hover** → Pause auto-play
- **Swipe (mobile)** → Chuyển slide
- **Dots** → Click dot = jump to slide, active dot = filled gold
- **Transition** → `fadeInUp 400ms` giữa các slides

---

### SEC-08: Order Online + Gift Vouchers

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Cross-sell: Order online + Gift Voucher → tăng revenue |
| **Persona** | Khách muốn order về nhà hoặc mua quà tặng |
| **Layout** | 2 hàng: Order Online (trên) + Gift Vouchers (dưới), mỗi hàng 2 cột |
| **Background** | Pattern hexagon trang trí trên nền tối |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `order-01` | Ảnh món ăn | Image | Top-left | Static |
| `order-02` | "ORDER ONLINE" | H3 | Top-right panel | Static |
| `order-03` | Mô tả | Paragraph | Top-right | Static |
| `order-04` | ORDER NOW | Button (outline) | Top-right | Enabled |
| `order-05` | Icon hộp quà tặng | Decorative icon | Bottom-left | Static |
| `order-06` | "GIFT VOUCHERS" | H3 | Bottom-left panel | Static |
| `order-07` | Mô tả gift voucher | Paragraph | Bottom-left | Static |
| `order-08` | BUY NOW | Button (outline) | Bottom-left | Enabled |
| `order-09` | Ảnh trang trí | Image | Bottom-right | Static |

#### Interaction Spec

##### `order-04`: ORDER NOW
- **Hover** → Background gold, text dark
- **Click** → Navigate `/order` HOẶC mở modal chọn: `Delivery / Pickup`
- Nếu liên kết bên thứ ba (GrabFood): `target="_blank"` + `rel="noopener"`

##### `order-08`: BUY NOW (Gift Vouchers)
- **Hover** → Background gold, text dark
- **Click** → Mở modal mua voucher

#### Modal: Gift Voucher Purchase

```
State: {
  denomination: null,        // 200k | 500k | 1M
  recipientName: "",
  recipientEmail: "",
  personalMessage: "",
  isSubmitting: false
}

Form fields:
  1. Chọn mệnh giá: Radio buttons (200,000₫ / 500,000₫ / 1,000,000₫)
  2. Tên người nhận: Input text (required, min 2 chars)
  3. Email gửi voucher: Input email (required, email format)
  4. Thông điệp cá nhân: Textarea (optional, max 200 chars)
  5. Button "Proceed to Payment" → redirect payment gateway

Validation:
  - Mệnh giá phải được chọn
  - Tên ≥ 2 ký tự
  - Email hợp lệ
  - Submit → loading state → redirect payment
```

---

### SEC-09: Chef Section

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Xây dựng authority – giới thiệu đội ngũ bếp trưởng |
| **Persona** | Khách quan tâm đến chất lượng, muốn biết "ai đứng bếp" |
| **Layout** | 3 cột: Image lớn (trái) – Image nhỏ (giữa) – Content (phải) |
| **Background** | White hoặc light |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `chef-01` | Ảnh chef chuẩn bị món (lớn) | Image + lightbox | Left – large | Clickable |
| `chef-02` | Ảnh chef cắt cá ngừ | Image + lightbox | Center | Clickable |
| `chef-03` | "OUR CHEF RESTAURANT" | Eyebrow label | Right content | Static |
| `chef-04` | H2 "THE KEY BEHIND DELICIOUS FOOD" | Typography | Right content | Static |
| `chef-05` | Đoạn mô tả | Paragraph | Right content | Static |
| `chef-06` | VIEW ALL CHEF | Button (outline) | Right – bottom | Enabled |

#### Interaction Spec

##### `chef-01`, `chef-02`: Ảnh chef
- **Hover** → Overlay tối `rgba(0,0,0,0.3)` + icon zoom (🔍) xuất hiện center
- **Click** → Mở Lightbox với navigation arrows
- **Animation** → Overlay `fadeIn 200ms`

##### `chef-06`: VIEW ALL CHEF
- **Hover** → Background black, text white
- **Click** → Navigate `/about/team` hoặc `/chefs`
- Trang team: Grid cards với ảnh, tên, chuyên môn của từng chef

---

### SEC-10: Reservation Form

> ⚠️ **CRITICAL SECTION** – Đây là conversion section quan trọng nhất trên toàn website.

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Form đặt bàn trực tuyến – conversion chính |
| **Persona** | Khách đã quyết định đặt bàn, cần hoàn tất nhanh |
| **Layout** | 2 cột: Mô tả (trái 40%) – Form (phải 60%) |
| **Background** | Image overlay tối (ảnh nhà hàng) |
| **Section ID** | `#sec-10-reservation` (anchor cho smooth scroll) |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái | Validation |
|----|-------|------|--------|------------|------------|
| `rsv-01` | Background ảnh nhà hàng | Image overlay | Full section | Static | — |
| `rsv-02` | "ONLINE RESERVATION" | Eyebrow (gold) | Left – top | Static | — |
| `rsv-03` | "BOOK A TABLE" | H2 Title | Left | Static | — |
| `rsv-04` | Mô tả hướng dẫn | Paragraph (white) | Left | Static | — |
| `rsv-05` | Name* | Input text | Form – row 1, full width | Empty | Required, min 2 chars |
| `rsv-06` | Phone* | Input text | Form – row 2, left | Empty | Required, regex `[0-9]{10,11}` |
| `rsv-07` | Arrival time | Time picker | Form – row 2, right | Empty | Required |
| `rsv-08` | Amount of people | Number / Dropdown | Form – row 3, left | Empty | Required, 1–20 |
| `rsv-09` | Date | Date picker | Form – row 3, right | Default = today | Required, ≥ today |
| `rsv-10` | BOOK A TABLE | Submit button (white fill) | Form – bottom, full width | Enabled | All fields valid |

#### State Management

```
State: {
  formData: {
    name: "",           // string, required
    phone: "",          // string, required
    arrivalTime: null,  // string HH:mm
    guests: null,       // number 1-20
    date: today()       // Date, ≥ today
  },
  errors: {},           // { fieldName: errorMessage }
  formState: "idle"     // "idle" | "validating" | "submitting" | "success" | "error"
}
```

#### Interaction Spec – Form Fields

##### `rsv-05`: Name*
- **Focus** → Border color gold, label float up (nếu dùng floating label)
- **Blur (rỗng)** → Border `--color-error`, inline error: "Vui lòng nhập tên"
- **Blur (< 2 chars)** → Error: "Tên phải có ít nhất 2 ký tự"
- **Valid** → Border `--color-success` (subtle)

##### `rsv-06`: Phone*
- **Input mask** → Chỉ cho nhập số, auto-format `0xxx-xxx-xxxx`
- **Blur (invalid)** → Error: "Số điện thoại không hợp lệ"
- **Pattern** → `[0-9]{10,11}` hoặc format quốc tế `+84xxxxxxxxx`

##### `rsv-07`: Arrival Time
- **Click** → Dropdown time picker: slots mỗi 30 phút (7:00, 7:30, 8:00...)
- **Slots đầy** → Disabled (màu xám, không click được)
- **Fallback** → `<input type="time">` native

##### `rsv-08`: Amount of People
- **Click** → Dropdown: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10+
- **Hoặc** → `<input type="number" min="1" max="20">`
- **Ảnh hưởng** → Backend check bàn phù hợp kích thước

##### `rsv-09`: Date
- **Click** → Calendar datepicker popup
- **Disabled dates** → Quá khứ + ngày nghỉ lễ (Holidays: Closed)
- **Min date** → `today()`
- **Highlight** → Ngày đang chọn: background gold
- **Default** → Ngày hiện tại (DYNAMIC, không hardcode)

##### `rsv-10`: BOOK A TABLE (Submit)
- **Default** → Background white, text dark, full width
- **Hover** → Background gold, text white
- **Disabled** → Khi form đang submit (opacity 0.6, cursor not-allowed)
- **Click** → Validation flow:

```
Click "BOOK A TABLE"
     ↓
[Validate all fields]
     ↓
┌─ FAIL → Highlight lỗi đỏ trên từng field
│         Scroll đến field lỗi đầu tiên
│         Focus vào field đó
│
└─ PASS → formState = "submitting"
          Button text → "Đang xử lý..." + spinner
          Button disabled
               ↓
          API: POST /api/reservations
          Body: { name, phone, arrival_time, guests, date }
               ↓
          ┌─ SUCCESS (200)
          │  → formState = "success"
          │  → Toast ✅ "Đặt bàn thành công! Chúng tôi sẽ gọi xác nhận trong 30 phút"
          │  → Reset form
          │  → Optional: SMS/Email xác nhận gửi tự động
          │
          └─ ERROR (4xx/5xx)
             → formState = "error"
             → Toast ❌ "Đã xảy ra lỗi, vui lòng thử lại"
             → Button re-enable
```

#### Edge Cases

| Tình huống | Xử lý |
|-----------|-------|
| Tất cả bàn đầy ngày đó | Toast warning: "Ngày này đã đầy, vui lòng chọn ngày khác" |
| Số điện thoại đã đặt trước | Modal confirm: "Bạn đã có đặt bàn, muốn cập nhật?" |
| Mất kết nối mạng | Toast error + retry button |
| Double-click submit | Button disabled ngay lập tức, debounce 1000ms |

#### Accessibility

- Tất cả input có `<label>` rõ ràng (không chỉ placeholder)
- Error messages có `role="alert"` và `aria-live="polite"`
- Submit button có `aria-busy="true"` khi đang loading
- Date picker hỗ trợ keyboard navigation
- Tab order logic: Name → Phone → Time → Guests → Date → Submit

---

### SEC-11: Blog Section

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Content marketing – giữ chân khách, tăng SEO, showcase expertise |
| **Persona** | Khách quan tâm ẩm thực, visitor từ Google search |
| **Layout** | 3 cards ngang hàng (grid 3 cột) |
| **Background** | White hoặc light |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `blog-01` | "LATEST NEW" | Eyebrow label | Top center | Static |
| `blog-02` | "WHAT'S NEW IN OUR BLOG?" | H2 Title | Center | Static |
| `blog-03` | Mô tả intro | Paragraph | Center | Static |
| `blog-04` | Card Blog 1 | Card component | Left | Clickable |
| `blog-05` | Card Blog 2 | Card component | Center | Clickable |
| `blog-06` | Card Blog 3 | Card component | Right | Clickable |

#### Blog Card Structure

```
┌─────────────────────────┐
│ ┌─────────┐             │
│ │ 25      │  ← Date badge (navy bg, white text)
│ │ JUN 23  │             │
│ └─────────┘             │
│                         │
│   [Thumbnail Image]     │  ← Hover: overlay gold semi-transparent
│                         │
│   H3: Article Title     │  ← Overlay on image bottom
├─────────────────────────┤
│ BY JOHN MATTER          │  ← Author meta
│ RESTAURANT, FOOD        │  ← Category tags (clickable)
│                         │
│ Excerpt text lorem...   │  ← 2-3 dòng
│                         │
│ READ MORE →             │  ← Text link + arrow
└─────────────────────────┘
```

#### Interaction Spec

##### Blog Card (toàn bộ card)
- **Hover** → Box-shadow lift + thumbnail `scale(1.05)` (overflow hidden)
- **Click** → Navigate `/blog/[slug]`
- **Cursor** → `pointer` trên toàn card

##### Category Tags ("RESTAURANT, FOOD")
- **Click** → Navigate `/blog?category=restaurant`
- **Hover** → Color gold

##### "READ MORE →"
- **Hover** → Text gold, arrow translate-x `+5px` (`300ms`)
- **Click** → Navigate `/blog/[post-slug]`

#### Responsive

| Breakpoint | Thay đổi |
|------------|----------|
| `≥1024px` | 3 cards ngang hàng |
| `768–1023px` | 2 cards ngang + 1 dưới |
| `<768px` | Stack dọc, 1 card per row |

---

### SEC-12: Gallery / Featured Dish

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Visual storytelling – showcase không khí + món đặc biệt |
| **Persona** | Khách muốn "cảm nhận" bầu không khí trước khi đến |
| **Layout** | 4 panels ngang: Image – Image – Content (navy) – Image |
| **Background** | Full-width, no container padding |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `gallery-01` | Ảnh lifestyle 1 | Image panel | Left (25%) | Clickable (lightbox) |
| `gallery-02` | Ảnh lifestyle 2 | Image panel | Center-left (25%) | Clickable (lightbox) |
| `gallery-03` | Panel nội dung navy | Content card | Center-right (25%) | Static |
| `gallery-04` | "TENDER OCTOPUS AND FENNEL" | H3 (gold) | Content panel | Static |
| `gallery-05` | "Food – Restaurant" | Sub-label | Content panel | Static |
| `gallery-06` | Mô tả | Paragraph (white) | Content panel | Static |
| `gallery-07` | Arrow button `→` | Circle icon button | Content panel – bottom | Enabled |
| `gallery-08` | Ảnh lifestyle 3 | Image panel | Right (25%) | Clickable (lightbox) |

#### Interaction Spec

##### `gallery-07`: Arrow Button
- **Default** → Circle border gold, icon `→` gold
- **Hover** → Background gold, icon white, rotate `45°` (`200ms`)
- **Click** → Navigate đến trang chi tiết món HOẶC slider next featured dish

##### Image Panels (01, 02, 08)
- **Hover** → Overlay semi-transparent + `scale(1.03)`
- **Click** → Lightbox gallery full screen, navigation arrows
- **Accessibility** → `alt` text mô tả ảnh (QUAN TRỌNG)

---

### SEC-13: Location / How To Find Us

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Cung cấp thông tin địa chỉ, liên hệ, giúp khách tìm đường |
| **Persona** | Khách đã quyết định đến, cần biết cách đến |
| **Layout** | 3 cột: Ảnh trang trí (trái) – Info (giữa) – Google Maps (phải) |
| **Background** | Light / white |
| **Vị trí** | Section cuối cùng trước Footer |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `loc-01` | "LOCATION" | Eyebrow label | Top center | Static |
| `loc-02` | "HOW TO FIND US?" | H2 Title | Center | Static |
| `loc-03` | Mô tả intro | Paragraph | Center | Static |
| `loc-04` | Ảnh trang trí | Circular image | Left | Static |
| `loc-05` | "CALL US BOOK A TABLE & DELIVERY:" | Label | Center | Static |
| `loc-06` | 978-212-8600 | Phone link (large, bold, gold) | Center | **Clickable** |
| `loc-07` | "INFORMATION RESTAURANT:" | Label | Center | Static |
| `loc-08` | Address text | Static text | Center | Static |
| `loc-09` | Mail: Basilicofood123@gmail.com | Email link | Center | **Clickable** |
| `loc-10` | Opening Hour text | Static text | Center | Static |
| `loc-11` | GET DIRECTIONS | Button (outline) | Center – bottom | Enabled |
| `loc-12` | Google Maps | Interactive map (iframe/API) | Right | **Interactive** |

#### Thông Tin Liên Hệ (Data)

```
Số điện thoại: 978-212-8600
Địa chỉ:       4517 Washington Ave, Manchester, Kentucky 39495
Email:          Basilicofood123@gmail.com
Giờ mở cửa:    Mon-Fri: 08:00–22:00 | Sat: 10:00–23:00 | Sun: 10:00–21:00
```

#### Interaction Spec

##### `loc-06`: Số điện thoại
- **Mobile** → `<a href="tel:9782128600">` → mở dialer app
- **Desktop** → Click → Copy vào clipboard → Toast "📋 Đã sao chép số điện thoại"
- **Hover** → Underline + brighter gold

##### `loc-09`: Email
- **Click** → `<a href="mailto:Basilicofood123@gmail.com">` → mở email client
- **Hover** → Underline + color gold

##### `loc-11`: GET DIRECTIONS
- **Default** → Border dark, text dark
- **Hover** → Background dark, text white
- **Click** → Mở Google Maps (tab mới):
  - URL: `https://maps.google.com/?q=4517+Washington+Ave+Manchester+Kentucky`
  - Mobile: mở Google Maps app / Apple Maps (deep link)

##### `loc-12`: Google Maps
- **Embed** → `<iframe>` Google Maps hoặc Maps JavaScript API
- **Interactable** → Zoom in/out, kéo pan
- **Click icon location** → Mở Google Maps full
- **Shape** → Circular clip (border-radius: 50%) — `overflow: hidden`

---

### SEC-14: Footer

#### Overview

| Thuộc tính | Giá trị |
|------------|---------|
| **Mục đích** | Navigation phụ + contact + newsletter + legal |
| **Persona** | Khách tìm thêm info, subscribe, hoặc tìm link legal |
| **Layout** | 4 cột ngang: Brand – Opening Time – Location – Newsletter |
| **Background** | `--color-primary-dark` |
| **Vị trí** | Xuất hiện trên MỌI trang website (global component) |

#### Element Catalog

| ID | Label | Loại | Vị trí | Trạng thái |
|----|-------|------|--------|------------|
| `ft-01` | Logo "BASILICO" | Text logo | Col 1 | Static |
| `ft-02` | Tagline | Sub-text | Col 1 | Static |
| `ft-03` | Mô tả ngắn | Paragraph | Col 1 | Static |
| `ft-04` | Facebook icon | Icon button (circle) | Col 1 – social | Clickable |
| `ft-05` | Twitter icon | Icon button (circle) | Col 1 – social | Clickable |
| `ft-06` | Email icon | Icon button (circle) | Col 1 – social | Clickable |
| `ft-07` | Instagram icon | Icon button (circle) | Col 1 – social | Clickable |
| `ft-08` | "OPENING TIME" | Column header | Col 2 | Static |
| `ft-09` | Bảng giờ mở cửa + Happy Hours | Text list | Col 2 | Static |
| `ft-10` | "LOCATION" | Column header | Col 3 | Static |
| `ft-11` | Address | Text | Col 3 | Static |
| `ft-12` | Email contact | Link | Col 3 | Clickable |
| `ft-13` | 978-212-8600 | Phone link (gold) | Col 3 | Clickable |
| `ft-14` | "LATEST NEW" | Column header | Col 4 | Static |
| `ft-15` | Mô tả newsletter | Paragraph | Col 4 | Static |
| `ft-16` | Email input* | Input text | Col 4 | Enabled/Empty |
| `ft-17` | Submit (→) | Icon button | Input – right | Enabled |
| `ft-18` | Checkbox "I agree to the Privacy Policy" | Checkbox + link | Col 4 | **Unchecked** |
| `ft-19` | Copyright text | Static text | Footer bottom – left | Static |
| `ft-20` | PRIVACY | Text link | Footer bottom – right | Clickable |
| `ft-21` | TERM OF USE | Text link | Footer bottom – right | Clickable |
| `ft-22` | POLICY | Text link | Footer bottom – right | Clickable |

#### State Management – Newsletter Form

```
State: {
  email: "",
  agreedToPolicy: false,   // checkbox
  subscribeState: "idle"    // "idle" | "validating" | "submitting" | "success" | "error"
}

Validation rules:
  - email: required, format xxx@xxx.xxx
  - agreedToPolicy: must be true (GDPR compliance)

Submit flow:
  1. Check agreedToPolicy → false → Error "Vui lòng đồng ý điều khoản trước"
  2. Validate email format → invalid → Error "Email không hợp lệ"
  3. POST /api/newsletter/subscribe { email }
  4. Success → Input ẩn → Text "✅ Cảm ơn bạn đã đăng ký!"
  5. Error → "Email này đã được đăng ký" hoặc "Có lỗi xảy ra"
```

#### Interaction Spec

##### `ft-04` đến `ft-07`: Social Icons
- **Hover** → Circle background → `--color-primary-gold`
- **Click** → Mở tab mới (`target="_blank"`, `rel="noopener noreferrer"`)
  - Facebook → `https://facebook.com/basilico`
  - Twitter → `https://twitter.com/basilico`
  - Email → `mailto:Basilicofood123@gmail.com`
  - Instagram → `https://instagram.com/basilico`
- **Accessibility** → `aria-label="Theo dõi trên Facebook"` (cho từng icon)

##### `ft-16` + `ft-17`: Newsletter subscribe
- **Input focus** → Border gold
- **Submit** → Xem flow ở State Management

##### `ft-18`: Checkbox Privacy
- **Default** → Unchecked
- **"Privacy Policy"** trong label → Hyperlink → mở `/privacy-policy` (tab mới hoặc modal)

##### `ft-20` đến `ft-22`: Legal Links
- **Click** → Navigate `/privacy`, `/terms`, `/policy` (cùng tab)
- **Hover** → Color gold

#### Responsive

| Breakpoint | Thay đổi |
|------------|----------|
| `≥1024px` | 4 cột ngang hàng |
| `768–1023px` | 2 cột × 2 hàng |
| `<768px` | Stack dọc, 1 cột per row, text-align center |

---

## 5. Luồng Người Dùng Toàn Trang

### User Journey chính: Khách mới → Đặt bàn

```
[1. Vào trang] → SEC-01 Header + SEC-02 Hero
      │
      │  Ấn tượng đầu tiên: hình ảnh cao cấp, CTA nổi bật
      │
      ├─→ Click RESERVATION (hero) ─────────────→ SEC-10 Form đặt bàn
      │
      ├─→ Scroll xuống đọc thêm
      │         ↓
      │   SEC-03 About ← Tìm hiểu thương hiệu
      │         ↓
      │   SEC-04 Hours ← Kiểm tra giờ mở cửa
      │         ↓
      │   SEC-05 Menu ← Xem thực đơn → (Click tab, xem món)
      │         ↓
      │   SEC-06 Why Us ← Thuyết phục (USP)
      │         ↓
      │   SEC-07 Testimonials ← Social proof
      │         ↓
      │   SEC-08 Order/Gift ← Cross-sell
      │         ↓
      │   SEC-09 Chef ← Authority building
      │         ↓
      │   SEC-10 Reservation Form ← CONVERSION POINT
      │         ↓
      │   [Nhập form → Submit → Thành công!]
      │
      ├─→ Click BOOK A TABLE (header, bất cứ lúc nào)
      │         ↓
      │   Smooth scroll → SEC-10
      │
      ├─→ Click ORDER NOW
      │         ↓
      │   Navigate /order
      │
      └─→ Click DISCOVERY MENU (hero)
                ↓
          Navigate /menu
```

### User Journey phụ: Khách cũ kiểm tra thông tin

```
[Vào trang] → Scroll hoặc dùng nav
      │
      ├─→ MENU (nav) → /menu
      ├─→ CONTACT (nav) → /contact
      ├─→ Scroll → SEC-04 Hours → Kiểm tra giờ
      └─→ Scroll → SEC-13 Location → GET DIRECTIONS → Google Maps
```

---

## 6. API Endpoints

| Method | Endpoint | Mô tả | Request Body | Response |
|--------|----------|-------|--------------|----------|
| `POST` | `/api/reservations` | Đặt bàn mới | `{ name, phone, arrival_time, guests, date }` | `200 { success, reservation_id }` / `400 { error }` |
| `POST` | `/api/newsletter/subscribe` | Đăng ký newsletter | `{ email }` | `200 { success }` / `409 { error: "already_subscribed" }` |
| `GET` | `/api/menu?category={tab}` | Lấy menu theo category | — | `200 { items: [...] }` |
| `POST` | `/api/gift-voucher/purchase` | Mua gift voucher | `{ denomination, recipient_name, recipient_email, message }` | `200 { payment_url }` |
| `GET` | `/api/blog/latest?limit=3` | Lấy 3 bài blog mới nhất | — | `200 { posts: [...] }` |
| `GET` | `/api/availability?date={date}` | Check bàn trống theo ngày | — | `200 { available: true/false, time_slots: [...] }` |

---

## 7. UX Backlog – Cải Tiến

### Ưu tiên cao (P0)

| # | Section | Vấn đề | Giải pháp đề xuất |
|---|---------|--------|-------------------|
| 1 | SEC-10 | Chỉ có placeholder, thiếu `<label>` – biến mất khi typing | Thêm floating label hoặc label cố định phía trên |
| 2 | SEC-10 | Date hardcode "18/6/2023" | Dynamic = `today()`, không bao giờ hardcode |
| 3 | SEC-13 | Typo "GET DIRECTONS" → thiếu chữ I | Sửa thành "GET DIRECTIONS" |
| 4 | SEC-12 | Ảnh thiếu `alt` text | Thêm alt text mô tả cho mọi ảnh (accessibility) |
| 5 | SEC-01 | Header không sticky | Thêm sticky behavior + background transition on scroll |

### Ưu tiên trung (P1)

| # | Section | Vấn đề | Giải pháp đề xuất |
|---|---------|--------|-------------------|
| 6 | SEC-10 | Thiếu chọn khu vực ngồi | Thêm dropdown: Trong nhà / Ngoài trời / VIP Room |
| 7 | SEC-10 | Thiếu Special request | Thêm textarea "Ghi chú đặc biệt" (optional) |
| 8 | SEC-11 | Thiếu nút "View All Blog" | Thêm button dưới cùng section |
| 9 | SEC-11 | Thiếu estimated reading time | Thêm "5 min read" vào meta area |
| 10 | SEC-13 | Map hình tròn clip → mất context | Cân nhắc map hình chữ nhật bo góc |
| 11 | SEC-14 | Social icons thiếu hover tooltip | Thêm `title` attribute cho tên mạng xã hội |

### Ưu tiên thấp (P2)

| # | Section | Vấn đề | Giải pháp đề xuất |
|---|---------|--------|-------------------|
| 12 | SEC-13 | Thiếu Zalo/WhatsApp button | Thêm social messaging buttons cho thị trường VN |
| 13 | SEC-14 | Newsletter thiếu unsubscribe info | Thêm text nhỏ "Bạn có thể hủy đăng ký bất cứ lúc nào" |
| 14 | SEC-14 | Thiếu sitemap links | Thêm column links: Home, About, Menu, Blog, Contact |
| 15 | SEC-14 | Thiếu language selector | Thêm nếu có khách quốc tế (EN/VI toggle) |
| 16 | SEC-12 | Panel navy thiếu hover state rõ | Thêm subtle cursor pointer + hover glow effect |
| 17 | SEC-12 | Thiếu navigation dots cho slider | Thêm dots/arrows nếu đây là slider component |
| 18 | SEC-11 | 3 bài cùng ngày + excerpt → dummy data | Thay bằng dữ liệu thật từ API |

---

## 8. Tài Liệu Liên Quan (GSD Ecosystem)

> Tất cả tệp dưới đây nằm trong thư mục `docs/` và hình thành bộ hệ sinh thái GSD hoàn chỉnh cho module TrangChu.

### 8.1 Bản đồ tệp

```
docs/
├── TrangChu.md          ← Tệp này — UI/UX spec (14 sections, catalogs, interactions)
├── DesignSystem.md      ← Bảng màu, typography, spacing, animations
├── SPEC.md              ← GSD Specification (vision, goals, constraints)
├── ARCHITECTURE.md      ← Kiến trúc hệ thống, data flow, conventions
├── STACK.md             ← Technology stack (Bootstrap 5.3, Fonts, CDN)
├── ROADMAP.md           ← 4-phase development roadmap
└── STATE.md             ← Session state — "save game"

assets/                  ← 12 ảnh AI-generated (món ăn Pháp, chef, nhà hàng)
Front-end/TrangChu/      ← Code triển khai (index.html + css/ + js/)
CLAUDE/                  ← Quy chuẩn GSD methodology (xem CLAUDE/SoDo.md)
```

### 8.2 Chi tiết từng tệp

| # | Tệp | Kích thước | Vai trò | Khi nào dùng |
|---|------|-----------|---------|-------------|
| 1 | [`DesignSystem.md`](DesignSystem.md) | ~11KB | Bảng màu tươi sáng, font Playfair Display + Karla, spacing scale, animation tokens, component patterns | Khi cần tra cứu **bất kỳ giá trị màu/font/spacing** nào |
| 2 | [`SPEC.md`](SPEC.md) | ~5KB | Vision, Goals, Non-Goals, Constraints, Success Criteria, User Stories, Technical Requirements | Khi cần hiểu **"làm gì"** và **"không làm gì"** |
| 3 | [`ARCHITECTURE.md`](ARCHITECTURE.md) | ~7KB | Sơ đồ kiến trúc, component mapping, data flow diagram, naming conventions, technical debt | Khi cần hiểu **"cấu trúc hệ thống"** và **"dữ liệu chạy như thế nào"** |
| 4 | [`STACK.md`](STACK.md) | ~3KB | Technology stack, CDN dependencies, file inventory | Khi cần biết **"dùng công nghệ gì, version nào"** |
| 5 | [`ROADMAP.md`](ROADMAP.md) | ~3KB | 4-phase roadmap (Foundation → Styling → Interactions → Polish), progress tracking | Khi cần biết **"đang ở phase nào, tiến độ bao nhiêu"** |
| 6 | [`STATE.md`](STATE.md) | ~3KB | Current position, last action, next steps, active decisions, blockers | Khi **resume session** — đọc tệp này đầu tiên |

### 8.3 Quy trình sử dụng (theo GSD methodology)

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│  SPEC.md    │────▶│  ROADMAP.md  │────▶│  TrangChu.md  │────▶│  Code files │
│  (Mục tiêu) │     │  (Kế hoạch)  │     │  (Chi tiết)   │     │  (Triển khai)│
└─────────────┘     └──────────────┘     └───────────────┘     └─────────────┘
       │                                        │                      │
       ▼                                        ▼                      ▼
┌─────────────┐                          ┌──────────────┐       ┌─────────────┐
│ ARCHITECTURE│                          │ DesignSystem │       │  STATE.md   │
│  + STACK.md │                          │     .md      │       │ (Cập nhật   │
│ (Tham chiếu)│                          │ (Tra cứu)    │       │  sau mỗi    │
└─────────────┘                          └──────────────┘       │  task)      │
                                                                └─────────────┘
```

**Luồng thực thi:**
1. **Đọc** `STATE.md` → biết đang ở đâu
2. **Đọc** `ROADMAP.md` → biết task hiện tại trong phase nào
3. **Đọc** section tương ứng trong `TrangChu.md` → biết chi tiết UI/UX cần triển khai
4. **Tra cứu** `DesignSystem.md` → lấy giá trị màu/font/spacing chính xác
5. **Code** trong `Front-end/TrangChu/`
6. **Cập nhật** `STATE.md` + đánh dấu ✅ trong `ROADMAP.md`

### 8.4 Tệp trong thư mục CLAUDE/ (GSD Methodology)

> Tham khảo chi tiết: [`CLAUDE/SoDo.md`](../CLAUDE/SoDo.md)

| Nhóm | Tệp chính | Mục đích |
|------|-----------|----------|
| Quy chuẩn gốc | `PROJECT_RULES.md`, `GSD-STYLE.md` | Quy tắc vàng: SPEC → PLAN → EXECUTE → VERIFY |
| Workflows | `/map`, `/plan`, `/execute`, `/verify` | 35 lệnh slash quản lý dự án |
| Skills | `verifier`, `codebase-mapper`, `planner` | 11 kỹ năng AI agent chuyên sâu |
| Rules | `debugging.md`, `security.md`, `testing.md` | 6 quy tắc sắt hành vi |
| Templates | `spec.md`, `state.md`, `roadmap.md`... | 24 template khung sườn |

---

> **Ghi chú cuối**: Tài liệu này là specification dạng "AI-friendly" – mỗi section có ID duy nhất, element catalog dạng bảng, interaction spec chi tiết với states + animations, và state management rõ ràng. AI agent có thể đọc từng section độc lập để triển khai code. Tất cả tài liệu hỗ trợ đã được liệt kê trong **Section 8** ở trên.