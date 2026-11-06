import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GoldCard } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/GoldCard', component: GoldCard, tags: ['autodocs'], args: {title:'Habbo Hotel',children:'Contenido configurable de la card dorada.'}, } satisfies Meta<typeof GoldCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

