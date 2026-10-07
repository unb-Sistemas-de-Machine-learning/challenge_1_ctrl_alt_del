Aqui está a documentação das ferramentas que foram utilizadas para a criação do Software, além do porquê de seu uso.

## Backend

<div class="stats-grid">
  <div class="stat-card">
    <strong>Instaloader</strong>
    <span>Extração do conteúdo da Postagem a ser analisada.</span>
  </div>
  <div class="stat-card">
    <strong>Docker</strong>
    <span>Isolamento em contâiners</span>
  </div>
  <div class="stat-card">
    <strong>FastAPI</strong>
    <span>Conexão e criação de rotas</span>
  </div>
    <div class="stat-card">
    <strong>Tesseract OCR</strong>
    <span>Reconhece e coleta textos de imagens.</span>
  </div>
    <div class="stat-card">
    <strong>Ollama</strong>
    <span>Conexão com LLM local.</span>
  </div>
    <div class="stat-card ">
    <strong>PYPDF</strong>
    <span>Abre arquivos .pdf e passa para .txt.</span>
  </div>
</div>

## Frontend

<div class="stats-grid centralizar-div">
  <div class="stat-card ">
    <strong>React</strong>
    <span>construção de interfaces de usuário interativas.</span>
  </div>
</div>


## Explicação

**Instaloader** é uma biblioteca Python de código aberto projetada para baixar imagens, vídeos e metadados de posts do Instagram, como legendas, comentários e geolocalização. Sua principal vantagem é a operação simples e a não dependência de APIs oficiais, permitindo a coleta direta de mídia pública de perfis ou hashtags especificados através de comandos de linha ou código.

- Coleta de dados sem API oficial: o Instaloader acessa conteúdo público do Instagram diretamente, sem necessidade de cadastro de aplicativo ou chaves de acesso .
- Extração de metadados: mídia e captura legendas
- Suporte a múltiplas fontes: permite baixar de perfis, hashtags, stories, feed e mídia salva .

**Docker** é uma plataforma de conteinerização que empacota uma aplicação junto com todas as suas dependências (código, bibliotecas, runtime, configurações) em uma unidade isolada e portátil chamada container. Garante que o software rode de forma idêntica em qualquer ambiente — do notebook do desenvolvedor ao servidor de produção.

- Reprodutibilidade: qualquer contribuidor roda o projeto com os mesmos comandos, independente do sistema operacional.
- Isolamento: as dependências do projeto não conflitam com outras ferramentas da máquina do usuário.
- Portabilidade: o mesmo container funciona em Linux, Windows, macOS, servidores locais e nuvem.
- Onboarding rápido: um único docker compose up coloca o ambiente inteiro de pé, sem instalar Python, dependências ou configurar variáveis manualmente.


**Tesseract** é um mecanismo de OCR (Reconhecimento Óptico de Caracteres) de código aberto, originalmente desenvolvido pela HP e atualmente mantido pelo Google.

- Conversão de PDF para texto: converte documentos digitalizados (imagens ou PDFs baseados em imagem) em texto pesquisável e editável.
- Extração de metadados: captura informações textuais de documentos que não possuem camada de texto nativa.
- Suporte multilíngue: processa documentos em português, inglês e outros idiomas, essencial para projetos que lidam com conteúdo internacional .
- Integração com Python: através da biblioteca pytesseract, integra-se facilmente ao pipeline de processamento existente .

**FastAPI** é um framework web Python moderno e de alto desempenho para construção de APIs, baseado em type hints padrão do Python . Combina validação de dados via Pydantic com o servidor ASGI Starlette, oferecendo velocidade comparável a frameworks NodeJS e Go .

- Alto desempenho: benchmarks mostram respostas 3,3x mais rápidas e taxa de falha 255x menor que Django Ninja sob alta carga .
- Validação automática: Pydantic valida tipos de dados, parâmetros e corpos de requisição sem código extra .

**pypdf** é uma biblioteca Python pura de código aberto e gratuita, usada para processar arquivos PDF, capaz de dividir, mesclar, recortar e transformar páginas de PDF.

- Processamento de estrutura de PDF: Suporta operações de nível de página como mesclagem, divisão, rotação, recorte de páginas PDF.
- Extração de texto e metadados: Pode ler o conteúdo de texto e informações de metadados (como título, autor) de arquivos PDF.


**React** é uma biblioteca JavaScript de código aberto para construção de interfaces de usuário interativas. Sua abordagem é baseada em componentes — blocos de código reutilizáveis que combinam lógica de renderização e marcação (JSX) — permitindo compor interfaces complexas a partir de partes menores e independentes .

- Abordagem baseada em componentes: encapsula lógica e visual em unidades reutilizáveis, facilitando a manutenção e a composição de interfaces complexas .
- Renderização declarativa: descrevemos o que a interface deve exibir, e o React atualiza eficientemente apenas os elementos necessários quando os dados mudam .
- Ecossistema maduro: vasta biblioteca de pacotes comunitários, ferramentas de desenvolvimento e recursos de aprendizado .
- Multiplataforma: a mesma base de conhecimento pode ser usada para construir aplicações web e nativas (via React Native) .
- Adoção gradual: pode ser integrado incrementalmente a páginas HTML existentes sem exigir reescrita completa .

