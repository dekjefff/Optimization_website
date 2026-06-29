// Centralized Header, Navbar and Mobile Menu for Department of Medical Nursing (MN_EN)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Calculate relative path prefix dynamically based on directory depth
  const getPrefix = () => {
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const marker1 = 'departments/MN_EN/';
    const idx1 = currentPath.indexOf(marker1);
    if (idx1 !== -1) {
      const sub = currentPath.substring(idx1 + marker1.length);
      const depth = (sub.match(/\//g) || []).length;
      return '../'.repeat(depth);
    }
    const marker2 = 'MN_EN/';
    const idx2 = currentPath.indexOf(marker2);
    if (idx2 !== -1) {
      const sub = currentPath.substring(idx2 + marker2.length);
      const depth = (sub.match(/\//g) || []).length;
      return '../'.repeat(depth);
    }
    const cleanPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
    const depth = (cleanPath.match(/\//g) || []).length;
    return '../'.repeat(depth);
  };

  const prefix = getPrefix();

  // 2. Determine active menu link based on current page filename
  const isActive = (href) => {
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const parts = currentPath.split('/');
    const filename = parts[parts.length - 1] || 'index.html';
    return filename.toLowerCase() === href.toLowerCase();
  };

  const isAboutActive = isActive('about.html') || isActive('vision.html') || isActive('staff.html') || isActive('contact.html');
  const isAcademicActive = isActive('academic.html') || isActive('book.html');
  const isElearningActive = false; // External links, not highlighted as active subpages locally
  const isOrgActive = false;

  // 3. Define the Mobile Menu HTML structure
  const mobileMenuHTML = `
  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-nav-panel">
      <div class="mobile-nav-header">
        <span class="mobile-nav-title">Main Menu</span>
        <button class="mobile-close" id="mobileClose" aria-label="Close menu">×</button>
      </div>
      <nav class="mobile-nav-list">
        <div class="mobile-nav-item">
          <a href="${prefix}index.html" class="mobile-nav-link ${isActive('index.html') ? 'active' : ''}">Home</a>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isAboutActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">About Us <span>▾</span></div>
          <div class="mobile-dropdown ${isAboutActive ? 'open' : ''}">
            <a href="${prefix}about.html" class="${isActive('about.html') ? 'active' : ''}">History</a>
            <a href="${prefix}vision.html" class="${isActive('vision.html') ? 'active' : ''}">Vision / Mission</a>
            <a href="${prefix}staff.html" class="${isActive('staff.html') ? 'active' : ''}">Staff</a>
            <a href="${prefix}contact.html" class="${isActive('contact.html') ? 'active' : ''}">Contact us</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}teaching.html" class="mobile-nav-link ${isActive('teaching.html') ? 'active' : ''}">Teaching</a>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}research.html" class="mobile-nav-link ${isActive('research.html') ? 'active' : ''}">Research</a>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isAcademicActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">Academic <span>▾</span></div>
          <div class="mobile-dropdown ${isAcademicActive ? 'open' : ''}">
            <a href="${prefix}academic.html" class="${isActive('academic.html') ? 'active' : ''}">Academic Services</a>
            <a href="${prefix}book.html" class="${isActive('book.html') ? 'active' : ''}">Department Book</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}km.html" class="mobile-nav-link ${isActive('km.html') ? 'active' : ''}">Knowledge Management</a>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}NoUse/Activities_all.html" class="mobile-nav-link ${isActive('Activities_all.html') ? 'active' : ''}">News</a>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}excellence.html" class="mobile-nav-link ${isActive('excellence.html') ? 'active' : ''}">Center of Excellence</a>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isElearningActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">E-Learning <span>▾</span></div>
          <div class="mobile-dropdown ${isElearningActive ? 'open' : ''}">
            <a href="http://www.elearning.ns.mahidol.ac.th/moodle3/" target="_blank">E-Learning Nursing</a>
            <a href="https://mux.mahidol.ac.th/" target="_blank">E-Learning Mahidol</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isOrgActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">Related Agencies <span>▾</span></div>
          <div class="mobile-dropdown ${isOrgActive ? 'open' : ''}">
            <a href="https://www.tnmc.or.th/" target="_blank">Thailand Nursing and Midwifery Council</a>
            <a href="https://www.hsri.or.th/researcher" target="_blank">Health Systems Research Institute (HSRI)</a>
            <a href="https://www.nrct.go.th/" target="_blank">National Research Council of Thailand (NRCT)</a>
          </div>
        </div>
      </nav>
    </div>
  </div>
  `;

  // 4. Define the Header and Desktop Navbar HTML structure
  const headerHTML = `
  <div class="topbar">
    <div class="topbar-links">
      <a href="https://ns.mahidol.ac.th/" target="_blank">Faculty of Nursing</a>
      <span class="sep">|</span>
      <a href="https://mahidol.ac.th/" target="_blank">Mahidol University</a>
    </div>
    <div class="topbar-social">
    </div>
    <div class="topbar-lang">
      <a href="${prefix}../MN_TH/index.html" target="_parent" title="Thai version">
        <img src="${prefix}img/template/th.jpg" alt="TH"> TH
      </a>
    </div>
  </div>

  <header class="site-header">
    <div class="header-logo">
      <img src="${prefix}img/logo/logo.png" alt="Mahidol University Logo">
      <div class="logo-placeholder">
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"><circle cx="20" cy="20" r="18"/><path d="M20 8 L20 32 M8 20 L32 20"/><circle cx="20" cy="20" r="8"/></svg>
        <span style="font-size:9px;color:rgba(255,255,255,0.4);line-height:1.2">Mahidol<br>Logo</span>
      </div>
    </div>
    <div class="header-text">
      <div class="header-dept-name">Department of Medical Nursing</div>
      <div class="header-faculty-name">Faculty of Nursing, Mahidol University</div>
    </div>
  </header>

  <nav class="navbar" id="mainNav">
    <div class="navbar-inner">
      <span class="navbar-brand" style="display:none" id="navBrand">Department of Medical Nursing</span>
      <ul class="nav-menu">
        <li class="nav-item">
          <a href="${prefix}index.html" class="nav-link ${isActive('index.html') ? 'active' : ''}">Home</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isAboutActive ? 'active' : ''}">About Us <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="${prefix}about.html" class="dropdown-item ${isActive('about.html') ? 'active' : ''}">History</a></li>
            <li><a href="${prefix}vision.html" class="dropdown-item ${isActive('vision.html') ? 'active' : ''}">Vision / Mission</a></li>
            <li><a href="${prefix}staff.html" class="dropdown-item ${isActive('staff.html') ? 'active' : ''}">Staff</a></li>
            <li><a href="${prefix}contact.html" class="dropdown-item ${isActive('contact.html') ? 'active' : ''}">Contact </a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="${prefix}teaching.html" class="nav-link ${isActive('teaching.html') ? 'active' : ''}">Teaching</a>
        </li>
        <li class="nav-item">
          <a href="${prefix}research.html" class="nav-link ${isActive('research.html') ? 'active' : ''}">Research</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isAcademicActive ? 'active' : ''}">Academic <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="${prefix}academic.html" class="dropdown-item ${isActive('academic.html') ? 'active' : ''}">Academic Services</a></li>
            <li><a href="${prefix}book.html" class="dropdown-item ${isActive('book.html') ? 'active' : ''}">Department Book</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="${prefix}km.html" class="nav-link ${isActive('km.html') ? 'active' : ''}">Knowledge Management</a>
        </li>
        <li class="nav-item">
          <a href="${prefix}NoUse/Activities_all.html" class="nav-link ${isActive('Activities_all.html') ? 'active' : ''}">News</a>
        </li>
        <li class="nav-item">
          <a href="${prefix}excellence.html" class="nav-link ${isActive('excellence.html') ? 'active' : ''}">Center of Excellence</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isElearningActive ? 'active' : ''}">E-Learning <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="http://www.elearning.ns.mahidol.ac.th/moodle3/" target="_blank" class="dropdown-item">E-Learning Nursing</a></li>
            <li><a href="https://mux.mahidol.ac.th/" target="_blank" class="dropdown-item">E-Learning Mahidol</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isOrgActive ? 'active' : ''}">Related Agencies <span class="nav-arrow">▾</span></span>
          <ul class="dropdown" style="right:0;left:auto;">
            <li><a href="https://www.tnmc.or.th/" target="_blank" class="dropdown-item">Thailand Nursing and Midwifery Council</a></li>
            <li><a href="https://www.hsri.or.th/researcher" target="_blank" class="dropdown-item">Health Systems Research Institute (HSRI)</a></li>
            <li><a href="https://www.nrct.go.th/" target="_blank" class="dropdown-item">National Research Council of Thailand (NRCT)</a></li>
          </ul>
        </li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Open/Close Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  `;

  // 5. Define the Back to Top button HTML structure
  const backToTopHTML = `
  <button id="back-to-top" title="Back to top" onclick="window.scrollTo({top:0,behavior:'smooth'})">
    <svg viewBox="0 0 24 24"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
  </button>
  `;

  // 6. Inject elements into the DOM
  document.body.insertAdjacentHTML('afterbegin', mobileMenuHTML);

  const wrapper = document.querySelector('.mn-wrapper');
  if (wrapper) {
    wrapper.insertAdjacentHTML('afterbegin', headerHTML);
  }

  document.body.insertAdjacentHTML('beforeend', backToTopHTML);

  // 7. Bind interactive functionality (menu toggle, scroll listener, etc.)
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  const navBrand = document.getElementById('navBrand');
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      const headerBottom = header.getBoundingClientRect().bottom;
      if (navBrand) navBrand.style.display = headerBottom < 0 ? 'block' : 'none';
    }

    const backTop = document.getElementById('back-to-top');
    if (backTop) {
      backTop.classList.toggle('visible', window.scrollY > 300);
    }
  }, { passive: true });

  // 8. Global Animate on Scroll (Intersection Observer)
  const animEls = document.querySelectorAll('.animate-in');
  if ('IntersectionObserver' in window && animEls.length > 0) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = 'running';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    animEls.forEach(el => {
      el.style.animationPlayState = 'paused';
      obs.observe(el);
    });
  }
});

// Global functions
window.toggleMobileDropdown = function(el) {
  const dropdown = el.nextElementSibling;
  if (dropdown) {
    dropdown.classList.toggle('open');
    el.classList.toggle('active');
  }
};
