import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm, type LoginValues } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/LoginForm', component: LoginForm, tags: ['autodocs'], args: {onSubmit:async(_values:LoginValues)=>{},registerLink:<a href='#register'>Register for free</a>}, } satisfies Meta<typeof LoginForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {render: function Example(args){const [status,setStatus]=useState('');return <><LoginForm {...args} onSubmit={async values=>{await args.onSubmit(values);setStatus('Acceso solicitado para '+values.username);}}/><p role='status'>{status}</p></>;}};
export const ContainerWidth:Story={args:{widthMode:'container'}};
export const Error:Story={args:{error:'Credenciales incorrectas'}};
export const Loading:Story={args:{loading:true}};
