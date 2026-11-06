import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Window, WindowHeader, WindowContent } from './Window';
describe('Window', () => {
  it('closes when close button is clicked', () => { render(<Window><WindowHeader title="Aviso" /><WindowContent>Hola</WindowContent></Window>); fireEvent.click(screen.getByRole('button', { name: 'Cerrar ventana' })); expect(screen.queryByText('Hola')).not.toBeInTheDocument(); });
});
