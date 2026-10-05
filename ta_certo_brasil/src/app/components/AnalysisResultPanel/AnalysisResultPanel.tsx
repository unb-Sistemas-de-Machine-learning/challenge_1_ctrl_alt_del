'use client'

type AnalysisResultPanelProps = {
  verdict?: 'real' | 'fake' | 'Não trata-se de uma proposta de governo';
  responseText?: string;
};

export default function AnalysisResultPanel({
  verdict,
  responseText,
}: AnalysisResultPanelProps) {
  return (
    <div className="flex flex-col gap-3 h-full w-full p-2 violet-border">
      <div className="border border-emerald-500 rounded-sm py-2 text-center text-lg">
        {verdict ? (verdict === 'real' ? 'Real': (verdict === 'fake' ? 'Fake' : 'Não trata-se de uma proposta de governo')) : 'Real ou fake'}
      </div>

      <p className="flex-1 text-sm text-zinc-200 overflow-auto">
        {responseText || "O texto de resposta da IA vai aparecer aqui."}
      </p>
    </div>
  );
}