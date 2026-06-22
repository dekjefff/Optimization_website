import os
import re
import glob

ogn_dir = r"c:\Users\dekjeff\Optimization_website\departments\OGN_TH"

def get_best_image(img_src):
    if not img_src.lower().endswith('.jpg') and not img_src.lower().endswith('.png'):
        return img_src
    
    dir_path = os.path.dirname(os.path.join(ogn_dir, img_src))
    if not os.path.exists(dir_path):
        return img_src
    
    files = [f for f in os.listdir(dir_path) if f.lower().endswith('.jpg') or f.lower().endswith('.png')]
    files.sort(key=lambda x: os.path.getsize(os.path.join(dir_path, x)), reverse=True)
    
    if files:
        return img_src.replace(os.path.basename(img_src), files[0])
    return img_src

files = glob.glob(os.path.join(ogn_dir, 'Activities*.html'))
files = [f for f in files if os.path.basename(f) not in ('Activities.html', 'Activities_all.html')]

template = """<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ข่าวสารภาควิชาฯ | ภาควิชาการพยาบาลสูติศาสตร์-นรีเวชวิทยา คณะพยาบาลศาสตร์ มหาวิทยาลัยมหิดล</title>
  <link rel="stylesheet" href="style.css">
  <script src="../../components/layout.js" defer></script>
  
  <style>
    .news-section {{
      margin-top: 2rem;
      margin-bottom: 4rem;
    }}
    .section-title {{
      font-family: var(--font-heading);
      color: var(--primary);
      margin-bottom: 1.5rem;
      border-bottom: 2px solid var(--secondary);
      padding-bottom: 0.5rem;
      display: inline-block;
    }}
    .news-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }}
    .news-card {{
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: transform var(--transition), box-shadow var(--transition);
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
    }}
    .news-card:hover {{
      transform: translateY(-5px);
      box-shadow: var(--shadow-hover);
      border-color: var(--primary);
    }}
    .news-img {{
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-bottom: 1px solid var(--surface-border);
    }}
    .news-content {{
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }}
    .news-title {{
      font-family: var(--font-heading);
      font-size: 1.1rem;
      color: var(--text-main);
      font-weight: 500;
      margin-bottom: 1rem;
      line-height: 1.5;
    }}
    .news-card:hover .news-title {{
      color: var(--primary);
    }}
    .news-read-more {{
      margin-top: auto;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--secondary);
      font-weight: 500;
      font-size: 0.9rem;
    }}
    .news-read-more svg {{
      width: 16px;
      height: 16px;
      transition: transform 0.3s ease;
    }}
    .news-card:hover .news-read-more svg {{
      transform: translateX(4px);
    }}
    .more-btn-container {{
      margin-top: 2rem;
      text-align: center;
    }}
    .more-btn {{
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 2rem;
      background: var(--secondary);
      color: var(--primary);
      text-decoration: none;
      border-radius: var(--radius-sm);
      font-weight: 600;
      font-family: var(--font-heading);
      transition: transform var(--transition);
    }}
    .more-btn:hover {{
      transform: translateY(-2px);
    }}
  </style>
</head>
<body data-dept-th="ภาควิชาการพยาบาลสูติศาสตร์-นรีเวชวิทยา" data-dept-en="OGN Department">
  <main class="site-main container">
    <div id="page-content">
      
      <div class="news-section">
        <h2 class="section-title">{title1}</h2>
        <div class="news-grid">
{items1}
        </div>
      </div>
      
{section2}

      <div class="more-btn-container">
        <a href="Activities_all.html" class="more-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 18px; height: 18px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
          ย้อนกลับ
        </a>
      </div>

    </div>
  </main>
</body>
</html>"""

item_template = """          <a href="{link}" target="_blank" class="news-card">
            <img src="{img}" alt="ข่าว" class="news-img" onerror="this.src='../../img/placeholder.jpg'">
            <div class="news-content">
              <h3 class="news-title">{title}</h3>
              <div class="news-read-more">อ่านรายละเอียด <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>
            </div>
          </a>"""

for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    
    title1_match = re.search(r'<td[^>]*class="txt_head">([^<]+)</td>', content)
    title1 = title1_match.group(1).strip() if title1_match else "ข่าวกิจกรรม"
    
    parts = content.split('ข่าวประชาสัมพันธ์')
    act_part = parts[0]
    pr_part = parts[1] if len(parts) > 1 else ""
    
    def extract_items(html_part):
        items = []
        tr_blocks = re.findall(r'<tr[^>]*>.*?</tr>', html_part, re.DOTALL)
        for tr in tr_blocks:
            if '<img' not in tr or '<a ' not in tr: continue
            
            img_match = re.search(r'src="([^"]+)"', tr)
            img = img_match.group(1) if img_match else ""
            img = get_best_image(img)
            
            link_match = re.search(r'href="([^"]+)"', tr)
            link = link_match.group(1) if link_match else ""
            
            text_match = re.search(r'<a[^>]*>([^<]+)</a>', tr)
            title = text_match.group(1).strip() if text_match else "ไม่ระบุชื่อเรื่อง"
            if len(title) < 5 and text_match:
                all_a = re.findall(r'<a[^>]*>([^<]+)</a>', tr)
                for a in all_a:
                    if len(a.strip()) > 5:
                        title = a.strip()
                        break
            
            if img and link:
                items.append(item_template.format(link=link, img=img, title=title))
        return items

    items1 = extract_items(act_part)
    items2 = extract_items(pr_part)
    
    section2 = ""
    if items2:
        title2_match = re.search(r'<td[^>]*class="txt_head">.*?(ข่าวประชาสัมพันธ์[^<]*)</td>', content)
        title2 = title2_match.group(1).strip() if title2_match else "ข่าวประชาสัมพันธ์"
        section2 = f'''
      <div class="news-section">
        <h2 class="section-title">{title2}</h2>
        <div class="news-grid">
{chr(10).join(items2)}
        </div>
      </div>
'''
    
    new_content = template.format(title1=title1, items1='\n'.join(items1), section2=section2)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)

print(f"Processed {len(files)} files.")
