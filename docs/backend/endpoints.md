# Endpoints da API

Este módulo concentra os endpoints responsáveis pela comunicação entre o
frontend e os serviços de coleta, processamento, análise e publicação dos
resultados.

## Fluxo dos endpoints

O processamento de uma publicação ocorre, principalmente, nas seguintes etapas:

1. Recebimento da URL do Instagram.
2. Validação da URL.
3. Coleta da publicação por meio do Instaloader.
4. Extração do texto presente na imagem utilizando Tesseract OCR.
5. Envio dos dados ao modelo de Machine Learning.
6. Retorno do resultado da classificação.
7. Publicação opcional do resultado no BlueSky.

```text
┌──────────────────────┐
│      Frontend        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ POST /scrapy         │
│ Validação + coleta   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ POST /modelo         │
│ OCR + análise        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Resultado da análise │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ POST /bluesky        │
│ Publicação opcional  │
└──────────────────────┘
```

## Funcionalidades

Existem 3 endpoints no projeto, sendo eles:

### Endpoit do Scrapy:
```python
@router.post("/scrapy", response_model=PostPreviewPanel)
def scrapy_post(request: InstagramPostSubmissionRequest):
```
A rota conectada ao Frontend que espera uma resposta do formato **PostPreviewPanel** que é algo pre-definido; A rota do Scrapy chama um dos services, que está dentro do backend, sendo ele:

```python
return InstagramService.get_post_content(request.url)
```

### Endpoit do Modelo:
```python
@router.post("/modelo")
def analyse_response(request: PostPreviewPanel):
```

### Endpoit do Bluesky:
```python
@router.post("/bluesky")
def send_post_to_bluesky(request: BlueSkyResponse):
```