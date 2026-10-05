import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import RootLayout, { metadata } from './layout';

describe('RootLayout', () => {
  it('renderiza children em um documento HTML em portugues do Brasil', () => {
    const markup = renderToStaticMarkup(
      <RootLayout params={new Promise(() => {})}>
        <main>Conteúdo da página</main>
      </RootLayout>
    );

    expect(markup).toContain('<html lang="pt-BR">');
    expect(markup).toContain('<body class="flex flex-col flex-auto h-screen p-2">');
    expect(markup).toContain('<main>Conteúdo da página</main>');
  });

  it('exporta o titulo e a descricao do site', () => {
    expect(metadata).toMatchObject({
      title: 'Tá Certo, Brasil?',
      description: 'Site para checar fake news',
    });
  });
});
