"""Import static HoloCMS UI assets and document its selectors without running PHP."""
from pathlib import Path
import shutil,json,re,hashlib
source=Path('/Users/miguel/Git/personal/Habbo/HoloCMS')
root=Path('apps/playground/public/habbo-2008');target=root/'holocms/web-gallery'
manifest=[]
for folder in ['v2/styles','v2/images']:
 for p in (source/'web-gallery'/folder).rglob('*'):
  if p.is_file() and p.suffix.lower() in {'.css','.png','.gif','.jpg','.jpeg','.ico'}:
   dest=target/p.relative_to(source/'web-gallery');dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,dest)
   manifest.append({'source':str(p.relative_to(source)),'local':str(dest.relative_to(root)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
# HoloCMS also stores shared sprites outside v2/images. Resolve those references
# using its own shared image tree, preserving the CSS declarations unchanged.
for css in (target/'v2/styles').glob('*.css'):
 for url in re.findall(r'url\([\s\'\"]*([^\)\'\"]+)',css.read_text(errors='replace')):
  if url.startswith(('http','data:','/')):continue
  dest=(css.parent/url).resolve()
  if dest.is_file():continue
  relative=url.split('images/',1)[-1] if 'images/' in url else url
  candidate=source/'web-gallery/images'/relative
  if not candidate.is_file():
   matches=list((source/'web-gallery').rglob(Path(url).name))
   candidate=matches[0] if len(matches)==1 else candidate
  if candidate.is_file() and candidate.suffix.lower() in {'.png','.gif','.jpg'}:
   dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(candidate,dest)
   manifest.append({'source':str(candidate.relative_to(source)),'local':str(dest.relative_to(root.resolve())),'sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'reason':'shared HoloCMS image referenced from v2 CSS'})
(root/'holocms-manifest.json').write_text(json.dumps(manifest,indent=2))
styles=''.join(f'<link rel="stylesheet" href="/habbo-2008/holocms/web-gallery/v2/styles/{name}.css">' for name in ['style','buttons','boxes','tooltips','process','settings','personal','rooms','friendmanagement'])
data=json.loads(Path('apps/playground/src/historical-2008-examples.json').read_text())
for item in data.values():
 item['source']='HTML oficial archivado · CSS y sprites HoloCMS'
 item['description']='Estructura recuperada de la captura de 2008, presentada con los recursos locales de HoloCMS. No se afirma identidad de build.'
# Existing archive pages and examples use the supplied local assets instead of the modified mirror.
for p in list(root.glob('*.html'))+list((root/'components').glob('*.html')):
 text=p.read_text()
 text=re.sub(r'<link[^>]+href="/habbo-2008/assets/[^\"]*/v2/styles/([^\"]+)"[^>]*>',lambda m:'<link rel="stylesheet" href="/habbo-2008/holocms/web-gallery/v2/styles/'+m[1]+'">',text)
 text=text.replace('CSS de espejo sin verificar. Recursos faltantes.','CSS y sprites de HoloCMS. Faltan contenidos y recursos de la captura.')
 p.write_text(text)
def button(label,variant='',icon='',disabled=False):
 return f'<a href="#" class="new-button {variant} {icon}'+(' disabled-button" role="button" aria-disabled="true" tabindex="-1"' if disabled else '" role="button"')+'><b>'+('<span></span>' if icon else '')+label+'</b><i></i></a>'
def row(content):return '<div class="clearfix" style="margin-bottom:14px">'+content+'</div>'
def add(key,title,html,height,files,description,width=450):
 html=html.replace('class="search" value="search"', 'class="search" value=""')
 path=root/'components'/f'holo-{key}.html'
 policy='<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src \'self\' data:; script-src \'self\'; style-src \'self\' \'unsafe-inline\'; form-action \'none\'; connect-src \'none\'">'
 frame=f'<style>body{{background:#e3e3db;text-align:left;margin:0;padding:12px;width:{width}px}}#content{{width:auto;margin:0;padding:0}}#holo-feedback{{clear:both;padding-top:8px;font:10px Verdana}}</style>'
 body='<div id="content">'+html+'</div><p id="holo-feedback" role="status"></p>'
 path.write_text('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>'+title+'</title>'+styles+policy+frame+'</head><body>'+body+'<script src="/habbo-2008/local.js"></script><script src="/habbo-2008/holocms-demo.js"></script></body></html>')
 data[key]={'title':title,'html':html,'width':width,'height':height,'src':'/habbo-2008/components/'+path.name,'source':'HoloCMS · '+files,'description':description}
add('buttons','Buttons · variantes y estados',row(''.join(button(t,v) for t,v in [('Default',''),('Green','green-button'),('Red','red-button'),('Dark','dark-button')]))+row(button('Disabled',disabled=True))+'<div class="clearfix" style="width:220px"><a href="#" role="button" class="new-button fill"><b>Fill · contenedor de 220 px</b><i></i></a></div>',180,'v2/styles/buttons.css; me.php; account.php','Marcado new-button con b e i y sprites new_button.png. Incluye hover, colores, disabled-button y fill. Textos de demostración; acciones locales.')
add('buttonicons','Buttons · iconos',row(''.join(button(label,'',icon+'-icon') for label,icon in [('Edit','edit'),('Save','save'),('Cancel','cancel')]))+row(''.join(button(label,'',icon+'-icon') for label,icon in [('Search','search'),('Message','envelope'),('Coins','purse')]))+row(button('New topic','','newtopic-icon')),180,'v2/styles/buttons.css; account.php','Iconos definidos por el sprite button_icons2.png. Las clases y capas internas proceden del CSS de HoloCMS.')
add('inputbuttons','Buttons · controles input',row(' '.join(f'<input type="button" class="{c}" value="{c}" aria-label="{c}">' for c in ['submit','continue','cancel','save','new','search','myhabbo-edit']))+row(' '.join(f'<input type="button" class="{c}" value="{c} disabled" disabled>' for c in ['submit','continue','cancel'])),145,'v2/styles/buttons.css','Controles nativos con las clases submit, continue, cancel, save, new, search y myhabbo-edit. Incluye los estados disabled definidos en el CSS.')
add('alerts','Mensajes y validación',''.join('<div style="margin-bottom:12px"><div class="rounded rounded-'+c+'" style="padding:6px 10px">'+t+'</div></div>' for c,t in [('green','Cambios guardados.'),('red','Revisa los datos indicados.'),('orange','Tienes una acción pendiente.'),('blue','Información de tu cuenta.')])+'<div class="fielderror"><div style="padding:8px 10px">Error de validación del campo.</div></div>',230,'v2/styles/style.css; account.php','Clases rounded-green, rounded-red, rounded-orange, rounded-blue y fielderror. Mensajes de muestra; Rounder genera las esquinas históricas.')
html='<div class="dialog-grey" id="sample-dialog" style="position:relative;width:398px"><div class="dialog-grey-top"><div><h3><span>Confirmación</span></h3><a href="#" class="dialog-grey-exit" aria-label="Cerrar">×</a></div></div><div class="dialog-grey-content"><div class="dialog-grey-body"><p>Are you sure you want to leave this group?</p><p>'+button('Cancel')+button('OK')+'</p><div class="clear"></div></div></div><div class="dialog-grey-bottom"><div></div></div></div><div class="clearfix">'+button('Volver a abrir','','')+'</div>'
add('dialogs','Diálogo gris',html,210,'v2/styles/boxes.css; habblet/ajax_groups_confirm_leave.php','Capas dialog-grey-top/content/body/bottom y confirmación de salida del grupo. Es un ejemplo de la ventana web, no del cliente Flash; cierre y reapertura locales.')
add('bubbles','Globos de ayuda','<div class="bottom-bubble" style="position:relative;width:300px"><div class="bottom-bubble-t"><div></div></div><div class="bottom-bubble-c">By selecting remember me you will stay signed in on this computer until you click Sign Out.</div><div class="bottom-bubble-b"><div></div></div></div>',160,'v2/styles/boxes.css; templates/login','Estructura bottom-bubble-t/c/b conservada en la web. Texto de ayuda de ejemplo, sin persistencia de sesión.')
add('cardvariants','Cards · variantes de color',''.join(f'<div class="cbb clearfix {c}"><h2 class="title">{c}</h2><div class="box-content"><p>Contenido de ejemplo.</p></div></div>' for c in ['green','blue','red','gray','lightgreen','loginbox','hcred']),650,'v2/styles/style.css','Variantes de paneles documentadas en el CSS local. Rounder produce las capas bt, bb, i1, i2 e i3, sin dibujar cards nuevas.')
add('localtabs','Pestañas de panel','<div class="cbb clearfix green"><div class="box-tabs-container clearfix"><h2>Rooms</h2><ul class="box-tabs"><li class="selected"><a href="#" data-panel="recommended">Recommended Rooms</a><span class="tab-spacer"></span></li><li><a href="#" data-panel="rated">Top Rated</a><span class="tab-spacer"></span></li></ul></div><div id="recommended" class="box-content">Recommended Rooms · Contenido de muestra.</div><div id="rated" class="box-content" hidden>Top Rated · Contenido de muestra.</div></div>',150,'me.php; v2/styles/style.css','Mismo marcado box-tabs del proyecto. Selección local con clic; contenido de muestra, sin consultas al servidor.')
add('formscontrols','Formularios y campos','<div class="cbb clearfix settings"><h2 class="title">Account settings</h2><div class="box-content"><form><p><label>Nombre <input type="text" value="RetroHabbo"></label></p><p><label>Descripción<br><textarea rows="3" cols="35">Mi habitación favorita</textarea></label></p><p><label>Idioma <select><option>Español</option><option>English</option></select></label></p><p><label><input type="checkbox" checked> Recordarme</label></p><p><label><input type="radio" name="visibility" checked> Pública</label> <label><input type="radio" name="visibility"> Privada</label></p><input type="submit" class="save" value="Save"></form></div></div>',335,'account.php; v2/styles/settings.css; v2/styles/buttons.css','Controles nativos bajo las hojas de HoloCMS. Composición y valores de muestra; guardar solo muestra un aviso local.')
add('tooltips','Tooltips informativos y de error','<div class="bubbletip"><div class="title"></div><div class="content"><strong>Información</strong><p>Texto de ayuda de ejemplo.</p></div></div><br><div class="redtip"><div class="title"></div><div class="content">Revisa el valor indicado.</div></div>',260,'v2/styles/tooltips.css','Clases bubbletip y redtip con sus sprites originales. Contenido de muestra; se muestran abiertos para inspeccionar su apariencia.')
add('pagination','Paginación de resultados','<div class="cbb clearfix blue"><h2 class="title">Search results</h2><div class="box-content"><p class="paging-navigation"><a href="#" class="avatar-habblet-list-container-list-paging-link">«</a> <strong>1</strong> <a href="#" class="avatar-habblet-list-container-list-paging-link">2</a> <a href="#" class="avatar-habblet-list-container-list-paging-link">3</a> <a href="#" class="avatar-habblet-list-container-list-paging-link">»</a></p></div></div>',140,'habblet/ajax_search.php; v2/styles/style.css','Marcado paging-navigation usado por la búsqueda. Página y resultados de muestra; los enlaces no consultan la base de datos.')
# Recover the missing stylesheet for archived rooms and use an existing local news image.
rooms=root/'components/rooms.html'
text=rooms.read_text()
if 'styles/rooms.css' not in text:text=text.replace('</head>', '<link rel="stylesheet" href="/habbo-2008/holocms/web-gallery/v2/styles/rooms.css"></head>')
rooms.write_text(text)
news_image=source/'web-gallery/images/top-story/top_story_poll2.png'
news_target=target/'images/top-story/top_story_poll2.png'
news_target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(news_image,news_target)
news=root/'components/news.html';text=news.read_text()
text=text.replace('background-image: url(#unavailable)', 'background-image: url(/habbo-2008/holocms/web-gallery/images/top-story/top_story_poll2.png)',1)
news.write_text(text)
data['news']['description']='Promoción de ancho fijo de 300 px, con la imagen top_story_poll2.png disponible en HoloCMS. El contenido textual procede del archivo de 2008.'
data['news']['html']=data['news']['html'].replace('background-image: url(#unavailable)', 'background-image: url(/habbo-2008/holocms/web-gallery/images/top-story/top_story_poll2.png)',1)
# Prefer new documented controls at the top of the catalogue.
order=['buttons','buttonicons','inputbuttons','cardvariants','dialogs','localtabs','alerts','bubbles','formscontrols','tooltips','pagination']
data={**{k:data[k] for k in order},**{k:v for k,v in data.items() if k not in order}}
Path('apps/playground/src/historical-2008-examples.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
(root/'holocms-demo.js').write_text('''document.addEventListener('click',event=>{const a=event.target.closest('a');if(!a)return;if(a.closest('.archive-tools'))return;event.preventDefault();if(a.getAttribute('aria-disabled')==='true'||a.classList.contains('disabled-button'))return;const feedback=document.getElementById('holo-feedback');if(a.dataset.panel){const panel=document.getElementById(a.dataset.panel);const tabs=a.closest('.box-tabs');tabs.querySelectorAll('li').forEach(li=>li.classList.remove('selected'));a.closest('li').classList.add('selected');['recommended','rated'].forEach(id=>{document.getElementById(id).hidden=id!==panel.id});return;}const dialog=document.getElementById('sample-dialog');if(dialog){if(a.classList.contains('dialog-grey-exit')||a.textContent==='Cancel'||a.textContent==='OK')dialog.hidden=true;else if(a.textContent==='Volver a abrir')dialog.hidden=false;}feedback.textContent='Demostración local: '+(a.textContent.trim()||a.className);});document.addEventListener('submit',event=>{event.preventDefault();document.getElementById('holo-feedback').textContent='Demostración local: no se han enviado datos.';});document.querySelectorAll('input[type="button"]:not(:disabled)').forEach(input=>input.addEventListener('click',()=>{document.getElementById('holo-feedback').textContent='Control '+input.className+' pulsado.';}));''')
(root/'holocms-demo.js').write_text((root/'holocms-demo.js').read_text()+'''
if(new URLSearchParams(location.search).has('floating')){document.body.style.setProperty('padding','0','important');const again=document.querySelector('#sample-dialog+.clearfix');if(again)again.remove();document.addEventListener('keydown',event=>{if(event.key==='Escape')parent.postMessage({type:'holo-dialog-close'},location.origin);});document.addEventListener('click',event=>{const a=event.target.closest('a');if(a&&(a.classList.contains('dialog-grey-exit')||['Cancel','OK'].includes(a.textContent.trim())))parent.postMessage({type:'holo-dialog-close'},location.origin);});}
''')
print('Imported',len(manifest),'static files;',len(data),'catalog examples')

# Avoid the archived unavailable-data handler for tabs with local sample content.
p=root/'local.js'
s=p.read_text().replace("event.preventDefault();if(!a.closest('li').classList.contains('selected'))", "event.preventDefault();if(a.dataset.panel)return;if(!a.closest('li').classList.contains('selected'))")
p.write_text(s)

import runpy
runpy.run_path("scripts/adapt-component-previews.py")

runpy.run_path("scripts/fix-habbo-2008-community.py")

runpy.run_path("scripts/fix-habbo-2008-landing.py")
