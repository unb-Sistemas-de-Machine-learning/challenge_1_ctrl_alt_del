import json
from unittest.mock import patch, MagicMock
from app.schemas.post_schema import PostPreviewPanel
from app.modelo.modelo_service import ModeloService


def test_modelo_service_prompt_structure():
    """Verify that system prompt enforces valid verdicts and JSON output contract."""
    service = ModeloService()
    prompt = service.prompt()

    assert "real" in prompt
    assert "fake" in prompt
    assert "Não trata-se de uma proposta de governo" in prompt
    assert "responseText" in prompt
    assert "verdict" in prompt


@patch.dict("os.environ", {"MODEL_PROVIDER": "ollama", "OLLAMA_MODEL": "ta-certo-brasil", "OLLAMA_HOST": "http://localhost:11434"})
@patch("app.modelo.modelo_service.ollama.Client")
def test_modelo_service_response_model_ollama(mock_ollama_client_class):
    """Test response_model with Ollama provider parsing JSON output."""
    mock_client = MagicMock()
    mock_ollama_client_class.return_value = mock_client
    mock_client.chat.return_value = {
        "message": {
            "content": json.dumps({
                "verdict": "real",
                "responseText": "Proposta confirmada pelo plano de metas."
            })
        }
    }

    service = ModeloService()
    post = PostPreviewPanel(
        imageUrl="/instagram/post.jpg",
        extractedText="Construção de novas UPAs",
        caption="Plano de saúde 2026",
        shortcode="xyz123"
    )

    result = service.response_model(post, "Texto de apoio da imagem")

    assert result["verdict"] == "real"
    assert "Construção de novas UPAs" in mock_client.chat.call_args[1]["messages"][1]["content"]
    assert "Texto de apoio da imagem" in mock_client.chat.call_args[1]["messages"][1]["content"]


@patch.dict("os.environ", {"MODEL_PROVIDER": "hf", "HF_SPACE_URL": "https://hf.space/api"})
@patch("app.modelo.modelo_service.requests.post")
def test_modelo_service_response_model_hf(mock_requests_post):
    """Test response_model with external HTTP API provider."""
    mock_response = MagicMock()
    mock_response.json.return_value = {
        "choices": [
            {
                "message": {
                    "content": json.dumps({
                        "verdict": "Não trata-se de uma proposta de governo",
                        "responseText": "O conteúdo analisado é apenas uma opinião política."
                    })
                }
            }
        ]
    }
    mock_requests_post.return_value = mock_response

    service = ModeloService()
    post = PostPreviewPanel(
        imageUrl="/instagram/post.jpg",
        extractedText="Opinião sobre eleições",
        caption="Comentário sobre o debate",
        shortcode="xyz456"
    )

    result = service.response_model(post, "")

    assert result["verdict"] == "Não trata-se de uma proposta de governo"
    assert "opinião" in result["responseText"]

