from unittest.mock import patch, MagicMock
from app.services.bluesky_bot import BlueskyBot


def test_bluesky_bot_real_formatting():
    """Verify formatting of positive fact-checking post."""
    message = "Proposta confirmada pelo diário oficial."
    url = "https://instagram.com/p/test1234"
    formatted = BlueskyBot.real(message, url)

    assert url in formatted
    assert "é tratado como real" in formatted
    assert message in formatted
    assert "#FakeNews #VerificaçãoDeFatos" in formatted


def test_bluesky_bot_fake_formatting():
    """Verify formatting of fake news warning post."""
    message = "Nenhum registro encontrado da proposta."
    url = "https://instagram.com/p/test5678"
    formatted = BlueskyBot.fake(message, url)

    assert url in formatted
    assert "é tratado como falso" in formatted
    assert message in formatted
    assert "#FakeNews #VerificaçãoDeFatos" in formatted


@patch("app.services.bluesky_bot.Client")
@patch.dict("os.environ", {"USUARIO": "test_user", "PASSWORD": "test_password"})
def test_bluesky_bot_send_post_real(mock_client_class):
    """Test send_post for 'real' verdict sends formatted message to Bluesky."""
    mock_client_instance = MagicMock()
    mock_client_class.return_value = mock_client_instance

    BlueskyBot.send_post("Mensagem do modelo", "real", "https://instagram.com/p/123")

    mock_client_instance.login.assert_called_once_with("test_user", "test_password")
    mock_client_instance.send_post.assert_called_once()
    sent_text = mock_client_instance.send_post.call_args[0][0]
    assert "é tratado como real" in sent_text


@patch("app.services.bluesky_bot.Client")
@patch.dict("os.environ", {"USUARIO": "test_user", "PASSWORD": "test_password"})
def test_bluesky_bot_send_post_fake(mock_client_class):
    """Test send_post for 'fake' verdict sends formatted message to Bluesky."""
    mock_client_instance = MagicMock()
    mock_client_class.return_value = mock_client_instance

    BlueskyBot.send_post("Mensagem do modelo", "fake", "https://instagram.com/p/456")

    mock_client_instance.login.assert_called_once_with("test_user", "test_password")
    mock_client_instance.send_post.assert_called_once()
    sent_text = mock_client_instance.send_post.call_args[0][0]
    assert "é tratado como falso" in sent_text


@patch("app.services.bluesky_bot.Client")
def test_bluesky_bot_send_post_handles_exception_gracefully(mock_client_class):
    """Test that errors connecting to Bluesky are caught and do not crash the app."""
    mock_client_instance = MagicMock()
    mock_client_instance.login.side_effect = Exception("Connection error")
    mock_client_class.return_value = mock_client_instance

    # Should not raise exception
    BlueskyBot.send_post("Mensagem", "real", "https://instagram.com/p/789")

