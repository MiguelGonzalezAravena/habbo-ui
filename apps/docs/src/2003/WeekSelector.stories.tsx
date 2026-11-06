import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WeekSelector } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/WeekSelector', component: WeekSelector, tags: ['autodocs'], args: {weeks:['40/2003','39/2003','38/2003']}, } satisfies Meta<typeof WeekSelector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {render: function Example(args){const [week,setWeek]=useState('');return <><WeekSelector {...args} onView={setWeek}/><p role='status'>Semana: {week||'actual'}</p></>;}};

