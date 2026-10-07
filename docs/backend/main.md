## Configuração principal da API

O arquivo `main.py` é o ponto de entrada da aplicação **Ta Certo Brasil API**. Ele é responsável por configurar a aplicação FastAPI, definir as regras de comunicação com o frontend, registrar as rotas da API e disponibilizar os arquivos de imagens utilizados pela aplicação.

### Inicialização da aplicação

A aplicação é criada utilizando o framework FastAPI:

```python
app = FastAPI(title="Ta Certo Brasil API", version="1.0.0")
```

Nessa etapa, são definidos o nome e a versão da API. A partir desse objeto, a aplicação recebe as configurações e rotas utilizadas pelo sistema.

### Configuração do CORS

O sistema utiliza o middleware `CORSMiddleware` para controlar quais aplicações externas podem realizar requisições para a API.

A URL do frontend é obtida por meio da variável de ambiente `FRONTEND_URL`:

```python
FRONTEND_URL = os.getenv("FRONTEND_URL")
```

Essa URL é utilizada na configuração do CORS:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Dessa forma, o backend permite que o frontend configurado em `FRONTEND_URL` faça requisições para a API.

Além disso:

* `allow_credentials=True` permite o envio de credenciais nas requisições;
* `allow_methods=["*"]` permite os métodos HTTP utilizados pela aplicação;
* `allow_headers=["*"]` permite os cabeçalhos HTTP necessários nas requisições.

Essa configuração é importante principalmente quando frontend e backend estão hospedados em endereços diferentes, como ocorre na arquitetura de deploy do projeto.

### Registro das rotas da API

As rotas da aplicação são definidas no módulo `app.api.endpoints` e importadas como um router:

```python
from app.api.endpoints import router as api_router
```

Esse router é incluído na aplicação utilizando o prefixo `/api`:

```python
app.include_router(api_router, prefix="/api")
```

Consequentemente, as rotas definidas nos endpoints passam a ser acessadas a partir do caminho `/api`.

Por exemplo, uma rota definida como:

```text
/scrapy
```

passa a ser disponibilizada como:

```text
/api/scrapy
```

Isso mantém as rotas da API organizadas e separadas de outros recursos disponibilizados pelo servidor.

### Disponibilização das imagens do Instagram

A aplicação também disponibiliza as imagens armazenadas no diretório:

```text
data/instagram
```

por meio do `StaticFiles`:

```python
app.mount(
    "/instagram",
    StaticFiles(directory="data/instagram"),
    name="instagram"
)
```

Isso cria uma rota para acesso aos arquivos estáticos armazenados nesse diretório.

Assim, uma imagem salva em:

```text
data/instagram/<arquivo>.jpg
```

pode ser acessada pela aplicação através de:

```text
/instagram/<arquivo>.jpg
```

Esse mecanismo é utilizado para permitir que o frontend visualize as imagens dos posts obtidas durante o processo de coleta.

### Fluxo geral

De forma simplificada, esse módulo realiza quatro etapas principais:

```text
Inicialização do FastAPI
        ↓
Configuração do CORS
        ↓
Registro das rotas /api
        ↓
Disponibilização das imagens /instagram
```

Portanto, o `main.py` funciona como o **ponto central de configuração do backend**, conectando as rotas da API, as regras de acesso do frontend e os arquivos estáticos utilizados pela aplicação.
