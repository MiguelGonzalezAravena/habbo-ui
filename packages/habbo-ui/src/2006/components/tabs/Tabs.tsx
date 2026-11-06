import { useId, useRef, useState, type ReactNode } from 'react';
import styles from './Tabs.module.css';
export interface TabItem { id: string; label: string; content: ReactNode; }
export interface TabsProps { items: TabItem[]; defaultValue?: string; label?: string; }
export function Tabs({ items, defaultValue, label = 'Pestañas' }: TabsProps) {
  const [selected, setSelected] = useState(defaultValue ?? items[0]?.id);
  const prefix = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const active = items.some(item => item.id === selected) ? selected : items[0]?.id;
  return <div className={styles.tabs}><div role="tablist" aria-label={label} className={styles.list}>{items.map((item, index) => <button key={item.id} ref={el => { buttons.current[index] = el; }} type="button" role="tab" id={`${prefix}-tab-${item.id}`} aria-controls={`${prefix}-panel-${item.id}`} aria-selected={active === item.id} tabIndex={active === item.id ? 0 : -1} className={styles.tab} onClick={() => setSelected(item.id)} onKeyDown={event => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (event.key === 'ArrowLeft') next = (index + items.length - 1) % items.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else return;
    event.preventDefault(); setSelected(items[next].id); buttons.current[next]?.focus();
  }}>{item.label}</button>)}</div>{items.map(item => <div key={item.id} role="tabpanel" tabIndex={0} id={`${prefix}-panel-${item.id}`} aria-labelledby={`${prefix}-tab-${item.id}`} hidden={active !== item.id} className={styles.content}>{item.content}</div>)}</div>;
}
