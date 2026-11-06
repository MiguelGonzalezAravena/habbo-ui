import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { ComponentPreview, type PreviewWidthMode } from './ComponentPreview';
export function FormPreview({src,title}:{src:string;title:string}) {
 const [mode,setMode]=useState<PreviewWidthMode>('fixed');
 const [fixed,setFixed]=useState(360);
 const [stretch,setStretch]=useState(false);
 const id=useId();
 return <><fieldset className="ds-preview-options"><legend>Dimensiones del formulario</legend><label htmlFor={id}>Ancho <select id={id} value={mode} onChange={e=>setMode(e.target.value as PreviewWidthMode)}><option value="content">Ajustar al contenido</option><option value="fixed">Fijo</option><option value="container">100% del contenedor</option><option value="viewport">Ancho de pantalla</option></select></label>{mode==='fixed'&&<label>Píxeles <input type="number" min={240} max={1200} step={20} value={fixed} onChange={e=>setFixed(Math.max(240,Math.min(1200,Number(e.target.value)||360)))}/></label>}<label><input type="checkbox" checked={stretch} onChange={e=>setStretch(e.target.checked)}/> Campos al 100%</label></fieldset>{mode==='viewport' ? createPortal(<div className="ds-form-screen" role="dialog" aria-label={title+' · ancho de pantalla'}><header><strong>{title} · ancho de pantalla</strong><button onClick={()=>setMode('container')}>Cerrar vista de pantalla</button></header><ComponentPreview src={src} title={title+' · pantalla'} widthMode="container" stretchFields={stretch}/></div>,document.body) : <ComponentPreview src={src} title={title} widthMode={mode} fixedWidth={fixed} stretchFields={stretch}/>}<p className="ds-muted">El ancho fijo se limita al espacio disponible en pantallas pequeñas.</p></>;
}
