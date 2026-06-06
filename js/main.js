/* =============================================================
   HINDOCHA SWEETS — Interactions
   GSAP + ScrollTrigger + Lenis loaded via CDN (deferred).
   All features degrade gracefully if a CDN fails.
   ============================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Theme: respect saved choice or system, toggle ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem("hs-theme");
  if (saved) {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }
  $("#themeToggle")?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("hs-theme", next);
  });

  /* ---------- Mobile nav ---------- */
  const burger = $("#navBurger");
  const navLinks = $("#navLinks");
  burger?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Nav shadow on scroll + scroll progress ---------- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Smooth scroll (Lenis if present, else native) ---------- */
  let lenis = null;
  if (window.Lenis && !prefersReduced) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    // Drive nav shadow + progress through Lenis too, in case it suppresses
    // native scroll events.
    lenis.on("scroll", onScroll);
  }
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 116;
      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    });
  });

  /* ---------- Reveal on scroll (IntersectionObserver) ----------
     Defensive: above-the-fold elements reveal immediately, and a safety
     timeout reveals anything still hidden — so content is NEVER stuck
     invisible if IO is throttled (e.g. a backgrounded tab).           */
  const reveals = $$(".reveal");
  const show = el => el.classList.add("is-in");
  const inView = el => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  };

  if (prefersReduced) {
    reveals.forEach(show);
  } else {
    // 1) Reveal whatever is already on screen at load (no IO dependency).
    reveals.forEach(el => { if (inView(el)) show(el); });

    // 2) IO handles the elegant staggered reveal as the user scrolls.
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || (i % 4) * 70;
            setTimeout(() => show(entry.target), delay);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(el => { if (!el.classList.contains("is-in")) io.observe(el); });
    }

    // 3) Safety net: never leave content hidden.
    setTimeout(() => reveals.forEach(show), 2600);
  }

  /* ---------- Parallax (GSAP if present, else light fallback) ---------- */
  const parallaxEls = $$("[data-parallax]");
  if (window.gsap && window.ScrollTrigger && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
    if (lenis) lenis.on("scroll", ScrollTrigger.update);
  } else if (!prefersReduced) {
    window.addEventListener("scroll", () => {
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        const rect = el.getBoundingClientRect();
        el.style.transform = `translateY(${(rect.top - window.innerHeight / 2) * speed * 0.15}px)`;
      });
    }, { passive: true });
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  $$(".masonry__item img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  const closeLb = () => { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); };
  $("#lightboxClose")?.addEventListener("click", closeLb);
  lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLb(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

  /* ---------- Testimonials carousel ---------- */
  const track = $("#carouselTrack");
  if (track) {
    const slides = $$(".quote", track);
    const dotsWrap = $("#carouselDots");
    let idx = 0, timer = null;

    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Go to review " + (i + 1));
      b.addEventListener("click", () => go(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = $$("button", dotsWrap);

    function go(n, manual) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      if (manual) restart();
    }
    const next = () => go(idx + 1);
    const prev = () => go(idx - 1);
    function restart() { clearInterval(timer); timer = setInterval(next, 6000); }

    $("#nextQuote")?.addEventListener("click", () => go(idx + 1, true));
    $("#prevQuote")?.addEventListener("click", () => go(idx - 1, true));
    $("#carousel")?.addEventListener("mouseenter", () => clearInterval(timer));
    $("#carousel")?.addEventListener("mouseleave", restart);

    go(0);
    if (!prefersReduced) restart();
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  // TODO-SWAP: replace with the real WhatsApp business number (country code, no +/spaces).
  const WHATSAPP_NUMBER = "919000000001";
  const form = $("#contactForm");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const note = $("#formNote");
    const name = $("#cName").value.trim();
    const mobile = $("#cMobile").value.trim();
    if (!name || !mobile) {
      note.textContent = "Please add your name and mobile number.";
      return;
    }
    const email = $("#cEmail").value.trim();
    const type = $("#cType").value;
    const msg = $("#cMsg").value.trim();
    const text =
      `Hello Hindocha Sweets!%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Mobile:* ${encodeURIComponent(mobile)}%0A` +
      (email ? `*Email:* ${encodeURIComponent(email)}%0A` : "") +
      `*Inquiry:* ${encodeURIComponent(type)}%0A` +
      (msg ? `*Message:* ${encodeURIComponent(msg)}` : "");
    note.textContent = "Opening WhatsApp…";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener");
    form.reset();
  });

  /* ---------- Newsletter (demo: no backend) ---------- */
  const nlForm = $("#newsletterForm");
  nlForm?.addEventListener("submit", e => {
    e.preventDefault();
    const note = $("#nlNote");
    const email = $("#nlEmail").value.trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      note.textContent = "Please enter a valid email address.";
      return;
    }
    note.textContent = "🎉 Thank you! You're on the list for sweet offers.";
    nlForm.reset();
  });

  /* ============================================================
     PRODUCT DRAWER
     Opens a Gwalia-style product detail panel when "Order ›" is clicked.
     Reads all data from card's data-* attributes so no extra config needed.
  ============================================================ */
  const WA_NUM = "919000000001"; // TODO-SWAP: real number
  const overlay = $("#pdOverlay");
  const drawer  = $("#pdDrawer");
  let drawerQty = 1;
  let drawerWt  = "";
  let drawerName = "";
  let drawerPrice = 0;

  function openDrawer(card) {
    const d = card.dataset;
    drawerName  = d.name;
    drawerPrice = parseInt(d.price, 10);
    drawerQty   = 1;

    // Populate image
    const img = $("#pdImg");
    img.src = d.img; img.alt = d.name;

    // Tag
    const tag = $("#pdTag");
    tag.textContent = d.tag || "";

    // Text fields
    $("#pdTitle").textContent       = d.name;
    $("#pdDesc").textContent        = d.desc;
    $("#pdIngredients").textContent = d.ingredients;
    $("#pdStorage").textContent     = d.storage;

    // Price
    updatePrice();

    // Weight chips
    const weightsEl = $("#pdWeights");
    const weights = JSON.parse(d.weights || '["250g","500g","1 kg"]');
    weightsEl.innerHTML = "";
    weights.forEach((w, i) => {
      const btn = document.createElement("button");
      btn.className = "pd-wt" + (i === 1 ? " active" : "");
      btn.textContent = w;
      if (i === 1) drawerWt = w;
      btn.addEventListener("click", () => {
        $$(".pd-wt").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        drawerWt = w;
        updateWA();
      });
      weightsEl.appendChild(btn);
    });
    if (!drawerWt) drawerWt = weights[0];

    // Qty
    $("#pdQty").textContent = "1";
    drawerQty = 1;
    updateWA();

    // Open
    overlay.classList.add("open");
    drawer.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // Close accordions on fresh open
    $$(".pd-acc__head").forEach(h => {
      h.setAttribute("aria-expanded", "false");
      h.nextElementSibling.classList.remove("open");
    });
    // Scroll inner content to top
    const inner = document.getElementById('pdDrawer')?.querySelector('.pd-inner');
    if (inner) inner.scrollTop = 0;
    // Focus close button for a11y
    setTimeout(() => $("#pdClose")?.focus(), 80);
  }

  function closeDrawer() {
    overlay.classList.remove("open");
    drawer.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updatePrice() {
    // Base per-kg price; scale by qty
    const total = drawerPrice * drawerQty;
    $("#pdPrice").textContent = `₹${total.toLocaleString("en-IN")} / kg`;
  }

  function updateWA() {
    const text = encodeURIComponent(
      `Hello Hindocha Sweets! 🙏\n\nI'd like to order:\n` +
      `*Product:* ${drawerName}\n` +
      `*Weight:*  ${drawerWt}\n` +
      `*Quantity:* ${drawerQty}\n\n` +
      `Please confirm availability and price. Thank you!`
    );
    const wa = $("#pdWhatsapp");
    if (wa) wa.href = `https://wa.me/${WA_NUM}?text=${text}`;
  }

  // Quantity buttons
  $("#pdPlus")?.addEventListener("click", () => {
    drawerQty = Math.min(drawerQty + 1, 20);
    $("#pdQty").textContent = drawerQty;
    updatePrice(); updateWA();
  });
  $("#pdMinus")?.addEventListener("click", () => {
    drawerQty = Math.max(drawerQty - 1, 1);
    $("#pdQty").textContent = drawerQty;
    updatePrice(); updateWA();
  });

  // Close triggers
  $("#pdClose")?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  // Open on every "Order ›" button click (event delegation)
  document.addEventListener("click", e => {
    const btn = e.target.closest(".btn-order");
    if (!btn) return;
    const card = btn.closest(".card");
    if (card) { e.preventDefault(); openDrawer(card); }
  });

  // Accordion
  $$(".pd-acc__head").forEach(head => {
    head.addEventListener("click", () => {
      const expanded = head.getAttribute("aria-expanded") === "true";
      // Close all first
      $$(".pd-acc__head").forEach(h => {
        h.setAttribute("aria-expanded", "false");
        h.nextElementSibling.classList.remove("open");
      });
      if (!expanded) {
        head.setAttribute("aria-expanded", "true");
        head.nextElementSibling.classList.add("open");
      }
    });
  });

})();
