import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Button', component: Button, tags: ['autodocs'], args: {children:'Guardar',icon:'save'}, } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Green:Story={args:{variant:'green'}};
export const Red:Story={args:{variant:'red',icon:'cancel'}};
export const Dark:Story={args:{variant:'dark',icon:'edit'}};
export const Disabled:Story={args:{disabled:true}};
export const Loading:Story={args:{loading:true}};
export const FullWidth:Story={args:{fullWidth:true}};
export const Icons:Story={render:()=> <div style={{display:'flex',flexWrap:'wrap',gap:10}}>{(['edit','save','cancel','search','message','coins','newTopic'] as const).map(icon=><Button key={icon} icon={icon}>{icon}</Button>)}</div>};
