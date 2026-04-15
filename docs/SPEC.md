# SPEC.md — Website Nhà Hàng BASILICO (6 Trang)

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision

Website nhà hàng BASILICO gồm 6 trang chính, mang đến trải nghiệm số hóa hoàn chỉnh cho khách hàng: từ xem thực đơn, đặt bàn, tìm hiểu thương hiệu, đến liên hệ và đọc tin tức. Giao diện sử dụng theme tươi sáng kết hợp accent gold sang trọng.

## Pages

| # | Trang | Thư mục | Status |
|---|-------|---------|--------|
| 1 | 🏠 Trang Chủ | `Front-end/TrangChu/` | ✅ DONE |
| 2 | 🍽️ Thực Đơn | `Front-end/ThucDon/` | FINALIZED |
| 3 | 👥 Giới Thiệu | `Front-end/GioiThieu/` | FINALIZED |
| 4 | 📅 Đặt Bàn | `Front-end/DatBan/` | FINALIZED |
| 5 | 📞 Liên Hệ | `Front-end/LienHe/` | FINALIZED |
| 6 | 📰 Blog | `Front-end/Blog/` | FINALIZED |

## Constraints (Chung)

- **Stack**: HTML5 + Bootstrap 5.3 CDN + Vanilla CSS + Vanilla JS
- **Design System**: `docs/DesignSystem.md` — Single Source of Truth
- **Global CSS**: `global.css` (root) dùng chung cho tất cả trang
- **Responsive**: Mobile-first, breakpoints 576/768/992/1200px
- **Accessibility**: WCAG 2.1 AA, keyboard nav, ARIA labels
- **Ngôn ngữ**: Tiếng Việt (`lang="vi"`)
- **Assets**: Dùng `../../assets/` — không placeholder

## Non-Goals

- Không xây dựng backend API (chỉ front-end)
- Không tích hợp CMS (dùng static data)
- Không xử lý payment gateway

---

## Trang 2: Thực Đơn (Menu)

### Sections
1. Hero nhỏ — Banner + breadcrumb
2. Bộ lọc danh mục — Tabs (Khai vị, Món chính, Tráng miệng, Đồ uống, Combo)
3. Lưới món ăn — Card grid (ảnh, tên VN, mô tả, giá VNĐ)
4. Combo / Set meal — Gói combo highlight
5. Lọc đặc tính — Tags (Chay, Hải sản, Đặc sản)
6. CTA đặt bàn — Banner cuối

### Success Criteria
- [ ] Filter tabs chuyển đổi danh mục mượt
- [ ] Card grid responsive (4 cột desktop, 2 tablet, 1 mobile)
- [ ] Giá hiển thị VNĐ, ảnh từ assets/
- [ ] CTA dẫn đến trang Đặt Bàn

---

## Trang 3: Giới Thiệu (About Us)

### Sections
1. Hero nhỏ — Banner + breadcrumb
2. Câu chuyện thương hiệu — Timeline lịch sử
3. Tầm nhìn & Sứ mệnh — 3 cột icon + text
4. Đội ngũ đầu bếp — Card grid (ảnh, tên, chức vụ)
5. Thành tích / Giải thưởng — Counter stats + badges
6. Không gian nhà hàng — Gallery ảnh nội thất
7. CTA đặt bàn

### Success Criteria
- [ ] Timeline animation scroll reveal
- [ ] Chef cards hover effect
- [ ] Gallery lightbox
- [ ] Stats counter animation

---

## Trang 4: Đặt Bàn (Reservation)

### Sections
1. Hero nhỏ — Banner + breadcrumb
2. Form đặt bàn — Họ tên, SĐT, Email, ngày, giờ, số người
3. Khu vực ngồi — Radio (Trong nhà / Ngoài trời / VIP)
4. Yêu cầu đặc biệt — Textarea
5. Xác nhận — Modal + thông báo
6. Chính sách hủy — Accordion FAQ

### Success Criteria
- [ ] Form validation real-time (tất cả trường)
- [ ] Khu vực ngồi có visual illustration
- [ ] Modal xác nhận tóm tắt thông tin
- [ ] Chính sách hủy accordion hoạt động

---

## Trang 5: Liên Hệ (Contact)

### Sections
1. Hero nhỏ — Banner + breadcrumb
2. 3 cột thông tin — Địa chỉ, Điện thoại, Email
3. Giờ mở cửa — Bảng giờ phục vụ
4. Google Maps — Bản đồ embed
5. Form liên hệ — Họ tên, Email, Chủ đề, Nội dung
6. Mạng xã hội — Facebook, Instagram, Zalo

### Success Criteria
- [ ] Form validation + giả lập gửi
- [ ] Google Maps iframe responsive
- [ ] 3 cột thông tin responsive
- [ ] Social links mở tab mới

---

## Trang 6: Blog / Tin Tức

### Sections
1. Hero nhỏ — Banner + breadcrumb
2. Bài nổi bật — Card lớn featured
3. Lưới bài viết — Card grid (ảnh, ngày, tiêu đề, tóm tắt, tag)
4. Sidebar lọc — Danh mục (Khuyến mãi, Sự kiện, Tin nhà hàng, Công thức)
5. Tìm kiếm — Search bar
6. Phân trang — Pagination

### Success Criteria
- [ ] Filter theo danh mục hoạt động
- [ ] Search filter theo tiêu đề
- [ ] Card grid responsive
- [ ] Pagination UI (static)

---

## File Structure (Mỗi trang)

```
Front-end/<TenTrang>/
├── index.html        ← HTML chính
├── css/
│   └── style.css     ← CSS riêng trang
├── js/
│   └── main.js       ← JS riêng trang
└── (ảnh từ ../../assets/)
```

## Reference Documents

| Document | Path | Purpose |
|----------|------|---------|
| Design System | `docs/DesignSystem.md` | Colors, typography, spacing |
| Project Rules | `CLAUDE/PROJECT_RULES.md` | GSD methodology |
| Style Guide | `CLAUDE/GSD-STYLE.md` | Code conventions |

---

*Last updated: 2026-04-14*
