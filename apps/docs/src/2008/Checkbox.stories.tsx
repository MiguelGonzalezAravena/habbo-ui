import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Checkbox', component: Checkbox, tags: ['autodocs'], args: {label:'Recordarme'}, } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked:Story={args:{defaultChecked:true}};
export const Disabled:Story={args:{disabled:true}};
