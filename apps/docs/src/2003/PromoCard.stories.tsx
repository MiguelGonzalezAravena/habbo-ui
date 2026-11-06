import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PromoCard } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/PromoCard', component: PromoCard, tags: ['autodocs'], args: {children:<p>Find out more in this week’s Hotel Happenings… <a href='#news'>October 8th, 2003</a></p>,illustration:true}, } satisfies Meta<typeof PromoCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const FunkyFriday:Story={args:{variant:'friday',illustration:false,children:<p>Win all you need for your Habbo-ween room! <a href='#friday'>Click here…</a></p>}};
