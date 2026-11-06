import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OnlinePanel } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/OnlinePanel', component: OnlinePanel, tags: ['autodocs'], args: {count:2275,action:<a href='#checkin'>Check in!</a>}, } satisfies Meta<typeof OnlinePanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

