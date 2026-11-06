import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RoomsCard } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = { title: '2008/RoomsCard', component: RoomsCard, tags: ['autodocs'], args: {recommended:[{id:'room1',name:'jocks room',description:'Come and chill',owner:'richchris17',occupancy:2},{id:'room2',name:'Rare and norm shop',owner:'RetroHabbo',occupancy:5}],topRated:[{id:'top',name:'Top room',owner:'Habbo'}],moreHref:'#rooms'}, } satisfies Meta<typeof RoomsCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {render: function Example(args){const [room,setRoom]=useState('');return <><div style={{width:450,maxWidth:'100%'}}><RoomsCard {...args} onEnter={item=>setRoom(item.name)}/></div><p role='status'>{room&&'Entrar a: '+room}</p></>;}};
export const Empty:Story={args:{recommended:[],topRated:[]}};
