import React, { useId, useState } from 'react';
import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, CSSProperties } from 'react';
import { assets } from './assets';
import s from './styles.module.css';
const cx = (...values: (string | undefined)[]) => values.filter(Boolean).join(' ');
function Graphic({name,alt='',...props}: {name:string;alt?:string} & Omit<React.ImgHTMLAttributes<HTMLImageElement>,'src'>) { return <img {...props} src={assets[name]} alt={alt}/>; }
export interface PanelProps extends HTMLAttributes<HTMLDivElement> { variant?: 'blue'|'yellow'; width?: number|string }
export function Panel({variant='blue',width=168,children,className,style,...props}:PanelProps) {
 const tile=(part:string)=><Graphic name={`common/${variant}_${part}.gif`}/>;
 return <div {...props} className={cx(s.base,s.panel,s[variant],className)} style={{width,...style}}><div className={s.edge}>{tile('ul')}{tile('u')}{tile('ur')}</div><div className={s.panelBody}>{children}</div><div className={s.edge}>{tile('dl')}{tile('d')}{tile('dr')}</div></div>;
}
export interface OnlinePanelProps extends Omit<PanelProps,'children'|'variant'> { count:number; label?:ReactNode; action?:ReactNode }
export function OnlinePanel({count,label='Habbos in the hotel:',action,...props}:OnlinePanelProps) {return <Panel {...props}><div className={s.online}><b>{label}<br/><span>{count.toLocaleString('en-US',{useGrouping:false})}</span></b><div className={s.checkLink}>{action}</div></div></Panel>;}
export interface HelpPanelProps extends Omit<PanelProps,'variant'> { title?:string }
export function HelpPanel({title='CHECK IN PROBLEMS?',children,...props}:HelpPanelProps) {return <Panel {...props} variant="yellow"><p className={s.white}><b>{title}</b></p>{children}</Panel>;}
export interface NavigationItem { id:string; label:string; href:string; graphic:'homepage'|'help'|'credits'|'community'|'shop' }
export interface NavigationProps extends HTMLAttributes<HTMLElement> {items:NavigationItem[]; activeId?:string}
export function Navigation({items,activeId,className,...props}:NavigationProps) {return <nav {...props} className={cx(s.base,s.navigation,className)} aria-label={props['aria-label']??'Main navigation'}>{items.map(item=><a key={item.id} href={item.href} aria-current={activeId===item.id?'page':undefined}><Graphic name={`navi/en/${item.graphic}${activeId===item.id?'_on':''}.gif`} alt={item.label}/></a>)}</nav>;}
export interface NewsItem { id:string; date:string; content:ReactNode }
export interface NewsCardProps extends HTMLAttributes<HTMLElement> {items:NewsItem[]; title?:string}
export function NewsCard({items,title='Habbo Today',className,...props}:NewsCardProps) {return <section {...props} className={cx(s.base,s.news,className)}><Graphic name="homepage/en/habbo_today.gif" alt={title}/><div className={s.newsBody}>{items.map(item=><p key={item.id}><b className={s.darkred}>{item.date}</b> {item.content}</p>)}</div><Graphic name="homepage/en/habbo_today_bottom.gif"/></section>;}
export interface PromoCardProps extends Omit<HTMLAttributes<HTMLElement>,'title'> {variant?:'happenings'|'friday'; title?:ReactNode; illustration?:boolean}
export function PromoCard({variant='happenings',title,children,illustration=false,className,...props}:PromoCardProps) {const n=variant==='happenings'?1:2;return <section {...props} className={cx(s.base,s.promo,s[variant],className)}><Graphic name={`homepage/promo${n}_u.gif`}/><div className={s.promoBody}>{title?<b>{title}</b>:variant==='friday'?<Graphic name="misc/funkyfriday.gif" alt="Funky Friday"/>:<b>Habbo Hotel Happenings</b>}{illustration&&<Graphic className={s.illustration} name="misc/typewriter.gif"/>}{children}</div><Graphic name={`homepage/promo${n}_d.gif`}/></section>;}
export function Button({className,type='button',...props}:ButtonHTMLAttributes<HTMLButtonElement>) {return <button {...props} type={type} className={cx(s.button,className)}/>;}
export function CheckInButton({className,children,...props}:ButtonHTMLAttributes<HTMLButtonElement>) {return <button {...props} type="button" className={cx(s.graphicButton,className)}><Graphic name="homepage/com/check_in_2.gif" alt={typeof children==='string'?children:'Check in!'}/></button>;}
export function Hero({href,alt='Welcome to Habbo Hotel',className,...props}:Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>,'children'> & {alt?:string}) {return <a {...props} href={href} className={cx(s.hero,className)}><Graphic name="homepage/com/promo1.gif" alt={alt}/><Graphic name="homepage/com/promo2.gif"/></a>;}
export function Logo(props:Omit<React.ImgHTMLAttributes<HTMLImageElement>,'src'>) {return <Graphic name="common/habbo_logo.gif" alt="Habbo Hotel" {...props}/>;}
export function Typography({children,className,...props}:HTMLAttributes<HTMLDivElement>) {return <div {...props} className={cx(s.base,s.typography,className)}>{children}</div>;}
export interface WeekSelectorProps { weeks:string[]; value?:string; defaultValue?:string; onValueChange?:(value:string)=>void; onView?:(value:string)=>void; label?:string }
export function WeekSelector({weeks,value,defaultValue='',onValueChange,onView,label='Select week:'}:WeekSelectorProps) {const [local,setLocal]=useState(defaultValue);const selected=value??local;const id=useId();return <form className={cx(s.base,s.form)} onSubmit={e=>{e.preventDefault();onView?.(selected);}}><label htmlFor={id}>{label} </label><select id={id} value={selected} onChange={e=>{setLocal(e.target.value);onValueChange?.(e.target.value);}}><option value="">This week</option>{weeks.map(week=><option key={week}>{week}</option>)}</select> <Button type="submit">View</Button></form>;}
export interface ContactValues {topic:string;email:string;habboName:string;message:string;method:string;network:string;phone:string}
export interface ContactFormProps {onSubmit?:(values:ContactValues)=>void|Promise<void>; width?:CSSProperties['width']; className?:string}
const topics=[['ban','Why am I banned?'],['credits','Habbo Credits'],['access','Having problems checking in'],['password','Forgotten my password'],['magazine','Article/poem for Habbo Hotel Happenings'],['dropper','Habbo Room Dropper request'],['safety','HabboHood Watch feedback'],['idea',"I've got an idea"],['parent',"I'm a parent"],['other','Something else']];
export function ContactForm({onSubmit,width=503,className}:ContactFormProps) {
 const id=useId();const [values,setValues]=useState<ContactValues>({topic:'',email:'',habboName:'',message:'',method:'',network:'',phone:''});const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 const update=(key:keyof ContactValues,value:string)=>setValues(old=>({...old,[key]:value,...(key==='topic'?{method:'',network:'',phone:''}:key==='method'?{network:'',phone:''}:{})}));
 const field=(key:keyof ContactValues,label:string,control:ReactNode)=><div className={s.field}><label htmlFor={`${id}-${key}`}>{label}</label>{control}</div>;
 return <form className={cx(s.base,s.form,className)} style={{width}} onSubmit={async e=>{e.preventDefault();if(busy)return;setBusy(true);setError('');try{await onSubmit?.(values);}catch{setError('Unable to send your message. Please try again.');}finally{setBusy(false);}}}>
 {field('topic','What are you writing to us about? *',<select id={`${id}-topic`} required value={values.topic} onChange={e=>update('topic',e.target.value)}><option value="">Click on the arrows to choose</option>{topics.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select>)}
 {values.topic==='credits'&&field('method','How did you buy your credits?',<select id={`${id}-method`} value={values.method} onChange={e=>update('method',e.target.value)}><option value="">Choose a payment method</option>{[['splash','Splash Plastic'],['smartcreds','Smartcreds'],['landline','Habbo Credits Line (landline)'],['sms','SMS (mobile phone)'],['credit','credit or debit card'],['cheque','cheque (check) or postal order']].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>)}
 {values.topic==='credits'&&values.method==='sms'&&field('network','Which mobile network are you on?',<select id={`${id}-network`} value={values.network} onChange={e=>update('network',e.target.value)}><option value="">Choose a network</option>{['Vodafone','O2','Orange','T-Mobile'].map(n=><option key={n}>{n}</option>)}</select>)}
 {values.topic==='credits'&&['sms','landline'].includes(values.method)&&field('phone',values.method==='sms'?'Mobile phone number:':'Home phone number:',<input id={`${id}-phone`} type="tel" value={values.phone} onChange={e=>update('phone',e.target.value)}/>)}
 {field('email',"What's your email address? *",<input id={`${id}-email`} type="email" required value={values.email} onChange={e=>update('email',e.target.value)}/>)}
 {field('habboName',"What's your Habbo called?",<input id={`${id}-habboName`} value={values.habboName} onChange={e=>update('habboName',e.target.value)}/>)}
 {field('message','Type your message here: *',<textarea id={`${id}-message`} rows={8} required value={values.message} onChange={e=>update('message',e.target.value)}/>)}
 {error&&<p role="alert">{error}</p>}<div className={s.submit}><Button type="submit" disabled={busy}>{busy?'Sending…':'Submit'}</Button></div></form>;
}

/** Page surface with the archived repeating background; does not style document.body. */
export function Page({children,className,style,...props}:HTMLAttributes<HTMLDivElement>) {return <div {...props} className={cx(s.base,s.page,className)} style={style}>{children}</div>;}
