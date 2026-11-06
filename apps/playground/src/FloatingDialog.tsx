import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { ComponentPreview } from './ComponentPreview';
export function FloatingDialog({onClose}:{onClose:()=>void}) {
 const [position,setPosition]=useState(()=>({x:Math.max(8,(window.innerWidth-430)/2),y:Math.max(8,Math.min(180,window.innerHeight/4))}));
 const panel=useRef<HTMLDivElement>(null);
 const drag=useRef<{x:number;y:number;left:number;top:number}|null>(null);
 const constrain=(x:number,y:number)=>({x:Math.max(4,Math.min(x,window.innerWidth-(panel.current?.offsetWidth??430)-4)),y:Math.max(4,Math.min(y,window.innerHeight-(panel.current?.offsetHeight??150)-4))});
 useEffect(()=>{const key=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose();};const resized=()=>setPosition(p=>constrain(p.x,p.y));window.addEventListener('keydown',key);window.addEventListener('resize',resized);return()=>{window.removeEventListener('keydown',key);window.removeEventListener('resize',resized);};},[onClose]);
 const start=(event:ReactPointerEvent<HTMLDivElement>)=>{if(event.button!==0)return;drag.current={x:event.clientX,y:event.clientY,left:position.x,top:position.y};event.currentTarget.setPointerCapture(event.pointerId);event.preventDefault();};
 return createPortal(<div ref={panel} role="dialog" aria-label="Confirmación · ventana flotante" className="ds-floating-dialog" style={{left:position.x,top:position.y}}><ComponentPreview src="/habbo-2008/components/holo-dialogs.html?floating=1" title="Confirmación flotante" onRequestClose={onClose}/><div className="ds-dialog-drag" role="button" tabIndex={0} aria-label="Mover ventana desde la cabecera" onPointerDown={start} onPointerMove={event=>{if(drag.current)setPosition(constrain(drag.current.left+event.clientX-drag.current.x,drag.current.top+event.clientY-drag.current.y));}} onPointerUp={()=>{drag.current=null;}} onLostPointerCapture={()=>{drag.current=null;}} onKeyDown={event=>{const offset=event.shiftKey?30:10;const moves:Record<string,[number,number]>={ArrowLeft:[-offset,0],ArrowRight:[offset,0],ArrowUp:[0,-offset],ArrowDown:[0,offset]};if(moves[event.key]){event.preventDefault();const [x,y]=moves[event.key];setPosition(p=>constrain(p.x+x,p.y+y));}}}/></div>,document.body);
}
