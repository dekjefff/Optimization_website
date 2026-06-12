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

async function buildHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  
  const deptTitleEn = document.body.getAttribute('data-dept-en') || 'Department Name';
  const deptTitleTh = document.body.getAttribute('data-dept-th') || 'ชื่อภาควิชา';

  try {
    const response = await fetch('../../components/navbar.html');
    let htmlContent = await response.text();
    
    // Inject dynamic department name
    htmlContent = htmlContent.replace('{{DEPT_TH}}', deptTitleTh);
    
    header.innerHTML = htmlContent;
    document.body.prepend(header);
    
    // Initialize mobile nav after header is added
    initMobileNav();
    highlightActiveLink();
  } catch (error) {
    console.error('Error loading navbar component:', error);
  }
}

async function buildFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  
  try {
    const response = await fetch('../../components/footer.html');
    const htmlContent = await response.text();
    
    footer.innerHTML = htmlContent;
    document.body.appendChild(footer);
  } catch (error) {
    console.error('Error loading footer component:', error);
  }
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
