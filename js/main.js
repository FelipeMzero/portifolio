/* ============================================================
   NAVBAR — scroll effect + mobile toggle
   ============================================================ */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

// Adiciona sombra ao navbar ao rolar
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Menu mobile
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fecha menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;

    // Delay escalonado para elementos irmãos
    const siblings = Array.from(
      entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
    );
    const index = siblings.indexOf(entry.target);
    const delay = index >= 0 ? index * 90 : 0;

    setTimeout(() => {
      entry.target.classList.add('visible');
    }, delay);

    revealObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.07,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   NAV — destaca link da seção ativa
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    links.forEach(link => {
      link.style.color = '';
      link.style.background = '';
      link.style.fontWeight = '';
    });
    const active = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (active && !active.classList.contains('nav-cta')) {
      active.style.color = 'var(--orange)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


/* ============================================================
   ANIMAÇÃO DE CONTADORES (stats no hero card)
   ============================================================ */
function animateCounter(el, target, suffix = '') {
  const duration = 1400;
  const step     = 16;
  const steps    = duration / step;
  let current    = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, step);
}

// Dispara quando o hero card entra na tela
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const nums = heroCard.querySelectorAll('.hcard-num');
      // 56+, 5+, 3+
      animateCounter(nums[0], 56, '+');
      animateCounter(nums[1], 5,  '+');
      animateCounter(nums[2], 3,  '+');

      counterObserver.disconnect();
    });
  }, { threshold: 0.5 });

  counterObserver.observe(heroCard);
}


/* ============================================================
   SMOOTH SCROLL suave para links internos
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});