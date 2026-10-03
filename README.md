## Como executar localmente

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

---

## 🐳 Como executar com Docker

### Backend

Na raiz do projeto:

``` bash
docker compose up --build
```

---