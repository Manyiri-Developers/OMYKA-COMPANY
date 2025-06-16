document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper(".mySwiper", {
    speed: 600,
    parallax: true,
    loop: true,
    autoplay: {
      delay: 3000, // 3 seconds between slides
      disableOnInteraction: true, 
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

document.querySelectorAll('.init-swiper').forEach((swiperEl) => {
  const config = JSON.parse(swiperEl.querySelector('.swiper-config').innerText);
  new Swiper(swiperEl, config);
});



