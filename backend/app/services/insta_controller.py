from pathlib import Path
import os
import glob
import shutil
import re
import instaloader


class Instagram:

    @staticmethod
    def baixar_post(url: str):
        pasta_destino = Path("data/instagram/")
    
        match = re.search(r'/(?:p|reel)/([^/?#&]+)', url)
        if not match:
            raise ValueError("URL do Instagram inválida.")
        
        shortcode = match.group(1)

        # vai instalar todas as fotos do carrosel e o texto em baixo do post
        L = instaloader.Instaloader(
            download_pictures=True,
            download_videos=False,
            download_comments=False,
            save_metadata=False,
            dirname_pattern=str(Path(pasta_destino) / "{shortcode}")
        )
        
        post = instaloader.Post.from_shortcode(L.context, shortcode)
        L.download_post(post, target=shortcode)
        
        return shortcode

    @staticmethod
    def get_content(shortcode):
        direct = Path("data/instagram/" + shortcode)
        try:
            image = glob.glob(os.path.join(direct, "**", "*.jpg"), recursive=True)
            texto_file = glob.glob(os.path.join(direct, "**", "*.txt"), recursive=True)
            if texto_file:
                get_text = texto_file[0]
                with open(get_text, 'r', encoding="utf-8") as file:
                    texto = file.read().splitlines()
                titulo = texto[0]
                caption = "\n".join(texto[1:])
        except FileExistsError:
            return None,None
        
        return image[0], titulo, caption
    
    @staticmethod
    def delete_folder(shortcode):
        path = Path("data/instagram/" + shortcode)
        print(path)
        try:
            shutil.rmtree(path)
            return "Folder deletada {shortcode}"
        except OSError as e:
            return "Erro ao deletar folder {shortcode}"

    