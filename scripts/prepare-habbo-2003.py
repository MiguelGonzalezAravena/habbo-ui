"""Normalize the preserved 2003 site. Keep its HTML layout, CSS and sprites."""
from pathlib import Path
from urllib.parse import urlsplit,unquote
import re,json,hashlib
root=Path('apps/playground/public/habbo-2003')
repairs=[]
def resolve(raw,page):
 raw=raw.strip()
 if not raw or raw.startswith(('#','data:','javascript:')):return raw
 normalized=re.sub(r'^https?://web\.archive\.org/web/[^/]+/(https?://)',r'\1',raw)
 parts=urlsplit(normalized)
 if parts.scheme in ('http','https'):
  if parts.hostname not in ('www.habbohotel.com','habbohotel.com'):return '#archive-unavailable'
  path=unquote(parts.path)
  if path=='/':path='/habbo/en/'
  candidate=root/path.lstrip('/')
 else:
  candidate=(root/normalized.lstrip('/')) if normalized.startswith('/') else page.parent/unquote(parts.path)
 candidate=candidate.resolve()
 if candidate.is_dir():candidate=candidate/'index.html'
 if candidate.is_file() and candidate.is_relative_to(root.resolve()):
  new='/habbo-2003/'+str(candidate.relative_to(root.resolve()))
  if parts.fragment:new+='#'+parts.fragment
  return new
 return '#archive-unavailable'
for p in root.rglob('*.html'):
 raw=p.read_bytes();text=raw.decode('utf-8') if b'charset=utf-8' in raw[:1500].lower() else raw.decode('cp1252',errors='replace')
 text=re.sub(r'<script\b[^>]*>.*?</script\s*>','',text,flags=re.S|re.I)
 text=re.sub(r'<noscript\b[^>]*>.*?</noscript\s*>','',text,flags=re.S|re.I)
 text=re.sub(r'\s+on\w+\s*=\s*("[^"]*"|\x27[^\x27]*\x27)','',text,flags=re.I)
 text=re.sub(r'<(?:object|applet|iframe)\b[^>]*>.*?</(?:object|applet|iframe)\s*>','',text,flags=re.S|re.I)
 text=text.replace('charset=iso-8859-1','charset=utf-8')
 def attr(m):
  new=resolve(m[2],p)
  if m[1].lower() in ('src','background') and new=='#archive-unavailable':repairs.append({'page':str(p.relative_to(root)),'resource':m[2]})
  return m[1]+'="'+new+'"'
 text=re.sub(r'\b(src|href|background|action)\s*=\s*[\'\"]([^\'\"]+)[\'\"]',attr,text,flags=re.I)
 policy='<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src \'self\' data:; style-src \'self\' \'unsafe-inline\'; script-src \'self\'; form-action \'none\'; connect-src \'none\'; object-src \'none\'">'
 text=text.replace('</head>',policy+'</head>')
 text=text.replace('</body>','<script src="/habbo-2003/archive-local.js"></script></body>')
 p.write_text(text)
for p in root.rglob('*.css'):
 text=p.read_bytes().decode('cp1252',errors='replace')
 text=re.sub(r'url\([\'\"]?([^\)\'\"]+)[\'\"]?\)',lambda m:'url("'+resolve(m[1],p)+'")',text)
 p.write_text(text)
(root/'index.html').write_text('<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/habbo-2003/habbo/en/index.html"><title>Habbo Hotel · 2003</title></head><body><a href="/habbo-2003/habbo/en/index.html">Abrir Habbo Hotel 2003</a></body></html>')
(root/'archive-local.js').write_text('''document.addEventListener('submit',e=>{e.preventDefault();notice('Los servicios del hotel no están conectados en este archivo local.');});document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;if(a.getAttribute('href')==='#archive-unavailable'||a.target==='client'||a.href.includes('/common/habbo_client/')){e.preventDefault();notice('El cliente Shockwave y los servicios originales no están disponibles. Estás visitando la web archivada de 2003.');}});function notice(text){let box=document.getElementById('archive-local-notice');if(!box){box=document.createElement('div');box.id='archive-local-notice';box.setAttribute('role','status');Object.assign(box.style,{position:'fixed',bottom:'12px',left:'12px',maxWidth:'420px',padding:'12px',background:'#ffffcc',color:'#333300',border:'1px solid #333300',font:'11px Verdana',zIndex:'99999'});document.body.append(box);}box.replaceChildren(document.createTextNode(text+' '));const close=document.createElement('button');close.textContent='Cerrar';close.onclick=()=>box.remove();box.append(close);}''')
manifest={'source':'https://h4bbo.net/archive/Habbo%20Archives/Shockwave/Habbo%202003%20EN.zip','archiveReferences':'20031008143415','packageNote':'Preservation package assembled in 2023; pages retain October 2003 Wayback references. Fidelity is to the supplied archived HTML and assets, not independently proven pixel equality.','htmlPages':len(list(root.rglob('*.html')))-1,'missingImageReferences':repairs,'changes':['UTF-8 encoding','Local resource/link paths','Archived tracking and scripts removed','External/plugin service actions show a local notice'],'layout':'Original fixed-width tables, original CSS and GIF sprites; no modern layout reset applied.'}
(root/'provenance.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({'pages':manifest['htmlPages'],'missing':len(repairs)}))
