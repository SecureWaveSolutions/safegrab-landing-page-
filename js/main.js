// SafeGrab - Landing Page JS
// Secure Wave Solutions

// ── Menú hamburger (mobile) ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        nav.classList.remove('active');
    });
});

// ── Scroll suave a secciones ────────────────────────────
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ── Animación de aparición al hacer scroll ──────────────
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

const animateItems = document.querySelectorAll('.card, .step-card, .stat-card, .team-card, .screenshot-card');
animateItems.forEach(function(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// ── Contador animado en stats ───────────────────────────
function animateCount(element, target, suffix) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 25);
}

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-number');
            nums.forEach(function(num) {
                const data = num.getAttribute('data-count');
                const suffix = num.getAttribute('data-suffix') || '';
                if (data) {
                    animateCount(num, parseInt(data), suffix);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ── Año dinámico en footer ──────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
