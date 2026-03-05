/* ============================================
   Language Toggle — Arabic / English
   Loads content from embedded data or JSON
   ============================================ */

const Language = (() => {
  let currentLang = 'ar';
  let contentData = null;

  async function init() {
    // Try to load content.json
    try {
      const response = await fetch('data/content.json');
      contentData = await response.json();
    } catch (err) {
      console.warn('Could not load content.json, using embedded data');
      return;
    }

    applyLanguage(currentLang);
    setupToggle();
  }

  function setContentData(data) {
    contentData = data;
    applyLanguage(currentLang);
    setupToggle();
  }

  function setupToggle() {
    const toggleBtn = document.querySelector('.lang-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      applyLanguage(currentLang);
    });
  }

  function applyLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;

    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update toggle button
    const toggleBtn = document.querySelector('.lang-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = lang === 'ar'
        ? '<span>English</span>'
        : '<span class="lang-toggle__ar">عربي</span>';
    }

    // Swap all translatable content
    if (contentData) {
      updateContent(lang);
    }
  }

  function updateContent(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(contentData, `${lang}.${key}`);

      if (value !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = value;
        } else {
          el.textContent = value;
        }
      }
    });
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  function getLang() {
    return currentLang;
  }

  return { init, setContentData, getLang, applyLanguage };
})();
