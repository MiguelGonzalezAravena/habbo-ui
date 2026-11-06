import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Pagination', component: Pagination, tags: ['autodocs'], args: {page:1,totalPages:12,onPageChange:()=>{}}, } satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {render: function Example(args){const [page,setPage]=useState(args.page);useEffect(()=>setPage(args.page),[args.page]);return <Pagination {...args} page={page} onPageChange={setPage}/>;}};
export const LastPage:Story={args:{page:12}};
export const Empty:Story={args:{totalPages:0}};
