## Como executar localmente

### Fazer um clone do repositório:
```bash
git clone https://github.com/unb-Sistemas-de-Machine-learning/challenge_1_ctrl_alt_del.git
```

### Instalar ollama:
Windows:
``` bash
irm https://ollama.com/install.ps1 | iex
```
Linux:
``` bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Necessário fazer o download do Modelo com fine-tunning:
```
https://drive.google.com/file/d/1cEZFhgq6wpKavUVH1rmaTO5vZy_jAsxi/view?usp=sharing
```

### Inserir o arquivo .gguf dentro da pasta:
``` bash
ta-certo-brasil/
│
├── modelo/
       └─ mistral-7b-instruct-v0.3.Q4_K_M.gguf
```

### Fazer a instalação:
``` bash
cd challenge_1_ctrl_alt_del/modelo
ollama create ta-certo-brasil -f Modelfile
```

### Executar modelo:
```bash
ollama run ta-certo-brasil
```

### Executar com Docker:
#### Vá até a raiz do projeto:
``` bash
docker compose up --build
```