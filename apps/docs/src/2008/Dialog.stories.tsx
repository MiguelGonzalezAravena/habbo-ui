import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, Button } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

function DialogExample(args: React.ComponentProps<typeof Dialog>) {
 const [open,setOpen]=useState(false);
 const change=(next:boolean)=>{setOpen(next);args.onOpenChange(next);};
 return <>
  <Button onClick={()=>change(true)}>Abrir diálogo</Button>
  <Dialog {...args} open={open} onOpenChange={change} footer={<>
   {args.footer}
   <Button onClick={()=>change(false)}>OK</Button>
   <Button onClick={()=>change(false)}>Cancel</Button>
  </>}/>
 </>;
}
const source=`import { useState } from 'react';
import { Button, Dialog } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir diálogo</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Confirmación"
        footer={<Button onClick={() => setOpen(false)}>OK</Button>}
      >
        Are you sure you want to leave this group?
      </Dialog>
    </>
  );
}`;
const meta={
 title:'2008/Dialog',component:Dialog,tags:['autodocs'],render:DialogExample,
 parameters:{docs:{description:{component:'El diálogo se abre al pulsar el botón. Se cierra con ×, OK, Cancel o Escape. Arrastra su título para moverlo.'},source:{code:source,language:'tsx'}}},
 argTypes:{open:{control:false,table:{disable:true}},onOpenChange:{control:false}},
 args:{open:false,title:'Confirmación',children:'Are you sure you want to leave this group?',onOpenChange:()=>{}},
} satisfies Meta<typeof Dialog>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Default:Story={};
export const WithFooter:Story={args:{footer:<span>Confirma la acción.</span>}};
export const NotDraggable:Story={args:{draggable:false}};
