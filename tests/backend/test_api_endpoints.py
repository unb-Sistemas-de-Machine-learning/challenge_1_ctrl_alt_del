from unittest.mock import patch
from app.schemas.post_schema import PostPreviewPanel, AnalysisResultResponse


def test_health_check_returns_ok(client):
    """Integration test for health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_scrapy_post_invalid_url_returns_422(client):
    """Test URL validation on /api/scrapy: non-feed URLs must return 422."""
    response = client.post("/api/scrapy", json={"url": "https://invalid-url.com/something"})
    assert response.status_code == 422


def test_scrapy_post_stories_or_profile_url_returns_422(client):
    """Instagram URLs without /p/ format should be rejected with 422."""
    response = client.post("/api/scrapy", json={"url": "https://www.instagram.com/stories/user/12345/"})
    assert response.status_code == 422


@patch("app.api.endpoints.InstagramService.get_post_content")
def test_scrapy_post_valid_url_success(mock_get_content, client):
    """Test happy path for /api/scrapy using public seam with mocked external scraper."""
    mock_get_content.return_value = PostPreviewPanel(
        imageUrl="/instagram/abc123_1.jpg",
        extractedText="Texto do Post",
        caption="Legenda do post",
        shortcode="abc123"
    )

    valid_url = "https://www.instagram.com/p/DFzL123abc/"
    response = client.post("/api/scrapy", json={"url": valid_url})

    assert response.status_code == 200
    data = response.json()
    assert data["imageUrl"] == "/instagram/abc123_1.jpg"
    assert data["extractedText"] == "Texto do Post"
    assert data["caption"] == "Legenda do post"
    assert data["shortcode"] == "abc123"
    mock_get_content.assert_called_once_with(valid_url)


@patch("app.api.endpoints.AnalysisService.analyze_post")
@patch("app.api.endpoints.Instagram.delete_folder")
@patch("app.api.endpoints.tesseract_ocr.extract_text_from_image")
def test_analyse_response_success(mock_ocr, mock_delete, mock_analyze, client):
    """Test /api/modelo endpoint combining OCR extraction and model analysis."""
    mock_ocr.return_value = "Texto extraído da imagem via OCR"
    mock_analyze.return_value = AnalysisResultResponse(
        verdict="real",
        responseText="A proposta corresponde a projeto oficial divulgado."
    )

    payload = {
        "imageUrl": "/instagram/abc123_1.jpg",
        "extractedText": "Título da proposta",
        "caption": "Legenda explicativa",
        "shortcode": "abc123"
    }

    response = client.post("/api/modelo", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["verdict"] == "real"
    assert "proposta corresponde" in data["responseText"]

    mock_ocr.assert_called_once_with("abc123")
    mock_delete.assert_called_once_with("abc123")


@patch("app.api.endpoints.BlueskyBot.send_post")
def test_send_post_to_bluesky_endpoint(mock_send_post, client):
    """Test /api/bluesky endpoint receives verification payload and triggers bot."""
    payload = {
        "responseText": "Proposta real e confirmada",
        "verdict": "real",
        "url": "https://www.instagram.com/p/DFzL123abc/"
    }

    response = client.post("/api/bluesky", json=payload)
    assert response.status_code == 200
    mock_send_post.assert_called_once_with(
        "Proposta real e confirmada",
        "real",
        "https://www.instagram.com/p/DFzL123abc/"
    )
