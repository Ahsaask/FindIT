// app/animation.js

// Initialize intersection observer to trigger animations when elements enter viewport
export const initAnimations = () => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      // Target elements with animation classes
      const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add class to play the animation
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) translateX(0)";
            // Stop observing once animation is triggered
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
      
      animatedElements.forEach(element => {
        observer.observe(element);
      });
      
      // Initialize counter animations for statistics
      const counterElements = document.querySelectorAll('.count-up .text-5xl');
      counterElements.forEach(counter => {
        const countObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const finalValue = parseInt(counter.textContent);
              counter.textContent = '0';
              
              const animateCount = (timestamp, startValue, endValue, startTime) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / 2000, 1); // 2 seconds duration
                
                const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
                counter.textContent = currentValue + (counter.textContent.includes('+') ? '+' : '');
                
                if (progress < 1) {
                  requestAnimationFrame((time) => animateCount(time, startValue, endValue, startTime));
                } else {
                  counter.textContent = endValue + (counter.textContent.includes('+') ? '+' : '');
                }
              };
              
              const startCountAnimation = () => {
                const startValue = 0;
                const endValue = parseInt(finalValue);
                requestAnimationFrame((timestamp) => animateCount(timestamp, startValue, endValue));
              };
              
              startCountAnimation();
              countObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        
        countObserver.observe(counter);
      });
    }
  };
  
  // Smooth scroll function for navigation links
  export const initSmoothScroll = () => {
    if (typeof window !== 'undefined') {
      const links = document.querySelectorAll('a[href^="#"]');
      
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset for fixed header
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };
  
  // Initialize FAQ accordion functionality
  export const initFaqAccordion = () => {
    if (typeof window !== 'undefined') {
      const faqItems = document.querySelectorAll('.group');
      
      faqItems.forEach(item => {
        const header = item.querySelector('h3');
        const content = item.querySelector('p');
        const icon = item.querySelector('svg');
        
        // Set initial state
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        
        header.addEventListener('click', () => {
          // Toggle active state
          item.classList.toggle('active');
          
          if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
          } else {
            content.style.maxHeight = '0';
            icon.style.transform = 'rotate(0)';
          }
        });
      });
    }
  };
  
  // Initialize animations and smooth scroll when component mounts
  export const useAnimations = () => {
    if (typeof window !== 'undefined') {
      // Run on next tick to ensure DOM is ready
      setTimeout(() => {
        initAnimations();
        initSmoothScroll();
        initFaqAccordion();
      }, 0);
    }
  };
  
  // Function to add to _app.js or layout.js to enable animations
  export const enableAnimations = () => {
    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        useAnimations();
      });
    }
  };
  
  const animations = { initAnimations, initSmoothScroll, initFaqAccordion, useAnimations, enableAnimations };
  export default animations;