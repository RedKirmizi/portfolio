/* =========================================================
   Abegail Ete — Portfolio interactions
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle (persisted) ---------- */
  var toggle = document.getElementById('themeToggle');

  function applyTheme(mode) {
    root.setAttribute('data-theme', mode);
    var isDark = mode === 'dark';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
    // sync aria state with theme set pre-paint
    applyTheme(root.getAttribute('data-theme') || 'light');
  }

  /* ---------- Mobile nav ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Nav shadow + scroll progress ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('is-scrolled', y > 8);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // gentle stagger for groups entering together
          entry.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Scrollspy (active nav link) ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var linkFor = {};
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(linkFor).forEach(function (k) { linkFor[k].classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.5, rootMargin: '-20% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Hero role rotator ---------- */
  var rotator = document.getElementById('rotator');
  var roles = ['Data Analyst', 'CS Student', 'Communicator', 'Collaborator'];
  if (rotator && !prefersReduced) {
    var idx = 0;
    setInterval(function () {
      var current = rotator.querySelector('.rotator__word');
      idx = (idx + 1) % roles.length;
      var next = document.createElement('span');
      next.className = 'rotator__word is-entering';
      next.textContent = roles[idx];
      current.classList.add('is-leaving');
      rotator.appendChild(next);
      setTimeout(function () { 
        if (current.parentNode) current.parentNode.removeChild(current);
        next.classList.remove('is-entering');
      }, 380);
    }, 2600);
  }

  /* ---------- Misc ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }
  /* ---------- Flip card ---------- */
  var flipBtns = document.querySelectorAll('.project__flip-btn');
  flipBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.project--flipcard');
      if (card) card.classList.toggle('is-flipped');
    });
  });})();
