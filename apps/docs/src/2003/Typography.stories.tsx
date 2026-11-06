import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/Typography', component: Typography, tags: ['autodocs'], args: {children:<><h2>Welcome to Habbo Hotel!</h2><h3>Subheading · 11 px</h3><p>Verdana · 10 px · <a href='#read'>Read more</a></p></>}, } satisfies Meta<typeof Typography>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

