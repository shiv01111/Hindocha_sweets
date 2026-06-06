# Hindocha Sweets — Project Reference (CLAUDE.md)

## Project Overview
Premium single-page website for **Hindocha Sweets**, a traditional Gujarati sweets & farsan brand.
- **Tagline:** Authentic Taste of Gujarat Since Generations
- **Signature product:** Brown mawa Penda (hero of the entire site)
- **Stack:** Zero-build static site — HTML + CSS + vanilla JS, CDN libraries only
- **GitHub:** https://github.com/shiv01111/Hindocha_sweets
- **Live URL:** https://shiv01111.github.io/Hindocha_sweets
- **Local dev:** `npx serve -l 4321 .` → http://localhost:4321

---

## File Structure
```
D:\Hindocha sweets\
├─ index.html           # Single-page site (all sections)
├─ css/styles.css       # Full design system + responsive
├─ js/main.js           # All interactions
├─ assets/images/       # Local product photos (bundled)
│   ├─ penda.jpg            # Brown mawa penda on red satin (hero + Special Penda card)
│   ├─ penda-section.jpg    # Brass lotus thali with penda (Legendary section)
│   ├─ penda-closeup.jpg    # Yellow kesar peda (Kesar Penda card only)
│   ├─ barfi.jpg            # Besan barfi with pistachio
│   ├─ kaju-katli.jpg       # Kaju katli with festive bokeh
│   ├─ dry-fruit.jpg        # Dry fruit sweets on golden plate
│   ├─ festival.jpg         # Laddu/festival sweets
│   ├─ gathiya.jpg          # Gathiya (farsan)
│   ├─ bhavnagari.jpg       # Bhavnagari gathiya in steel thalis
│   ├─ chevdo.jpg           # Poha chevdo in white bowl (Gwalia source)
│   ├─ sev.jpg              # Golden sev strands
│   ├─ mix-farsan.jpg       # Mix namkeen in basket
│   ├─ traditional.jpg      # Chakli/murukku spirals
│   ├─ shop-display.jpg     # Mithai shop display case
│   ├─ tray.jpg             # Assorted sweets on tray
│   ├─ platter.jpg          # Premium sweet platter
│   ├─ market.jpg           # Market display
│   └─ assorted.jpg         # Studio platter of mixed mithai
├─ .claude/launch.json  # Preview server config
├─ README.md            # Swap guide for real images + branch data
└─ CLAUDE.md            # This file
```

---

## CDN Libraries (internet required at view time)
- **GSAP 3.12.5** + **ScrollTrigger** — scroll reveals, parallax
- **Lenis 1.1.13** — smooth scrolling (stop/start when drawers open)
- **Google Fonts** — Playfair Display (headings) + Inter (body)

---

## Design System (CSS Variables in `:root`)
| Token | Value | Usage |
|-------|-------|-------|
| `--saffron` | `#E8821E` | Primary brand, CTAs, accents |
| `--gold` / `--gold-light` | `#C9A227` / `#E6C25A` | Gradient, price text |
| `--cream` | `#FBF7F0` | Light bg |
| `--beige` | `#EDE3D2` | Alt sections |
| `--choco` | `#3A2218` | Dark text, footer bg |
| `--maroon` | `#6E1423` | Accent, price text |
| `--nav-h` | `76px` (64px mobile) | Nav bar height |
| `--announce-h` | `40px` (36px mobile) | Announcement bar |

**Typography:** `--serif` = Playfair Display, `--sans` = Inter  
**Dark mode:** `[data-theme="dark"]` toggled via button, saved in `localStorage`

---

## Page Sections (in order)
1. Announcement marquee bar (fixed, top)
2. Sticky nav (glass, below announce bar)
3. **Hero** — "Gujarat's Most Loved Penda", brown penda image, trust badges, CTAs
4. **Legacy band** — 30+ Years · 50,000+ Families · 3 Branches · 100% Fresh
5. **Legendary Penda section** — storytelling, brass thali image + festive float
6. **Sweets Collection** — 6 product cards with price + Order button
7. **Farsan Collection** — 6 product cards with price + Order button
8. **Why Customers Love Us** — 6 glass feature cards
9. **Our Story** — alternating timeline
10. **Gallery** — masonry grid + lightbox
11. **Branch Locations** — 3 glassmorphism cards (Jam Raval, Bhatiya, Dwarka) + maps
12. **Testimonials** — auto-play carousel
13. **Bulk & Festival Orders** — CTA band
14. **Contact** — form → WhatsApp
15. **Newsletter** — email signup
16. Footer

---

## Product Catalogue & Prices

### Sweets
| Product | Price/kg | Image | Notes |
|---------|----------|-------|-------|
| Special Penda | ₹420 | penda.jpg | **BROWN** mawa penda — hero/signature |
| Kesar Penda | ₹480 | penda-closeup.jpg | **YELLOW** — different from Special Penda |
| Barfi | ₹440 | barfi.jpg | |
| Kaju Katli | ₹720 | kaju-katli.jpg | |
| Dry Fruit Sweets | ₹860 | dry-fruit.jpg | |
| Festival Specials | ₹520 | festival.jpg | Seasonal tag |

### Farsan
| Product | Price/kg | Image | Notes |
|---------|----------|-------|-------|
| Gathiya | ₹260 | gathiya.jpg | |
| Bhavnagari Gathiya | ₹280 | bhavnagari.jpg | Regional tag |
| Chevdo | ₹240 | chevdo.jpg | Poha chevdo in white bowl |
| Sev | ₹240 | sev.jpg | |
| Mix Farsan | ₹300 | mix-farsan.jpg | |
| Traditional Snacks | ₹260 | traditional.jpg | |

