import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('deve exibir o texto correto e chamar a funcao onClick quando clicado', () => {
    const onClick = vi.fn();

    render(
      <Button
        text="Analyze"
        className="primary"
        onClick={onClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Analyze' });
    expect(button).toHaveClass('primary');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });
});
