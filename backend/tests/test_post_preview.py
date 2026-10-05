import unittest
from unittest.mock import patch

from app.schemas.post_schema import PostPreviewPanel
from app.services.post_preview import InstagramService


class InstagramServiceTests(unittest.TestCase):
    def test_get_post_content_downloads_post_and_builds_preview(self):
        with (
            patch(
                "app.services.post_preview.Instagram.baixar_post",
                return_value="Abc_123",
            ) as download_post,
            patch(
                "app.services.post_preview.Instagram.get_content",
                return_value=(
                    "data/instagram/Abc_123/image.jpg",
                    "Post title",
                    "Post caption",
                ),
            ) as get_content,
        ):
            result = InstagramService.get_post_content(
                "https://www.instagram.com/p/Abc_123/"
            )

        download_post.assert_called_once_with("https://www.instagram.com/p/Abc_123/")
        get_content.assert_called_once_with("Abc_123")
        self.assertEqual(
            result,
            PostPreviewPanel(
                imageUrl="/instagram/Abc_123/image.jpg",
                extractedText="Post title",
                caption="Post caption",
                shortcode="Abc_123",
            ),
        )


if __name__ == "__main__":
    unittest.main()
