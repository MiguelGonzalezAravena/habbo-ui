import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ECard } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/ECard', component: ECard, tags: ['autodocs'], args: {children:<>Tell all your friends how you feel about them.<br/><br/>Send a <a href='#ecard'>Habbo Body Language</a> e-card today!</>}, } satisfies Meta<typeof ECard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

