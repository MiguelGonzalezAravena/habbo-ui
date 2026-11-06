import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NewsPromo } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/NewsPromo', component: NewsPromo, tags: ['autodocs'], args: {stories:[{id:'peace',title:'Habbo Global Peace Gathering 2008',href:'#peace',summary:'Get ready to create the world’s largest virtual peace protest!'},{id:'school',title:'Vote for a Habbo School',href:'#school',summary:'Cast your ballot for your favorite school.'}],items:[{id:'class',title:'Head of the Class II',href:'#class',date:'Sep 7, 2008'},{id:'room',title:'Room of the Week',href:'#room',date:'Sep 5, 2008'}],moreHref:'#news'}, } satisfies Meta<typeof NewsPromo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty:Story={args:{stories:[],items:[]}};
