import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NewsCard } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/NewsCard', component: NewsCard, tags: ['autodocs'], args: {items:[{id:'1',date:'October 8th, 2003',content:'Nifty New Newsie Goes Live!'},{id:'2',date:'October 6, 2003',content:'SMS for Credits with Virgin Mobile!'}]}, } satisfies Meta<typeof NewsCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

