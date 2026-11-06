import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HelpBubble } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/HelpBubble', component: HelpBubble, tags: ['autodocs'], args: {children:'By selecting remember me you will stay signed in on this computer until you click Sign Out.'}, } satisfies Meta<typeof HelpBubble>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

