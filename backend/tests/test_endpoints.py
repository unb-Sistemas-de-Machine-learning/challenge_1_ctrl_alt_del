import unittest
from unittest.mock import patch

from fastapi import HTTPException

from app.api.endpoints import analyse_response, health_check, scrapy_post
from app.schemas.post_schema import (
    AnalysisResultResponse,
    InstagramPostSubmissionRequest,
    PostPreviewPanel,
)


class EndpointTests(unittest.TestCase):
    def test_scrapy_post_accepts_instagram_feed_post_and_forwards_url(self):
        request = InstagramPostSubmissionRequest(
            url="https://www.instagram.com/p/Abc_123/?utm_source=test"
        )
        preview = PostPreviewPanel(
            imageUrl="/instagram/Abc_123/image.jpg",
            extractedText="A title",
            caption="A caption",
            shortcode="Abc_123",
        )

        with patch(
            "app.api.endpoints.InstagramService.get_post_content",
            return_value=preview,
        ) as get_post_content:
            result = scrapy_post(request)

        get_post_content.assert_called_once_with(request.url)
        self.assertEqual(result, preview)

    def test_scrapy_post_rejects_non_feed_urls(self):
        invalid_urls = (
            "https://instagram.com/reel/Abc_123/",
            "https://example.com/p/Abc_123/",
            "https://instagram.com/p/",
            "ftp://instagram.com/p/Abc_123/",
        )

        for url in invalid_urls:
            with self.subTest(url=url):
                with self.assertRaises(HTTPException) as raised:
                    request = InstagramPostSubmissionRequest.model_construct(url=url)
                    scrapy_post(request)

                self.assertEqual(raised.exception.status_code, 400)
                self.assertEqual(
                    raised.exception.detail,
                    "Invalid Instagram post URL. Only feed posts (/p/) are accepted.",
                )

    def test_analyse_response_extracts_text_cleans_up_and_analyzes_post(self):
        request = PostPreviewPanel(
            imageUrl="/instagram/Abc_123/image.jpg",
            extractedText="A title",
            caption="A caption",
            shortcode="Abc_123",
        )
        result = AnalysisResultResponse(
            verdict="fake",
            responseText="This proposal is not supported by the source.",
        )

        with (
            patch(
                "app.api.endpoints.tesseract_ocr.extract_text_from_image",
                return_value="OCR text",
            ) as extract_text,
            patch("app.api.endpoints.Instagram.delete_folder") as delete_folder,
            patch(
                "app.api.endpoints.AnalysisService.analyze_post",
                return_value=result,
            ) as analyze_post,
        ):
            response = analyse_response(request)

        extract_text.assert_called_once_with("Abc_123")
        delete_folder.assert_called_once_with("Abc_123")
        analyze_post.assert_called_once_with(request, "OCR text")
        self.assertEqual(response, result)

    def test_health_check_returns_ok_status(self):
        self.assertEqual(health_check(), {"status": "ok"})


if __name__ == "__main__":
    unittest.main()
