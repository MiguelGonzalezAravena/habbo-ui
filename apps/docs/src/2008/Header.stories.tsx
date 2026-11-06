import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header, Field, Button, Checkbox } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Header', component: Header, tags: ['autodocs'], args: {items:[{id:'register',label:'Register now!',href:'#register',register:true},{id:'community',label:'Community',href:'#community'},{id:'games',label:'Games',href:'#games'},{id:'coins',label:'Coins',href:'#coins'}],activeId:'community',onlineCount:8588,enterHref:'#hotel',subItems:[{id:'community',label:'Community',href:'#community'},{id:'staff',label:'Staff Picks',href:'#staff'},{id:'events',label:'Events',href:'#events'}],activeSubId:'community'}, } satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithLogin:Story={args:{login:<form onSubmit={e=>e.preventDefault()} style={{display:'grid',gap:5,width:240}}><Field label='Username' autoComplete='username'/><Field label='Password' type='password' autoComplete='current-password'/><Checkbox label='Remember me'/><Button type='submit'>Log in</Button></form>}};
