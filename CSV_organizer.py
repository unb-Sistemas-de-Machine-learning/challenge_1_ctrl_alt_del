import os
from typing import List
import pandas as pd
import google.generativeai as genai

def carregar_csv(paths_csv: List[str]) -> pd.DataFrame:
    lista_dfs = []
    encodings = ['utf-8', 'latin1', 'ISO-8859-1', 'cp1252']
    seps = [';', ',']

    for path in paths_csv:
        df_carregado = None
        for encoding in encodings:
            for sep in seps:
                try:
                    curr_df = pd.read_csv(path, sep=sep, encoding=encoding)
                    # Padroniza nomes das colunas para minúsculo
                    curr_df.columns = curr_df.columns.str.lower().str.strip()
                    
                    if not curr_df.empty and 'proposta' in curr_df.columns:
                        df_carregado = curr_df
                        break
                except Exception:
                    continue
            if df_carregado is not None:
                lista_dfs.append(df_carregado)
                break

    return pd.concat(lista_dfs, ignore_index=True) if lista_dfs else pd.DataFrame()


def gerar_declaracoes_falsas(topic: str, num_statements: int = 30) -> List[str]:
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key or api_key == "SUA_CHAVE_AQUI": #nao vou mostrar :,(
        print("Chave GOOGLE_API_KEY não configurada. Pulando geração sintética.")
        return []
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""Gere {num_statements} declarações curtas e falsas sobre {topic}.
    As declarações devem parecer plausíveis, mas conter erros fatuais.
    Retorne apenas uma declaração por linha sem numeração."""
    
    try:
        response = model.generate_content(prompt)
        return [line.strip() for line in response.text.split('\n') if line.strip()]
    except Exception as e:
        print(f"Erro ao gerar dados sintéticos: {e}")
        return []


def executar_pipeline(arquivos_entrada: List[str]):
    # 1. Carregamento dos dados
    df = carregar_csv(arquivos_entrada)
    if df.empty:
        raise ValueError("O DataFrame está vazio. Verifique os caminhos e formatos dos arquivos.")
    
    # 2. Trata múltiplos candidatos por linha (se a coluna existir)
    if "candidato" in df.columns:
        df["candidato"] = df["candidato"].astype(str).str.split(",")
        df = df.explode("candidato")
        df["candidato"] = df["candidato"].str.strip()

    # 3. Define rótulo original
    df["label_category"] = "true"

    # 4. Enriquecimento com dados sintéticos (Gemini)
    falsas_geradas = gerar_declaracoes_falsas("política e propostas de governo", num_statements=30)
    if falsas_geradas:
        df_falsas = pd.DataFrame({
            "proposta": falsas_geradas,
            "label_category": "false",
            "candidato": "Gerado_IA"
        })
        df = pd.concat([df, df_falsas], ignore_index=True)

    # 5. Consolidação por candidato
    if "candidato" in df.columns:
        df_consolidado = (
            df.groupby(["candidato", "label_category"])["proposta"]
            .apply(lambda x: " ".join(x.dropna()))
            .reset_index()
        )
        df_consolidado.to_csv("propostas_consolidadas.csv", index=False)
        print("Base consolidada por candidato salva em 'propostas_consolidadas.csv'")

    # 6. Salva a base completa tratada
    df.to_csv("propostas_processadas.csv", index=False)
    print(f"Processamento concluído com sucesso! Total de registros: {len(df)}")


# Execução do script
if __name__ == "__main__":
    arquivos = ["./com_propostas.csv"]
    executar_pipeline(arquivos)