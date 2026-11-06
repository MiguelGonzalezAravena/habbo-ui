import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Tabs', component: Tabs, tags: ['autodocs'], args: {items:[{id:'one',label:'Rooms',content:'Salas disponibles'},{id:'two',label:'Games',content:'Juegos del hotel'},{id:'three',label:'Disabled',content:'No disponible',disabled:true}]}, } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Controlled:Story={render:function Example(args){const [value,setValue]=useState('one');return <Tabs {...args} value={value} onValueChange={setValue}/>;}};
