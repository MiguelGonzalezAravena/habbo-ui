import type { HTMLAttributes, PropsWithChildren } from 'react';
export interface PanelProps extends HTMLAttributes<HTMLElement> { variant?: 'blue' | 'orange' | 'neutral'; }
const colors = { blue: 'blue', orange: 'red', neutral: 'green' };
/** Original v2box DOM: headline, h3, border, body and bottom sprite layers. */
export function Panel({ variant = 'blue', className = '', children, ...props }: PropsWithChildren<PanelProps>) { return <div className={`v2box ${colors[variant]} ${className}`} {...props}>{children}<div aria-hidden="true" className="bottom"><div/></div></div>; }
export function PanelHeader({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`headline ${className}`} {...props}><h3>{children}</h3><div aria-hidden="true" className="border"><div/></div></div>; }
export function PanelBody({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`body ${className}`} {...props}>{children}</div>; }
export function PanelFooter({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`body ${className}`} {...props}>{children}</div>; }
