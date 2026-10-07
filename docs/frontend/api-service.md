# Serviço de Comunicação com a API

O arquivo é responsável por centralizar a comunicação do frontend com a API do backend. Ele define as estruturas dos dados utilizados nas requisições e respostas, além das funções responsáveis por enviar e receber informações.

## URL da API

A URL base da API é obtida através da variável de ambiente `NEXT_PUBLIC_API_URL`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
```

Isso permite configurar o endereço do backend de acordo com o ambiente em que a aplicação está sendo executada.

## Interfaces

### `Source`

Representa uma fonte utilizada pelo modelo.

| Campo   | Tipo     | Descrição       |
| ------- | -------- | --------------- |
| `title` | `string` | Título da fonte |
| `url`   | `string` | URL da fonte    |

### `AnalysisResultResponse`

Representa o resultado da análise realizada pelo modelo.

| Campo          | Tipo     | Descrição                   |
| -------------- | -------- | --------------------------- |
| `verdict`      | `string` | Classificação da publicação |
| `responseText` | `string` | Resposta gerada pelo modelo |

O campo `verdict` pode assumir os valores:

* `real`
* `fake`
* `Não trata-se de uma proposta de governo`

### `InstagramPostResponse`

Representa os dados extraídos de uma publicação do Instagram.

| Campo           | Tipo     | Descrição                   |
| --------------- | -------- | --------------------------- |
| `imageUrl`      | `string` | URL da imagem da publicação |
| `extractedText` | `string` | Texto extraído da imagem    |
| `caption`       | `string` | Legenda da publicação       |
| `shortcode`     | `string` | Identificador da publicação |

### `InstagramPostSubmissionRequest`

Representa os dados enviados para análise de uma publicação do Instagram.

| Campo | Tipo     | Descrição                      |
| ----- | -------- | ------------------------------ |
| `url` | `string` | URL da publicação do Instagram |

### `BlueSkyResponse`

Representa os dados enviados para a publicação do resultado no Bluesky.

| Campo          | Tipo     | Descrição                   |
| -------------- | -------- | --------------------------- |
| `verdict`      | `string` | Classificação da publicação |
| `responseText` | `string` | Texto da resposta do modelo |
| `url`          | `string` | URL da publicação analisada |

## Funções

### `analyzeScrapy()`

Envia a URL de uma publicação do Instagram para o endpoint `/scrapy`.

**Método:** `POST`

**Endpoint:**

```text
/scrapy
```

A função envia um objeto `InstagramPostSubmissionRequest` e retorna um `InstagramPostResponse`.

Também trata erros de requisição, incluindo:

* **422:** URL inválida ou que não corresponde a uma publicação aceita.
* **Outros erros HTTP:** erro retornado pelo servidor.
* **Falha de conexão:** servidor indisponível ou inacessível.

### `analyzePost()`

Envia os dados extraídos da publicação para o modelo através do endpoint `/modelo`.

**Método:** `POST`

**Endpoint:**

```text
/modelo
```

Recebe um `InstagramPostResponse` e retorna um `AnalysisResultResponse` contendo a classificação e a resposta gerada pelo modelo.

### `blueskypost()`

Envia o resultado da análise para o endpoint `/bluesky`.

**Método:** `POST`

**Endpoint:**

```text
/bluesky
```

Recebe um objeto `BlueSkyResponse` e envia os dados para publicação no Bluesky.

## Fluxo de comunicação

O fluxo principal de análise ocorre da seguinte forma:

```text
Frontend
   │
   │ URL do Instagram
   ▼
/scrapy
   │
   │ Dados da publicação + OCR
   ▼
/modelo
   │
   │ Classificação + resposta
   ▼
Frontend
   │
   │ Resultado da análise
   ▼
/bluesky
   │
   ▼
Publicação no Bluesky
```

Dessa forma, o arquivo funciona como uma camada de comunicação entre o frontend e os serviços disponibilizados pelo backend.
