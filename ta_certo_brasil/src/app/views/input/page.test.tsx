import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Input from './page';
import { analyzePost, analyzeScrapy, blueskypost } from '@/app/services/api';

vi.mock('@/app/services/api', () => ({
  analyzePost: vi.fn(),
  analyzeScrapy: vi.fn(),
  blueskypost: vi.fn()
}));

vi.mock('next/font/google', () => ({
  Source_Serif_4: () => ({ className: 'source-serif-test' }),
}));

describe('Input page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza o header, o input do post e o resultado da analise vazio', () => {
    render(<Input />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Tá Certo, Brasil?' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'url do post instagram' })
    ).toBeInTheDocument();
    expect(screen.getByText('Real ou fake')).toBeInTheDocument();
  });

  it('mostra uma mensagem de validacao ao enviar um URL vazio', () => {
    render(<Input />);

    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(
      screen.getByText('Por favor, insira um URL válido.')
    ).toBeInTheDocument();
    expect(analyzeScrapy).not.toHaveBeenCalled();
    expect(analyzePost).not.toHaveBeenCalled();
  });

  it('extrai e analisa informacoes de um post do Instagram enviado', async () => {
    vi.mocked(analyzeScrapy).mockResolvedValue({
      imageUrl: '/images/post.jpg',
      extractedText: 'Texto extraído',
      caption: 'Legenda do post',
      shortcode: 'post123',
    });
    vi.mocked(analyzePost).mockResolvedValue({
      verdict: 'fake',
      responseText: 'A análise indica informações falsas.',
    });
    render(<Input />);

    fireEvent.change(
      screen.getByRole('textbox', { name: 'url do post instagram' }),
      { target: { value: 'https://instagram.com/p/post123' } }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    await waitFor(() => {
      expect(analyzeScrapy).toHaveBeenCalledWith({
        url: 'https://instagram.com/p/post123',
      });
      expect(analyzePost).toHaveBeenCalledWith({
        imageUrl: '/images/post.jpg',
        extractedText: 'Texto extraído',
        caption: 'Legenda do post',
        shortcode: 'post123',
      });
      expect(blueskypost).toHaveBeenCalledWith({
        verdict: 'fake',
        responseText: 'A análise indica informações falsas.',
        url: 'https://instagram.com/p/post123',
      });
    });

    expect(await screen.findByText('Fake')).toBeInTheDocument();
    expect(
      screen.getByText('A análise indica informações falsas.')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Texto obtido da imagem do post')).toHaveTextContent(
      'Texto extraído'
    );
    expect(screen.getByLabelText('Caption do post')).toHaveTextContent(
      'Legenda do post'
    );
    expect(
      screen.getByRole('textbox', { name: 'url do post instagram' })
    ).toHaveValue('');
  });

  it('mostra mensagens de erro do scraping e reativa o envio', async () => {
    const error = new Error('Link inválido.');
    vi.mocked(analyzeScrapy).mockRejectedValue(error);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Input />);

    fireEvent.change(
      screen.getByRole('textbox', { name: 'url do post instagram' }),
      { target: { value: 'https://instagram.com/p/invalid' } }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(await screen.findByText('Link inválido.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeEnabled();
    consoleError.mockRestore();
  });

  it('mostra mensagen de erro default se erro vier vazio', async () => {
    const error = new Error();
    vi.mocked(analyzeScrapy).mockRejectedValue(error);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Input />);

    fireEvent.change(
      screen.getByRole('textbox', { name: 'url do post instagram' }),
      { target: { value: 'https://instagram.com/p/invalid' } }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(await screen.findByText('Ocorreu um erro desconhecido.')).toBeInTheDocument();
    consoleError.mockRestore();
  });
});
