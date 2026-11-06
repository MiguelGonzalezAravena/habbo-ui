"""Restore the landing markup expected by its local HoloCMS stylesheet."""
from pathlib import Path
import re
root=Path('apps/playground/public/habbo-2008');p=root/'index.html';s=p.read_text()
s=s.replace('class="process-template"','class="process-template archive-landing"')
if '/habbo-2008/landing-fixes.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/habbo-2008/landing-fixes.css"></head>')
s=s.replace('<div><a href="#unavailable"><span>Join now', '<div id="landing-register-text"><a href="#unavailable"><span>Join now',1)
if 'id="landing-tags-card"' not in s:
 start=s.index('<div class="habblet box-content" id="tag-cloud-slim">');depth=0;end=None
 for m in re.finditer(r'</?div\b[^>]*>',s[start:],re.I):
  depth+=-1 if m[0].startswith('</') else 1
  if depth==0:end=start+m.end();break
 if end is None:raise ValueError('Tag cloud is not closed')
 s=s[:start]+'<div id="landing-tags-card" class="cbb clearfix notitle">'+s[start:end]+'</div>'+s[end:]
p.write_text(s)
