document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Safe Smooth Scrolling Fallback
     ========================================================================== */
  const targetLinks = document.querySelectorAll('a[href^="#"]');
  
  targetLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Ignore plain "#" links to prevent errors
      if (targetId === '#') return; 
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ==========================================================================
     2. Dynamic Navbar Effects (Scroll Shadow)
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      navbar.style.background = '#0a0a0a'; // Slightly darker when scrolling
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.background = '#111';
    }
  });

  /* ==========================================================================
     2b. Mobile Hamburger Menu
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.querySelector('.nav-links');

  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksList.classList.toggle('open');
    });

    // Close menu after clicking a link (mobile)
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksList.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     2c. Scroll Fade-In Animation
     ========================================================================== */
  const fadeElements = document.querySelectorAll('section, header');
  fadeElements.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  /* ==========================================================================
     3. Scroll Spy (Highlight Active Nav Link)
     ========================================================================== */
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // Checks if the current scroll position is within the boundaries of the section
      if (window.scrollY >= (sectionTop - 150)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

});
