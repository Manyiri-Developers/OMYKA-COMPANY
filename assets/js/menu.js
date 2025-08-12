document.addEventListener('DOMContentLoaded', () => {
// Initialize Swiper for each menu category
    document.querySelectorAll('.menu-slider').forEach(slider => {
      new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 20,
         speed: 800,
        autoplay: {
        delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        },
      });
    });
});
