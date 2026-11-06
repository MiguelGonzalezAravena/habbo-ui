import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Navigation, NewsCard, ScoreTable } from './index';
describe('2006 compositions',()=>{
 it('renders multiple news cards without duplicate legacy IDs',()=>{const props={items:[{id:'1',date:'11/27/06',title:'News',href:'#news'}]};const {container}=render(<><NewsCard {...props}/><NewsCard {...props}/></>);expect(container.querySelectorAll('[id]').length).toBe(0);expect(screen.getAllByRole('link',{name:'News'})).toHaveLength(2);});
 it('retains score ranking, formatted totals and table headings',()=>{render(<ScoreTable caption="Battle Ball" rows={[{id:'first',name:'Retro',score:6994}]}/>);expect(screen.getByRole('table',{name:'Battle Ball'})).toBeInTheDocument();expect(screen.getByText('1.')).toBeVisible();expect(screen.getByText('6,994')).toBeVisible();});
 it('marks only the active navigation item and includes a bundled icon',()=>{render(<Navigation activeId="home" items={[{id:'home',label:'Home',href:'#home',icon:'home'},{id:'hotel',label:'Hotel',href:'#hotel',icon:'hotel'}]}/>);expect(screen.getByRole('link',{name:'Home'})).toHaveAttribute('aria-current','page');expect(screen.getByRole('link',{name:'Hotel'})).not.toHaveAttribute('aria-current');expect(screen.getByRole('link',{name:'Home'}).querySelector('img')).toHaveAttribute('src');});
});
