import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/Navigation', component: Navigation, tags: ['autodocs'], args: {items:[{id:'home',label:'Home',href:'#home',icon:'home'},{id:'hotel',label:'Habbo Hotel',href:'#hotel',icon:'hotel'},{id:'coins',label:'Buy Coins',href:'#coins',icon:'coins'},{id:'community',label:'Community',href:'#community',icon:'community'},{id:'games',label:'Games',href:'#games',icon:'games'},{id:'winter',label:'Winter Holidays',href:'#winter',icon:'winter'},{id:'shop',label:'Shop',href:'#shop',icon:'shop'},{id:'help',label:'Help',href:'#help',icon:'help'}],activeId:'hotel'}, } satisfies Meta<typeof Navigation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

