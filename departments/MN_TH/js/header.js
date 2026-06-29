// Centralized Header, Navbar and Mobile Menu for Department of Medical Nursing (MN_TH)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Calculate relative path prefix dynamically based on directory depth
  const getPrefix = () => {
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const marker1 = 'departments/MN_TH/';
    const idx1 = currentPath.indexOf(marker1);
    if (idx1 !== -1) {
      const sub = currentPath.substring(idx1 + marker1.length);
      const depth = (sub.match(/\//g) || []).length;
      return '../'.repeat(depth);
    }
    const marker2 = 'MN_TH/';
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

  const isAboutActive = isActive('about.html') || isActive('vision.html') || isActive('award.html') || isActive('staff.html') || isActive('contact.html');
  const isAcademicActive = isActive('academic_about.html') || isActive('academic.html') || isActive('book.html');
  const isElearningActive = false; // External links, not highlighted as active subpages locally
  const isOrgActive = false;

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
            <a href="${prefix}about.html" class="${isActive('about.html') ? 'active' : ''}">ประวัติและความเป็นมา</a>
            <a href="${prefix}vision.html" class="${isActive('vision.html') ? 'active' : ''}">วิสัยทัศน์ / พันธกิจ</a>
            <a href="${prefix}award.html" class="${isActive('award.html') ? 'active' : ''}">รางวัลแห่งความภาคภูมิใจ</a>
            <a href="${prefix}staff.html" class="${isActive('staff.html') ? 'active' : ''}">บุคลากร</a>
            <a href="${prefix}contact.html" class="${isActive('contact.html') ? 'active' : ''}">ติดต่อเรา</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}teaching.html" class="mobile-nav-link ${isActive('teaching.html') ? 'active' : ''}">การเรียนการสอน</a>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}research.html" class="mobile-nav-link ${isActive('research.html') ? 'active' : ''}">วิจัยและนวัตกรรม</a>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isAcademicActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">บริการวิชาการ <span>▾</span></div>
          <div class="mobile-dropdown ${isAcademicActive ? 'open' : ''}">
            <a href="${prefix}academic_about.html" class="${isActive('academic_about.html') ? 'active' : ''}">ด้านประวัติความเป็นมา</a>
            <a href="${prefix}academic.html" class="${isActive('academic.html') ? 'active' : ''}">โครงการส่งเสริมและบริการวิชาการ</a>
            <a href="${prefix}book.html" class="${isActive('book.html') ? 'active' : ''}">หนังสือภาควิชาฯ</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}km.html" class="mobile-nav-link ${isActive('km.html') ? 'active' : ''}">การจัดการความรู้</a>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}excellence.html" class="mobile-nav-link ${isActive('excellence.html') ? 'active' : ''}">ศูนย์ความเป็นเลิศ</a>
        </div>
        <div class="mobile-nav-item">
          <a href="${prefix}Activities_all.html" class="mobile-nav-link ${isActive('Activities_all.html') ? 'active' : ''}">ข่าวสารภาควิชา</a>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isElearningActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">E-Learning <span>▾</span></div>
          <div class="mobile-dropdown ${isElearningActive ? 'open' : ''}">
            <a href="http://www.elearning.ns.mahidol.ac.th/" target="_blank">E-Learning คณะพยาบาลศาสตร์</a>
            <a href="https://mux.mahidol.ac.th/" target="_blank">E-Learning มหาวิทยาลัยมหิดล</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <div class="mobile-nav-link ${isOrgActive ? 'active' : ''}" onclick="toggleMobileDropdown(this)">หน่วยงานที่เกี่ยวข้อง <span>▾</span></div>
          <div class="mobile-dropdown ${isOrgActive ? 'open' : ''}">
            <a href="https://www.tnmc.or.th/" target="_blank">สภาการพยาบาล</a>
            <a href="https://www.hsri.or.th/researcher" target="_blank">สถาบันวิจัยระบบสาธารณสุข (สวรส.)</a>
            <a href="https://www.nrct.go.th/" target="_blank">สำนักงานคณะกรรมการวิจัยแห่งชาติ</a>
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
      <a href="https://ns.mahidol.ac.th/" target="_blank">คณะพยาบาลศาสตร์</a>
      <span class="sep">|</span>
      <a href="https://mahidol.ac.th/" target="_blank">มหาวิทยาลัยมหิดล</a>
    </div>
    <div class="topbar-social">
    </div>
    <div class="topbar-lang">
      <a href="${prefix}../MN_EN/index.html" target="_parent" title="English version">
        <img src="${prefix}img/template/en.png" alt="EN"> EN
      </a>
    </div>
  </div>

  <header class="site-header">
    <div class="header-logo">
      <img src="${prefix}img/logo/logo.png" alt="โลโก้มหาวิทยาลัยมหิดล">
      <div class="logo-placeholder">
        <svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"><circle cx="20" cy="20" r="18"/><path d="M20 8 L20 32 M8 20 L32 20"/><circle cx="20" cy="20" r="8"/></svg>
        <span style="font-size:9px;color:rgba(255,255,255,0.4);line-height:1.2">โลโก้<br>มหิดล</span>
      </div>
    </div>
    <div class="header-text">
      <div class="header-dept-name">ภาควิชาการพยาบาลอายุรศาสตร์</div>
    </div>
  </header>

  <nav class="navbar" id="mainNav">
    <div class="navbar-inner">
      <span class="navbar-brand" style="display:none" id="navBrand">ภาควิชาการพยาบาลอายุรศาสตร์</span>
      <ul class="nav-menu">
        <li class="nav-item">
          <a href="${prefix}index.html" class="nav-link ${isActive('index.html') ? 'active' : ''}">หน้าหลัก</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isAboutActive ? 'active' : ''}">เกี่ยวกับภาควิชา <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="${prefix}about.html" class="dropdown-item ${isActive('about.html') ? 'active' : ''}">ประวัติและความเป็นมา</a></li>
            <li><a href="${prefix}vision.html" class="dropdown-item ${isActive('vision.html') ? 'active' : ''}">วิสัยทัศน์ / พันธกิจ</a></li>
            <li><a href="${prefix}award.html" class="dropdown-item ${isActive('award.html') ? 'active' : ''}">รางวัลแห่งความภาคภูมิใจ</a></li>
            <li><a href="${prefix}staff.html" class="dropdown-item ${isActive('staff.html') ? 'active' : ''}">บุคลากร</a></li>
            <li><a href="${prefix}contact.html" class="dropdown-item ${isActive('contact.html') ? 'active' : ''}">ติดต่อเรา</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="${prefix}teaching.html" class="nav-link ${isActive('teaching.html') ? 'active' : ''}">การเรียนการสอน</a>
        </li>
        <li class="nav-item">
          <a href="${prefix}research.html" class="nav-link ${isActive('research.html') ? 'active' : ''}">วิจัยและนวัตกรรม</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isAcademicActive ? 'active' : ''}">บริการวิชาการ <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="${prefix}academic_about.html" class="dropdown-item ${isActive('academic_about.html') ? 'active' : ''}">ด้านประวัติความเป็นมา</a></li>
            <li><a href="${prefix}academic.html" class="dropdown-item ${isActive('academic.html') ? 'active' : ''}">โครงการส่งเสริมและบริการวิชาการ</a></li>
            <li><a href="${prefix}book.html" class="dropdown-item ${isActive('book.html') ? 'active' : ''}">หนังสือภาควิชาฯ</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="${prefix}km.html" class="nav-link ${isActive('km.html') ? 'active' : ''}">จัดการความรู้</a>
        </li>
        <li class="nav-item">
          <a href="${prefix}excellence.html" class="nav-link ${isActive('excellence.html') ? 'active' : ''}">ศูนย์ความเป็นเลิศ</a>
        </li>
        <li class="nav-item">
          <a href="${prefix}Activities_all.html" class="nav-link ${isActive('Activities_all.html') ? 'active' : ''}">ข่าวสาร</a>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isElearningActive ? 'active' : ''}">E-Learning <span class="nav-arrow">▾</span></span>
          <ul class="dropdown">
            <li><a href="http://www.elearning.ns.mahidol.ac.th/" target="_blank" class="dropdown-item">E-Learning คณะพยาบาลศาสตร์</a></li>
            <li><a href="https://mux.mahidol.ac.th/" target="_blank" class="dropdown-item">E-Learning มหาวิทยาลัยมหิดล</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <span class="nav-link ${isOrgActive ? 'active' : ''}">หน่วยงาน <span class="nav-arrow">▾</span></span>
          <ul class="dropdown" style="right:0;left:auto;">
            <li><a href="https://www.tnmc.or.th/" target="_blank" class="dropdown-item">สภาการพยาบาล</a></li>
            <li><a href="https://www.hsri.or.th/researcher" target="_blank" class="dropdown-item">สถาบันวิจัยระบบสาธารณสุข (สวรส.)</a></li>
            <li><a href="https://www.nrct.go.th/" target="_blank" class="dropdown-item">สำนักงานคณะกรรมการวิจัยแห่งชาติ</a></li>
          </ul>
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
    }, { threshold: 0 });
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
