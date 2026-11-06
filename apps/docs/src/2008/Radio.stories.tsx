import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Radio', component: Radio, tags: ['autodocs'], args: {label:'Pública',name:'visibility'}, } satisfies Meta<typeof Radio>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Group:Story={render:()=> <fieldset><legend>Visibilidad</legend><Radio label='Pública' name='visibility' value='public' defaultChecked/><Radio label='Privada' name='visibility' value='private'/></fieldset>};
