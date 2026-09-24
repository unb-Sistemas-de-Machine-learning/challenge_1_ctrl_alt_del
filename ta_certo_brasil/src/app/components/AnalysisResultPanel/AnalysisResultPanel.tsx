'use client'

type AnalysisResultPanelProps = {
  verdict?: 'real' | 'fake';
  responseText?: string;
  sources?: string[];
  highlightedTerms?: string[];
};

export default function AnalysisResultPanel({
  verdict,
  responseText,
  sources = [],
  highlightedTerms = [],
}: AnalysisResultPanelProps) {
  return (
    <div className="flex flex-col gap-3 h-full w-full p-2 violet-border">
      <div className="border border-emerald-500 rounded-sm py-2 text-center text-lg">
        {verdict ? (verdict === 'real' ? 'Real' : 'Fake') : 'Real ou fake'}
      </div>

      <p className="flex-1 text-sm text-zinc-200 overflow-auto">
        {responseText || "O texto de resposta da IA vai aparecer aqui."}
      </p>

      <div className="flex flex-col gap-1">
        {(sources.length > 0 ? sources : ['', '', '']).map((source, i) => (
          <div
            key={i}
            className="border border-blue-600 rounded-sm px-2 py-1 text-xs text-zinc-200 truncate"
          >
            {source || 'Link de referência que ela usou'}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {(highlightedTerms.length > 0 ? highlightedTerms : ['', '', '']).map((term, i) => (
          <div
            key={i}
            className="flex-1 h-6 bg-yellow-400/80 rounded-sm text-[10px] text-black flex items-center justify-center px-1 truncate"
          >
            {term}
          </div>
        ))}
      </div>
    </div>
  );
}