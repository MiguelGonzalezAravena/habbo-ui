"""Extract actual table/sprite components from the preserved 2003 HTML."""
from pathlib import Path
import re,json
root=Path('apps/playground/public/habbo-2003');home=(root/'habbo/en/index.html').read_text()
def table_at(text,marker):
 end=text.index(marker);stack=[]
 for m in re.finditer(r'</?table\b[^>]*>',text[:end],re.I):
  if m[0].startswith('</'):
   if stack:stack.pop()
  else:stack.append(m.start())
 if not stack:raise ValueError(marker)
 start=stack[-1];depth=0
 for m in re.finditer(r'</?table\b[^>]*>',text[start:],re.I):
  depth+=-1 if m[0].startswith('</') else 1
  if depth==0:return text[start:start+m.end()]
def image(name):
 return next(m[0] for m in re.finditer(r'<img\b[^>]*>',home,re.I) if name in m[0])
examples={}
def add(key,title,html,width,description,source='habbo/en/index.html'):
 examples[key]={'title':title,'html':html,'width':width,'description':description,'source':source,'src':'/habbo-2003/components/'+key+'.html'}
add('navigation','Navegación principal',table_at(home,'homepage_on.gif'),503,'Pestañas gráficas originales: Home Page, Help & Safety, Habbo Purse, Community y Shopping. La pestaña de inicio conserva su estado activo.')
add('online','Panel azul · Habbos online',table_at(home,'blue_ul.gif'),168,'Tabla de tres columnas con las esquinas, bordes y contador de la portada. El número 2275 pertenece al archivo, no a una conexión en vivo.')
add('help','Panel amarillo · Ayuda',table_at(home,'yellow_ul.gif'),168,'Panel lateral original de ayuda y requisitos Shockwave; se mantienen textos, enlaces y gráficos.')
add('news','Habbo Today · Noticias',table_at(home,'habbo_today.gif'),241,'Noticias de octubre de 2003, con la cabecera y el pie ilustrados originales.')
add('happenings','Card · Hotel Happenings',table_at(home,'promo1_u.gif'),241,'Promoción de la newsletter con sus bordes y la máquina de escribir del archivo.')
add('friday','Card · Funky Friday',table_at(home,'promo2_u.gif'),241,'Card promocional original con título gráfico, texto y enlace de acción.')
checkin=re.search(r'<a\b[^>]*>\s*<img[^>]+check_in_2\.gif[^>]*>\s*</a>',home,re.S)
add('checkin','Acción gráfica · Check in',checkin[0],80,'Botón ilustrado original de acceso. El cliente Shockwave no está conectado; al pulsarlo se muestra un aviso local.')
promo=re.search(r'<a\b[^>]*>\s*<img[^>]+/promo1\.gif[^>]*>\s*<img[^>]+/promo2\.gif[^>]*>\s*</a>',home,re.S)
add('hero','Promoción principal',promo[0],469,'Dos imágenes contiguas de 215 y 254 px que forman la promoción de portada. Se mantiene la unión original.')
add('branding','Logo y fondo',image('habbo_logo.gif'),160,'Logo original sobre el fondo repetido de la web. El patrón del fondo también procede del archivo.')
add('typography','Tipografía y enlaces','<div style="background:#E59E0F;padding:12px"><p><span class="heading">Welcome to Habbo Hotel!</span></p><p><span class="subheading">Subheading · 11 px</span></p><p>Verdana · texto base de 10 px. <a href="/habbo-2003/habbo/en/help/index.html">Read more</a></p><p><span class="darkred">darkred</span> · <span class="darkerred">darkerred</span> · <span class="white">white</span> · <a class="greenish" href="/habbo-2003/habbo/en/community/index.html">greenish</a></p></div>',400,'Muestra de las clases heading, subheading y colores de enlace existentes en habbo_style_all.css. Esta composición es una muestra del catálogo, no una card extraída.','habbo/jsp/default/includes/habbo_style_all.css')
feedback=(root/'habbo/en/help/contact/feedback/index.html').read_text()
form=re.search(r'<form\b.*?</form>',feedback,re.S|re.I)[0]
add('forms','Formulario de contacto', '<div style="background:#E59E0F;padding:12px">'+form+'</div>',503,'Formulario recuperado de la página de contacto: controles HTML nativos bajo el CSS de 2003. Los campos se pueden probar, pero no se envían datos. Los apartados que requerían scripts originales siguen sin conexión.','habbo/en/help/contact/feedback/index.html')
scores=(root/'habbo/en/community/wobblesquabble/scores/index.html').read_text();weeks=re.search(r'<form\b.*?</form>',scores,re.S|re.I)[0]
add('select','Selector de semana', '<div style="background:#E59E0F;padding:12px">'+weeks+'</div>',400,'Selector nativo y acción del formulario de puntuaciones, con sus opciones de semanas archivadas. No consulta puntuaciones actuales.','habbo/en/community/wobblesquabble/scores/index.html')
css='/habbo-2003/habbo/jsp/default/includes/habbo_style_all.css'
policy='<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src \'self\' data:; style-src \'self\' \'unsafe-inline\'; script-src \'self\'; form-action \'none\'; connect-src \'none\'; object-src \'none\'">'
(root/'components').mkdir(exist_ok=True)
for key,item in examples.items():
 body='<div class="legacy-viewport"><div class="legacy-stage" style="width:'+str(item['width'])+'px">'+item['html']+'</div></div>'
 doc='<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html lang="en"><head><meta charset="utf-8"><base target="_blank"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+item['title']+'</title><link rel="stylesheet" href="'+css+'"><link rel="stylesheet" href="/habbo-2003/component-layout.css">'+policy+'</head><body>'+body+'<script src="/habbo-2003/component-layout.js"></script><script src="/habbo-2003/archive-local.js"></script></body></html>'
 (root/'components'/f'{key}.html').write_text(doc)
Path('apps/playground/src/historical-2003-examples.json').write_text(json.dumps(examples,ensure_ascii=False,indent=2))
print('Extracted',len(examples),'components from the 2003 archive')
