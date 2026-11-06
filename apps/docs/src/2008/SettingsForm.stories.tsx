import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SettingsForm, type SettingsFormValues } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/SettingsForm', component: SettingsForm, tags: ['autodocs'], args: {onSubmit:async(_values:SettingsFormValues)=>{}}, } satisfies Meta<typeof SettingsForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {render: function Example(args){const [message,setMessage]=useState('');return <><SettingsForm {...args} onSubmit={async values=>{await args.onSubmit(values);setMessage('Guardado: '+values.name);}}/><p role='status'>{message}</p></>;}};
export const ContainerWidth:Story={args:{width:'100%'}};
