import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckInButton } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/CheckInButton', component: CheckInButton, tags: ['autodocs'], } satisfies Meta<typeof CheckInButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled:Story={args:{disabled:true}};
