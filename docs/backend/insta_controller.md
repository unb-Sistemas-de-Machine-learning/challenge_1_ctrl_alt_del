Como explicado na documentação da home page, o instaloader é utilizado para extração do carrossel e textos, tanto do título quanto da descrição do determinado POST do instagram.

## Como funciona

```python
import instaloader

    @staticmethod
    def baixar_post(url: str):
        ...
        baixar = instaloader.Instaloader(...., dirname_pattern=str(Path(pasta_destino) / "{shortcode}")
        ...
        L.download_post(...)

        return shortcode
```
Essa função do **instaloader_controller.py** faz a implementação e execução do instaloader; ele cria uma pasta no dirname_pattern e atribuí um **shortcode** para essa pasta, ficando da seguinte forma:

```js
data/instagram/{shortcode}
```

o **shortcode** é retornado para o backend e é enviado, junto com o conteúdo existente na pasta.


## Modelo

Assim que o Scrapy retorna para o Frontend, logo em seguida o Modelo já dispara. O shortcode vindo do Backend é enviado junto com o Modelo, e com ele é possível acessar a pasta que foi feito a extração, coletada as imagens e texto.

Antes de enviar o texto e as imagens para o Modelo, a pasta é excluída por uma função:

```python
    @staticmethod
    def delete_folder(shortcode):
        ....
```

A pasta é deletada para que o armazenamento do servidor não fique lotado.


## PostPreview

O Backend retorna o seguinte formato para o Frontend:

``` python
        return PostPreviewPanel(
            imageUrl= image_url,
            extractedText= title,
            caption= caption,
            shortcode= shortcode
        )
```