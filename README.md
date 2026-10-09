# Challenge 1 — Equipe Ctrl Alt Del

## Sistemas de Machine Learning — 2026/02

## Ta Certo Brasil

O **Ta Certo Brasil** é um sistema desenvolvido para auxiliar jovens eleitores, especialmente aqueles que votarão pela primeira vez, na identificação de possíveis desinformações relacionadas a propostas de candidatos durante o período eleitoral.

O sistema recebe uma publicação de rede social, extrai seu conteúdo textual por meio de **OCR** e utiliza um modelo de Machine Learning para analisar e classificar o conteúdo.

---

## O que o projeto trata

O sistema contempla:

* análise de publicações eleitorais;
* processamento de imagens contendo texto;
* extração de texto utilizando OCR;
* análise de propostas de governo;
* classificação utilizando modelo de Machine Learning;
* integração entre frontend, backend e serviço de inferência;
* apresentação do resultado da análise ao usuário.

#Execução local

## 1. Clonar o repositório

```bash
git clone https://github.com/unb-Sistemas-de-Machine-learning/challenge_1_ctrl_alt_del.git

cd challenge_1_ctrl_alt_del
```

---

## 2. Configurar as variáveis de ambiente

Crie o arquivo `.env` a partir do arquivo de exemplo:

### Windows

```powershell
cp .env.example .env
```

### Linux/macOS

```bash
cp .env.example .env
```

Depois, configure no `.env` as variáveis necessárias para o ambiente local.
---

# Configuração do modelo local

O projeto utiliza um modelo no formato **GGUF** para inferência local.

O arquivo do modelo pode ser obtido através do link disponibilizado pela equipe:

[Download do modelo treinado](https://drive.google.com/file/d/1cEZFhgq6wpKavUVH1rmaTO5vZy_jAsxi/view?usp=sharing)

Após o download, coloque o arquivo `.gguf` no diretório correspondente ao modelo.

Exemplo:

```text
challenge_1_ctrl_alt_del/
│
├── modelo/
│   └── mistral-7b-instruct-v0.3.Q4_K_M.gguf
│
├── backend/
├── ta_certo_brasil/
└── docker-compose.yml
```

---

# Execução utilizando Ollama

Caso seja necessário executar o modelo localmente utilizando Ollama, instale o Ollama.

### Windows

```powershell
irm https://ollama.com/install.ps1 | iex
```

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Depois, crie o modelo utilizando o `Modelfile`:

```bash
cd modelo

ollama create ta-certo-brasil -f Modelfile
```

Para executar o modelo:

```bash
ollama run ta-certo-brasil
```
---

# 🐳 Execução com Docker

O projeto também pode ser executado utilizando Docker.

Na raiz do projeto:

```bash
docker compose up --build
```

Para executar os containers em segundo plano:

```bash
docker compose up -d --build
```

Os principais serviços são:

```text
Frontend → porta 3000
Backend  → porta 8000
```

---

# Estrutura do projeto

```text
challenge_1_ctrl_alt_del/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── schemas/
│   │   └── services/
│   ├── Dockerfile
│   └── requirements.txt
│
├── ta_certo_brasil/
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── modelo/
│   └── Modelfile
│
├── tests/
│
├── docker-compose.yml
├── .env.example
└── README.md
```