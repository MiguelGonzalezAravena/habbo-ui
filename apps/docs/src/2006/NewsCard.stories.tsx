import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NewsCard } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/NewsCard', component: NewsCard, tags: ['autodocs'], args: {rssHref:'#rss',moreHref:'#news',items:[{id:'1',date:'11/27/06',title:'Space Exploration Complete',href:'#space',summary:'What a long, strange trip it’s been…'},{id:'2',date:'11/20/06',title:'Warm Thoughts for Thanksgiving',href:'#thanksgiving',summary:'Feeling thankful? Tell us about it…'},{id:'3',date:'11/14/06',title:'Do you have the best Skatepark in Habbo?',href:'#skate',summary:'Enter the competition and find out'}]}, } satisfies Meta<typeof NewsCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty:Story={args:{items:[]}};
