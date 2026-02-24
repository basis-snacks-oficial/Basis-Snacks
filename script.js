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
