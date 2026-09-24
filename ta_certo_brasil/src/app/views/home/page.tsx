'use client'

import TermsCard from "@/app/components/TermsCard/TermsCard";
import Button from "@/app/components/Button/Button";
import { useState } from "react";
import { Source_Serif_4 } from "next/font/google";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const checks = [
  {
    title: "Posts do Instagram",
    description:
      "Extraímos o texto de imagens e legendas para checar as propostas de governo dos candidatos.",
  },
  {
    title: "Newsletters de tecnologia",
    description:
      "Coletamos notícias e artigos em português do Brasil como fontes de comparação.",
  },
  {
    title: "Texto limpo",
    description:
      "Removemos HTML, menus e propaganda antes de qualquer análise.",
  },
  {
    title: "Relatório interpretável",
    description:
      "Mostramos o percentual de certeza e destacamos os termos que mais influenciaram a predição.",
  },
];

export default function Home() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="violet-border flex h-screen flex-col bg-zinc-950">

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-10 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">

        <div className="mx-auto flex w-full max-w-[65ch] flex-col items-center gap-10">

        
          <div className="flex max-w-[38ch] flex-col items-center gap-4 text-center">

            <h1
              className={`${serif.className} text-5xl leading-tight text-zinc-100`}
            >
              Tá certo, Brasil?
            </h1>

            <p className="text-base leading-relaxed text-zinc-400">
              Verificação de notícias eleitorais do Instagram, feita para
              quem vai votar pela primeira vez.
            </p>

          </div>


          <p className="w-full text-center text-base leading-7 text-zinc-300">
            Ajudamos jovens eleitores a saber se uma notícia compartilhada
            no Instagram sobre as propostas de governo dos candidatos é
            verídica — coletando o texto de imagens e posts e comparando
            com fontes confiáveis.
          </p>

          {/* O que verificamos */}
          <div className="flex w-full flex-col gap-6">

            <h2
              className={`${serif.className} border-b border-zinc-800 pb-3 text-2xl text-zinc-100`}
            >
              O que verificamos
            </h2>

            <ul className="flex flex-col gap-5">

              {checks.map((item) => (
                <li
                  key={item.title}
                  className="border-l-2 border-violet-600 pl-4"
                >
                  <div className="flex flex-col gap-1.5">

                    <span className="font-medium text-zinc-100">
                      {item.title}
                    </span>

                    <span className="text-sm leading-6 text-zinc-400">
                      {item.description}
                    </span>

                  </div>
                </li>
              ))}

            </ul>

          </div>

          
          <div className="h-4 shrink-0" />

        </div>

      </div>


      <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 px-6 py-4">

        <div className="mx-auto flex w-full max-w-[65ch] justify-center">

          <Button
            text="Começar"
            className="violet-border h-10 w-35 rounded-md transition-colors hover:bg-violet-500/10"
            onClick={() => setIsTermsOpen(true)}
          />

        </div>

      </div>

      <TermsCard
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

    </div>
  );
}