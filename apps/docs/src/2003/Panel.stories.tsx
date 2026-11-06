import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/Panel', component: Panel, tags: ['autodocs'], args: {children:'Contenido del panel azul.',variant:'blue'}, } satisfies Meta<typeof Panel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Yellow:Story={args:{variant:'yellow'}};
