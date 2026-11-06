"""Apply the reviewed component fixes to the full community page as well."""
from pathlib import Path
import re
root=Path('apps/playground/public/habbo-2008');page=root/'community.html'
text=page.read_text()
text=text.replace('class="anonymous "','class="anonymous archive-community"')
for href in ['/habbo-2008/holocms/web-gallery/v2/styles/rooms.css','/habbo-2008/community-fixes.css']:
 if 'href="'+href+'"' not in text:text=text.replace('</head>', '<link rel="stylesheet" href="'+href+'"></head>')
text=re.sub(r'(<div class="topstory" style="background-image: url\()#unavailable(\))',r'\1/habbo-2008/holocms/web-gallery/images/top-story/top_story_poll2.png\2',text)
if '/habbo-2008/community-local.js' not in text:text=text.replace('</body>','<script src="/habbo-2008/community-local.js"></script></body>')
page.write_text(text)
# Reuse the reviewed button, dialog and bubble adapters without catalogue sizing rules.
preview=Path('apps/playground/public/component-preview.css').read_text()
start=preview.index('/* Sprite limits')
end=preview.index('html[data-ds-preview][data-width-mode=content]',start)
shared=preview[start:end]
for marker in ['html[data-ds-preview] .dialog-grey-top>div{background-image:url(', 'html[data-ds-preview] a.new-button.fill b{', 'html[data-ds-preview] .bottom-bubble-t::before{', 'html[data-ds-preview] .bottom-bubble-b::before{']:
 for line in preview.splitlines():
  if line.startswith(marker):shared+='\n'+line
shared=shared.replace('html[data-ds-preview]','body.archive-community')
(root/'community-component-fixes.css').write_text(shared)
