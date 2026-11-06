import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Field } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Field', component: Field, tags: ['autodocs'], args: {label:'Nombre del Habbo',placeholder:'RetroHabbo',hint:'El nombre que ven tus amigos.'}, } satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error:Story={args:{error:'Nombre requerido'}};
export const Disabled:Story={args:{disabled:true}};
export const Password:Story={args:{label:'Password',type:'password'}};
