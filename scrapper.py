import re
from pathlib import Path
import instaloader

def baixar_post(url: str, pasta_destino: str):
    
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
    
    print(f"Arquivos salvos com sucesso em: {Path(pasta_destino) / shortcode}")


if __name__=="__main__":
    url_instagram = "https://www.instagram.com/p/DcyvJLAm_m5/?utm_source=ig_web_copy_link&igsi=NTc4MTIwNjQ2YQ==/"
    diretorio_customizado = "./downloads_instagram"
    baixar_post(url_instagram, diretorio_customizado)