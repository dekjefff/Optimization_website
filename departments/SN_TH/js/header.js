// Centralized Header, Navbar and Mobile Menu for Department of Surgical Nursing (SN_TH)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Calculate relative path prefix dynamically based on directory depth
  const getPrefix = () => {
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const marker1 = 'departments/SN_TH/';
    const idx1 = currentPath.indexOf(marker1);
    if (idx1 !== -1) {
      const sub = currentPath.substring(idx1 + marker1.length);
      const depth = (sub.match(/\//g) || []).length;
      return '../'.repeat(depth);
    }
    const marker2 = 'SN_TH/';
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

  const isAboutActive = isActive('about.html') || isActive('head.html') || isActive('vision.html') || isActive('plan.html') || isActive('staff.html');
  const isAcademicActive = isActive('academic.html') || isActive('treatise.html');

  // 3. Define the Mobile Menu HTML structure
  const mobileMenuHTML = `
  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-nav-panel">
      <div class="mobile-nav-header">
        <span class="mobile-nav-title">เมนูหลัก</span>
        <button class="mobile-close" id="mobileClose" aria-label="ปิดเมนู">×</button>
      </div>
      <nav class="mobile-nav-list">
        <div class="mobile-nav-item">
          <a href="${prefix}index.html" class="mobile-nav-link ${isActive('index.html') ? 'active' : ''}">หน้าหลัก</a>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isAboutActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">เกี่ยวกับภาควิชา <span>▾</span></div>
          <div class="mobile-dropdown ${isAboutActive ? 'open' : ''}">
              <a href="${prefix}about.html" class="${isActive('about.html') ? 'active' : ''}">ความเป็นมา</a>
              <a href="${prefix}head.html" class="${isActive('head.html') ? 'active' : ''}">ทำเนียบหัวหน้าภาควิชา</a>
              <a href="${prefix}vision.html" class="${isActive('vision.html') ? 'active' : ''}">ปณิธาน/วิสัยทัศน์/พันธกิจ</a>
              <a href="${prefix}plan.html" class="${isActive('plan.html') ? 'active' : ''}">ยุทธศาสตร์ภาควิชา</a>
              <a href="${prefix}staff.html" class="${isActive('staff.html') ? 'active' : ''}">รายนามบุคลากร</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}teaching.html" class="mobile-nav-link ${isActive('teaching.html') ? 'active' : ''}">การศึกษา</a>
        </div>
        <div class="mobile-nav-item">
          <a href="https://sites.google.com/view/nsresearchpaper" target="_blank" class="mobile-nav-link">การวิจัย</a>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isAcademicActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">บริการวิชาการ <span>▾</span></div>
          <div class="mobile-dropdown ${isAcademicActive ? 'open' : ''}">
              <a href="${prefix}academic.html" class="${isActive('academic.html') ? 'active' : ''}">บริการวิชาการ</a>
              <a href="${prefix}treatise.html" class="${isActive('treatise.html') ? 'active' : ''}">หนังสือภาควิชา</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}Activities_all.html" class="mobile-nav-link ${isActive('Activities_all.html') ? 'active' : ''}">ภาพกิจกรรม</a>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}km.html" class="mobile-nav-link ${isActive('km.html') ? 'active' : ''}">การจัดการความรู้</a>
        </div>
        <div class="mobile-nav-item">
          <a href="https://ns.mahidol.ac.th/english/TH/departments/SN/crm2/index.html" target="_blank" class="mobile-nav-link">ศูนย์จัดการการฟื้นตัว</a>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}contact.html" class="mobile-nav-link ${isActive('contact.html') ? 'active' : ''}">ติดต่อเรา</a>
        </div>
      </nav>
    </div>
  </div>
  `;

  // 4. Define the Header and Desktop Navbar HTML structure
  const headerHTML = `
  <div class="topbar">
    <div class="topbar-links">
      <a href="https://ns.mahidol.ac.th/" target="_blank">คณะพยาบาลศาสตร์</a>
      <span class="sep">|</span>
      <a href="https://mahidol.ac.th/" target="_blank">มหาวิทยาลัยมหิดล</a>
    </div>
    <div class="topbar-social">
      <a href="${prefix}facebook.html" title="Facebook">
        <img src="${prefix}img/template/fb.png" alt="Facebook">
      </a>
    </div>
    <div class="topbar-lang">
      <a href="${prefix}../SN_EN/index.html" target="_parent" title="English version">
        <img src="${prefix}img/template/en.png" alt="EN"> EN
      </a>
    </div>
  </div>

  <header class="site-header">
    <div class="header-logo">
      <img src="${prefix}img/logo/logo.png" alt="โลโก้มหาวิทยาลัยมหิดล">
    </div>
    <div class="header-text">
      <div class="header-dept-name">ภาควิชาการพยาบาลศัลยศาสตร์</div>
    </div>
  </header>

  <nav class="navbar" id="mainNav">
    <div class="navbar-inner">
      <span class="navbar-brand" style="display:none" id="navBrand">ภาควิชาการพยาบาลศัลยศาสตร์</span>
      <ul class="nav-menu">
        <li class="nav-item">
          <a href="${prefix}index.html" class="nav-link ${isActive('index.html') ? 'active' : ''}">หน้าหลัก</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isAboutActive ? 'active' : ''}">เกี่ยวกับภาควิชา <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="${prefix}about.html" class="dropdown-item ${isActive('about.html') ? 'active' : ''}">ความเป็นมา</a></li>
            <li><a href="${prefix}head.html" class="dropdown-item ${isActive('head.html') ? 'active' : ''}">ทำเนียบหัวหน้าภาควิชา</a></li>
            <li><a href="${prefix}vision.html" class="dropdown-item ${isActive('vision.html') ? 'active' : ''}">ปณิธาน/วิสัยทัศน์/พันธกิจ</a></li>
            <li><a href="${prefix}plan.html" class="dropdown-item ${isActive('plan.html') ? 'active' : ''}">ยุทธศาสตร์ภาควิชา</a></li>
            <li><a href="${prefix}staff.html" class="dropdown-item ${isActive('staff.html') ? 'active' : ''}">รายนามบุคลากร</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="${prefix}teaching.html" class="nav-link ${isActive('teaching.html') ? 'active' : ''}">การศึกษา</a>
        </li>
        <li class="nav-item">
          <a href="https://sites.google.com/view/nsresearchpaper" target="_blank" class="nav-link">การวิจัย</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isAcademicActive ? 'active' : ''}">บริการวิชาการ <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="${prefix}academic.html" class="dropdown-item ${isActive('academic.html') ? 'active' : ''}">บริการวิชาการ</a></li>
            <li><a href="${prefix}treatise.html" class="dropdown-item ${isActive('treatise.html') ? 'active' : ''}">หนังสือภาควิชา</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="${prefix}Activities_all.html" class="nav-link ${isActive('Activities_all.html') ? 'active' : ''}">ภาพกิจกรรม</a>
        </li>
        <li class="nav-item">
          <a href="${prefix}km.html" class="nav-link ${isActive('km.html') ? 'active' : ''}">การจัดการความรู้</a>
        </li>
        <li class="nav-item">
          <a href="https://ns.mahidol.ac.th/english/TH/departments/SN/crm2/index.html" target="_blank" class="nav-link">ศูนย์จัดการการฟื้นตัว</a>
        </li>
        <li class="nav-item">
          <a href="${prefix}contact.html" class="nav-link ${isActive('contact.html') ? 'active' : ''}">ติดต่อเรา</a>
        </li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="เปิด/ปิดเมนู">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  `;

  // 5. Define the Back to Top button HTML structure
  const backToTopHTML = `
  <button id="back-to-top" title="กลับขึ้นด้านบน" onclick="window.scrollTo({top:0,behavior:'smooth'})">
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
});

// Global functions
window.toggleMobileDropdown = function(el) {
  const dropdown = el.nextElementSibling;
  if (dropdown) {
    dropdown.classList.toggle('open');
    el.classList.toggle('active');
  }
};
