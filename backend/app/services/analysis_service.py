"""
Service for handling post analysis logic.
"""
from app.schemas.post_schema import AnalysisResultResponse
from app.schemas.post_schema import PostPreviewPanel
import json
import os
import ollama


class AnalysisService:
    @staticmethod
    def analyze_post(post: PostPreviewPanel) -> AnalysisResultResponse:
        conteudo = post.extractedText + " " + post.caption

        resposta = ollama.chat(
            model="ta-certo-brasil",
            messages=[
                {
                    "role": "system",
                    "content": """
        Você é um sistema especializado em verificar propostas de governo.

        Analise o conteúdo fornecido e determine se a proposta apresentada é
        real ou enganosa.

        Se o conteúdo fornecido não tratar de uma proposta de governo

        Retorne SOMENTE um JSON válido, sem markdown e sem explicações fora do JSON.

        O JSON deve obrigatoriamente possuir esta estrutura:

        {
            "verdict": "real" ou "fake",
            "responseText": "explicação breve da análise",
            "sources": [
                {
                    "title": "nome da fonte",
                    "url": "URL da fonte"
                }
            ],
            "highlightedTerms": [
                "termo1",
                "termo2"
            ]
        }

        Regras:
        - "verdict" deve ser somente "real" ou "fake".
        - "responseText" deve explicar brevemente o motivo da classificação.
        - "sources" deve conter as fontes utilizadas, quando disponíveis.
        - "highlightedTerms" deve conter palavras ou expressões relevantes encontradas no conteúdo.
        - Não adicione nenhum campo além dos especificados.
        """
                },
                {
                    "role": "user",
                    "content": f"""
        Analise o seguinte conteúdo:

        {conteudo}
        """
                }
            ]
        )

        response = resposta["message"]["content"]

        data = json.loads(response)

        return AnalysisResultResponse(
            verdict=data["verdict"],
            responseText=data["responseText"],
            sources=data["sources"],
            highlightedTerms=data["highlightedTerms"]
        )