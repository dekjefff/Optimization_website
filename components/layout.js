function getPrefixes() {
  const path = window.location.pathname.replace(/\\/g, '/');
  const depts = ['MHPN_TH', 'MHPN_EN', 'PHN_TH', 'PHN_EN', 'OGN_TH', 'OGN_EN'];
  const parts = path.split('/');
  
  // Find index of department folder
  const deptIndex = parts.findIndex(p => depts.includes(p.toUpperCase()));
  
  if (deptIndex !== -1) {
    const stepsToDept = Math.max(0, (parts.length - 2) - deptIndex);
    const stepsToRoot = stepsToDept + 1;
    
    const deptPrefix = stepsToDept > 0 ? '../'.repeat(stepsToDept) : './';
    const relativePrefix = '../'.repeat(stepsToRoot);
    
    return {
      relativePrefix: relativePrefix,
      deptPrefix: deptPrefix
    };
  }
  
  // Fallback
  return {
    relativePrefix: '../../',
    deptPrefix: './'
  };
}

document.addEventListener('DOMContentLoaded', () => {
  loadTemplateCSS();
  buildHeader();
  buildFooter();
});

function loadTemplateCSS() {
  const { deptPrefix } = getPrefixes();
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = deptPrefix + 'components/template_style.css';
  document.head.appendChild(link);
}

function resolveAssetPaths(htmlText) {
  const { deptPrefix } = getPrefixes();
  return htmlText
    .replace(/\.\.\/\.\.\/assets\//g, deptPrefix + 'assets/')
    .replace(/\.\.\/\.\.\/components\//g, deptPrefix + 'components/');
}

function resolveNavbarLinks(htmlText, deptPrefix) {
  // Only rewrite if we're deeper than the dept root (deptPrefix !== './')
  if (deptPrefix === './') return htmlText;
  // Rewrite relative hrefs (skip absolute URLs, root-relative, anchors, mailto, tel)
  return htmlText.replace(
    /href="(?!https?:\/\/|#|\/|mailto:|tel:)([^"]+)"/g,
    `href="${deptPrefix}$1"`
  );
}

async function buildHeader() {
  const deptTitleTh = document.body.getAttribute('data-dept-th') || 'ชื่อภาควิชา';
  const { deptPrefix } = getPrefixes();

  try {
    // Load Header into its own container
    const headerContainer = document.createElement('div');
    headerContainer.id = 'site-header-container';
    let headerRes = await fetch(deptPrefix + 'components/header.html');
    let headerHtml = await headerRes.text();
    headerHtml = resolveAssetPaths(headerHtml);
    headerHtml = headerHtml.replace(/{{DEPT_TH}}/g, deptTitleTh);
    headerContainer.innerHTML = headerHtml;
    document.body.prepend(headerContainer);

    // Load Navbar into a SEPARATE container (outside header)
    // so that position: sticky works correctly
    const navContainer = document.createElement('div');
    navContainer.id = 'site-nav-container';
    let navRes = await fetch(deptPrefix + 'navbar.html');
    let navHtml = await navRes.text();
    navHtml = navHtml.replace(/{{DEPT_TH}}/g, deptTitleTh);
    navHtml = resolveNavbarLinks(navHtml, deptPrefix);
    navContainer.innerHTML = navHtml;
    headerContainer.after(navContainer);
    
    // Initialize Navigation Scripts
    initTemplateScripts();
    highlightActiveLink();

    // Track header height for responsive hamburger placement
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('load', updateHeaderHeight);
  } catch (error) {
    console.error('Error loading header/navbar component:', error);
  }
}

function updateHeaderHeight() {
  const header = document.querySelector('.site-header');
  if (header) {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  }
}

