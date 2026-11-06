import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
describe('Button', () => {
  it('invokes click handler', () => { const onClick = vi.fn(); render(<Button onClick={onClick}>Aceptar</Button>); fireEvent.click(screen.getByRole('button', { name: 'Aceptar' })); expect(onClick).toHaveBeenCalledOnce(); });
  it('prevents clicks while loading', () => { const onClick = vi.fn(); render(<Button loading onClick={onClick}>Aceptar</Button>); fireEvent.click(screen.getByRole('button')); expect(onClick).not.toHaveBeenCalled(); });
});
