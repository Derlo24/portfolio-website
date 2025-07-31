document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.toggle('active');
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Video Slider Functionality for Both Sliders
    const sliders = document.querySelectorAll('.shorts-slider');
    sliders.forEach(slider => {
        const container = slider.closest('.shorts-container');
        const thumbsContainer = container.querySelector('.thumbs-container');
        const thumbs = thumbsContainer.querySelectorAll('.thumbnail');
        let currentIndex = 0;

        const updateSlider = (index) => {
            // Calculate the exact width of a video card including padding
            const videoCard = slider.querySelector('.video-card');
            const cardWidth = videoCard.getBoundingClientRect().width;
            slider.style.transform = `translateX(-${index * cardWidth}px)`;

            // Update active thumbnail
            thumbs.forEach(thumb => thumb.classList.remove('active'));
            thumbs[index].classList.add('active');

            // Scroll thumbnail container to center the active thumbnail
            const thumbWidth = thumbs[0].getBoundingClientRect().width;
            const scrollPosition = index * (thumbWidth + 8) - (thumbsContainer.clientWidth - thumbWidth) / 2;
            thumbsContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        };

        // Initialize first slide
        updateSlider(currentIndex);

        // Handle thumbnail clicks
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(thumb.getAttribute('data-index'));
                currentIndex = index;
                updateSlider(currentIndex);
            });

            // Add touch support for mobile
            thumb.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const index = parseInt(thumb.getAttribute('data-index'));
                currentIndex = index;
                updateSlider(currentIndex);
            });
        });

        // Handle window resize to adjust slider position
        window.addEventListener('resize', () => {
            updateSlider(currentIndex);
        });
    });

    // Fade-in Animation on Scroll
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => observer.observe(element));
});