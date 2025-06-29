// Fade-in animation when elements enter the viewport
document.addEventListener("DOMContentLoaded", function () {
    const fadeIns = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    fadeIns.forEach(element => {
        observer.observe(element);
    });
});
