## Como executar localmente

Fazer um clone do repositório:
```bash
git clone https://github.com/unb-Sistemas-de-Machine-learning/challenge_1_ctrl_alt_del.git
```

Necessário fazer o download do Modelo com fine-tunning:
```
https://drive.google.com/file/d/1cEZFhgq6wpKavUVH1rmaTO5vZy_jAsxi/view?usp=sharing
```

Colocar o arquivo .gguf dentro da pasta:
``` bash
ta-certo-brasil/
│
├── backend/
│   ├── app/
│   │   └─ modelo/
           └─ mistral-7b-instruct-v0.3.Q4_K_M.gguf
```

Fazer a instalação:
``` bash
cd backend/app/modelo
ollama create ta-certo-brasil -f Modelfile
```

### Backend

Entre na pasta `backend`:

```bash
cd backend
```

Crie um ambiente virtual:
 **Windows**:
``` bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```
 **Linux / macOS**:
```bash
   python3 -m venv venv
   source venv/bin/activate
```

Instale as dependências:
``` bash
pip install -r requirements.txt
```

Execute:
```bash
uvicorn app.main:app --reload
```


### FrontEnd

Em outro terminal

```bash
cd ta_certo_brasil
npm install
npm run dev
```