import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/Logo', component: Logo, tags: ['autodocs'], } satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

