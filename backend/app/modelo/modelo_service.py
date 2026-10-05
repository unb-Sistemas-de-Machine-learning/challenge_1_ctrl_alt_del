import ollama
from app.schemas.post_schema import PostPreviewPanel
import json
import os

class ModeloService:

    def __init__(self):
        self.model = ollama.Client(host=os.getenv("OLLAMA_HOST"))

    def response_model(self,post: PostPreviewPanel, text: str):
        conteudo = "Título do POST: " + post.extractedText + " Descrição do Post: " + post.caption + " \n Textos de imagem do post: " + text

        resposta = self.model.chat(
            model=os.getenv("OLLAMA_MODEL"),
            messages=[
                {
                    "role": "system",
                    "content": """
        Você é um sistema especializado EXCLUSIVAMENTE em verificar propostas de governo.

        Sua tarefa é analisar o conteúdo fornecido e determinar se ele apresenta uma proposta de governo.

        Existem três possíveis classificações:

        1. "real"
        Use somente quando o conteúdo apresentar uma proposta de governo e houver evidências suficientes de que essa proposta corresponde a uma proposta oficial.

        2. "fake"
        Use somente quando o conteúdo apresentar uma proposta de governo, mas houver evidências de que a informação é falsa, distorcida ou não corresponde à proposta oficial.

        3. "Não trata-se de uma proposta de governo"
        Use quando o conteúdo NÃO apresentar uma proposta de governo.


        IMPORTANTE:
        Uma notícia, reportagem, acontecimento, opinião, comentário político, declaração, crítica ou informação sobre um político NÃO deve ser classificada como "fake" apenas por não ser uma proposta de governo.

        Não existe a necessidade de apresentar "sources" e "highlightedTerms" quando o conteúdo não for uma proposta de governo.

        Se o conteúdo não for uma proposta de governo, obrigatoriamente utilize:

        "verdict": "Não trata-se de uma proposta de governo"

        e não utilize "fake".

        Retorne SOMENTE um JSON válido, sem explicações fora do JSON.

        A estrutura obrigatória é:

        {
            "verdict": "real",
            "responseText": "explicação breve da análise",
        }

        Regras:

        - "verdict" deve ser EXATAMENTE um dos seguintes valores:
        - "real"
        - "fake"
        - "Não trata-se de uma proposta de governo"

        - "real" e "fake" somente podem ser utilizados quando o conteúdo apresentar uma PROPOSTA DE GOVERNO.

        - Notícias que não apresentem uma proposta de governo devem receber:
        "Não trata-se de uma proposta de governo"

        - "responseText" deve explicar brevemente o motivo da classificação.


        - Não adicione nenhum campo além de:
        "verdict" e "responseText".
        """
                },
                {
                    "role": "user",
                    "content": f"""
        Conteúdo para ser análisado:

        {conteudo}
        """
                }
            ]
        )

        response = resposta["message"]["content"]

        data = json.loads(response)


        return data
