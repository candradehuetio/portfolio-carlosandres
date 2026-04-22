// ================================================
//  PORTFOLIO — script.js
//  Funcionalidades: modo oscuro/claro, menú móvil,
//  scroll reveal, barras de habilidades, nav activa
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. TOGGLE MODO CLARO / OSCURO ──────────────
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const body        = document.body;

  // Recuperar preferencia guardada
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeIcon.classList.toggle('fa-moon', !isLight);
    themeIcon.classList.toggle('fa-sun',   isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });


  // ── 2. MENÚ HAMBURGUESA (MÓVIL) ────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });


  // ── 3. SCROLL REVEAL ───────────────────────────
  // Añade clase .reveal a todos los elementos que queremos animar
  const revealTargets = document.querySelectorAll(
    '.hero-content, .hero-image-wrapper, .about-text, .about-stats,' +
    '.skill-category, .project-card, .timeline-item, .contact-card, .stat-card'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeño retraso escalonado para los elementos en grupo
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));


  // ── 4. BARRAS DE HABILIDADES ───────────────────
  // Se animan cuando la sección de habilidades entra en pantalla
  const skillsSection = document.querySelector('.skills');

  if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('skills-visible');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillObserver.observe(skillsSection);
  }


  // ── 5. ENLACE NAV ACTIVO SEGÚN SECCIÓN ─────────
  const sections    = document.querySelectorAll('section[id]');
  const navAnchors  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));


  // ── 6. BOTÓN VOLVER ARRIBA ─────────────────────
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
