import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TextInput from './TextInput';

describe('TextInput', () => {
  it('deve exibir o placeholder e a classe correta', () => {
    render(<TextInput placeholder="Instagram post URL" className="url-input" />);

    expect(screen.getByPlaceholderText('Instagram post URL')).toHaveClass(
      'url-input'
    );
  });
});
