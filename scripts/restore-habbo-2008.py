"""Restore a dated official Habbo capture. Download data only; never execute archived JS."""
from pathlib import Path
from urllib.request import urlopen,Request
from urllib.parse import urljoin,urlsplit
from concurrent.futures import ThreadPoolExecutor,as_completed
import re,json,time
root=Path('apps/playground/public/habbo-2008'); stamp='20080915043801'
manifest={}; failed=[]
def local(url):
 u=urlsplit(url);return root/'assets'/u.netloc.replace(':80','')/u.path.lstrip('/')
def download(url):
 target=local(url)
 if target.is_file():return url,True
 candidates=[]
 if '/web-gallery/' in url:
  candidates.append('https://archive.alcosmos.net/Habbo_Archive_V2_Wendigo/web-gallery/'+url.split('/web-gallery/')[1])
 if 'c_images/' in url:
  old=Path('apps/playground/public/habbo-2006/_external/images.habbohotel.com/c_images')/url.split('c_images/')[1]
  if old.is_file():
   target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(old.read_bytes())
   manifest[url]={'local':str(target.relative_to(root)), 'source':str(old),'status':'shared archived asset; build identity unverified'}
   return url,True
 if not candidates:return url,'Not available in mirror; Wayback rate limited'
 import subprocess
 for candidate in candidates:
  result=subprocess.run(['curl','-fsSL','--max-time','20',candidate],capture_output=True)
  if result.returncode==0 and not result.stdout.lstrip().lower().startswith(b'<!doctype html'):
   target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(result.stdout)
   manifest[url]={'local':str(target.relative_to(root)), 'source':candidate,'status':'historical mirror; build identity unverified'}
   return url,True
 return url,'Resource missing from historical mirror'
def urls(text,base,css=False):
 vals=re.findall(r'url\([\s\'\"]*([^\)\'\"]+)',text) if css else re.findall(r'(?:href|src)=[\'\"]([^\'\"]+)',text)
 result=set()
 for val in vals:
  if val.startswith(('data:','#','javascript:')):continue
  u=urljoin(base,val.strip())
  if re.search(r'\.(css|png|gif|jpg|jpeg|ico)(?:\?|$)',u,re.I):result.add(u)
 return result
sources=list(Path('scripts/sources/habbo-2008').glob('*.html'));queue=set()
for p in sources:queue|=urls(p.read_text(),'http://www.habbo.com/'+('community' if p.stem=='community' else ''))
seen=set()
while queue:
 batch=queue-seen;queue=set();seen|=batch
 if not batch:break
 print('Downloading',len(batch),'resources',flush=True)
 with ThreadPoolExecutor(max_workers=5) as pool:
  for fut in as_completed([pool.submit(download,u) for u in batch]):
   u,ok=fut.result()
   if ok is not True:failed.append({'url':u,'error':ok});continue
   if urlsplit(u).path.endswith('.css'):queue|=urls(local(u).read_text(errors='replace'),u,True)
(root/'resource-manifest.json').write_text(json.dumps({'timestamp':stamp,'resources':manifest,'missing':failed},indent=2))
# Preserve original CSS declarations, replacing only resource paths.
for p in (root/'assets').rglob('*.css'):
 original='http://'+str(p.relative_to(root/'assets'))
 text=p.read_text(errors='replace')
 def rewrite(m):
  raw=m[1].strip(' \'"');u=urljoin(original,raw)
  if local(u).is_file():return 'url("/habbo-2008/'+str(local(u).relative_to(root))+'")'
  return m[0]
 p.write_text(re.sub(r'url\(([^)]+)\)',rewrite,text))
print('Stored',len(seen)-len(failed),'resources;',len(failed),'missing',flush=True)
