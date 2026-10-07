FROM python:3.12-slim

ARG FRONTEND_URL
ARG USUARIO
ARG PASSWORD
ARG OLLAMA_MODEL
ARG OLLAMA_HOST
ARG HF_SPACE_URL

ENV FRONTEND_URL=$FRONTEND_URL
ENV USUARIO=$USUARIO
ENV PASSWORD=$PASSWORD
ENV OLLAMA_MODEL=$OLLAMA_MODEL
ENV OLLAMA_HOST=$OLLAMA_HOST
ENV HF_SPACE_URL=$HF_SPACE_URL

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-por \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*
    
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY data ./data

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]