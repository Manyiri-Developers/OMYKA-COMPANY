document.addEventListener('DOMContentLoaded', () => {
  const wrapperObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initializeCarousel(entry.target);
        wrapperObserver.unobserve(entry.target); // Stop observing once initialized
      }
    });
  },{threshold: 0.2});

  const wrappers = document.querySelectorAll('.swiper-wrapper');
  wrappers.forEach((wrapper) => {
    wrapperObserver.observe(wrapper);
  });

  function initializeCarousel(wrapper) {
    // Restrict cards to the current wrapper
    const cards = wrapper.querySelectorAll('.swiper-slide');
    const totalCards = cards.length;
    let activeCard = 0; // Current slide index
    const items = document.querySelectorAll('.service-item');
    const units = document.querySelectorAll('.service-unit');
    console.log(items);


    console.log(`Initializing carousel with ${totalCards} slides.`);
    
    console.log(`Checking the activeCard here: ${activeCard}`)
    function showCard(index) {
      if (index >= totalCards) {
        activeCard = 0; // Wrap around to the first slide
      } else if (index < 0) {
        activeCard = totalCards- 1; // Wrap around to the last slide
      } else {
        activeCard = index; // Show the requested slide
      }

      console.log('activeCard: ', activeCard);
      
      

      // Use the current wrapper instead of selecting globally
      wrapper.style.transform = `translateX(-${activeCard * 100}%)`;
      wrapper.offsetWidth; // Force reflow

      function setColors (activeCard, items) {
        for ( let i = 0; i < items.length; i++){
         const item = items[i];
         if(activeCard === i){
           item.classList.add('active');
         }else{
           item.classList.remove('active');
         }
         
        }
       
       }setColors (activeCard, items);

       function makeColored (activeCard, units) {
        for ( let i = 0; i < units.length; i++){
         const unit = units[i];
         if(activeCard === i){
           unit.classList.add('active');
         }else{
           unit.classList.remove('active');
         }
        }
       }makeColored (activeCard, units)

        // Add click event listeners to service-items
      // items.forEach((item, index) => {
      //   item.addEventListener('click', (event) => {
      //     event.preventDefault(); // Prevent default link behavior
         
      //   });
      //   });

        // units.forEach((unit, index) => {
        //   unit.addEventListener('click', (event) => {
        //     event.preventDefault(); // Prevent default link behavior
            
        //   });
        //   });

     
    }


    function moveCard(n) {
      showCard(activeCard + n); // Move to the next or previous slide
    }

    function autoShow() {
      moveCard(1);
      setTimeout(autoShow, 9000); // Change slide every 3 seconds
    }

    // Ensure all images are loaded before starting
    const images = Array.from(cards).map((card) => card.querySelector('img'));
    Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => (img.onload = resolve));
      })
    ).then(() => {
      console.log('Images loaded. Starting slideshow.');
      autoShow();
    });

    // Activate navigation buttons
    function activateButtons() {
      const prevButtons = document.querySelectorAll('.back');
      const nextButtons = document.querySelectorAll('.front');
     for(let i = 0; i < prevButtons.length; i++){
      const prevButton = prevButtons[i];
      if (prevButton) {
       prevButton.addEventListener('click', () => moveCard(-1));
      }

     }
     for(let i = 0; i < nextButtons.length; i++){
      const nextButton = nextButtons[i];
      if (nextButton) {
        nextButton.addEventListener('click', () => moveCard(1));
      }

     }
    
      
    }
  
      
        
      

    

    // Initialize the carousel
    showCard(activeCard); // Show the first slide
    activateButtons()
    
    
  }
});
