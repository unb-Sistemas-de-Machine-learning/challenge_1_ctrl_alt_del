import re
from pathlib import Path
import instaloader
pasta_destino = Path("data/instagram/")


def baixar_post(url: str):
    
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

