import csv

def load_candidates_from_csv(file_path):
    candidatos = []
    with open(file_path, mode='r', newline='', encoding='latin-1') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        for linha in reader:
            if linha["DS_CARGO"] in ['GOVERNADOR', 'PRESIDENTE', 'VICE-GOVERNADOR']:
                candidatos.append(linha)
    return candidatos

def abrir_arquivo_csv(caminho):
    candidatos = []
    with open(caminho, mode='r', newline='', encoding='latin-1') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        for linha in reader:
            candidatos.append(linha)
    return candidatos