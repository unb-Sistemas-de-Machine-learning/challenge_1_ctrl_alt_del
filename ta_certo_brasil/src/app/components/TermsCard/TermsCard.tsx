'use client'

import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TermsCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsCard({ isOpen, onClose }: TermsCardProps) {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!accepted) return;

    router.push("/input");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">

      <div className="flex w-full max-w-2xl max-h-[88vh] flex-col overflow-hidden rounded-xl border border-violet-500/30 bg-zinc-950 shadow-2xl shadow-black/50">

        {/* Cabeçalho */}
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-6 py-5">

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-violet-400">
              Antes de começar
            </p>

            <h1 className="text-2xl font-semibold text-zinc-100">
              Termos de Uso
            </h1>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar termos"
            className="flex h-8 w-8 items-center justify-center rounded-md text-xl text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          >
            ×
          </button>

        </div>

        {/* Conteúdo */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">

          <div className="space-y-7 text-sm leading-6 text-zinc-400">

            {/* Aviso */}
            <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-4 py-3">
              <p className="text-sm leading-6 text-zinc-300">
                <strong className="font-medium text-violet-300">
                  Importante:
                </strong>{" "}
                este é um projeto acadêmico experimental. A classificação
                <strong className="text-zinc-200"> REAL </strong>
                ou
                <strong className="text-zinc-200"> FAKE </strong>
                é produzida por Inteligência Artificial e pode conter erros.
              </p>
            </div>

            {/* 1 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                1. Sobre o projeto
              </h2>

              <p>
                O <strong className="text-zinc-200">Tá certo, Brasil?</strong>{" "}
                é um projeto acadêmico desenvolvido no contexto de uma
                disciplina de Inteligência Artificial.
              </p>

              <p className="mt-2">
                A plataforma tem como objetivo experimental analisar conteúdos
                políticos compartilhados no Instagram e utilizar técnicas de
                Inteligência Artificial para classificá-los como{" "}
                <strong className="text-zinc-200">REAL</strong> ou{" "}
                <strong className="text-zinc-200">FAKE</strong>, de acordo com
                as informações e fontes consideradas pelo sistema.
              </p>

              <p className="mt-2">
                A plataforma não possui finalidade comercial e não representa
                candidatos, partidos políticos, campanhas eleitorais ou
                organizações políticas.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                2. Como funciona
              </h2>

              <p>
                O usuário pode fornecer o link de uma publicação do Instagram
                para análise. A partir das informações disponíveis no conteúdo
                enviado, o sistema poderá realizar etapas de processamento e
                análise automatizada, incluindo a extração de texto e a
                comparação das informações encontradas com fontes utilizadas
                pelo projeto.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                3. Natureza experimental da análise
              </h2>

              <p>
                Os resultados apresentados pela plataforma são produzidos por
                um sistema de Inteligência Artificial e possuem caráter
                experimental e acadêmico.
              </p>

              <p className="mt-2">
                A classificação <strong className="text-zinc-200">REAL</strong>{" "}
                ou <strong className="text-zinc-200">FAKE</strong> não
                representa uma prova definitiva sobre a veracidade ou falsidade
                de uma informação.
              </p>

              <p className="mt-2">
                O sistema pode cometer erros, interpretar informações de
                maneira incorreta ou apresentar resultados inadequados quando
                o conteúdo analisado for incompleto, ambíguo, satírico,
                descontextualizado ou depender de informações que não estejam
                disponíveis para o sistema.
              </p>

              <p className="mt-2">
                Por esse motivo, os resultados não devem ser utilizados como
                única fonte para determinar a veracidade de uma informação.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                4. Conteúdo político
              </h2>

              <p>
                A plataforma pode analisar conteúdos relacionados a candidatos,
                partidos, eleições, propostas de governo e outros assuntos
                políticos.
              </p>

              <p className="mt-2">
                A classificação realizada pelo sistema possui finalidade
                exclusivamente informativa e acadêmica. A plataforma não
                fornece orientação de voto, não recomenda candidatos ou
                partidos e não busca promover ou prejudicar qualquer posição
                política.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                5. Conteúdo enviado pelo usuário
              </h2>

              <p>
                O usuário é responsável pelos links e conteúdos que decide
                submeter à plataforma.
              </p>

              <p className="mt-2">
                Não envie senhas, credenciais de acesso, documentos pessoais
                ou outras informações privadas que não sejam necessárias para
                a análise.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                6. Conteúdo de terceiros
              </h2>

              <p>
                A plataforma pode analisar conteúdos originalmente publicados
                em serviços de terceiros, como o Instagram.
              </p>

              <p className="mt-2">
                O <strong className="text-zinc-200">Tá certo, Brasil?</strong>{" "}
                não é afiliado, patrocinado ou administrado pelo Instagram ou
                pela Meta.
              </p>

              <p className="mt-2">
                A plataforma não solicita a senha ou as credenciais de acesso
                do usuário ao Instagram.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                7. Limitações do serviço
              </h2>

              <p>
                Por se tratar de um projeto acadêmico, o serviço pode apresentar
                erros, indisponibilidade, alterações ou interrupções.
              </p>

              <p className="mt-2">
                Os métodos, modelos de Inteligência Artificial e fontes
                utilizadas pelo sistema também podem ser modificados durante
                o desenvolvimento do projeto.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                8. Responsabilidade
              </h2>

              <p>
                O resultado apresentado pela plataforma não substitui a
                consulta a fontes oficiais, documentos públicos, veículos
                jornalísticos ou serviços especializados de verificação de
                fatos.
              </p>

              <p className="mt-2">
                Os desenvolvedores não se responsabilizam por decisões tomadas
                exclusivamente com base na classificação produzida pelo
                sistema.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                9. Finalidade acadêmica
              </h2>

              <p>
                Os resultados e dados necessários ao funcionamento do sistema
                poderão ser utilizados para testes, avaliação, demonstração e
                análise do projeto no contexto da disciplina acadêmica em que
                ele foi desenvolvido.
              </p>

              <p className="mt-2">
                Qualquer utilização de dados pessoais deverá observar a
                legislação aplicável e as finalidades informadas ao usuário.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="mb-2 text-base font-semibold text-zinc-100">
                10. Aceitação
              </h2>

              <p>
                Ao selecionar "Aceito" e utilizar a plataforma, o usuário
                declara estar ciente de que o serviço é um projeto acadêmico,
                que a análise é realizada de forma automatizada e que os
                resultados podem conter erros.
              </p>

            </section>

            <p className="border-t border-zinc-800 pt-5 text-xs text-zinc-600">
              Última atualização: setembro de 2026
            </p>

          </div>

        </div>

        {/* Rodapé */}
        <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 px-6 py-4">

          <label className="flex cursor-pointer items-start gap-3">

            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-violet-600"
            />

            <span className="text-sm leading-5 text-zinc-300">
              Li e concordo com os Termos de Uso e estou ciente das limitações
              da análise realizada pela Inteligência Artificial.
            </span>

          </label>

          <div className="mt-4 flex justify-end">

            <Button
              text="Aceitar e começar"
              className={`h-10 rounded-md px-5 transition-all ${
                accepted
                  ? "violet-border hover:bg-violet-500/10"
                  : "cursor-not-allowed border border-zinc-800 text-zinc-600 opacity-60"
              }`}
              onClick={handleConfirm}
            />

          </div>

        </div>

      </div>

    </div>
  );
}