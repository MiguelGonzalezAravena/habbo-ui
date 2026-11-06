import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/SelectField', component: SelectField, tags: ['autodocs'], args: {label:'Idioma',children:<><option value='es'>Español</option><option value='en'>English</option></>}, } satisfies Meta<typeof SelectField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error:Story={args:{error:'Selecciona un idioma'}};
export const Disabled:Story={args:{disabled:true}};
