"""Add catalogue-only responsive layout rules to generated example documents."""
from pathlib import Path
import re
for year in ['2006','2008']:
 root=Path('apps/playground/public')/('habbo-'+year)/'components'
 for p in root.glob('*.html'):
  text=p.read_text()
  text=re.sub(r'<html\b(?![^>]*data-ds-preview)', '<html data-ds-preview',text,count=1)
  if 'data-example=' not in text:
   text=text.replace('data-ds-preview', 'data-ds-preview data-example="'+p.stem+'"',1)
  if '/component-preview.css' not in text:text=text.replace('</head>','<link rel="stylesheet" href="/component-preview.css"></head>')
  p.write_text(text)
