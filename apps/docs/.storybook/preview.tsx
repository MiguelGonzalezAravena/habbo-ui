import React from 'react';
import '@mgadev/habbo-ui/2006/styles.css';
import type { Preview } from '@storybook/react';
const preview: Preview = {
 parameters: { layout:'padded', backgrounds: { default: 'catalog', values: [{ name:'catalog',value:'#e4e4dc' }, {name:'white',value:'#fff'}] }, options:{storySort:{order:['2003','2006','2008']}} },
 decorators: [(Story,context) => <div data-habbo-year={context.title.split('/')[0]} style={{padding:12,fontFamily:'Verdana, Arial, sans-serif',minWidth:0}}><Story /></div>],
};
export default preview;
