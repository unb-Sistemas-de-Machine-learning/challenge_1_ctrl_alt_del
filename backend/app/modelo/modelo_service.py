import ollama
import requests
from app.schemas.post_schema import PostPreviewPanel
import json
import os

class ModeloService:

    def __init__(self):
        self.model = os.getenv("MODEL_PROVIDER", "ollama").lower()

        if self.model == "ollama":
            self.ollama_client = ollama.Client(host=os.getenv("OLLAMA_HOST"))
            self.model_name = os.getenv("OLLAMA_MODEL")
        else:
            self.api_url = os.getenv("HF_SPACE_URL")

    def prompt(self) -> str:
        return """
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

        Se o conteúdo NÃO for uma proposta de governo:

        - "verdict" DEVE ser exatamente:
        "Não trata-se de uma proposta de governo"

        - "responseText" DEVE existir obrigatoriamente.

        - "responseText" deve ser uma explicação breve informando que o conteúdo não apresenta uma proposta de governo.

        Exemplo obrigatório:

        {
            "verdict": "Não trata-se de uma proposta de governo",
            "responseText": "O conteúdo analisado não apresenta uma proposta de governo."
}
        """

    def response_model(self, post: PostPreviewPanel, text: str):
        conteudo = (
            f"Título do POST: {post.extractedText}\n"
            f"Descrição do Post: {post.caption}\n"
            f"Textos de imagem do post: {text}"
        )

        prompt = self.prompt()

        if self.model == "ollama":
            resposta = self.ollama_client.chat(
                model=self.model_name,
                messages=[
                    {
                        "role": "system",
                        "content": prompt
                    },
                    {
                        "role": "user",
                        "content": (
                            "Conteúdo para ser analisado:\n\n"
                            f"{conteudo}"
                        )
                    }
                ],
                options={
                    "num_ctx": 4096,
                    "temperature": 0.0,
                    "max_tokens": 100
                },
                format="json"
            )

            response_text = resposta["message"]["content"]
            print(response_text)

        else:
            payload = {
                "messages": [
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": f"Conteúdo para ser analisado:\n\n{conteudo}"}
                ],
                "max_tokens": 100,
                "temperature": 0.0,
                "num_ctx": 4096
            }
            response = requests.post(
                f"{self.api_url}/v1/chat/completions",
                json=payload,
                timeout=300
            )
            response_data = response.json()

            response_text = response_data["choices"][0]["message"]["content"]

        clean_text = response_text.strip()
        data = json.loads(clean_text)
        
        return {
            "verdict": data["verdict"],
            "responseText": data["responseText"]
        }