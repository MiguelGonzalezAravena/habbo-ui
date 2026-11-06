import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WinterCard } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/WinterCard', component: WinterCard, tags: ['autodocs'], args: {children:<p>Winter Holiday Furni is back! <a href='#winter'>Explore the catalog.</a></p>}, } satisfies Meta<typeof WinterCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

