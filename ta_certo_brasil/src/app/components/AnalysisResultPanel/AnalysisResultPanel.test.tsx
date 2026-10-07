import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AnalysisResultPanel from './AnalysisResultPanel';

describe('AnalysisResultPanel', () => {
  it('deve renderizar placeholders quando nenhum resultado estiver disponivel', () => {
    render(<AnalysisResultPanel />);

    expect(screen.getByText('Real ou fake')).toBeInTheDocument();
    expect(
      screen.getByText('O texto de resposta da IA vai aparecer aqui.')
    ).toBeInTheDocument();
  });

  it.each([
    ['real', 'Real'],
    ['fake', 'Fake'],
    [
      'Não trata-se de uma proposta de governo',
      'Não trata-se de uma proposta de governo',
    ],
  ] as const)('deve renderizar o veredito %s como %s', (verdict, displayedVerdict) => {
    render(<AnalysisResultPanel verdict={verdict} />);

    expect(screen.getByText(displayedVerdict)).toBeInTheDocument();
  });

  it('deve renderizar o texto de resposta da analise', () => {
    render(
      <AnalysisResultPanel verdict="real" responseText="Análise concluída." />
    );

    expect(screen.getByText('Análise concluída.')).toBeInTheDocument();
    expect(
      screen.queryByText('O texto de resposta da IA vai aparecer aqui.')
    ).not.toBeInTheDocument();
  });
});
