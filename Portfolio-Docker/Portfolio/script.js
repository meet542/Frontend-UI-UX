const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const backToTop = document.querySelector('.back-to-top');
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = document.querySelector('.lightbox-close');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Typing animation
const dynamicText = document.querySelector('.dynamic-text');
const roles = ['Java Developer', 'DevOps Learner', 'Spring Boot Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (!dynamicText) return;

  if (!isDeleting) {
    dynamicText.textContent = currentRole.slice(0, ++charIndex);
  } else {
    dynamicText.textContent = currentRole.slice(0, --charIndex);
  }

  let typingSpeed = isDeleting ? 70 : 110;

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 1400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400;
  }

  setTimeout(typeLoop, typingSpeed);
}

typeLoop();

// Mobile menu toggle
navToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('is-open');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal animation
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Back to top button
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 500);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Image lightbox
document.querySelectorAll('[data-lightbox]').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    const imageUrl = item.getAttribute('href');
    if (lightboxImage) {
      lightboxImage.src = imageUrl;
      lightbox?.classList.add('active');
      lightbox?.setAttribute('aria-hidden', 'false');
    }
  });
});

function closeLightbox() {
  lightbox?.classList.remove('active');
  lightbox?.setAttribute('aria-hidden', 'true');
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});
