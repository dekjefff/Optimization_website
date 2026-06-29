// Centralized Header, Navbar and Mobile Menu for Department of Surgical Nursing (SN_EN)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Determine active menu link based on current page filename
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  const isActive = (href) => {
    return currentPage.toLowerCase() === href.toLowerCase();
  };

  const isAboutActive = isActive('about.html') || isActive('staff.html');

  // 2. Define the Mobile Menu HTML structure
  const mobileMenuHTML = `
  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-nav-panel">
      <div class="mobile-nav-header">
        <span class="mobile-nav-title">Main Menu</span>
        <button class="mobile-close" id="mobileClose" aria-label="Close menu">×</button>
      </div>
      <nav class="mobile-nav-list">
        <div class="mobile-nav-item">
          <a href="index.html" class="mobile-nav-link ${isActive('index.html') ? 'active' : ''}">Home</a>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isAboutActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">About us <span>▾</span></div>
          <div class="mobile-dropdown ${isAboutActive ? 'open' : ''}">
              <a href="about.html" class="${isActive('about.html') ? 'active' : ''}">About us</a>
              <a href="staff.html" class="${isActive('staff.html') ? 'active' : ''}">Staff</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <a href="teaching.html" class="mobile-nav-link ${isActive('teaching.html') ? 'active' : ''}">Teaching</a>
        </div>
        <div class="mobile-nav-item">
          <a href="research.html" class="mobile-nav-link ${isActive('research.html') ? 'active' : ''}">Research</a>
        </div>
        <div class="mobile-nav-item">
          <a href="academic.html" class="mobile-nav-link ${isActive('academic.html') ? 'active' : ''}">Academic Services</a>
        </div>
        <div class="mobile-nav-item">
          <a href="COE.html" class="mobile-nav-link ${isActive('COE.html') ? 'active' : ''}">Center of Excellence</a>
        </div>
        <div class="mobile-nav-item">
          <a href="contact.html" class="mobile-nav-link ${isActive('contact.html') ? 'active' : ''}">Contact</a>
        </div>
      </nav>
    </div>
  </div>
  `;

  // 3. Define the Header and Desktop Navbar HTML structure
  const headerHTML = `
  <div class="topbar">
    <div class="topbar-links">
      <a href="https://ns.mahidol.ac.th/nurse_en/" target="_blank">Faculty of Nursing</a>
      <span class="sep">|</span>
      <a href="https://mahidol.ac.th/" target="_blank">Mahidol University</a>
    </div>
    <div class="topbar-social">
      <a href="#" title="Facebook">
        <img src="img/template/fb.png" alt="Facebook">
      </a>
    </div>
    <div class="topbar-lang">
      <a href="../SN_TH/index.html" target="_parent" title="Thai version">
        <img src="img/template/th.jpg" alt="TH"> TH
      </a>
    </div>
  </div>

  <header class="site-header">
    <div class="header-logo">
      <img src="img/logo/logo.png" alt="Mahidol University Logo">
    </div>
    <div class="header-text">
      <div class="header-dept-name">Department of Surgical Nursing</div>
      <div class="header-faculty-name">Faculty of Nursing, Mahidol University</div>
    </div>
  </header>

  <nav class="navbar" id="mainNav">
    <div class="navbar-inner">
      <span class="navbar-brand" style="display:none" id="navBrand">Department of Surgical Nursing</span>
      <ul class="nav-menu">
        <li class="nav-item">
          <a href="index.html" class="nav-link ${isActive('index.html') ? 'active' : ''}">Home</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isAboutActive ? 'active' : ''}">About us <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="about.html" class="dropdown-item ${isActive('about.html') ? 'active' : ''}">About us</a></li>
            <li><a href="staff.html" class="dropdown-item ${isActive('staff.html') ? 'active' : ''}">Staff</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="teaching.html" class="nav-link ${isActive('teaching.html') ? 'active' : ''}">Teaching</a>
        </li>
        <li class="nav-item">
          <a href="research.html" class="nav-link ${isActive('research.html') ? 'active' : ''}">Research</a>
        </li>
        <li class="nav-item">
          <a href="academic.html" class="nav-link ${isActive('academic.html') ? 'active' : ''}">Academic Services</a>
        </li>
        <li class="nav-item">
          <a href="COE.html" class="nav-link ${isActive('COE.html') ? 'active' : ''}">Center of Excellence</a>
        </li>
        <li class="nav-item">
          <a href="contact.html" class="nav-link ${isActive('contact.html') ? 'active' : ''}">Contact</a>
        </li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Open/Close Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  `;

  // 4. Define the Back to Top button HTML structure
  const backToTopHTML = `
  <button id="back-to-top" title="Back to top" onclick="window.scrollTo({top:0,behavior:'smooth'})">
    <svg viewBox="0 0 24 24"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
  </button>
  `;

  // 5. Inject elements into the DOM
  // Insert mobile menu at the start of body
  document.body.insertAdjacentHTML('afterbegin', mobileMenuHTML);

  // Insert header structure inside the wrapper (.mn-wrapper)
  const wrapper = document.querySelector('.mn-wrapper');
  if (wrapper) {
    wrapper.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // Insert back to top button at the end of body
  document.body.insertAdjacentHTML('beforeend', backToTopHTML);

  // 6. Bind interactive functionality (menu toggle, scroll listener, etc.)
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
});

// Global functions (called from inline handlers)
window.toggleMobileDropdown = function(el) {
  const dropdown = el.nextElementSibling;
  if (dropdown) {
    dropdown.classList.toggle('open');
    el.classList.toggle('active');
  }
};
