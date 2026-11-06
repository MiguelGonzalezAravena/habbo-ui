import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/Navigation', component: Navigation, tags: ['autodocs'], args: {activeId:'home',items:[{id:'home',label:'Home Page',href:'#home',graphic:'homepage'},{id:'help',label:'Help & Safety',href:'#help',graphic:'help'},{id:'credits',label:'Habbo Purse',href:'#credits',graphic:'credits'},{id:'community',label:'Community',href:'#community',graphic:'community'},{id:'shop',label:'Shopping',href:'#shop',graphic:'shop'}]}, } satisfies Meta<typeof Navigation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

