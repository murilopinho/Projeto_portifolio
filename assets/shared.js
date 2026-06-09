/* ============================================================
   SHARED.JS — MP Soluções Digitais · Portfolio
   ============================================================ */

/* --- CURSOR CUSTOMIZADO --- */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a, button, [data-cursor]');
    if (t) ring.classList.add('on-link');
  });
  document.addEventListener('mouseout', e => {
    const t = e.target.closest('a, button, [data-cursor]');
    if (t) ring.classList.remove('on-link');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* --- RELÓGIO BRT --- */
function updateClock() {
  const els = document.querySelectorAll('.nav-clock');
  if (!els.length) return;
  const now = new Date().toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  els.forEach(el => el.textContent = 'BRT ' + now);
}
updateClock();
setInterval(updateClock, 1000);

/* --- NAV HAMBURGER --- */
(function initHamburger() {
  const btn  = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      const spans = btn.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();

/* --- REVEAL ON SCROLL (IntersectionObserver) --- */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), +delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
})();

/* --- PAGE TRANSITIONS --- */
(function initPageTransitions() {
  const overlay = document.getElementById('page-overlay');
  if (!overlay) return;

  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        href.startsWith('wa.me') || a.target === '_blank') return;

    a.addEventListener('click', e => {
      e.preventDefault();
      overlay.style.transition = 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)';
      overlay.style.transformOrigin = 'left';
      overlay.style.transform = 'scaleX(1)';
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });

  window.addEventListener('pageshow', () => {
    overlay.style.transition = 'none';
    overlay.style.transformOrigin = 'right';
    overlay.style.transform = 'scaleX(1)';
    requestAnimationFrame(() => {
      overlay.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
      overlay.style.transform  = 'scaleX(0)';
    });
  });
})();

/* --- NAV SCROLL STYLE --- */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 40
      ? 'rgba(240,237,230,0.08)'
      : 'transparent';
  }, { passive: true });
})();