async function buildFooter() {
  const footerContainer = document.createElement('div');
  footerContainer.id = 'site-footer-container';
  
  const deptTitleTh = document.body.getAttribute('data-dept-th') || 'ชื่อภาควิชา';
  const { deptPrefix } = getPrefixes();

  try {
    const response = await fetch(deptPrefix + 'components/footer.html');
    let htmlContent = await response.text();
    htmlContent = resolveAssetPaths(htmlContent);
    htmlContent = htmlContent.replace(/{{DEPT_TH}}/g, deptTitleTh);
    
    footerContainer.innerHTML = htmlContent;

    // Customize links based on current department
    const path = window.location.pathname.replace(/\\/g, '/');
    // Match both /departments/XXX/ and root-level /OGN_TH/, /PHN_EN/, etc.
    const deptMatch = path.match(/\/(?:departments|department)\/([^\/]+)/i)
      || path.match(/\/(OGN|PHN|MHPN)_(TH|EN)\//i);
    const deptFolder = deptMatch ? deptMatch[1].toUpperCase() : '';

    const fbLink = footerContainer.querySelector('a[title="Facebook"]');
    const twitterLink = footerContainer.querySelector('a[title*="Twitter"]');
    const igLink = footerContainer.querySelector('a[title="Instagram"]');
    const langBtn = footerContainer.querySelector('.footer-lang-btn');

    // Detect if current page is English version
    const isEnglish = path.includes('_EN/') || path.toLowerCase().includes('eng');

    // 1. Language Button Customization
    if (langBtn) {
      if (deptFolder.includes('OGN')) {
        if (isEnglish) {
          langBtn.href = '../OGN_TH/index.html';
          langBtn.innerHTML = '<img src="' + deptPrefix + 'assets/th.svg" alt="TH"> ไทย';
        } else {
          langBtn.href = '../OGN_EN/index.html';
        }
      } else if (deptFolder.includes('PHN')) {
        if (isEnglish) {
          langBtn.href = '../PHN_TH/index.html';
          langBtn.innerHTML = '<img src="' + deptPrefix + 'assets/th.svg" alt="TH"> ไทย';
        } else {
          langBtn.href = '../PHN_EN/index.html';
        }
      } else if (deptFolder.includes('MHPN')) {
        if (isEnglish) {
          langBtn.href = '../MHPN_TH/index.html';
          langBtn.innerHTML = '<img src="' + deptPrefix + 'assets/th.svg" alt="TH"> ไทย';
        } else {
          langBtn.href = '../MHPN_EN/index.html';
        }
      }
    }

    // 2. Social Links Customization per department
    // OGN: has Facebook
    // PHN: no Facebook, no social
    // MHPN: has Facebook
    if (fbLink) {
      if (deptFolder.includes('OGN')) {
        fbLink.href = 'https://www.facebook.com/obgynnursingmahidol/';
      } else if (deptFolder.includes('MHPN')) {
        fbLink.href = 'https://www.facebook.com/mhpnmahidol/';
      } else if (deptFolder.includes('PHN')) {
        fbLink.remove();
      }
    }

    // Remove social links that have placeholder '#' href
    if (twitterLink && twitterLink.getAttribute('href') === '#') {
      twitterLink.remove();
    }
    if (igLink && igLink.getAttribute('href') === '#') {
      igLink.remove();
    }

    document.body.appendChild(footerContainer);
  } catch (error) {
    console.error('Error loading footer component:', error);
  }
}

function highlightActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initTemplateScripts() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function openMobileMenu() {
    if(mobileMenu) mobileMenu.classList.add('open');
    if(hamburger) hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if(mobileMenu) mobileMenu.classList.remove('open');
    if(hamburger) hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if(hamburger) hamburger.addEventListener('click', openMobileMenu);
  if(mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

  if(mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Global toggle function for mobile dropdown
  window.toggleMobileDropdown = function(el) {
    const dropdown = el.nextElementSibling;
    if (dropdown) {
      dropdown.classList.toggle('open');
      el.classList.toggle('active');
    }
  };

  // Scroll effects - sticky navbar + liquid glass transform
  const navBrand = document.getElementById('navBrand');
  const navContainer = document.getElementById('site-nav-container');

  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    const navbar = document.querySelector('.navbar');

    if (header && navbar) {
      const headerBottom = header.getBoundingClientRect().bottom;
      
      // Show brand name when header scrolls out of view
      if (navBrand) navBrand.style.display = headerBottom < 0 ? 'inline-block' : 'none';
      
      // Toggle liquid glass effect
      if (headerBottom <= 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    const backTop = document.getElementById('back-to-top');
    if (backTop) {
      backTop.classList.toggle('visible', window.scrollY > 300);
    }
  }, { passive: true });
}

