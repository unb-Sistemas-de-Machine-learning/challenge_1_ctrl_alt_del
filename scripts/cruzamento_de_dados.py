import glob
import os
import csv
from formatar_texto import formatar_texto

def deletar_arquivos(caminho):
    com_proposta = os.path.join(caminho, "com_propostas.csv")
    sem_proposta = os.path.join(caminho, "sem_propostas.csv")

    try:
        if os.path.exists(com_proposta):
            os.remove(com_proposta)

        if os.path.exists(sem_proposta):
            os.remove(sem_proposta)

    except Exception as e:
        print(f"Erro ao deletar os arquivos: {e}")


def criar_arquivo(caminho):
    try:
        com_proposta = os.path.join(caminho, "com_propostas.csv")
        sem_proposta = os.path.join(caminho, "sem_propostas.csv")

        with open(com_proposta, "w", newline="", encoding="latin-1") as arquivo:
            writer = csv.writer(arquivo, delimiter=";")

            writer.writerow([
                "DS_CARGO",
                "NM_UE",
                "SQ_CANDIDATO",
                "NM_CANDIDATO",
                "NM_URNA_CANDIDATO",
                "PROPOSTA"
            ])

        with open(sem_proposta, "w", newline="", encoding="latin-1") as arquivo:
            writer = csv.writer(arquivo, delimiter=";")

            writer.writerow([
                "DS_CARGO",
                "NM_UE",
                "SQ_CANDIDATO",
                "NM_CANDIDATO",
                "NM_URNA_CANDIDATO"
            ])

    except Exception as e:
        print(f"Erro ao criar os arquivos: {e}")


def verificar_propostas(id, caminho):
    arquivos = glob.glob(os.path.join(caminho, "**", "*.txt"), recursive=True)
    for arquivo in arquivos:
        if id in os.path.basename(arquivo):
            with open(arquivo, 'r', encoding='latin-1') as f:
                conteudo = f.read()
                return conteudo
    return None

def adicionar_com_propostas(caminho, estrutura, proposta):
    try:
        proposta_formatada = formatar_texto(proposta)
        estrutura.append(proposta_formatada)
        with open(caminho, mode='a', newline='', encoding='latin-1') as csvfile:
            writer = csv.writer(csvfile, delimiter=';')
            writer.writerow(estrutura)
    except Exception as e:
        print(f"Erro ao adicionar proposta para o candidato {estrutura[1]}: {e}")

def adicionar_sem_propostas(caminho, estrutura):
    try:
        with open(caminho, mode='a', newline='', encoding='latin-1') as csvfile:
            writer = csv.writer(csvfile, delimiter=';')
            writer.writerow(estrutura)
    except Exception as e:
        print(f"Erro ao adicionar candidato sem proposta {estrutura[1]}: {e}")