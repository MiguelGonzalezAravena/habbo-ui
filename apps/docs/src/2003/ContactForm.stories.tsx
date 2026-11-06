import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm, type ContactValues } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/ContactForm', component: ContactForm, tags: ['autodocs'], parameters: { docs: { description: { component: 'Ancho fijo por defecto. Los campos de créditos aparecen según el tema y el método de pago. onSubmit recibe los datos; no se conecta a un backend.' } } }, args: {onSubmit:async(_values:ContactValues)=>{}}, } satisfies Meta<typeof ContactForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {render: function Example(args){const [status,setStatus]=useState('');return <><ContactForm {...args} onSubmit={async values=>{await args.onSubmit?.(values);setStatus('Mensaje recibido localmente: '+values.topic);}}/><p role='status'>{status}</p></>;}};

