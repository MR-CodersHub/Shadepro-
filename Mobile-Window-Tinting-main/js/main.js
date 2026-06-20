/* ============================================================
   MAIN.JS — Theme Toggle, Navbar, Search Overlay,
             Loader, Back-to-Top, Counters, Scroll Reveal
   ============================================================ */

/* ══════════════════════════════════════════════════
   THEME TOGGLE — Runs as early as possible
   ══════════════════════════════════════════════════ */
function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
  } else {
    document.documentElement.classList.remove('light-theme');
  }
  localStorage.setItem('shadepro-theme', theme);
}

function getCurrentTheme() {
  return localStorage.getItem('shadepro-theme') || 'dark';
}

function applyDirection(direction) {
  if (direction === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
  localStorage.setItem('shadepro-direction', direction);
}

function getCurrentDirection() {
  return localStorage.getItem('shadepro-direction') || 'ltr';
}

/* Apply immediately on script load (before DOMContentLoaded) */
applyTheme(getCurrentTheme());
applyDirection(getCurrentDirection());

/* ══════════════════════════════════════════════════
   DOM READY
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Loading Overlay ── */
  const loader = document.getElementById('loader');
  if (loader) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1400);
  }

  /* ── Sticky Navbar ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ══════════════════════════════════════════════════
     THEME TOGGLE BUTTON
     ══════════════════════════════════════════════════ */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = getCurrentTheme();
      const next = current === 'dark' ? 'light' : 'dark';

      /* Animate button press */
      themeToggle.style.transform = 'scale(0.88) rotate(15deg)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 250);

      applyTheme(next);
    });

    /* Keyboard accessibility */
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }

  /* ══════════════════════════════════════════════════
     RTL TOGGLE BUTTON
     ══════════════════════════════════════════════════ */
  const rtlToggle = document.getElementById('rtl-toggle');
  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      const current = getCurrentDirection();
      const next = current === 'rtl' ? 'ltr' : 'rtl';

      /* Animate button press */
      rtlToggle.style.transform = 'scale(0.88) rotate(-15deg)';
      setTimeout(() => {
        rtlToggle.style.transform = '';
      }, 250);

      applyDirection(next);
    });

    /* Keyboard accessibility */
    rtlToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        rtlToggle.click();
      }
    });
  }

  /* ══════════════════════════════════════════════════
     MOBILE NAVIGATION PANEL (HAMBURGER MENU)
     ══════════════════════════════════════════════════ */
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const mobileNavPanel  = document.getElementById('mobileNavPanel');
  const mobileNavClose  = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    if (mobileNavPanel && hamburgerToggle) {
      mobileNavPanel.classList.add('open');
      hamburgerToggle.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent scrolling behind
    }
  }

  function closeMobileNav() {
    if (mobileNavPanel && hamburgerToggle) {
      mobileNavPanel.classList.remove('open');
      hamburgerToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerToggle) {
    hamburgerToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileNavPanel && mobileNavPanel.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  // Close when clicking outside of the links container/on panel background
  if (mobileNavPanel) {
    mobileNavPanel.addEventListener('click', (e) => {
      if (e.target === mobileNavPanel) {
        closeMobileNav();
      }
    });
  }

  // Close when clicking any mobile link
  document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Highlight active mobile link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ══════════════════════════════════════════════════
     SEARCH OVERLAY
     ══════════════════════════════════════════════════ */
  const searchBtn     = document.getElementById('search-toggle-btn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose   = document.getElementById('searchClose');
  const searchInput   = document.getElementById('searchInput');

  function openSearch() {
    if (searchOverlay) {
      searchOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput && searchInput.focus(), 200);
    }
  }

  function closeSearch() {
    if (searchOverlay) {
      searchOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (searchBtn) searchBtn.addEventListener('click', (e) => { e.stopPropagation(); openSearch(); });
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
  }


  /* ESC key closes search */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  /* Search form submission */
  const searchForm = document.querySelector('.search-overlay-input-wrap');
  if (searchForm) {
    const searchSubmit = searchForm.querySelector('.search-overlay-submit');
    const doSearch = () => {
      const val = searchInput ? searchInput.value.trim() : '';
      if (val) {
        alert(`Searching for: "${val}"\n\n(Connect this to your search backend)`);
        closeSearch();
        if (searchInput) searchInput.value = '';
      }
    };
    if (searchSubmit) searchSubmit.addEventListener('click', doSearch);
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSearch();
      });
    }
  }

  /* ── Back To Top ── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => el.classList.add('active'), parseInt(delay));
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── Staggered Grid Reveal ── */
  document.querySelectorAll('[data-stagger]').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
      child.classList.add('reveal');
    });
  });

  /* ── Animated Counters ── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString() + suffix;
            if (current >= target) clearInterval(timer);
          }, 16);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  /* ── Hero Particles ── */
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      const size = Math.random() * 6 + 3;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 8 + 6}s;
        animation-delay: ${Math.random() * 5}s;
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ── Newsletter Form ── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn   = form.querySelector('button');
      if (!input || !input.value.trim()) return;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#22c55e';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
      }, 3000);
    });
  });

  /* ── Card willChange Optimization ── */
  document.querySelectorAll('.service-card, .product-card, .card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.willChange = 'transform, box-shadow';
    });
    card.addEventListener('mouseleave', function () {
      this.style.willChange = 'auto';
    });
  });

});
