import { describe, it, mock, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeScrapy, analyzePost, blueskypost } from '../../ta_certo_brasil/src/app/services/api.ts';

describe('Frontend API Service - analyzeScrapy', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('deve retornar os dados do post quando a resposta for bem-sucedida', async () => {
    const mockPostData = {
      imageUrl: '/instagram/post123.jpg',
      extractedText: 'Texto extraído do post',
      caption: 'Legenda do post',
      shortcode: 'post123',
    };

    globalThis.fetch = mock.fn(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => mockPostData,
      } as unknown as Response;
    });

    const result = await analyzeScrapy({ url: 'https://www.instagram.com/p/post123/' });
    assert.deepEqual(result, mockPostData);
  });

  it('deve lançar erro amigável quando a API retornar 422 (link inválido)', async () => {
    globalThis.fetch = mock.fn(async () => {
      return {
        ok: false,
        status: 422,
      } as unknown as Response;
    });

    await assert.rejects(
      async () => {
        await analyzeScrapy({ url: 'https://invalid-url.com' });
      },
      {
        message: 'Link inválido. Apenas links de posts do feed (contendo /p/) são aceitos.',
      }
    );
  });

  it('deve lançar erro com status do servidor para erros 500', async () => {
    globalThis.fetch = mock.fn(async () => {
      return {
        ok: false,
        status: 500,
      } as unknown as Response;
    });

    await assert.rejects(
      async () => {
        await analyzeScrapy({ url: 'https://www.instagram.com/p/post123/' });
      },
      {
        message: 'Erro do servidor: 500',
      }
    );
  });

  it('deve lançar erro amigável de conexão quando fetch falhar', async () => {
    globalThis.fetch = mock.fn(async () => {
      throw new Error('Failed to fetch');
    });

    await assert.rejects(
      async () => {
        await analyzeScrapy({ url: 'https://www.instagram.com/p/post123/' });
      },
      {
        message: 'Erro de conexão. Verifique se o servidor está rodando.',
      }
    );
  });
});

describe('Frontend API Service - analyzePost', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('deve retornar verdict e responseText quando o modelo responder com sucesso', async () => {
    const mockModelResponse = {
      verdict: 'real',
      responseText: 'Proposta verificada com sucesso.',
    };

    globalThis.fetch = mock.fn(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => mockModelResponse,
      } as unknown as Response;
    });

    const result = await analyzePost({
      imageUrl: '/instagram/post123.jpg',
      extractedText: 'Texto',
      caption: 'Legenda',
      shortcode: 'post123',
    });

    assert.deepEqual(result, mockModelResponse);
  });

  it('deve lançar erro apropriado quando o endpoint /modelo falhar com 422', async () => {
    globalThis.fetch = mock.fn(async () => {
      return {
        ok: false,
        status: 422,
      } as unknown as Response;
    });

    await assert.rejects(
      async () => {
        await analyzePost({
          imageUrl: '',
          extractedText: '',
          caption: '',
          shortcode: '',
        });
      },
      {
        message: 'O correu um erro ao analisar o post.',
      }
    );
  });

  it('deve tratar erro de conexão na chamada do modelo', async () => {
    globalThis.fetch = mock.fn(async () => {
      throw new Error('Failed to fetch');
    });

    await assert.rejects(
      async () => {
        await analyzePost({
          imageUrl: '',
          extractedText: '',
          caption: '',
          shortcode: '',
        });
      },
      {
        message: 'Erro de conexão. Verifique se o servidor está rodando.',
      }
    );
  });
});

describe('Frontend API Service - blueskypost', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('deve enviar requisição de postagem no Bluesky com sucesso', async () => {
    const mockSuccessResponse = { status: 'published' };

    globalThis.fetch = mock.fn(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => mockSuccessResponse,
      } as unknown as Response;
    });

    const result = await blueskypost({
      message: 'Análise de fato',
      verdict: 'real',
      url: 'https://instagram.com/p/test123',
    });

    assert.deepEqual(result, mockSuccessResponse);
  });

  it('deve capturar falha de rede e retornar mensagem amigável', async () => {
    globalThis.fetch = mock.fn(async () => {
      throw new Error('Failed to fetch');
    });

    await assert.rejects(
      async () => {
        await blueskypost({
          message: 'Análise',
          verdict: 'fake',
          url: 'https://instagram.com/p/test456',
        });
      },
      {
        message: 'Erro de conexão. Verifique se o servidor está rodando.',
      }
    );
  });
});

