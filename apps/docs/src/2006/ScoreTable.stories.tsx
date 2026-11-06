import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScoreTable } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/ScoreTable', component: ScoreTable, tags: ['autodocs'], args: {rows:[{id:'1',name:'B-extreme',score:6994},{id:'2',name:'scissors',score:6984},{id:'3',name:'love-102',score:6718}],caption:'Top 5 Battle Ballers'}, } satisfies Meta<typeof ScoreTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty:Story={args:{rows:[]}};
