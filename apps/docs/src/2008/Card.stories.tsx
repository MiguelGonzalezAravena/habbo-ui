import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Button } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/Card', component: Card, tags: ['autodocs'], args: {title:'Noticias del hotel',children:'Contenido configurable.',variant:'blue'}, } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Green:Story={args:{variant:'green'}};
export const Gray:Story={args:{variant:'gray'}};
export const Red:Story={args:{variant:'red'}};
export const WithFooter:Story={args:{footer:<a href='#more'>Read more</a>}};

export const HabboClub:Story={
 name:'Habbo Club · HC',
 args:{variant:'hc',title:'Habbo Club',children:<><p>Únete a Habbo Club y descubre sus ventajas.</p><p>Ropa exclusiva, regalos y más opciones para tu Habbo.</p></>,footer:<Button variant="green">Join Habbo Club</Button>},
 parameters:{docs:{description:{story:'Variante hcred del CSS HoloCMS: fondo #FFE8B7, patrón hc_pattern.gif y cabecera #d64242. El patrón original se incluye en el paquete.'}}},
};
