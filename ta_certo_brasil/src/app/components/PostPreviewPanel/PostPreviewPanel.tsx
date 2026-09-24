'use client'

type PostPreviewPanelProps = {
  imageUrl?: string;
  extractedText?: string;
  caption?: string;
  urlInput: string;
  onUrlChange: (value: string) => void;
  onSubmit: () => void;
};

export default function PostPreviewPanel({
  imageUrl,
  extractedText,
  caption,
  urlInput,
  onUrlChange,
  onSubmit,
}: PostPreviewPanelProps) {
  return (
    <div className="flex flex-col gap-3 h-full w-full p-3 violet-border">
      <span className="text-zinc-400 text-sm">Post analisado</span>

      <div className="flex flex-col gap-3 h-26/30 w-full border border-zinc-700 rounded-sm p-3 overflow-auto">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Imagem do post"
            aria-label="Imagem do post"
            className="max-h-40 object-contain self-center rounded-sm"
          />
        ) : (
          <div
            aria-label="Imagem do post"
            className="h-40 w-full flex items-center justify-center text-center text-zinc-500 text-sm border border-dashed border-zinc-700 rounded-sm px-4"
          >
            Cole o link de um post abaixo para ver a imagem aqui.
          </div>
        )}
        <p aria-label="Texto obtido da imagem do post" className="text-sm text-zinc-200 leading-relaxed">
          {extractedText || "O texto extraído da imagem aparece aqui depois da análise."}
        </p>
        <p aria-label="Caption do post" className="text-sm text-zinc-500 leading-relaxed">
          {caption || "A legenda do post aparece aqui depois da análise."}
        </p>
      </div>

      <div className="flex h-3/30 w-full gap-2">
        <input
          placeholder="Insira o url do post do Instagram"
          aria-label="url do post instagram"
          value={urlInput}
          onChange={(e) => onUrlChange(e.target.value)}
          className="w-24/30 p-2 text-sm text-zinc-100 border border-zinc-700 rounded-sm bg-transparent placeholder:text-zinc-500"
        />
        <button
          onClick={onSubmit}
          className="w-6/30 p-2 rounded-sm border border-violet-600 text-sm text-zinc-100 hover:bg-violet-600/10 transition-colors"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}