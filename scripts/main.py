from pathlib import Path
from candidatos import load_candidates_from_csv
from cruzamento_de_dados import verificar_propostas, adicionar_com_propostas, adicionar_sem_propostas, deletar_arquivos, criar_arquivo
import glob
import os

caminho_script = Path(__file__).resolve().parent.parent
caminho_arquivo = caminho_script / 'TSE' / 'candidatos'

def main():
    arquivos = glob.glob(os.path.join(caminho_arquivo, "**", "*.csv"), recursive=True)
    deletar_arquivos(caminho_script / 'treinamento')
    criar_arquivo(caminho_script / 'treinamento')
    print("Iniciando o processamento dos arquivos CSV...")
    try:
        for arquivo in arquivos:
            teste = load_candidates_from_csv(arquivo)
            for candidato in teste:
                conteudo = verificar_propostas(candidato["SQ_CANDIDATO"], caminho_script / 'TSE' / 'dados')
                estrutura = [
                    candidato["DS_CARGO"],
                    candidato["NM_UE"],
                    candidato["SQ_CANDIDATO"],
                    candidato["NM_CANDIDATO"],
                    candidato["NM_URNA_CANDIDATO"],
                ]
                if conteudo != None:
                    caminho_treinamento = caminho_script / 'treinamento' / 'com_propostas.csv'
                    adicionar_com_propostas(caminho_treinamento, estrutura, conteudo)
                else:
                    caminho_treinamento = caminho_script / 'treinamento' / 'sem_propostas.csv'
                    adicionar_sem_propostas(caminho_treinamento, estrutura)
        print("Processamento concluído com sucesso.")
    except Exception as e:
        print(f"Erro ao processar o arquivo {arquivo}: {e}")


if __name__ == "__main__":
    main()