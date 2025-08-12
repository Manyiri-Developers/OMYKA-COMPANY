document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.kibo-swiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 30, // Reduced from 50 for subtler angles
        stretch: 0,
        depth: 150, // Increased for more pronounced 3D effect
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 3000, // 3 seconds per slide
        disableOnInteraction: false // Continues autoplay after user interaction
      },
      loop: true, // Seamless looping for continuous playback
      speed: 600 // Smooth transition speed
    });
  });