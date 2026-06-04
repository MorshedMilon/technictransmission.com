document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAVIGATION ---
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerOverlay = document.querySelector('.mobile-nav-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-nav-drawer a');

  function openMenu() {
    mobileToggle.classList.add('open');
    navDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMenu() {
    mobileToggle.classList.remove('open');
    navDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle && navDrawer && drawerOverlay) {
    mobileToggle.addEventListener('click', () => {
      if (navDrawer.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    drawerOverlay.addEventListener('click', closeMenu);
    
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- GALLERY LIGHTBOX ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length > 0 && lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || '';
          lightboxModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 300); // Clear source after transition
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // --- CONTACT FORM VALIDATION ---
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success-card');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;
      const firstNameInput = document.getElementById('firstName');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Helper to show/hide error
      const validateInput = (input, validatorFn, errorMsgId) => {
        const errorMsg = document.getElementById(errorMsgId);
        if (!validatorFn(input.value.trim())) {
          errorMsg.style.display = 'block';
          input.style.borderColor = '#ff3860';
          hasErrors = true;
        } else {
          errorMsg.style.display = 'none';
          input.style.borderColor = '';
        }
      };

      // Validators
      const isNotEmpty = val => val.length > 0;
      const isValidEmail = email => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      };

      // Run validations
      validateInput(firstNameInput, isNotEmpty, 'firstName-error');
      validateInput(emailInput, isValidEmail, 'email-error');
      validateInput(messageInput, isNotEmpty, 'message-error');

      // If valid, submit form
      if (!hasErrors) {
        // Zyro contact form is purely client-side simulation on success,
        // displaying the success box in place.
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to success card if on mobile
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // --- STICKY NAV COMPRESSION ON SCROLL ---
  const headerWrapper = document.querySelector('.header-wrapper');
  if (headerWrapper) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        headerWrapper.style.backgroundColor = 'rgba(4, 96, 171, 0.96)';
        document.querySelector('header').style.height = '70px';
        const logo = document.querySelector('header .logo');
        if (logo && window.innerWidth > 768) {
          logo.style.height = '48px';
        }
      } else {
        headerWrapper.style.backgroundColor = 'var(--color-blue)';
        document.querySelector('header').style.height = window.innerWidth > 768 ? '100px' : '76px';
        const logo = document.querySelector('header .logo');
        if (logo) {
          logo.style.height = window.innerWidth > 768 ? '64px' : '36px';
        }
      }
    });
  }

  // --- INTERSECTION OBSERVER SCROLL REVEAL ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, we don't need to observe it again
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15, // Trigger when 15% visible
      rootMargin: '0px 0px -40px 0px' // Slightly delay until it is inside the viewport
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }
});
