import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SnowCard } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/SnowCard', component: SnowCard, tags: ['autodocs'], args: {title:'Winter holidays',children:'Contenido de invierno.',tone:'darker'}, } satisfies Meta<typeof SnowCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Light:Story={args:{tone:'light'}};
export const Darkest:Story={args:{tone:'darkest'}};
