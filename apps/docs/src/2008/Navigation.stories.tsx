import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Navigation', component: Navigation, tags: ['autodocs'], args: {items:[{id:'register',label:'Register now!',href:'#register',register:true},{id:'community',label:'Community',href:'#community'},{id:'games',label:'Games',href:'#games'},{id:'coins',label:'Coins',href:'#coins'}],activeId:'community'}, } satisfies Meta<typeof Navigation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

