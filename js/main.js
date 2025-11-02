document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const next = document.querySelector('.carousel-btn.next');
    const prev = document.querySelector('.carousel-btn.prev');

    if (carousel && next && prev) {
        const scrollAmount = carousel.offsetWidth * 0.9;

    next.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prev.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    }
});
