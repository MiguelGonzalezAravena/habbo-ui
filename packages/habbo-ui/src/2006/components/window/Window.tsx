import { createContext, useContext, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Window.module.css';
type WindowContextValue = { close: () => void; titleId: string };
const WindowContext = createContext<WindowContextValue | null>(null);
export interface WindowProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}
export function Window({ open, defaultOpen = true, onOpenChange, children, className = '', ...props }: WindowProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const titleId = useId();
  const visible = open ?? internalOpen;
  const close = () => { if (open === undefined) setInternalOpen(false); onOpenChange?.(false); };
  if (!visible) return null;
  return <WindowContext.Provider value={{ close, titleId }}><section role="region" aria-labelledby={titleId} className={[styles.window, className].join(' ')} {...props}>{children}</section></WindowContext.Provider>;
}
export function WindowHeader({ title, closable = true }: { title: string; closable?: boolean }) {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('WindowHeader must be inside Window');
  return <div className={styles.header}><strong id={ctx.titleId}>{title}</strong>{closable && <button className={styles.close} type="button" aria-label="Cerrar ventana" onClick={ctx.close}>×</button>}</div>;
}
export function WindowContent({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={[styles.content, className].join(' ')} {...props} />; }
export function WindowFooter({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={[styles.footer, className].join(' ')} {...props} />; }
