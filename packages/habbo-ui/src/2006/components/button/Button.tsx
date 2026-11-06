import { forwardRef, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neutral' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'primary', size = 'md', loading = false, disabled, className = '', children, type = 'button', ...props }, ref) {
  return <button ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={[styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')} {...props}>{loading ? 'Cargando…' : children}</button>;
});
