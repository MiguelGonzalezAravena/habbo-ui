import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HabbosCard } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/HabbosCard', component: HabbosCard, tags: ['autodocs'], parameters: { docs: { description: { component: 'Recibe avatares mediante image. Si no se proporciona, usa el esqueleto preservado como fallback explícito.' } } }, args: {habbos:[{id:'one',name:'RetroHabbo',href:'#retro',motto:'Stay safe!',online:true},{id:'two',name:'PixelFan',href:'#pixel',online:false}]}, } satisfies Meta<typeof HabbosCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty:Story={args:{habbos:[]}};
