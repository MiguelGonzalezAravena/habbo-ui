import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HappeningsCard } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/HappeningsCard', component: HappeningsCard, tags: ['autodocs'], args: {children:<><p><a href='#staff'>Staff Pick of the Week</a><br/>Pick YOUR tree in the winning room…</p><p><a href='#story'>Never Ending Story</a><br/>A new story begins.</p></>}, } satisfies Meta<typeof HappeningsCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

