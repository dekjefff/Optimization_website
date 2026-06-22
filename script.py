import os
import re

km_dir = r"c:\Users\dekjeff\Optimization_website\departments\OGN_TH\km"
files = [f for f in os.listdir(km_dir) if f.startswith('km') and f.endswith('.html')]

template = """<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>การจัดการความรู้ | ภาควิชาการพยาบาลสูติศาสตร์-นรีเวชวิทยา คณะพยาบาลศาสตร์ มหาวิทยาลัยมหิดล</title>
  
  <link rel="stylesheet" href="../style.css">
  <script src="../../../components/layout.js" defer></script>
  
  <style>
    .km-list {{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1.5rem;
    }}
    .km-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-sm);
      padding: 1.25rem 1.5rem;
      box-shadow: var(--shadow-sm);
      transition: transform var(--transition), box-shadow var(--transition);
    }}
    .km-item:hover {{
      transform: translateX(5px);
      box-shadow: var(--shadow-md);
      border-color: var(--primary);
    }}
    .km-info {{
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }}
    .km-title {{
      font-family: var(--font-heading);
      font-size: 1.05rem;
      color: var(--primary);
      font-weight: 500;
      text-decoration: none;
    }}
    .km-date {{
      font-size: 0.85rem;
      color: var(--text-muted);
    }}
    .km-download {{
      background: var(--primary-glow);
      color: var(--primary);
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: background var(--transition);
    }}
    .km-download:hover {{
      background: var(--primary);
      color: var(--text-inverse);
    }}
    .km-download svg {{
      width: 16px;
      height: 16px;
    }}
  </style>
</head>
<body data-dept-th="ภาควิชาการพยาบาลสูติศาสตร์-นรีเวชวิทยา" data-dept-en="OGN Department">
  <main class="site-main container">
    <div id="page-content">
      <h1>กิจกรรมแลกเปลี่ยนเรียนรู้ ประจำปี {year}</h1>
      
      <div class="km-list">
{items}
      </div>
      
      <div style="margin-top: 3rem; text-align: center;">
        <a href="../km_all.html" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: var(--secondary); color: var(--primary); text-decoration: none; border-radius: var(--radius-sm); font-weight: 600; font-family: var(--font-heading); transition: transform var(--transition);">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 18px; height: 18px;" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
          ย้อนกลับ
        </a>
      </div>
    </div>
  </main>
</body>
</html>"""

item_template = """        <div class="km-item">
          <div class="km-info">
            <span class="km-title">{title}</span>
            <span class="km-date">วันที่: {date}</span>
          </div>
          <a href="{link}" target="_blank" class="km-download">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            อ่านรายละเอียด
          </a>
        </div>"""

for f in files:
    year = f.replace('km', '').replace('.html', '')
    with open(os.path.join(km_dir, f), 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    
    tr_blocks = re.findall(r'<tr class="line_body">.*?</tr>', content, re.DOTALL)
    if not tr_blocks:
        # try without </tr>
        tr_blocks = re.findall(r'<tr class="line_body">.*?(?=<tr class="line_body">|</table)', content, re.DOTALL)
        
    items_html = []
    for tr in tr_blocks:
        link_match = re.search(r'href="([^"]+)"', tr)
        if not link_match: continue
        link = link_match.group(1)
        
        title_match = re.search(r'<a[^>]*>([^<]+)</a>', tr)
        title = title_match.group(1).strip() if title_match else "ไม่ระบุชื่อเรื่อง"
        
        # Date
        tds = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.DOTALL)
        if not tds:
            # Maybe the <tr> is broken and <td> is missing closing tag
            tds = re.findall(r'<td[^>]*>(.*?)(?:<td|</tr>)', tr, re.DOTALL)
            
        date = "-"
        if len(tds) >= 3:
            # clean up html tags from date
            date = re.sub(r'<[^>]+>', '', tds[-1]).strip()
            if not date or date == '-': date = "ไม่ระบุวันที่"
        else:
            date = "ไม่ระบุวันที่"
            
        items_html.append(item_template.format(title=title, date=date, link=link))
    
    new_content = template.format(year=year, items='\n'.join(items_html))
    with open(os.path.join(km_dir, f), 'w', encoding='utf-8') as file:
        file.write(new_content)

print("Updated " + str(len(files)) + " files.")
