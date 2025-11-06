document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const next = document.querySelector('.carousel-btn.next');
    const prev = document.querySelector('.carousel-btn.prev');

    if (carousel && next && prev) {
        const scrollAmount = carousel.offsetWidth * 0.9;

        const updateButtons = () => {
            prev.disabled = carousel.scrollLeft <= 0;
            next.disabled = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 5;
        };

        updateButtons();

        next.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(updateButtons, 400);
        });

        prev.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            setTimeout(updateButtons, 400);
        });

        carousel.addEventListener('scroll', updateButtons);
    }

   // --- Hover táctil (compatible con todos los móviles) ---
const hoverables = document.querySelectorAll('.pain-list li, .solution-card');

hoverables.forEach(el => {
    // Activa el efecto al tocar
    el.addEventListener('pointerdown', e => {
        // Evita que se interprete como scroll inmediato
        e.preventDefault();
        el.classList.add('hover-active');
    });

    // Lo desactiva después de un breve tiempo o al soltar
    el.addEventListener('pointerup', () => {
        setTimeout(() => el.classList.remove('hover-active'), 300);
    });

    // También si el dedo sale del elemento
    el.addEventListener('pointerleave', () => {
        el.classList.remove('hover-active');
    });
}); 

});