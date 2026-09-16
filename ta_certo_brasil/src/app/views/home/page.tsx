'use client'
import TermsCard from "@/app/components/TermsCard/TermsCard";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const router = useRouter()
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-10 mt-2 violet-border h-full min-h-150">
      <h1 className="mt-10 text-5xl self-center">"Ta Certo Brasil?"</h1>
      
      <h1 className="px-10">é um projeto que visa ajudar jovens alienados que irão votar pela primeira vez a saber se, notícias durante o período eleitoral, compartilhadas pelo instagram, são verídicas, com um sistema que consegue coletar textos por meios de imagens e fazer a validação se é ou não algo desinformativo, sobre as propostas de governo dos candidatos - e saberemos que o sistema é funcional se, a margem de acertos for acima de 75%, com coletas feitas a partir de testes realizados com uma amostra de X notícias e publicações eleitorais previamente classificadas como verdadeiras ou falsas por fontes confiáveis.<br></br><br></br> O que o projeto TRATA? <br></br><br></br> Verificação de notícias do instagram através de imagens e texto para validação de fake news sobre as propostas de governo dos candidatos.
      Notícias e artigos extraídos de newsletters de tecnologia em Português (Brasil).
      Processamento exclusivo de texto limpo (removendo HTML, menus e propagandas).
      Relatórios gerados com interpretabilidade e percentual de certeza da predição(destaque dos termos que influenciaram a predição).</h1>
    <Button text="Começar" className="self-center violet-border w-35 h-10 rounded-md" onClick={() => setIsTermsOpen(true)}></Button>
    <TermsCard 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />
    </div>
  );
}
