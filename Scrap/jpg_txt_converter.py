from pathlib import Path

import easyocr  # type: ignore
import numpy as np
from PIL import Image


def converterjpg() -> None:
    base_dir = Path(__file__).resolve().parent / "downloads_instagram"

    if not base_dir.exists():
        print(f"Pasta não encontrada: {base_dir}")
        return

    pastas = [pasta for pasta in base_dir.iterdir() if pasta.is_dir()]

    if not pastas:
        print(f"Nenhuma subpasta encontrada em: {base_dir}")
        return

    pasta_recente = max(pastas, key=lambda pasta: pasta.stat().st_mtime)
    arquivos_imagem = [
        arquivo
        for arquivo in pasta_recente.iterdir()
        if arquivo.is_file()
        and arquivo.suffix.lower() in {".jpg", ".jpeg", ".png"}
    ]

    if not arquivos_imagem:
        print("Nenhuma imagem encontrada.")
        return

    print("Carregando o leitor OCR...")
    reader = easyocr.Reader(["pt"])

    for img_path in arquivos_imagem:
        print(f"\nProcessando imagem: {img_path.name}")

        try:
            # Pillow lida corretamente com caminhos Unicode do Windows.
            with Image.open(img_path) as imagem:
                imagem_rgb = imagem.convert("RGB")
                imagem_array = np.array(imagem_rgb)

            resultados = reader.readtext(imagem_array, detail=0)

            if resultados:
                print("\n".join(resultados))
            else:
                print("Nenhum texto encontrado.")

        except Exception as erro:
            print(f"Não foi possível ler {img_path.name}: {erro}")


if __name__ == "__main__":
    converterjpg()
