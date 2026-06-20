/* ============================================================
   COMPONENTS.JS — Shared HTML: Navbar + Footer injection
   Theme & direction toggle runs immediately before DOM injection
   ============================================================ */

/* ── Apply saved theme & direction IMMEDIATELY to prevent flash ── */
(function () {
  const savedTheme = localStorage.getItem('shadepro-theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
  }
  const savedDir = localStorage.getItem('shadepro-direction') || 'ltr';
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }
})();

(function () {

  /* ── SVG Icon Definitions ── */
  const ICON_SEARCH = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`;

  const ICON_MOON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="currentColor"/></svg>`;

  const ICON_SUN = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="currentColor"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

  const ICON_CLOSE = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`;

  const ICON_LTR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h14M15 15l3-3-3-3M18 12H9"/></svg>`;

  const ICON_RTL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M10 12h10M6 18h14M9 15l-3-3 3-3M6 12h9"/></svg>`;


  const ICON_HOME = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

  const ICON_HOME2 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>`;

  const ICON_SERVICES = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;

  const ICON_ABOUT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;

  const ICON_GALLERY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;


  const ICON_TESTIMONIALS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  const ICON_FAQ = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

  const ICON_BLOG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M16 8h2"/><path d="M16 12h2"/><path d="M16 16h2"/><path d="M6 8h6v8H6z"/></svg>`;

  const ICON_CONTACT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

  const ICON_FACEBOOK = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;

  const ICON_INSTAGRAM = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;

  const ICON_TWITTER = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768M20 4l-6.768 6.768" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`;

  const NAV_HTML = `
  <div id="loader">
    <div class="loader-logo">SHADE<span>PRO</span></div>
    <div class="loader-bar"><div class="loader-bar-inner"></div></div>
  </div>

  <nav class="navbar" id="navbar">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-icon">S</div>
        <div class="nav-logo-text">
          <span class="nav-logo-name">SHADE<span>PRO</span></span>
        </div>
      </a>

      <div class="nav-links">
        <a href="index.html"          class="nav-link">Home</a>
        <a href="home2.html"          class="nav-link">Home 2</a>
        <a href="about.html"          class="nav-link">About</a>
        <a href="services.html"       class="nav-link">Services</a>
        <a href="gallery.html"        class="nav-link">Gallery</a>
        <a href="blog.html"           class="nav-link">Blog</a>
        <a href="contact.html"        class="nav-link">Contact</a>
      </div>

      <div class="nav-actions">

        <!-- Theme Toggle -->
        <button id="theme-toggle" aria-label="Toggle light/dark mode" title="Toggle theme">
          <span class="theme-icon icon-moon">${ICON_MOON}</span>
          <span class="theme-icon icon-sun">${ICON_SUN}</span>
        </button>

        <!-- RTL Toggle -->
        <button id="rtl-toggle" aria-label="Toggle RTL/LTR direction" title="Toggle RTL">
          <span class="rtl-icon icon-ltr">${ICON_LTR}</span>
          <span class="rtl-icon icon-rtl">${ICON_RTL}</span>
        </button>

        <!-- Book Now CTA -->
        <a href="booking.html" class="nav-cta">Book Now</a>

        <!-- Hamburger Menu Toggle -->
        <button id="hamburger-toggle" aria-label="Toggle menu" title="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Navigation Panel -->
  <div class="mobile-nav-panel" id="mobileNavPanel">
    <div class="mobile-nav-header">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-icon">S</div>
        <div class="nav-logo-text">
          <span class="nav-logo-name">SHADE<span>PRO</span></span>
        </div>
      </a>
      <button id="mobile-nav-close" aria-label="Close menu" title="Close menu">
        ${ICON_CLOSE}
      </button>
    </div>
    <div class="mobile-nav-links">
      <a href="index.html"          class="mobile-nav-link">Home</a>
      <a href="home2.html"          class="mobile-nav-link">Home 2</a>
      <a href="about.html"          class="mobile-nav-link">About</a>
      <a href="services.html"       class="mobile-nav-link">Services</a>
      <a href="gallery.html"        class="mobile-nav-link">Gallery</a>
      <a href="blog.html"           class="mobile-nav-link">Blog</a>
      <a href="contact.html"        class="mobile-nav-link">Contact</a>
      <a href="booking.html"        class="mobile-nav-cta">Book Now</a>
    </div>
  </div>

  <!-- Search Overlay -->
  <div class="search-overlay" id="searchOverlay">
    <button class="search-overlay-close" id="searchClose" aria-label="Close search">
      ${ICON_CLOSE}
    </button>
    <div class="search-overlay-inner">
      <div class="search-overlay-label">Search ShadePro</div>
      <div class="search-overlay-input-wrap">
        <input
          type="text"
          class="search-overlay-input"
          id="searchInput"
          placeholder="Search services, blog, products…"
          autocomplete="off"
        />
        <button class="search-overlay-submit" aria-label="Submit search">
          ${ICON_SEARCH}
        </button>
      </div>
    </div>
  </div>
  `;

  const FOOTER_HTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="margin-bottom:18px;display:inline-flex;">
            <div class="nav-logo-icon">S</div>
            <div class="nav-logo-text">
              <span class="nav-logo-name">SHADE<span>PRO</span></span>
            </div>
          </a>
          <p class="footer-desc">Professional mobile window tinting and Paint Protection Film services. We come to you — at your home, office, or anywhere in the city.</p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Facebook">f</a>
            <a href="#" class="social-link" aria-label="Instagram">in</a>
            <a href="#" class="social-link" aria-label="Twitter">𝕏</a>
            <a href="#" class="social-link" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div>
          <h4 class="footer-col-title">Quick Links</h4>
          <div class="footer-links">
            <a href="services.html"     class="footer-link">Our Services</a>
            <a href="gallery.html"      class="footer-link">Gallery</a>
            <a href="home2.html#pricing" class="footer-link">Pricing</a>
            <a href="testimonials.html" class="footer-link">Reviews</a>
            <a href="faq.html"          class="footer-link">FAQ</a>
            <a href="blog.html"         class="footer-link">Blog</a>
          </div>
        </div>

        <div>
          <h4 class="footer-col-title">Services</h4>
          <div class="footer-links">
            <a href="services.html" class="footer-link">Window Tinting</a>
            <a href="services.html" class="footer-link">Ceramic Tint</a>
            <a href="services.html" class="footer-link">Paint Protection Film</a>
            <a href="services.html" class="footer-link">Vinyl Wrap</a>
            <a href="services.html" class="footer-link">Ceramic Coating</a>
            <a href="booking.html"  class="footer-link">Book a Service</a>
          </div>
        </div>

        <div>
          <h4 class="footer-col-title">Contact Us</h4>
          <div class="footer-contact-item">
            <div class="footer-contact-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
            <div>
              <div class="footer-contact-label">Phone</div>
              <div class="footer-contact-val">+1 (555) 012-3456</div>
            </div>
          </div>
          <div class="footer-contact-item">
            <div class="footer-contact-icon"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
            <div>
              <div class="footer-contact-label">Email</div>
              <div class="footer-contact-val">info@shadepro.com</div>
            </div>
          </div>
          <div class="footer-contact-item">
            <div class="footer-contact-icon"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <div>
              <div class="footer-contact-label">Service Area</div>
              <div class="footer-contact-val">Miami &amp; Surrounding Areas</div>
            </div>
          </div>
          <div style="margin-top:20px;">
            <h5 style="font-size:.8rem;color:var(--gray-400);margin-bottom:10px;letter-spacing:1px;text-transform:uppercase;">Newsletter</h5>
            <form class="newsletter-form" onsubmit="return false;">
              <input type="email" placeholder="Your email" aria-label="Email">
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="container">
      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <p class="footer-copy">© 2025 <span>ShadePro</span>. All rights reserved. Designed with <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:#ff6b00;stroke:none;vertical-align:middle;margin:0 2px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> for premium automotive protection.</p>
          <div class="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Back To Top -->
  <button id="backToTop" aria-label="Back to top">
    <svg viewBox="0 0 24 24"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
  </button>

  <!-- WhatsApp FAB -->
  <a href="https://wa.me/15550123456" id="whatsappBtn" target="_blank" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  `;

  /* ── Inject nav before page content ── */
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;
})();
