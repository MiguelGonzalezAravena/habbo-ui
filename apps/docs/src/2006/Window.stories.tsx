import React, {useState} from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Window, WindowHeader, WindowContent, WindowFooter, Button } from '@mgadev/habbo-ui/2006';
const meta={title:'2006/Window',component:Window,tags:['autodocs'],args:{children:null}} satisfies Meta<typeof Window>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Default:Story={render:function Example(){const [open,setOpen]=useState(true);return <div style={{maxWidth:380}}>{!open&&<Button onClick={()=>setOpen(true)}>Volver a abrir</Button>}<Window open={open} onOpenChange={setOpen}><WindowHeader title="Información"/><WindowContent>¡Bienvenido al hotel!</WindowContent><WindowFooter><Button onClick={()=>setOpen(false)}>Aceptar</Button></WindowFooter></Window></div>;}};
