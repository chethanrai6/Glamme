// Glammé App Core JavaScript Engine

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Feather Icons
  if (window.feather) {
    feather.replace();
  }

  // SPA Navigation Router
  const navLinks = document.querySelectorAll('[data-view]');
  const pageViews = document.querySelectorAll('.page-view');
  const mainNavLinks = document.querySelectorAll('.nav-link');

  function switchView(viewName) {
    pageViews.forEach(view => {
      if (view.id === `page-${viewName}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update Nav Active State
    mainNavLinks.forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll to Top Smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close Mobile Nav if open
    const navMenu = document.getElementById('nav-links');
    if (navMenu) navMenu.classList.remove('mobile-active');

    // Re-render Feather Icons for dynamic views
    setTimeout(() => {
      if (window.feather) feather.replace();
    }, 50);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetView = link.dataset.view;
      if (targetView) {
        e.preventDefault();
        switchView(targetView);
      }
    });
  });

  // Mobile Toggle Menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
    });
  }

  // Video Story Modal Handler
  const watchStoryBtn = document.getElementById('watch-story-btn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('close-video-modal');

  if (watchStoryBtn && videoModal) {
    watchStoryBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
    });
  }

  if (closeVideoBtn && videoModal) {
    closeVideoBtn.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
      }
    });
  }

  // Toast Notification System
  window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-feather="${type === 'success' ? 'check-circle' : 'info'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.feather) feather.replace();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // Newsletter Subscription Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input');
      if (emailInput.value) {
        showToast('Thank you for joining Glammé Beauty Circle!');
        emailInput.value = '';
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent to Glammé team.');
      contactForm.reset();
    });
  }
});
