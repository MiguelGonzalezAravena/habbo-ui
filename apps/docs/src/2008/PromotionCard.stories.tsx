import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PromotionCard } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/PromotionCard', component: PromotionCard, tags: ['autodocs'], args: {story:{id:'peace',title:'Habbo Global Peace Gathering 2008',href:'#peace',summary:'Get ready to create the world’s largest virtual peace protest!'}}, } satisfies Meta<typeof PromotionCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

