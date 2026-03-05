/* ============================================
   Navigation — Scroll behavior, smooth scroll,
   active states, mobile menu
   ============================================ */

const Navigation = (() => {
  let navbar;
  let navLinks;
  let menuToggle;

  function init() {
    navbar = document.querySelector('.navbar');
    navLinks = document.querySelector('.navbar__links');
    menuToggle = document.querySelector('.menu-toggle');

    if (!navbar) return;

    setupScrollBehavior();
    setupSmoothScroll();
    setupMobileMenu();
    setupActiveStates();
  }

  function setupScrollBehavior() {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));

        if (target) {
          const offset = navbar.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          closeMobileMenu();
        }
      });
    });
  }

  function setupMobileMenu() {
    if (!menuToggle) return;

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('navbar__links--open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('navbar__links--open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navLinks.classList.add('navbar__links--open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('navbar__links--open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  function setupActiveStates() {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.navbar__link').forEach(link => {
            link.classList.toggle(
              'navbar__link--active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, {
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  return { init };
})();
