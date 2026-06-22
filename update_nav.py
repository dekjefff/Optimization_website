import os
import re

depts = ['OGN_TH', 'MHPN_TH', 'PHN_TH']
for dept in depts:
    nav_file = os.path.join('departments', dept, 'navbar.html')
    if not os.path.exists(nav_file): continue
    
    with open(nav_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Move research in desktop nav
    content = re.sub(
        r'<li class="nav-item">\s*<a href="research\.html" class="nav-link">การวิจัย</a>\s*</li>\s*<li class="nav-item">\s*<span class="nav-link">การบริการวิชาการ <span class="nav-arrow">▾</span></span>\s*<ul class="dropdown">',
        r'<li class="nav-item">\n        <span class="nav-link">การบริการวิชาการ <span class="nav-arrow">▾</span></span>\n        <ul class="dropdown">\n          <li><a href="research.html" class="dropdown-item">การวิจัย</a></li>',
        content, flags=re.DOTALL
    )

    # Move research in mobile nav
    content = re.sub(
        r'<div class="mobile-nav-item">\s*<a href="research\.html" class="mobile-nav-link">การวิจัย</a>\s*</div>\s*<div class="mobile-nav-item">\s*<div class="mobile-nav-link" onclick="toggleMobileDropdown\(this\)">\s*การบริการวิชาการ <span>▾</span>\s*</div>\s*<div class="mobile-dropdown">',
        r'<div class="mobile-nav-item">\n        <div class="mobile-nav-link" onclick="toggleMobileDropdown(this)">\n          การบริการวิชาการ <span>▾</span>\n        </div>\n        <div class="mobile-dropdown">\n          <a href="research.html">การวิจัย</a>',
        content, flags=re.DOTALL
    )

    with open(nav_file, 'w', encoding='utf-8') as f:
        f.write(content)
