## Funcionalidade

O Tesseract OCR é utilizado para ler e coletar o texto de imagens vindas de POSTs do Instagram.
Sua execução é bem simples:

### GET Imagens

``` python
def extract_text_from_image(self, shortcode: str) -> str:
        image_path = Path("data/instagram") / f"{shortcode}"
        try:
            images = [ os.path.join(image_path, image) for image in os.listdir(image_path) if image.endswith(('.png', '.jpg', '.jpeg')) ]
            images = [ image.replace("\\", "/") for image in images ]
```

Essa função simplesmente coleta todas as imagens que estão dentro do Path que o Scrapy criou.

### Tesseract OCR

Após a coleta, o Tesseract OCR é iniciado e faz a análise e retorno dos textos que estão expostos nas imagens

``` python
    def collect_text(self, images: list) -> str:
        try:
            text = ""
            for image in images:
                text += pytesseract.pytesseract.image_to_string(Image.open(image))
            return text
        except Exception as e:
            return f"error ao análisar imagens"
```
