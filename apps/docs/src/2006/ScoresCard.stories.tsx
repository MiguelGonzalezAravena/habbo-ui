import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScoresCard } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/ScoresCard', component: ScoresCard, tags: ['autodocs'], args: {games:[{id:'battle',title:'Battle Ball',rows:[{id:'1',name:'B-extreme',score:6994},{id:'2',name:'scissors',score:6984},{id:'3',name:'love-102',score:6718}],moreHref:'#scores',aboutHref:'#game'},{id:'wobble',title:'Wobble Squabble',rows:[{id:'1',name:'ROXYGIRL!@',score:204},{id:'2',name:'suplilhomie',score:179}],moreHref:'#wobble'}]}, } satisfies Meta<typeof ScoresCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

