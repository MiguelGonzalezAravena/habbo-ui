import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/Hero', component: Hero, tags: ['autodocs'], args: {href:'#hotel'}, } satisfies Meta<typeof Hero>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

