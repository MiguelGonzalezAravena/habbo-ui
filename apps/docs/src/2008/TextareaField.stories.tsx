import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextareaField } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/TextareaField', component: TextareaField, tags: ['autodocs'], args: {label:'Descripción',placeholder:'Mi habitación favorita'}, } satisfies Meta<typeof TextareaField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error:Story={args:{error:'Descripción requerida'}};
