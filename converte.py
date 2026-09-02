from pathlib import Path
from pypdf import PdfReader

#silencia os avisos do pypdf
#wrong pointing objet sao erros do proprio pypdf
logging.getLogger("pypdf").setLevel(logging.ERROR)

def ler_propostas_pdf(diretorio: str, diretorio_saida : str):
    path_diretorio=Path(diretorio)
    output_path=Path(diretorio_saida) if diretorio_saida else path_diretorio
    output_path.mkdir(parents=True,exist_ok=True)

    pdf_files = list(path_diretorio.rglob("*.pdf"))
    if not pdf_files:
        print(f"Nenhum PDF encontrado em {diretorio}")
        return

    for pdf_file in pdf_files:
        # formatacao TSE
        # YYYYUFNNNNNNNN_NN.pdf
        # YYYY ano, UF, NNNN numero candidato, NN numero aleatorio
        titulo = pdf_file.stem;
        ano = titulo[:4]
        uf = titulo[4:6].upper()
        sq_candidato = titulo[6:13]
        pasta_uf = output_path/uf
        pasta_uf.mkdir(parents=True,exist_ok=True)
        try:
            reader = PdfReader(pdf_file)
            texto_completo = []
            for page in reader.pages:
                text=page.extract_text()
                if text:
                    texto_completo.append(text)

            full = "\n\n".join(texto_completo)
            txt_file = pasta_uf / f"{pdf_file.stem}.txt"

            with open(txt_file, "w", encoding="utf-8") as f:
                f.write(full)

            print(f"Converteu: {pdf_file.name} -> {txt_file.name}")

        except Exception as e:
            print(f"Error processing {pdf_file.name}: {e}")

if __name__ == "__main__":
    input_directory = "./data/raw_pdfs"
    output_directory = "./data/dataset"

    ler_propostas_pdf(input_directory,output_directory)

       
