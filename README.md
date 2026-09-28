# Integração do REACT com FASTAPI


## 1. Backend Setup & Startup

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
   
2. Create and activate a Python virtual environment:
   - **Windows**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **Linux / macOS**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI development server with auto-reload:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
5. Confirm the server is running by verifying health status:
   ```bash
   curl http://localhost:8000/api/health
   ```
   **Expected Response**: `{"status": "ok"}`

---

## 2. Frontend Setup & Startup

1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd ta_certo_brasil
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```
4. Access the web interface in your browser:
   ```text
   http://localhost:3000/views/input
   ```

---

Necessário rodar ambos simultaneamente!.