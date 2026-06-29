const mobileMenuHTML = `
    <div class="mobile-nav-panel">
        <div class="mobile-nav-header">
            <span class="mobile-nav-title">เมนูหลัก</span>
            <button class="mobile-close" id="mobileClose" aria-label="ปิดเมนู">×</button>
        </div>
        <nav class="mobile-nav-list">
            <div class="mobile-nav-item">
                <a href="index.html" class="mobile-nav-link">หน้าหลัก</a>
            </div>
            <div class="mobile-nav-item">
                <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">
                    เกี่ยวกับภาควิชา <span>▾</span>
                </div>
                <div class="mobile-dropdown">
                    <a href="about.html">ประวัติและความเป็นมา</a>
                    <a href="vision.html">วิสัยทัศน์ / พันธกิจ</a>
                    <a href="staff.html">บุคลากร</a>
                </div>
            </div>
            <div class="mobile-nav-item">
                <a href="teaching.html" class="mobile-nav-link">การเรียนการสอน</a>
            </div>
            <div class="mobile-nav-item">
                <a href="https://sites.google.com/view/nsresearchpaper/year_1?authuser=0" class="mobile-nav-link" target="_blank" rel="noopener noreferrer">การวิจัย</a>
            </div>
            <div class="mobile-nav-item">
                <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">
                    การบริการวิชาการ <span>▾</span>
                </div>
                <div class="mobile-dropdown">
                    <a href="academic.html">การบริการวิชาการ</a>
                    <a href="textbook.html">ตำราของภาควิชา</a>
                    <a href="COE.html">ศูนย์ความเป็นเลิศทางวิชาการ</a>
                </div>
            </div>
            <div class="mobile-nav-item">
                <a href="km.html" class="mobile-nav-link">การจัดการความรู้</a>
            </div>
            <div class="mobile-nav-item">
                <a href="Activities.html" class="mobile-nav-link">ข่าวสาร</a>
            </div>
            <div class="mobile-nav-item">
                <a href="contact.html" class="mobile-nav-link">ติดต่อภาควิชา</a>
            </div>
        </nav>
    </div>
`;

const headerHTML = `
    <div class="topbar">
        <div class="topbar-links">
            <a href="https://ns.mahidol.ac.th/" target="_blank">คณะพยาบาลศาสตร์</a>
            <span class="sep">|</span>
            <a href="https://mahidol.ac.th/" target="_blank">มหาวิทยาลัยมหิดล</a>
        </div>
        <div class="topbar-social" style="display:flex; gap:8px; align-items:center;">
            <a href="facebook.html" title="Facebook" style="transition:transform 0.2s; background:transparent !important;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><img src="img/other/facebook.png" alt="Facebook" style="width:24px; height:24px; border-radius:50%; object-fit:cover; filter:none !important;"></a>
        </div>
        <div class="topbar-lang">
            <a href="https://ns.mahidol.ac.th/Department/FN_dept_en/index.html" target="_parent" title="English version">
                <img src="img/template/en.png" alt="EN"> EN
            </a>
        </div>
    </div>

    <header class="site-header">
        <div class="header-logo">
            <img src="img/logo/logo.png" alt="โลโก้มหาวิทยาลัยมหิดล">
        </div>
        <div class="header-text" style="text-align: right;">
            <div class="header-dept-name">ภาควิชาการพยาบาลรากฐาน</div>
        </div>
    </header>

    <nav class="navbar" id="mainNav">
        <div class="navbar-inner">
            <span class="navbar-brand" style="display:none" id="navBrand">ภาควิชาการพยาบาลรากฐาน</span>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">หน้าหลัก</a>
                </li>
                <li class="nav-item">
                    <span class="nav-link">เกี่ยวกับภาควิชา <span class="nav-arrow">▾</span></span>
                    <ul class="dropdown">
                        <li><a href="about.html" class="dropdown-item">ประวัติและความเป็นมา</a></li>
                        <li><a href="vision.html" class="dropdown-item">วิสัยทัศน์ / พันธกิจ</a></li>
                        <li><a href="staff.html" class="dropdown-item">บุคลากร</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="teaching.html" class="nav-link">การเรียนการสอน</a>
                </li>
                <li class="nav-item">
                    <a href="https://sites.google.com/view/nsresearchpaper/year_1?authuser=0" class="nav-link" target="_blank" rel="noopener noreferrer">การวิจัย</a>
                </li>
                <li class="nav-item">
                    <span class="nav-link">การบริการวิชาการ <span class="nav-arrow">▾</span></span>
                    <ul class="dropdown">
                        <li><a href="academic.html" class="dropdown-item">การบริการวิชาการ</a></li>
                        <li><a href="textbook.html" class="dropdown-item">ตำราของภาควิชา</a></li>
                        <li><a href="COE.html" class="dropdown-item">ศูนย์ความเป็นเลิศทางวิชาการ</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="km.html" class="nav-link">การจัดการความรู้</a>
                </li>
                <li class="nav-item">
                    <a href="Activities.html" class="nav-link">ข่าวสาร</a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link">ติดต่อภาควิชา</a>
                </li>
            </ul>
            <button class="hamburger" id="hamburger" aria-label="เปิด/ปิดเมนู">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
    <div id="header-placeholder"></div>
`;

