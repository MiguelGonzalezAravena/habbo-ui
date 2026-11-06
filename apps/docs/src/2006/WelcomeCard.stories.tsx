import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WelcomeCard } from '@mgadev/habbo-ui/2006';

const meta = { title: '2006/WelcomeCard', component: WelcomeCard, tags: ['autodocs'], args: {children:'Habbo Hotel is a virtual community where you can hang out with friends.',steps:[<a href='#shockwave'>Get Shockwave</a>,<a href='#hotel'>Enter Habbo Hotel</a>,'Create your Habbo and play!'],moreLink:<a href='#more'>Read more about Habbo Hotel</a>}, } satisfies Meta<typeof WelcomeCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

