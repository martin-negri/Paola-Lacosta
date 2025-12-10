document.addEventListener('DOMContentLoaded', () => {
    /* ===============================
        CARRUSEL
    =============================== */
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


    /* ===============================
        HOVER TÁCTIL (Mobile Friendly)
    =============================== */
    const hoverables = document.querySelectorAll('.pain-list li, .solution-card');

    hoverables.forEach(el => {
        el.addEventListener('pointerdown', e => {
            e.preventDefault();
            el.classList.add('hover-active');
        });

        el.addEventListener('pointerup', () => {
            setTimeout(() => el.classList.remove('hover-active'), 300);
        });

        el.addEventListener('pointerleave', () => {
            el.classList.remove('hover-active');
        });
    });

});


(function () {
    const debug = false;

    class SimplexNoise {
        constructor() {
            this.grad3 = [
                [1, 1], [-1, 1], [1, -1], [-1, -1],
                [1, 0], [-1, 0], [1, 0], [-1, 0],
                [0, 1], [0, -1], [0, 1], [0, -1]
            ];
            this.p = Array.from({ length: 256 }, () => Math.floor(Math.random() * 256));
            this.perm = Array.from({ length: 512 }, (_, i) => this.p[i & 255]);
        }
        dot(g, x, y) { return g[0] * x + g[1] * y; }
        noise(xin, yin) {
            const F2 = 0.5 * (Math.sqrt(3) - 1);
            const G2 = (3 - Math.sqrt(3)) / 6;
            let s = (xin + yin) * F2;
            let i = Math.floor(xin + s);
            let j = Math.floor(yin + s);
            let t = (i + j) * G2;
            let X0 = i - t, Y0 = j - t;
            let x0 = xin - X0, y0 = yin - Y0;
            let i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
            let x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
            let x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
            let ii = i & 255, jj = j & 255;
            let gi0 = this.grad3[this.perm[ii + this.perm[jj]] % 12];
            let gi1 = this.grad3[this.perm[ii + i1 + this.perm[jj + j1]] % 12];
            let gi2 = this.grad3[this.perm[ii + 1 + this.perm[jj + 1]] % 12];
            let t0 = 0.5 - x0 * x0 - y0 * y0;
            let n0 = t0 < 0 ? 0 : (t0 *= t0, t0 * t0 * this.dot(gi0, x0, y0));
            let t1 = 0.5 - x1 * x1 - y1 * y1;
            let n1 = t1 < 0 ? 0 : (t1 *= t1, t1 * t1 * this.dot(gi1, x1, y1));
            let t2 = 0.5 - x2 * x2 - y2 * y2;
            let n2 = t2 < 0 ? 0 : (t2 *= t2, t2 * t2 * this.dot(gi2, x2, y2));
            return 70 * (n0 + n1 + n2);
        }
    }

    function init() {
        const noise = new SimplexNoise();
        const sections = document.querySelectorAll(".hero, .videos-section, .footer");

        /* DETECCIÓN SEGÚN TAMAÑO DE PANTALLA */
        const isMobile = window.innerWidth <= 600;
        const isTablet = window.innerWidth <= 1024 && !isMobile;

        /* AMPLITUDES CALIBRADAS PARA QUE SE VEAN EN MOVIL/TABLET */
        const baseAmp = isMobile ? 20 : isTablet ? 28 : 35;

        /* CONFIGURACIÓN DE BLOBS */
        const blobs = [
            { x: "--x1", y: "--y1", speed: 0.22, amp: baseAmp },
            { x: "--x2", y: "--y2", speed: 0.25, amp: baseAmp },
            { x: "--x3", y: "--y3", speed: 0.08, amp: baseAmp + 5 },
            { x: "--x4", y: "--y4", speed: 0.15, amp: baseAmp },
            { x: "--x5", y: "--y5", speed: 0.08, amp: baseAmp + 5 },
            { x: "--x6", y: "--y6", speed: 0.10, amp: baseAmp + 3 },
            { x: "--x7", y: "--y7", speed: 0.03, amp: baseAmp + 7 }
        ];

        let last = performance.now();
        let T = 0;

        function loop(now) {
            const delta = (now - last) / 1000;
            last = now;
            T += delta * 1.6;

            sections.forEach(section => {
                blobs.forEach((b, i) => {
                    const nx = noise.noise(T * b.speed, i * 100);
                    const ny = noise.noise(i * 80, T * b.speed);

                    section.style.setProperty(b.x, 50 + nx * b.amp + "%");
                    section.style.setProperty(b.y, 50 + ny * b.amp + "%");
                });
            });

            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();


// FAQ – permanece igual
document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;
        if (!answer) return;

        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !expanded);

        if (expanded) {
            answer.style.maxHeight = "0";
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("videoModal");

    // Detectar evento de Calendly
    window.addEventListener("message", function (event) {
        if (event.origin.includes("calendly.com")) {
            if (event.data.event === "calendly.event_scheduled") {
                
                // Mostrar modal
                modal.classList.add("show");

                // Bloquear scroll
                document.body.style.overflow = "hidden";
            }
        }
    });

    // Cerrar modal al hacer click afuera
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });
});

