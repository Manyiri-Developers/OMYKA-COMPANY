document.addEventListener('DOMContentLoaded', () => {
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.isIntersecting) {
   
        if(entry.target.classList.contains('slide-up')){
          entry.target.classList.add('come-up');
        }else {

        }
        
        observer.unobserve(entry.target);
        }
        
      }
    }, { threshold: 0.5 });
  
    // Select all elements you want to animate
    const elementsToAnimate = document.querySelectorAll('.animated');
  
    // Observe each element using a for loop
    for (let i = 0; i < elementsToAnimate.length; i++) {
      observer.observe(elementsToAnimate[i]);
      console.log(`Observing element at index ${i}`); // Debugging: shows the index being observed
    }
  });
  