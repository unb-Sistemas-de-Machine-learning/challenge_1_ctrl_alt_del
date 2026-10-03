
import os
import pytesseract
from pathlib import Path
from PIL import Image


class TesseractOCR:

    def __init__(self):
        pass

    def collect_text(self, images: list) -> str:
        try:
            text = ""
            for image in images:
                text += pytesseract.pytesseract.image_to_string(Image.open(image))
            return text
        except Exception as e:
            return f"error"

    def extract_text_from_image(self, shortcode: str) -> str:
        image_path = Path("data/instagram") / f"{shortcode}"
        try:
            images = [ os.path.join(image_path, image) for image in os.listdir(image_path) if image.endswith(('.png', '.jpg', '.jpeg')) ]
            images = [ image.replace("\\", "/") for image in images ]

            if len(images) >= 1:
                return self.collect_text(images)
            return "Nenhuma imagem encotnrada."
        except FileNotFoundError:
            return "Diretório não encontrado."


