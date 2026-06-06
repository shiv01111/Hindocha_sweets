# Hindocha Sweets — Premium Website (Demo)

A premium, single-page brand website for **Hindocha Sweets** — *Authentic Taste of Gujarat
Since Generations*. Zero-build static site (no Node, no npm, no compile), styled with a
luxury aesthetic and shop-style touches inspired by leading Gujarati sweet brands.

## ▶️ How to view

- **Easiest:** double-click `index.html` — it opens in any browser.
- Product, store and gallery images are **bundled locally** in `assets/images/`, so the site
  looks complete even offline. (Fonts, the animation libraries, the testimonial avatars and the
  branch Google Maps load from the internet when available.)

> For a client demo: zip the whole `Hindocha sweets` folder and send it, or drop it on any
> static host (Netlify drag-and-drop, Vercel, GitHub Pages, Hostinger, etc.).

## 📁 Structure

```
Hindocha sweets/
├─ index.html         # all sections + nav + footer + SEO + JSON-LD schema
├─ css/styles.css     # design system, glassmorphism, gradients, dark mode, responsive
├─ js/main.js         # reveals, parallax, carousel, nav, theme, forms→WhatsApp
├─ assets/images/     # bundled professional product/store photos
└─ README.md
```

## ✨ Sections

Announcement marquee · Sticky nav · Cinematic hero · **Legacy band (30+ years stats)** ·
Legendary Penda story · **Sweets collection (with pricing + WhatsApp "Order" buttons)** ·
Farsan collection (same) · Why Customers Love Us · Our Story timeline · Gallery (masonry +
lightbox) · Branch locations (glass cards + maps) · Testimonials carousel · Bulk & Festival
orders · Contact form (→ WhatsApp) · **Newsletter signup** · Footer. Plus dark mode, smooth
scrolling, scroll-reveal animations, and a floating WhatsApp button.

## 🛠️ Tech

HTML + CSS + vanilla JS. **GSAP + ScrollTrigger** (parallax/reveals) and **Lenis** (smooth
scroll) via CDN. Fonts: **Playfair Display** (headings) + **Inter** (body).

## 🖼️ Images & licensing (important before going live)

The bundled photos in `assets/images/` are **placeholders** chosen to look premium for the demo:
- Most are from **Pexels** (free for commercial use, no attribution required).
- A few are from **Wikimedia Commons** (free license; e.g. `penda.jpg`, `penda-closeup.jpg`).
- `assorted.jpg` is sourced from a third-party site as a temporary placeholder.

**Replace them with real Hindocha photography before launch.** Just drop your photos into
`assets/images/` using the same filenames (e.g. `penda.jpg`, `barfi.jpg`, `gathiya.jpg`,
`shop-display.jpg`) and everything updates automatically. Key files:
`penda.jpg`, `penda-section.jpg`, `penda-closeup.jpg`, `barfi.jpg`, `kaju-katli.jpg`,
`dry-fruit.jpg`, `festival.jpg`, `gathiya.jpg`, `bhavnagari.jpg`, `chevdo.jpg`, `sev.jpg`,
`mix-farsan.jpg`, `traditional.jpg`, `shop-display.jpg`, `tray.jpg`, `platter.jpg`,
`market.jpg`, `assorted.jpg`.

## ✏️ Replacing demo content (search for `TODO-SWAP`)

| What | Where |
|------|-------|
| **Prices** | `index.html` product cards — the `From ₹…` values. |
| **Branch phone numbers** | `index.html` Branch section: `tel:+91…` links + visible numbers. |
| **Branch addresses** | `index.html` → `.branch__addr` text. |
| **Branch maps** | each `<iframe>` `src` (replace `q=Jam+Raval,+Gujarat` with the exact address, or paste a Google Maps "Embed a map" iframe src). |
| **WhatsApp number** | `js/main.js` → `WHATSAPP_NUMBER`; also the `wa.me/…` links in `index.html` (order buttons, contact, floating button). |
| **Email** | `index.html` → `mailto:` link in Contact. |
| **Brand domain / OG image** | `index.html` `<head>` (`og:*`, `canonical`, JSON-LD). |

## 🎨 Brand colors (`css/styles.css` → `:root`)

Deep Saffron `#E8821E` · Luxury Gold `#C9A227`/`#E6C25A` · Cream `#FBF7F0` · Beige `#EDE3D2` ·
Dark Chocolate `#3A2218` · Premium Maroon `#6E1423`. Edit any `:root` (and `[data-theme="dark"]`)
value to retheme the whole site.

## 📞 Forms

No backend needed. The contact form and each product "Order" button compose a pre-filled
**WhatsApp** message (`wa.me/<number>`). The newsletter shows a confirmation (wire it to a real
provider before launch).

---
*Demo build — swap in real photos, prices and branch details before going live.*