**Weight options on all products:** 250g · 500g · 1 kg  
**Price multipliers:** 250g = ×0.25, 500g = ×0.50, 1 kg = ×1.00

---

## Branches (TODO-SWAP with real data)
| Branch | Address | Phone | Hours |
|--------|---------|-------|-------|
| Jam Raval | Main Bazaar Road, Jam Raval, Gujarat 361001 | +91 90000 00001 | 8AM–9:30PM |
| Bhatiya | Market Chowk, Bhatiya, Gujarat 361315 | +91 90000 00002 | 8AM–9:30PM |
| Dwarka | Temple Road, Dwarka, Gujarat 361335 | +91 90000 00003 | 8AM–10PM |

**WhatsApp number (TODO-SWAP):** `919000000001`  
→ In `js/main.js`: `WHATSAPP_NUMBER`, `WA_NUM`, `WA_CART`  
→ In `index.html`: all `wa.me/919000000001` links

---

## Cart System
- **State:** `localStorage` key `hs_cart` (array of cart items)
- **Cart icon:** in nav bar, badge shows total qty
- **Flow:** Card "Order ›" → Product Drawer opens → "Add to Cart" → Drawer closes → Cart opens
- **Cart drawer:** slides in from **RIGHT** on desktop, bottom sheet on mobile
- **Price display:** `₹[unit] × [qty] = ₹[total]` per line item
- **WhatsApp order:** single message with all items, weights, qtys, total
- **Cart item shape:**
  ```js
  { name, img, price, weight, qty }
  ```
- **Duplicate logic:** same product + same weight → merges qty instead of adding new row

---

## Product Drawer
- Slides in from **RIGHT**, full height on desktop
- Mobile: bottom sheet, 92dvh, drag handle pill
- **pd-inner** has `data-lenis-prevent` + wheel/touch `stopPropagation` to fix Lenis scroll conflict
- Lenis is `stop()`-ed on open and `start()`-ed on close
- Contains: image, name, desc, weight chips, qty picker, Add to Cart, Order on WhatsApp, trust badges, accordion (Ingredients, Storage, Shipping, Cancellation)
- All product data stored in `data-*` attributes on `.card` elements

---

## Key JS Vars / IDs
| Variable | Purpose |
|----------|---------|
| `WHATSAPP_NUMBER` | Contact form WA number |
| `WA_NUM` | Product drawer WA number |
| `WA_CART` | Cart WA number |
| `CART_KEY` | localStorage key (`hs_cart`) |
| `lenis` | Lenis instance (stopped on drawer/cart open) |
| `cart[]` | In-memory cart array |
| `drawerName/Wt/Qty/Price` | Current product drawer state |
| `wtMult` | `{250g:0.25, 500g:0.5, 1 kg:1}` |

---

## Important Design Decisions

### Brown vs Yellow Penda
- **Special Penda = BROWN** (traditional mawa penda) → `penda.jpg`, hero, bestseller card
- **Kesar Penda = YELLOW** (saffron peda) → `penda-closeup.jpg`, kesar card only
- These must never be swapped — client was explicit about this

### Smooth Scroll + Drawers
- Lenis intercepts ALL wheel/touch events globally
- Both product drawer (`pd-inner`) and cart drawer (`cart-body`) need:
  1. `data-lenis-prevent` attribute
  2. `wheel`/`touchstart`/`touchmove` `stopPropagation`
  3. `lenis.stop()` on open / `lenis.start()` on close

### CSS Cascade Order (CRITICAL)
- **Gwalia component styles** (`.legacy__grid`, `.newsletter__inner` etc.) come AFTER the responsive `@media` blocks in the source
- Therefore all responsive overrides use `!important` on grid-template-columns
- **Never put base component styles after the breakpoints** — they will override the media queries

### Cart + Drawer both on RIGHT
- Cart drawer: `inset: 0 0 0 auto` + `transform: translateX(100%)`
- Product drawer: same
- They are never both open simultaneously — one closes before the other opens

---

## TODO-SWAP Checklist (before going live)
- [ ] Replace all `assets/images/*.jpg` with real Hindocha product photos
- [ ] Replace `+91 90000 00001/02/03` with real branch phone numbers
- [ ] Replace branch addresses and Google Maps iframe `src` URLs
- [ ] Replace `919000000001` WhatsApp number in `js/main.js` (3 places) and `index.html`
- [ ] Replace `hello@hindochasweets.com` with real email
- [ ] Update `og:image`, `canonical` URL, JSON-LD brand URL
- [ ] Wire newsletter form to a real email service (Mailchimp, etc.)
- [ ] Update prices if they differ from the demo values

---

## Git History (key commits)
| Commit | What |
|--------|------|
| `e5b3aa3` | Initial release — full site |
| `a735ff9` | Product detail drawer (Gwalia-style) |
| `7897beb` | Fix drawer scroll (Lenis conflict) |
| `82adde4` | Fix drawer scroll blocked by Lenis |
| `e77ba31` | Full cart system |
| `230a0cb` | Cart position (right) + price breakdown fix |

---

## Client Demo Notes
- Demo runs at: http://localhost:4321 (run `npx serve -l 4321 .`)
- GitHub Pages: https://shiv01111.github.io/Hindocha_sweets
- Internet required for: CDN libs (GSAP, Lenis), Google Fonts, branch Maps iframes
- All product images are LOCAL (bundled) — work offline
- Dark mode default follows system preference, saved in localStorage
