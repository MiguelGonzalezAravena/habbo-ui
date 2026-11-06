"""Normalize archive resource URLs without changing historical CSS declarations."""
from pathlib import Path
import re, json
root = Path('apps/playground/public/habbo-2006')
prefix = '/habbo-2006/'
repairs = []
for p in root.rglob('*.css'):
    text = p.read_text(errors='replace')
    def fix(m):
        raw = m.group(1).strip(' \'"')
        raw = re.sub(r'^/web/\d+(?:im_)?/https?://', 'https://', raw)
        if raw.startswith(('http://', 'https://')):
            local = root / '_external' / re.sub(r'^https?://', '', raw)
        else:
            local = (p.parent / raw).resolve()
        if not local.is_file():
            # The archive captured shared images under a different web build.
            candidates = list(root.glob('_external/images.habbohotel.com/web/*/images/' + raw.split('/images/')[-1])) if '/images/' in raw else []
            if candidates:
                local = candidates[0]
                repairs.append({'css':str(p.relative_to(root)), 'original':raw, 'resolved':str(local.relative_to(root))})
            else:
                return m.group(0)
        return 'url("' + prefix + str(local.resolve().relative_to(root.resolve())) + '")'
    text = re.sub(r'url\(([^)]+)\)', fix, text)
    p.write_text(text)
for p in root.rglob('*.html'):
    text = p.read_text(errors='replace')
    text = re.sub(r'<script\b[^>]*>.*?</script\s*>', '', text, flags=re.S|re.I)
    text = re.sub(r'\s+on\w+\s*=\s*("[^"]*"|\x27[^\x27]*\x27)', '', text, flags=re.I)
    text = re.sub(r'<base\b[^>]*>', '', text, flags=re.I)
    # Keep the historic page local; archived service forms cannot be submitted.
    text = re.sub(r'<form\b([^>]*)>', lambda m: '<form'+re.sub(r'\saction="[^"]*"','',m[1])+ ' onsubmit="return false">', text, flags=re.I)
    text = text.replace('</head>', '<meta name="referrer" content="no-referrer"/></head>')
    if p == root / 'index.html' and '/design-system' not in text:
        text = text.replace('<div id="toolbar-register">', '<div id="toolbar-register"><a href="/design-system" target="_blank" rel="noopener">Design System ↗</a> | ', 1)
    if p == root / 'index.html' and '>Versiones</a>' not in text:
        text = text.replace('<div id="toolbar-register">', '<div id="toolbar-register"><a href="/">Versiones</a> | ', 1)
    p.write_text(text)
(root / 'resource-repairs.json').write_text(json.dumps(repairs, indent=2))
print(f'Prepared archive; {len(repairs)} resource paths repaired.')
