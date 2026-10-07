import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TermsCard from './TermsCard';

const { push } = vi.hoisted(() => ({
  push: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('TermsCard', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('nao deve renderizar quando estiver fechado', () => {
    render(<TermsCard isOpen={false} onClose={onClose} />);

    expect(screen.queryByRole('heading', { name: 'Termos de Uso' })).toBeNull();
  });

  it('deve renderizar os termos e a caixa de seleçao de aceitaçao quando estiver aberto', () => {
    render(<TermsCard isOpen onClose={onClose} />);

    expect(
      screen.getByRole('heading', { name: 'Termos de Uso' })
    ).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(
      screen.getByRole('button', { name: 'Aceitar e começar' })
    ).toBeInTheDocument();
  });

  it('deve chamar onClose quando o botao de fechar for clicado', () => {
    render(<TermsCard isOpen onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Fechar termos' }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('deve exigir aceitacao antes de navegar para o input', () => {
    render(<TermsCard isOpen onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Aceitar e começar' }));
    expect(push).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();

    fireEvent.click(screen.getByRole('button', { name: 'Aceitar e começar' }));
    expect(push).toHaveBeenCalledWith('/input');
  });
});
