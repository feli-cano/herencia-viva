/* ═══════════════════════════════════════════════════════════════
   HERENCIA VIVA — main.js PROFESIONAL
   ═══════════════════════════════════════════════════════════════
   PRESERVADO: función mostrarProyecto() intacta con todo su
               contenido original.
   AÑADIDO:    - Navbar scroll effect + active link highlight
               - Hamburger menu animado + overlay de cierre
               - Scroll progress bar
               - Animaciones on scroll (IntersectionObserver)
               - Transición suave al cambiar proyecto
               - Card active state
   ═══════════════════════════════════════════════════════════════ */

/* ─── NAVBAR: scroll effect ─────────────────────────────────── */
const header     = document.getElementById('mainHeader');
const hamburger  = document.getElementById('hamburger');
const mainMenu   = document.getElementById('mainMenu');
const navLinks   = document.querySelectorAll('.nav-link');

// Crear overlay para cerrar menú mobile al hacer clic fuera
const menuOverlay = document.createElement('div');
menuOverlay.className = 'menu-overlay';
document.body.appendChild(menuOverlay);

function onScroll() {
    const scrollY = window.scrollY;

    /* ── Navbar scrolled state ── */
    if (scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    /* ── Scroll progress bar ── */
    const docH  = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = docH > 0 ? (scrollY / docH) * 100 : 0;
    document.documentElement.style.setProperty('--scroll-pct', pct.toFixed(2) + '%');

    /* ── Active nav link by section ── */
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
        if (scrollY >= sec.offsetTop - 120) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ─── HAMBURGER MENU ─────────────────────────────────────────── */
function openMenu() {
    hamburger.classList.add('open');
    mainMenu.classList.add('open');
    menuOverlay.classList.add('visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    mainMenu.classList.remove('open');
    menuOverlay.classList.remove('visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (mainMenu.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

menuOverlay.addEventListener('click', closeMenu);

// Cerrar menú al hacer clic en un link
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Cerrar menú con Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

/* ─── SCROLL SUAVE para links internos ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = header.offsetHeight + 20;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ─── ANIMACIONES ON SCROLL (IntersectionObserver) ──────────── */
const animElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Una vez visible, dejar de observar
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

animElements.forEach(el => scrollObserver.observe(el));

/* ─── PROYECTOS: mostrarProyecto (ORIGINAL PRESERVADO + mejoras) */
function mostrarProyecto(event, tipo) {
    const contenedor = document.getElementById("contenidoProyecto");

    // AÑADIDO: marcar card activa
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    const clickedCard = event.currentTarget;
    if (clickedCard) clickedCard.classList.add('active');

    // AÑADIDO: fade-out antes de cambiar contenido
    contenedor.classList.add('fade-out');

    setTimeout(() => {
        let contenido = "";

        /* ─── CONTENIDO ORIGINAL INTACTO ─── */
        if (tipo === "memorias") {
            contenido = `
            <h3>Sembrando Memorias</h3>
            <p>
            Sembrando memorias es una serie de retos virtuales en redes sociales, en la que cada participante debe publicar una foto o video con algún objeto o en alguna actividad que representa su cultura, con el objetivo de visibilizar su cultura y mostrar lo importante que es, logrando que más personas logren divisar nuestras vivencias.
            </p>`;
        }

        if (tipo === "raices") {
            contenido = `
            <h3>Sonido de Raíces</h3>
            <p>
            Sonido de raíces es un concierto inaugurar con grupos de marimba, chirimía y cantos tradicionales con el propósito de mostrar nuestra herencia musical al mismo tiempo que le damos la oportunidad a jóvenes y grupos musicales locales de mostrar su talento, pudiendo hacerse más reconocidos entre nuestra comunidad.
            </p>`;
        }

        if (tipo === "memoria") {
            contenido = `
            <h3>Memoria que Suena</h3>
            <p>
            Memoria que suena son una serie de actividades, entre ellas se encuentran un cine de proyección de cortometrajes comunitarios; con música en vivo que acompaña las imágenes. También entrevistas a músicos, adultos mayores y líderes sobre el poder transformador que tiene la música y un videomapping nocturno en un edificio o plaza con proyección de rostros, bailes y paisajes acompañados de tambores en vivo.
            </p>`;
        }

        if (tipo === "sabor") {
            contenido = `
            <h3>Sabor y Ritmo</h3>
            <p>
            Entre las actividades de sabor y ritmo hay una cocina musical en vivo, con chefs y cocineras tradicionales que preparan platos típicos mientras músicos tocan en simultáneo.
            </p>
            <p>
            También un taller de danza digital, en el que se grabarán pasos tradicionales con el fin de convertirlos en tutoriales cortos para tiktok.
            </p>`;
        }
        /* ─── FIN CONTENIDO ORIGINAL ─── */

        contenedor.innerHTML = contenido;

        // AÑADIDO: fade-in del nuevo contenido
        contenedor.classList.remove('fade-out');
        contenedor.style.opacity = '0';
        contenedor.style.transform = 'translateY(8px)';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                contenedor.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                contenedor.style.opacity    = '1';
                contenedor.style.transform  = 'translateY(0)';
            });
        });

    }, 220); // duración del fade-out
}