/* ============================================
   Gallery — Lightbox, Filtering
   ============================================ */

const Gallery = (() => {
  let lightbox;
  let lightboxImage;

  function init() {
    lightbox = document.querySelector('.lightbox');
    lightboxImage = document.querySelector('.lightbox__image');

    if (!lightbox) return;

    setupFilters();
    setupLightbox();
    setupKeyboardNav();
  }

  function setupFilters() {
    const filterBtns = document.querySelectorAll('.gallery__filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active state
        filterBtns.forEach(b => b.classList.remove('gallery__filter-btn--active'));
        btn.classList.add('gallery__filter-btn--active');

        // Filter items with animation
        items.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            if (typeof gsap !== 'undefined') {
              gsap.from(item, { opacity: 0, scale: 0.95, duration: 0.3 });
            }
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  function setupLightbox() {
    // Open lightbox on gallery item click
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-item__image');
        if (img && img.src) {
          openLightbox(img.src, img.alt);
        }
      });
    });

    // Close lightbox
    const closeBtn = document.querySelector('.lightbox__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || '';
    lightbox.classList.add('lightbox--active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--active');
    document.body.style.overflow = '';
  }

  function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('lightbox--active')) {
        closeLightbox();
      }
    });
  }

  return { init };
})();