// Wait until DOM is fully loaded before injecting
document.addEventListener("DOMContentLoaded", function() {
    
    // Inject Mobile Menu
    const mobileContainer = document.getElementById('mobile-menu-container');
    if (mobileContainer) {
        mobileContainer.classList.add('mobile-menu');
        mobileContainer.id = 'mobileMenu';
        mobileContainer.innerHTML = mobileMenuHTML;
    }

    // Inject Header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }

    // Set Active Link Logic
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Special handling if current page is empty (root of domain)
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }

    // Handle desktop nav active states
    const desktopLinks = document.querySelectorAll('.nav-menu a');
    desktopLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            
            // If it's a dropdown item, set the parent nav-link to active
            if (link.classList.contains('dropdown-item')) {
                const parentNav = link.closest('.nav-item');
                if (parentNav) {
                    const parentSpan = parentNav.querySelector('.nav-link');
                    if (parentSpan) parentSpan.classList.add('active');
                }
            }
        }
    });
    
    // Also check root level nav-links that are standard anchors
    const desktopRootLinks = document.querySelectorAll('.nav-menu > .nav-item > a.nav-link');
    desktopRootLinks.forEach(link => {
         if (link.getAttribute('href') === currentPage) {
             link.classList.add('active');
         }
    });

    // Handle mobile nav active states
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');
    mobileLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            
            // If it's a dropdown item, set the parent mobile-nav-link to active
            if (link.closest('.mobile-dropdown')) {
                const parentNav = link.closest('.mobile-nav-item');
                if (parentNav) {
                    const parentDiv = parentNav.querySelector('.mobile-nav-link');
                    if (parentDiv) parentDiv.classList.add('active');
                }
            }
        }
    });

    // Bind Mobile Menu Interactions
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    if (hamburger && mobileMenu && mobileClose) {
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

        hamburger.addEventListener('click', openMobileMenu);
        mobileClose.addEventListener('click', closeMobileMenu);

        mobileMenu.addEventListener('click', function (e) {
            if (e.target === mobileMenu) closeMobileMenu();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeMobileMenu();
        });
    }

    // Bind Mobile Dropdown Interaction
    window.toggleMobileDropdown = function(el) {
        const dropdown = el.nextElementSibling;
        if (dropdown) {
            dropdown.classList.toggle('open');
            el.classList.toggle('active');
        }
    };

    // Bind Sticky Nav Interaction
    const navBrand = document.getElementById('navBrand');
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.site-header');
        if (header) {
            const headerBottom = header.getBoundingClientRect().bottom;
            if (navBrand) navBrand.style.display = headerBottom < 0 ? 'block' : 'none';
        }
    }, { passive: true });
});
