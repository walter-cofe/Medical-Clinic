const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function toggleNav() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('show');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
}

hamburger?.addEventListener('click', toggleNav);
navOverlay?.addEventListener('click', toggleNav);

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) toggleNav();
    });
});

const navbar = document.querySelector('.navbar-main');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 60) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal, { passive: true });

// ===== ANIMATED COUNTER =====
function animateCounter(el) {
    const target = el.getAttribute('data-target');
    const isDecimal = target.includes('.');
    const hasPlus = target.includes('+');
    const cleanTarget = parseFloat(target.replace('+', ''));
    const duration = 2000;
    const step = 20;
    const totalSteps = duration / step;
    const increment = cleanTarget / totalSteps;
    let current = 0;
    let stepCount = 0;

    const timer = setInterval(() => {
        stepCount++;
        current += increment;
        if (stepCount >= totalSteps) {
            current = cleanTarget;
            clearInterval(timer);
        }
        let display = isDecimal ? current.toFixed(1) : Math.floor(current);
        el.textContent = display + (hasPlus ? '+' : '');
    }, step);
}

const counterElements = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

const heroSection = document.querySelector('.hero');
const heroImg = document.querySelector('.hero-img-wrapper, .doctor-card-wrapper');

window.addEventListener('scroll', () => {
    if (!heroSection || !heroImg) return;
    const scrolled = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (scrolled < heroBottom) {
        const parallax = scrolled * 0.15;
        heroImg.style.transform = `translateY(${parallax}px)`;
    }
}, { passive: true });

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

document.querySelectorAll('.btn-primary-custom, .btn-white, .btn-medico-primary, .nav-signup, .btn-login-submit').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translateY(-3px) translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    setTimeout(() => {
        heroTitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
}

const heroElements = document.querySelectorAll('.hero-label, .hero-desc, .hero-actions, .hero-stats');
heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, 500 + (i * 150));
});

const heroImgEl = document.querySelector('.hero-img-col, .hero-media-col');
if (heroImgEl) {
    heroImgEl.style.opacity = '0';
    heroImgEl.style.transform = 'translateX(40px)';
    setTimeout(() => {
        heroImgEl.style.transition = 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
        heroImgEl.style.opacity = '1';
        heroImgEl.style.transform = 'translateX(0)';
    }, 600);
}

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.style.color = 'var(--primary)';
                link.style.background = 'var(--primary-light)';
            } else {
                link.style.color = '';
                link.style.background = '';
            }
        }
    });
}, { passive: true });
