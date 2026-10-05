import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from './page';

const { push } = vi.hoisted(() => ({
  push: vi.fn(),
}));

vi.mock('next/font/google', () => ({
  Source_Serif_4: () => ({ className: 'source-serif-test' }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('Home page', () => {
  it('renderiza a introducao e os topicos que o projeto verifica', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Tá certo, Brasil?' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Verificação de notícias eleitorais do Instagram, feita para quem vai votar pela primeira vez.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'O que verificamos' })
    ).toBeInTheDocument();
    expect(screen.getByText('Posts do Instagram')).toBeInTheDocument();
    expect(screen.getByText('Newsletters de tecnologia')).toBeInTheDocument();
    expect(screen.getByText('Texto limpo')).toBeInTheDocument();
    expect(screen.getByText('Relatório interpretável')).toBeInTheDocument();
  });

  it('abre os termos quando o usuario escolhe começar', () => {
    render(<Home />);

    expect(
      screen.queryByRole('heading', { name: 'Termos de Uso' })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Começar' }));

    expect(
      screen.getByRole('heading', { name: 'Termos de Uso' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', {
        name: /Li e concordo com os Termos de Uso/,
      })
    ).toBeInTheDocument();
  });

  it('fecha os termos quando o usuario os dispensa', () => {
    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: 'Começar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Fechar termos' }));

    expect(
      screen.queryByRole('heading', { name: 'Termos de Uso' })
    ).not.toBeInTheDocument();
  });
});
