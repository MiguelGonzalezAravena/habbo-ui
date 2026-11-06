import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TagCloud } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/TagCloud', component: TagCloud, tags: ['autodocs'], args: {tags:[{id:'animals',label:'animals',weight:20},{id:'habbo',label:'habbo',weight:20},{id:'cool',label:'cool',weight:18},{id:'music',label:'music',weight:14},{id:'guide',label:'guide',weight:12}]}, } satisfies Meta<typeof TagCloud>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {render: function Example(args){const [tag,setTag]=useState('');return <><TagCloud {...args} onTagClick={item=>setTag(item.label)}/><p role='status'>{tag}</p></>;}};

