'use client'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_ORIGIN = API_BASE_URL?.replace(/\/api$/, "");

import { useState } from "react";
import PostPreviewPanel from "@/app/components/PostPreviewPanel/PostPreviewPanel";
import AnalysisResultPanel from "@/app/components/AnalysisResultPanel/AnalysisResultPanel";
import { analyzePost } from "@/app/services/api";
import { analyzeScrapy } from "@/app/services/api";
import Header from "@/app/components/Header/Header";

type RespostaIA = {
  verdict?: 'real' | 'fake' | 'Não trata-se de uma proposta de governo';
  responseText?: string;
};

type instaScrapy = {
  imageUrl?: string;
  extractedText?: string;
  caption?: string;
};

export default function Input() {
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [respostaIA, setRespostaIA] = useState<RespostaIA>({});
  const [instaScrapy, setinstaScrapy] = useState<instaScrapy>({});

  async function enviarLinkPost(): Promise<void> {
  if (!urlInput) {
    setErrorMessage("Por favor, insira um URL válido.");
    return;
  }

  setIsLoading(true);
  setErrorMessage("");

  try {
    const scrapy = await analyzeScrapy({url: urlInput})

    const scrapyResult: instaScrapy = {
      imageUrl: `${API_ORIGIN}${scrapy.imageUrl}`,
      extractedText: scrapy.extractedText,
      caption: scrapy.caption,
    };

    setinstaScrapy(scrapyResult);
    setUrlInput("");

    const result = await analyzePost({ imageUrl: scrapy.imageUrl, extractedText: scrapy.extractedText, caption: scrapy.caption, shortcode: scrapy.shortcode });

    const mappedResult: RespostaIA = {
      verdict: result.verdict,
      responseText: result.responseText,
    };

    setRespostaIA(mappedResult)


  } catch (error: any) {
    console.error(error);
    setErrorMessage(
      error.message || "Ocorreu um erro desconhecido."
    );
  } finally {
    setIsLoading(false);
  }
}


  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-row gap-4 min-h-15 w-full min-w-150">
        <Header></Header>
      </div>
      <div className="flex flex-row gap-4 h-full min-h-150 w-full min-w-150">
        <PostPreviewPanel
          urlInput={urlInput}
          isLoading={isLoading}
          onUrlChange={setUrlInput}
          onSubmit={enviarLinkPost}
          imageUrl={instaScrapy.imageUrl}
          extractedText={instaScrapy.extractedText}
          caption={instaScrapy.caption}
        />
        <AnalysisResultPanel
          verdict={respostaIA.verdict}
          responseText={respostaIA.responseText}
        />
      </div>
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
    </div>
  );
}