import type { Meta, StoryObj } from '@storybook/react';
import { AvatarEditor } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/AvatarEditor', component: AvatarEditor } satisfies Meta<typeof AvatarEditor>;
export default meta;

export const Vestidor: StoryObj<typeof meta> = {};
