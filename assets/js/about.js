document.addEventListener('DOMContentLoaded', () => {
 const swipers = document.querySelectorAll('.about-details-slider');
 swipers.forEach(swiper => {
 new Swiper(swiper, {
 loop: true,
 speed: 800,
 autoplay: {
 delay: 5000,
 },
 slidesPerView: 1,
 spaceBetween: 30,
 breakpoints: {
 768: {
 slidesPerView: 2,
 },
 1200: {
 slidesPerView: 3,
 },
 },
 pagination: {
 el: '.swiper-pagination',
 type: 'bullets',
 clickable: true,
 },
 });
 });
});