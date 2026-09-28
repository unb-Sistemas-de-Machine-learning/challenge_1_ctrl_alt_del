import os
import glob

def get_content(shortcode):
    direct = "data/instagram/" + shortcode
    print(os.listdir(direct))

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
