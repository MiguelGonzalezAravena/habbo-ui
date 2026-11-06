import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TagsCard } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/TagsCard', component: TagsCard, tags: ['autodocs'], args: {tags:[{id:'animals',label:'animals',weight:20},{id:'habbo',label:'habbo',weight:20},{id:'cool',label:'cool',weight:18},{id:'music',label:'music',weight:14},{id:'guide',label:'guide',weight:12}],onSearch:()=>{}}, } satisfies Meta<typeof TagsCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {render: function Example(args){const [query,setQuery]=useState('');return <><div style={{width:310,maxWidth:'100%'}}><TagsCard {...args} onSearch={setQuery} onTagClick={tag=>setQuery(tag.label)}/></div><p role='status'>{query}</p></>;}};

