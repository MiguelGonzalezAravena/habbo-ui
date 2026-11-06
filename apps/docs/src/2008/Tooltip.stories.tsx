import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';
const meta={
 title:'2008/Tooltip',component:Tooltip,tags:['autodocs'],
 decorators:[Story=><div style={{padding:'70px 12px'}}><Story/></div>],
 parameters:{docs:{description:{component:'Se muestra con hover o foco. placement permite elegir top o bottom; la punta siempre apunta al botón. Cambia de lado si falta espacio en la pantalla. Escape lo oculta.'}}},
 argTypes:{placement:{control:'inline-radio',options:['top','bottom']}},
 args:{content:'Texto de ayuda de ejemplo.',placement:'top',children:<Button>Información</Button>},
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Default:Story={};
export const Bottom:Story={args:{placement:'bottom'}};
export const Error:Story={args:{variant:'error',content:'Revisa el valor indicado.'}};
export const ErrorBottom:Story={args:{variant:'error',placement:'bottom',content:'Revisa el valor indicado.'}};
