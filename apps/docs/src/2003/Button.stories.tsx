import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/Button', component: Button, tags: ['autodocs'], args: {children:'Submit'}, } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled:Story={args:{disabled:true}};
