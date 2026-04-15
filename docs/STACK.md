# Technology Stack — BASILICO Restaurant Website

> Auto-generated on 2026-04-13

## Runtime

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | Living Standard | Semantic markup, sections, forms |
| CSS3 | Living Standard | Custom properties, grid, flexbox, animations |
| JavaScript | ES2022+ | DOM manipulation, event handling, Intersection Observer |

## Core Technologies

### UI Framework
| Feature | System | Purpose |
|---------|--------|---------|
| Grid System | Bootstrap 5.3.3 (CDN) | Responsive 12-column grid layout |
| Components | Bootstrap 5.3.3 | Navbar, Cards, Tabs, Carousel, Forms, Modal |
| Icons | Bootstrap Icons 1.11.3 (CDN) | SVG icon system (no emojis) |
| Typography | Google Fonts (Playfair Display + Karla) | Brand fonts via CDN |

### File Structure
| Directory | Files | Purpose |
|-----------|-------|---------|
| `Front-end/TrangChu/` | 3 | Main page (HTML + CSS + JS) |
| `assets/` | 16 | Food & restaurant images |
| `docs/` | 7 | Specifications & documentation |

## Dependencies

### External Dependencies (CDN)

| Package | Version | Purpose | CDN |
|---------|---------|---------|-----|
| Bootstrap CSS | 5.3.3 | UI framework styles | jsDelivr |
| Bootstrap JS Bundle | 5.3.3 | Interactive components (carousel, collapse) | jsDelivr |
| Bootstrap Icons | 1.11.3 | Icon font | jsDelivr |
| Google Fonts | Latest | Playfair Display + Karla | fonts.googleapis.com |

### Internal Dependencies

| Component | Depends On | Purpose |
|-----------|------------|---------|
| `index.html` | Bootstrap CDN, Google Fonts | UI framework + fonts |
| `style.css` | Design tokens from `DesignSystem.md` | Custom styling |
| `main.js` | DOM API, Intersection Observer API | Client-side interactions |
| `index.html` | `assets/*.png` | Food & restaurant images |

## Infrastructure

| Service | Provider | Purpose |
|---------|----------|---------|
| Static Hosting | TBD (GitHub Pages / Vercel / Netlify) | Serve static files |
| CDN | jsDelivr + Google Fonts | External libraries |
| Maps | Google Maps Embed API | Location section iframe |

## Configuration

| Variable | Purpose | Location |
|----------|---------|----------|
| Google Fonts URL | Font loading | `<head>` in index.html |
| Bootstrap CDN URLs | Framework loading | `<head>` + end of `<body>` |
| Google Maps Embed URL | Location map | SEC-13 iframe src |
| CSS Custom Properties | Design tokens | `:root` in style.css |

## File Size Inventory

| Category | Count | Notes |
|----------|-------|-------|
| HTML | 1 | index.html (14 sections) |
| CSS | 1 | style.css (design tokens + section styles) |
| JS | 1 | main.js (all interactions) |
| Images | 16 | PNG format (4 existing + 12 AI-generated) |
| Docs | 7 | MD specifications |
| **Total** | **26** | **Minimal footprint** |

---

*Last updated: 2026-04-13*
