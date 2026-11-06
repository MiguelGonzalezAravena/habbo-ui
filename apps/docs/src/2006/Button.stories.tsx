import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mgadev/habbo-ui/2006';
const meta = { title: '2006/Button', component: Button, tags: ['autodocs'], args: { children: 'Continuar' } } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Volver' } };
export const Disabled: Story = { args: { disabled: true, children: 'No disponible' } };
