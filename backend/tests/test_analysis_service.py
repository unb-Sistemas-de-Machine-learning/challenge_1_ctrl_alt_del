import unittest
from unittest.mock import patch

from app.schemas.post_schema import AnalysisResultResponse, PostPreviewPanel
from app.services.analysis_service import AnalysisService


class AnalysisServiceTests(unittest.TestCase):
    def test_analyze_post_passes_content_to_model_and_returns_response_schema(self):
        post = PostPreviewPanel(
            imageUrl="/instagram/shortcode/image.jpg",
            extractedText="Post title",
            caption="Post caption",
            shortcode="shortcode",
        )
        model_result = {
            "verdict": "real",
            "responseText": "The post describes a government proposal.",
        }

        with patch("app.services.analysis_service.ModeloService") as model_service:
            model_service.return_value.response_model.return_value = model_result

            result = AnalysisService.analyze_post(post, "recognized text")

        model_service.return_value.response_model.assert_called_once_with(
            post, "recognized text"
        )
        self.assertEqual(
            result,
            AnalysisResultResponse(
                verdict="real",
                responseText="The post describes a government proposal.",
            ),
        )


if __name__ == "__main__":
    unittest.main()
