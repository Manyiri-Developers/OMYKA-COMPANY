document.addEventListener('DOMContentLoaded', () => {
    const inner = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.back');
    const nextButton = document.querySelector('.front');
    
    let index = 0;
    let slideWidth = slides[0].offsetWidth; // Get width of a single slide
    let slidesPerView = window.innerWidth <= 565 ? 1 : 2; // 1 on small screens, 2 on large

    function updateSlideWidth() {
        slideWidth = slides[0].offsetWidth;
        slidesPerView = window.innerWidth <= 565 ? 1 : 2;
    }

    function moveSlide(direction) {
        index += direction;

        if (index >= slides.length - (slidesPerView - 1)) {
            index = 0; // Reset to start when reaching the end
        } else if (index < 0) {
            index = slides.length - slidesPerView; // Go to the last visible set
        }

        inner.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
    }

    function autoSlide() {
        moveSlide(1);
        setTimeout(autoSlide, 9000);
    }

    nextButton.addEventListener('click', () => moveSlide(1));
    prevButton.addEventListener('click', () => moveSlide(-1));

    window.addEventListener('resize', updateSlideWidth);

    // Initialize
    updateSlideWidth();
    setTimeout(autoSlide, 9000);
});
