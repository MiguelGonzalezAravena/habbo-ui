import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GroupsCard } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/GroupsCard', component: GroupsCard, tags: ['autodocs'], args: {groups:[{id:'guides',name:'Habbo Guides',href:'#guides',members:120}],topics:[{id:'welcome',title:'Welcome to Habbo!',href:'#welcome',pages:[{page:1,href:'#p1'},{page:2,href:'#p2'}]},{id:'news',title:'Latest events',href:'#events'}],moreHref:'#groups'}, } satisfies Meta<typeof GroupsCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty:Story={args:{groups:[],topics:[]}};
