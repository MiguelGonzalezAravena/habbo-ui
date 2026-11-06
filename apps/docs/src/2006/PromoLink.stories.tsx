import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PromoLink } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/PromoLink', component: PromoLink, tags: ['autodocs'], args: {href:'#more',children:'Read more'}, } satisfies Meta<typeof PromoLink>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

