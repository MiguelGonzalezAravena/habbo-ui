import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Page, Logo, OnlinePanel } from '@mgadev/habbo-ui/2003';
import '@mgadev/habbo-ui/2003/styles.css';

const meta = { title: '2003/Page', component: Page, tags: ['autodocs'], args: {children:<><Logo/><OnlinePanel count={2275} action={<a href='#hotel'>Check in!</a>}/></>}, } satisfies Meta<typeof Page>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

