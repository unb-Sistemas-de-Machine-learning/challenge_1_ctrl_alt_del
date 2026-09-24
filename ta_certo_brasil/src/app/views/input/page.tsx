'use client'

import { useState } from "react";
import PostPreviewPanel from "@/app/components/PostPreviewPanel/PostPreviewPanel";
import AnalysisResultPanel from "@/app/components/AnalysisResultPanel/AnalysisResultPanel";

type RespostaIA = {
  verdict?: 'real' | 'fake';
  responseText?: string;
  sources?: string[];
  highlightedTerms?: string[];
};

export default function Input() {
  const [urlInput, setUrlInput] = useState("");
  const [respostaIA, setRespostaIA] = useState<RespostaIA>({});

  function enviarLinkPost(): void {
    console.log(urlInput);
    // chamar backend
    setUrlInput("");
  }

  return (
    <div className="flex flex-row gap-4 h-full min-h-150 w-full min-w-150 p-2">
      <PostPreviewPanel
        urlInput={urlInput}
        onUrlChange={setUrlInput}
        onSubmit={enviarLinkPost}
      />
      <AnalysisResultPanel
        verdict={respostaIA.verdict}
        responseText={respostaIA.responseText}
        sources={respostaIA.sources}
        highlightedTerms={respostaIA.highlightedTerms}
      />
    </div>
  );
}