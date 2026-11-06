import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/Tabs', component: Tabs, tags: ['autodocs'], args: {items:[{id:'rooms',label:'Rooms',content:'Salas del hotel'},{id:'games',label:'Games',content:'Juegos'}]}, } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

