  // Initialize Swiper for each events category
    document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.events-slider').forEach(slider => {
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

    // Initialize GLightbox
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
    });
    });
