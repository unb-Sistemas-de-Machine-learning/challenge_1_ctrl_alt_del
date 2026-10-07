import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header';

vi.mock('next/font/google', () => ({
  Source_Serif_4: () => ({ className: 'source-serif-test' }),
}));

describe('Header', () => {
  it('deve exibir o titulo do site dentro de um cabecalho', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Tá Certo, Brasil?' })
    ).toBeInTheDocument();
  });
});
