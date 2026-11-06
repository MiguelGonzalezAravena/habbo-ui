import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HelpPanel } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/HelpPanel', component: HelpPanel, tags: ['autodocs'], args: {children:<><p>If you haven’t been to Habbo Hotel before why not <a href='#tour'>go on a hotel tour?</a></p><p>You’ll need Shockwave to check in to the hotel.</p></>}, } satisfies Meta<typeof HelpPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

