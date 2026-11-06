"""Extract complete original components; preserve markup and stylesheet order."""
from pathlib import Path
import re,json
root=Path('apps/playground/public/habbo-2006')
hotel=(root/'hotel.html').read_text();home=(root/'index.html').read_text()
def div(text,start):
 depth=0
 for m in re.finditer(r'</?div\b[^>]*>',text[start:],re.I):
  depth+= -1 if m[0].startswith('</') else 1
  if depth==0:return text[start:start+m.end()]
 raise ValueError('Unclosed div')
def card(text,marker):return div(text,text.index(marker))
examples={
 'welcome':('New to Habbo?',card(hotel,'<div class="portlet-scale gold">'),215,215,hotel,'hotel'),
 'news':('Hotel news',card(hotel,'<div id="newsbox">'),311,251,hotel,'hotel'),
 'scores':("This Week’s Top Scores",div(home,home.rfind('<div class="maskbox',0,home.index("<h3>This Week's Top Scores"))),315,325,home,'home'),
 'navigation':('Navegación principal',card(hotel,'<div id="mainmenu">'),800,45,hotel,'hotel'),
 'winter':('Winter Holiday Furni',div(home,home.rfind('<div class="maskbox',0,home.index('<h3>Winter Holiday Furni'))),215,255,home,'home'),
 'happenings':('Habbo Happenings',div(home,home.rfind('<div class="maskbox',0,home.index('<h3>Habbo Happenings'))),215,410,home,'home'),
 'ecard':('Habbo E-Cards',div(hotel,hotel.rfind('<div class="portlet-scale gold">',0,hotel.index('<h3>Habbo E-Cards'))),215,170,hotel,'hotel'),
}
data={}
out=root/'components';out.mkdir(exist_ok=True)
for key,(title,markup,width,height,source,bodyid) in examples.items():
 links=''.join(re.findall(r'<link[^>]+rel="stylesheet"[^>]*/?>',source))
 # Base URL preserves original CSS, image and page links from extracted markup.
 doc=f'<!doctype html><html><head><meta charset="utf-8"><base href="/habbo-2006/" target="_blank"><title>{title}</title>{links}<style>body{{margin:0;padding:0;background:transparent;text-align:left;width:{width}px}}#mainmenu{{margin:0}}</style></head><body id="{bodyid}">{markup}</body></html>'
 (out/(key+'.html')).write_text(doc)
 data[key]={'title':title,'html':markup,'width':width,'height':height,'src':'/habbo-2006/components/'+key+'.html'}
Path('apps/playground/src/historical-examples.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print('Extracted',len(data),'original compositions')

import runpy
runpy.run_path("scripts/adapt-component-previews.py")
