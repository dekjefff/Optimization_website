/**
 * MHPN Department Shared Layout Controller
 * Dynamically builds modern Header, Navigation Menu, and Footer for all pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Build Header & Navigation
  buildHeader();

  // 2. Build Footer
  buildFooter();

  // 3. Highlight Active Menu Link
  highlightActiveLink();

  // 4. Initialize Mobile Navigation Toggle
  initMobileNav();
});

function buildHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  
  header.innerHTML = `
    <div class="top-bar">
      <div class="container top-bar-container">
        <div class="top-bar-links">
          <a href="https://ns.mahidol.ac.th" target="_blank">คณะพยาบาลศาสตร์</a>
          <span class="divider">|</span>
          <a href="https://mahidol.ac.th" target="_blank">มหาวิทยาลัยมหิดล</a>
        </div>
        <div class="top-bar-actions">
          <a href="https://ns.mahidol.ac.th/Department/MHPN - Eng/index.html" class="lang-switch">
            <img src="img/template/en.png" alt="English Version" width="20" height="14"> EN
          </a>
          <div class="social-links">
            <a href="https://www.facebook.com/nsmu.mhpn" target="_blank" class="social-icon">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5C13 5.3 13.8 5 14.5 5H16V2h-2.5C10.5 2 9 3.5 9 6v2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-bar">
      <div class="container nav-bar-container">
        <a href="index.html" class="brand-logo">
          <div class="logo-text">
            <span class="logo-title">MHPN Department</span>
            <span class="logo-subtitle">สุขภาพจิตและการพยาบาลจิตเวชศาสตร์</span>
          </div>
        </a>
        
        <nav class="nav-menu" id="nav-menu">
          <ul class="nav-list">
            <li><a href="index.html" class="nav-item">หน้าหลัก</a></li>
            
            <li class="nav-item-has-submenu">
              <a href="#" class="nav-item">เกี่ยวกับภาควิชา <span class="arrow">▼</span></a>
              <ul class="submenu">
                <li><a href="about.html">ประวัติและความเป็นมา</a></li>
                <li><a href="vision.html">ภารกิจหลัก</a></li>
                <li><a href="staff.html">บุคลากร</a></li>
              </ul>
            </li>
            
            <li><a href="teaching.html" class="nav-item">การเรียนการสอน</a></li>
            <li><a href="research.html" class="nav-item">การวิจัย</a></li>
            
            <li class="nav-item-has-submenu">
              <a href="#" class="nav-item">การบริการวิชาการ <span class="arrow">▼</span></a>
              <ul class="submenu">
                <li><a href="academic.html">การบริการวิชาการ</a></li>
                <li><a href="COE.html">ศูนย์ความเป็นเลิศฯ</a></li>
              </ul>
            </li>
            
            <li><a href="contact.html" class="nav-item">ติดต่อภาควิชา</a></li>
          </ul>
        </nav>
        
        <button class="mobile-toggle" aria-label="Toggle Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  `;

  document.body.insertBefore(header, document.body.firstChild);
}

function buildFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  
  footer.innerHTML = `
    <div class="container footer-container">
      <div class="footer-info">
        <p class="footer-copyright">
          Copyright &copy; 2026 <strong>Faculty of Nursing, Mahidol University</strong>. All rights reserved.
        </p>
        <p class="footer-webmaster">
          Webmaster: <a href="mailto:nswww@mahidol.ac.th">nswww@mahidol.ac.th</a>
        </p>
      </div>
      <div class="footer-links">
        <a href="https://ns.mahidol.ac.th" target="_blank">คณะพยาบาลศาสตร์</a>
        <a href="https://mahidol.ac.th" target="_blank">มหาวิทยาลัยมหิดล</a>
      </div>
    </div>
  `;
  
  document.body.appendChild(footer);
}

function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-menu a');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath) {
      item.classList.add('active');
      
      // If it is in a submenu, highlight the parent item as well
      const parentSubmenu = item.closest('.submenu');
      if (parentSubmenu) {
        const parentLink = parentSubmenu.previousElementSibling;
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
}

function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-menu');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  }
}
