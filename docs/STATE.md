---
updated: 2026-04-14T00:55:00+07:00
---

# Project State — BASILICO Website

## Current Position

**Milestone:** M2 — Trang Thực Đơn
**Phase:** Wave 2 - Core Pages
**Status:** in_progress
**Plan:** Xây dựng 5 trang còn lại + liên kết navigation

## Completed

- ✅ M1: Trang Chủ — `Front-end/TrangChu/` (14 sections, optimized, Vietnamese)
- ✅ Wave 1: Documentation updates (SPEC, ROADMAP, ARCHITECTURE, STATE)
- ✅ 16 ảnh assets (12 AI-generated + 4 gốc)
- ✅ `global.css` — Design system tokens + shared components
- ✅ `docs/DesignSystem.md` — Single Source of Truth

## Next Steps

1. Build `Front-end/ThucDon/` (Thực Đơn)
2. Build `Front-end/DatBan/` (Đặt Bàn)
3. Build `Front-end/GioiThieu/` (Giới Thiệu)
4. Build `Front-end/LienHe/` (Liên Hệ)
5. Build `Front-end/Blog/` (Blog)
6. Update all navigation links across 6 pages

## Active Decisions

| Decision | Choice | Affects |
|----------|--------|---------|
| Stack | Bootstrap 5.3 CDN + Vanilla CSS/JS | All pages |
| Theme | Bright warm + gold accent | All styling |
| Fonts | Playfair Display + Karla | Typography |
| Icons | Bootstrap Icons CDN | All icons |
| Language | Tiếng Việt (`lang="vi"`) | All content |
| Global CSS | `/global.css` shared first | All pages |
| Page CSS | `css/style.css` per page | Each page |
| Navigation | Relative paths (`../TenTrang/index.html`) | All pages |
| Images | Reuse `../../assets/` | All pages |

## Blockers

None

## Concerns

- Images are PNG (large). Should convert to WebP.
- Forms are mock (no backend API).
- Google Maps needs API key for production.

---

*Last updated: 2026-04-14*
