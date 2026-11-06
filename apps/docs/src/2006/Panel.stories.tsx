import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Panel, PanelHeader, PanelBody, PanelFooter } from '@mgadev/habbo-ui/2006';
const meta = { title: '2006/Panel', component: Panel, tags: ['autodocs'] } satisfies Meta<typeof Panel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Blue: Story = { render: () => <div style={{ maxWidth: 340 }}><Panel><PanelHeader>Últimas noticias</PanelHeader><PanelBody>¡Bienvenido al hotel!</PanelBody><PanelFooter>Publicado hoy</PanelFooter></Panel></div> };
export const Orange: Story = { render: () => <div style={{ maxWidth: 340 }}><Panel variant="orange"><PanelHeader>Información</PanelHeader><PanelBody>Un panel clásico.</PanelBody></Panel></div> };
