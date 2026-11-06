from pathlib import Path
from urllib.parse import urljoin,urlsplit
import re,json
root=Path('apps/playground/public/habbo-2008')
base='http://images.habbohotel.com/habboweb/25_dff9e744917eafb686617c2e12ba557c/12/web-gallery/'
def asset(url):
 u=urlsplit(url);return root/'assets'/u.netloc.replace(':80','')/u.path.lstrip('/')
def rewrite_url(raw):
 if raw.startswith(('#','data:','javascript:')):return raw
 u=urljoin('http://www.habbo.com/',raw);p=asset(u)
 if p.is_file():return '/habbo-2008/'+str(p.relative_to(root))
 if raw.endswith('.css'):return ''
 if u.split('?')[0].rstrip('/') in ('http://www.habbo.com','https://www.habbo.com'):return '/habbo-2008/index.html'
 if urlsplit(u).path.rstrip('/')=='/community':return '/habbo-2008/community.html'
 return '#unavailable'
def clean(text):
 text=re.sub(r'<!--\[if.*?<!\[endif\]-->', '', text, flags=re.S)
 text=re.sub(r'<script\b[^>]*>.*?</script\s*>','',text,flags=re.S|re.I)
 text=re.sub(r'<noscript\b[^>]*>.*?</noscript\s*>','',text,flags=re.S|re.I)
 text=re.sub(r'\s+on\w+\s*=\s*("[^"]*"|\x27[^\x27]*\x27)','',text,flags=re.I)
 text=re.sub(r'(src|href|action)=[\'\"]([^\'\"]*)[\'\"]',lambda m:m[1]+'="'+rewrite_url(m[2])+'"',text)
 text=re.sub(r'url\([\'\"]?([^\)\'\"]+)[\'\"]?\)',lambda m:'url('+rewrite_url(m[1])+')',text)
 text=re.sub(r'<link[^>]*href=""[^>]*>','',text)
 text=re.sub(r'<img[^>]*src="#unavailable"[^>]*>','',text)
 return text
stylelinks=''.join('<link rel="stylesheet" href="/habbo-2008/'+str(asset(base+'v2/styles/'+n+'.css').relative_to(root))+'">' for n in ['style','buttons','boxes','tooltips','process'] if asset(base+'v2/styles/'+n+'.css').is_file())
policy='<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src \'self\' data:; style-src \'self\' \'unsafe-inline\'; script-src \'self\'; form-action \'none\'; connect-src \'none\'; object-src \'none\'">'
nav='<div class="archive-tools"><a href="/">← Versiones</a> · <a href="/habbo-2008/index.html">Portada 2008</a> · <a href="/habbo-2008/community.html">Comunidad</a> · <a href="/design-system-2008">Design System 2008</a><span>Restauración preliminar · HTML oficial 2008; CSS de espejo sin verificar. Recursos faltantes.</span></div>'
for p in Path('scripts/sources/habbo-2008').glob('*.html'):
 text=clean(p.read_text())
 text=text.replace('</head>',policy+'<link rel="stylesheet" href="/habbo-2008/archive-tools.css"></head>')
 text=re.sub(r'(<body[^>]*>)',r'\1'+nav,text,count=1)
 text=text.replace('</body>','<script src="/habbo-2008/local.js"></script></body>')
 (root/p.name).write_text(text)
def div(text,start):
 depth=0
 for m in re.finditer(r'</?div\b[^>]*>',text[start:],re.I):
  depth+=-1 if m[0].startswith('</') else 1
  if depth==0:return text[start:start+m.end()]
 raise ValueError('unclosed')
home=Path('scripts/sources/habbo-2008/index.html').read_text();comm=Path('scripts/sources/habbo-2008/community.html').read_text()
extracts={
 'login':('Formulario de acceso',div(home,home.index('<div class="cbb loginbox')),300,285,'landing'),
 'tags':('Nube de etiquetas',div(home,home.index('<div class="habblet box-content"')),450,160,'landing'),
 'rooms':('Card de salas y pestañas',div(comm,comm.index('<div class="cbb clearfix green')),450,400,'home'),
 'groups':('Card de grupos',div(comm,comm.index('<div class="cbb clearfix blue')),450,470,'home'),
 'habbos':('Card de Habbos',div(comm,comm.index('<div class="cbb clearfix activehomes')),450,380,'home'),
 'news':('Noticias y promociones',div(comm,comm.index('<div class="cbb clearfix notitle')),450,260,'home'),
 'tagcard':('Card de etiquetas',div(comm,comm.rfind('<div class="cbb clearfix green',0,comm.index('<h2 class="title">Tags'))),450,310,'home'),
}
# The original header contains navigation and the sign-in form.
extracts['navigation']=('Cabecera y navegación',div(comm,comm.index('<div id="header-container">')),930,160,'home')
(root/'components').mkdir(exist_ok=True);data={}
for key,(title,html,w,h,bodyid) in extracts.items():
 markup=clean(html)
 body=markup if key=='navigation' else '<div id="content"><div class="habblet-container">'+markup+'</div></div>'
 doc='<!doctype html><html><head><meta charset="utf-8"><title>'+title+'</title>'+stylelinks+policy+f'<style>body{{margin:0;padding:0;text-align:left;background:transparent;width:{w}px}}#content{{width:auto;margin:0;padding:0}}#header{{width:930px}}</style></head><body id="'+bodyid+'">'+body+'<script src="/habbo-2008/local.js"></script></body></html>'
 (root/'components'/f'{key}.html').write_text(doc)
 data[key]={'title':title,'html':markup,'width':w,'height':h,'src':'/habbo-2008/components/'+key+'.html'}
Path('apps/playground/src/historical-2008-examples.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print('Prepared 2 pages and',len(data),'component examples')

import runpy
runpy.run_path("scripts/adapt-component-previews.py")
