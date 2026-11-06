import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Button } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';
function DismissibleAlert(args:React.ComponentProps<typeof Alert>){const [open,setOpen]=useState(true);return open?<Alert {...args} onDismiss={()=>setOpen(false)}/>:<Button onClick={()=>setOpen(true)}>Volver a abrir</Button>;}
const meta = { title: '2008/Alert', component: Alert, tags: ['autodocs'], args: {children:'Aviso de ejemplo.',variant:'info'}, } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Success:Story={args:{variant:'success'}};
export const Warning:Story={args:{variant:'warning'}};
export const Error:Story={args:{variant:'error'}};
export const Dismissible:Story={
 render:args=> <DismissibleAlert {...args}/>,
 parameters:{docs:{source:{language:'tsx',code:`function Example() {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Alert variant="info" onDismiss={() => setVisible(false)}>
      Aviso de ejemplo.
    </Alert>
  ) : (
    <Button onClick={() => setVisible(true)}>Volver a abrir</Button>
  );
}`}}},
};
