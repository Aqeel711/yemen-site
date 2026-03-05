/* ============================================
   Animations — GSAP + ScrollTrigger
   Cinematic scroll-based animations
   ============================================ */

const Animations = (() => {

  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    setupPageLoader();
    setupHeroParallax();
    setupRevealAnimations();
    setupSectionHeaders();
    setupHeritageCards();
    setupGalleryAnimations();
    setupArticleCards();
    setupTeamAnimations();
  }

  /* ---- Page Loader ---- */
  function setupPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.3,
      onComplete: () => {
        loader.classList.add('page-loader--hidden');
        animateHeroEntrance();
      }
    });
  }

  /* ---- Hero Entrance Timeline ---- */
  function animateHeroEntrance() {
    const tl = gsap.timeline();

    tl.from('.hero__logo', {
      y: 30, opacity: 0, duration: 1, ease: 'power3.out'
    })
    .from('.hero__title', {
      y: 50, opacity: 0, duration: 0.9, ease: 'power3.out'
    }, '-=0.6')
    .from('.hero__subtitle-en', {
      y: 30, opacity: 0, duration: 0.7, ease: 'power3.out'
    }, '-=0.5')
    .from('.hero__divider', {
      scaleX: 0, duration: 0.5, ease: 'power2.out'
    }, '-=0.3')
    .from('.hero__tagline', {
      y: 20, opacity: 0, duration: 0.7, ease: 'power3.out'
    }, '-=0.3')
    .from('.hero__cta', {
      y: 25, opacity: 0, duration: 0.6, ease: 'power3.out'
    }, '-=0.3')
    .from('.hero__scroll-hint', {
      opacity: 0, duration: 0.5, ease: 'power2.out'
    }, '-=0.1');
  }

  /* ---- Hero Parallax ---- */
  function setupHeroParallax() {
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      gsap.to(heroBg, {
        y: '25%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Fade out hero content on scroll
    gsap.to('.hero__content', {
      opacity: 0,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '55% top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* ---- Reveal Animations ---- */
  function setupRevealAnimations() {
    // Standard reveal: fade up
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    // Reveal from left
    gsap.utils.toArray('.reveal--left').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    // Reveal from right
    gsap.utils.toArray('.reveal--right').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    // Scale reveal
    gsap.utils.toArray('.reveal--scale').forEach(el => {
      gsap.to(el, {
        opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ---- Section Headers ---- */
  function setupSectionHeaders() {
    gsap.utils.toArray('.section__header').forEach(header => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      const title = header.querySelector('.section__title');
      const divider = header.querySelector('.divider');
      const subtitle = header.querySelector('.section__subtitle');

      if (title) tl.from(title, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      if (divider) tl.from(divider, { scaleX: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
      if (subtitle) tl.from(subtitle, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    });
  }

  /* ---- Heritage Cards ---- */
  function setupHeritageCards() {
    gsap.utils.toArray('.heritage-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50, opacity: 0, duration: 0.7,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ---- Gallery Items ---- */
  function setupGalleryAnimations() {
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0, scale: 0.9, duration: 0.5,
        delay: (i % 3) * 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ---- Article Cards ---- */
  function setupArticleCards() {
    gsap.utils.toArray('.article-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40, opacity: 0, duration: 0.6,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ---- Team Cards ---- */
  function setupTeamAnimations() {
    gsap.utils.toArray('.team-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40, opacity: 0, duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });
  }

  return { init };
})();
