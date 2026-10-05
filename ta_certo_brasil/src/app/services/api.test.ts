import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  analyzePost,
  analyzeScrapy,
  type InstagramPostResponse,
} from './api';

const scrapyRequest = { url: 'https://instagram.com/p/example' };
const scrapyResponse = {
  imageUrl: '/images/post.jpg',
  extractedText: 'Texto extraído',
  caption: 'Legenda do post',
  shortcode: 'example',
};
const postResponse: InstagramPostResponse = {
  ...scrapyResponse,
};
const analysisResponse = {
  verdict: 'real' as const,
  responseText: 'A análise indica informações verdadeiras.',
};

const requests = [
  {
    name: 'analyzeScrapy',
    path: '/scrapy',
    body: scrapyRequest,
    run: () => analyzeScrapy(scrapyRequest),
  },
  {
    name: 'analyzePost',
    path: '/modelo',
    body: postResponse,
    run: () => analyzePost(postResponse),
  },
];

describe('API services', () => {
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('manda o request de scraping e retorna o post extraido', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(scrapyResponse), { status: 200 })
    );

    await expect(analyzeScrapy(scrapyRequest)).resolves.toEqual(scrapyResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/api/scrapy',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scrapyRequest),
      }
    );
  });

  it('manda o request de analise e retorna o veredito', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(analysisResponse), { status: 200 })
    );

    await expect(analyzePost(postResponse)).resolves.toEqual(analysisResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/api/modelo',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postResponse),
      }
    );
  });

  it.each(requests)(
    '$name traduz HTTP 422 na mensagem de link invalido',
    async ({ run }) => {
      fetchMock.mockResolvedValue(new Response(null, { status: 422 }));

      await expect(run()).rejects.toThrow(
        'Link inválido. Apenas links de posts do feed (contendo /p/) são aceitos.'
      );
    }
  );

  it.each(requests)(
    '$name traduz outros status HTTP nao-sucesso',
    async ({ run }) => {
      fetchMock.mockResolvedValue(new Response(null, { status: 503 }));

      await expect(run()).rejects.toThrow('Erro do servidor: 503');
    }
  );

  it.each(requests)(
    '$name traduz falhas na conexao do fetch',
    async ({ run }) => {
      fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

      await expect(run()).rejects.toThrow(
        'Erro de conexão. Verifique se o servidor está rodando.'
      );
    }
  );

  it.each(requests)(
    '$name preserva outros erros de request',
    async ({ run }) => {
      const error = new Error('Unexpected failure');
      fetchMock.mockRejectedValue(error);

      await expect(run()).rejects.toBe(error);
    }
  );
});
