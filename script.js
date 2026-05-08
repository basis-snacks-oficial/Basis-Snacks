// ===========================
// Basi's Snacks - JavaScript
// ===========================

// State
// Toggle Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Scroll to Contact Section
function scrollToContact() {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}
function sendMessage() {
    const name = document.querySelector('input[placeholder="Tu nombre completo"]').value;
    const details = document.querySelector('textarea').value;

    let message = "Hola, me gustaría hacer un pedido.";
    if (name) message += ` Mi nombre es ${name}.`;
    if (details) message += ` Detalles: ${details}`;

    const phone = "525951049071"; // Replace with actual number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}

// Change Navbar on scroll
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'shadow-md');
        navbar.classList.remove('py-4', 'shadow-none');
    }
});

// GSAP Animations
window.addEventListener("load", () => {
    // Make sure GSAP is available
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Limpiar clases de transición que confunden a GSAP
        document.querySelectorAll('#menu .grid > div, #proceso .grid > div, #testimonios .grid > div').forEach(el => {
            el.classList.remove('transition', 'duration-300', 'transform');
        });

        // Limpiar animaciones del botón flotante de WhatsApp
        const waBtn = document.querySelector('a[href*="wa.me"].fixed');
        if (waBtn) {
            waBtn.classList.remove('transition', 'animate-bounce', 'hover:animate-none');
        }

        const tl = gsap.timeline();

        // 0. Navbar Animation (Removed for stability)
        // 1. Hero Section Animations
        tl.from(".hero-badge", { y: -30, duration: 0.8, ease: "back.out(1.7)" })
          .from(".hero-title", { y: 30, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .from(".hero-subtitle", { y: 20, duration: 0.8, ease: "power3.out" }, "-=0.4");

        // Scroll Down Indicator animation (continuous yoyo)
        gsap.fromTo(".hero-scroll-down", 
            { y: -10 }, 
            { y: 10, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" }
        );

        // --- SCROLL ANIMATIONS ---
        
        // 2. Menu Snacks (Staggered fade up)
        gsap.from("#menu .grid > div", {
            scrollTrigger: {
                trigger: "#menu",
                start: "top 80%", // Animates when top of #menu hits 80% viewport
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });

        // 3. How We Work (Proceso)
        gsap.from("#proceso .grid > div", {
            scrollTrigger: {
                trigger: "#proceso",
                start: "top 80%",
            },
            scale: 0.8,
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.5)"
        });

        // 4. Testimonials (Slide in from sides)
        const testimonials = gsap.utils.toArray("#testimonios .grid > div");
        if (testimonials.length >= 3) {
            // First slides from left
            gsap.from(testimonials[0], {
                scrollTrigger: { trigger: "#testimonios", start: "top 85%" },
                x: -50, opacity: 0, duration: 0.8, ease: "power2.out"
            });
            // Middle fades up
            gsap.from(testimonials[1], {
                scrollTrigger: { trigger: "#testimonios", start: "top 85%" },
                y: 50, opacity: 0, duration: 0.8, delay: 0.2, ease: "power2.out"
            });
            // Third slides from right
            gsap.from(testimonials[2], {
                scrollTrigger: { trigger: "#testimonios", start: "top 85%" },
                x: 50, opacity: 0, duration: 0.8, delay: 0.4, ease: "power2.out"
            });
        }

        // 5. Contact Section (Split entry)
        gsap.from("#contacto > div > div:first-child", {
            scrollTrigger: { trigger: "#contacto", start: "top 80%" },
            x: -50, opacity: 0, duration: 0.8, ease: "power2.out"
        });

        gsap.from("#contacto > div > div:last-child", {
            scrollTrigger: { trigger: "#contacto", start: "top 80%" },
            x: 50, opacity: 0, duration: 0.8, delay: 0.2, ease: "power2.out"
        });

        // 6. Floating WhatsApp Button
        if (waBtn) {
            gsap.from(waBtn, {
                scrollTrigger: {
                    trigger: "#menu",
                    start: "top 60%", // Aparece solo cuando llegas al menú
                    toggleActions: "play none none reverse" // Se oculta si subes de nuevo
                },
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
            });
            
            // Re-add a subtle hover animation via GSAP
            waBtn.addEventListener("mouseenter", () => gsap.to(waBtn, { scale: 1.1, duration: 0.3 }));
            waBtn.addEventListener("mouseleave", () => gsap.to(waBtn, { scale: 1, duration: 0.3 }));
        }
    }
});
