import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PostPreviewPanel from './PostPreviewPanel';

describe('PostPreviewPanel', () => {
  const defaultProps = {
    urlInput: '',
    onUrlChange: vi.fn(),
    onSubmit: vi.fn(),
  };

  it('deve renderizar conteudo de placeholder quando nenhum post tiver sido analisado', () => {
    render(<PostPreviewPanel {...defaultProps} />);

    expect(screen.getByText('Post analisado')).toBeInTheDocument();
    expect(screen.getByLabelText('Imagem do post')).toHaveTextContent(
      'Cole o link de um post abaixo para ver a imagem aqui.'
    );
    expect(
      screen.getByLabelText('Texto obtido da imagem do post')
    ).toHaveTextContent('O texto extraído da imagem aparece aqui depois da análise.');
    expect(screen.getByLabelText('Caption do post')).toHaveTextContent(
      'A legenda do post aparece aqui depois da análise.'
    );
  });

  it('deve renderizar a imagem do post analisado, o texto extraido e a legenda', () => {
    render(
      <PostPreviewPanel
        {...defaultProps}
        imageUrl="https://example.com/post.jpg"
        extractedText="Texto extraído"
        caption="Legenda do post"
      />
    );

    expect(screen.getByRole('img', { name: 'Imagem do post' })).toHaveAttribute(
      'src',
      'https://example.com/post.jpg'
    );
    expect(
      screen.getByLabelText('Texto obtido da imagem do post')
    ).toHaveTextContent('Texto extraído');
    expect(screen.getByLabelText('Caption do post')).toHaveTextContent(
      'Legenda do post'
    );
  });

  it('deve reportar alteracoes na URL e enviar o post', () => {
    const onUrlChange = vi.fn();
    const onSubmit = vi.fn();
    render(
      <PostPreviewPanel
        {...defaultProps}
        onUrlChange={onUrlChange}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'url do post instagram' }), {
      target: { value: 'https://instagram.com/p/example' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(onUrlChange).toHaveBeenCalledWith('https://instagram.com/p/example');
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('deve desativar o envio e mostrar um rotulo de carregamento enquanto analisa', () => {
    render(<PostPreviewPanel {...defaultProps} isLoading />);

    const submitButton = screen.getByRole('button', { name: 'Analisando...' });
    expect(submitButton).toBeDisabled();

    fireEvent.click(submitButton);

    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });
});
