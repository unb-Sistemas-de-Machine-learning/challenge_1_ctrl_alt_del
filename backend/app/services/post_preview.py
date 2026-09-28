"""
Service for handling post analysis logic.
"""
from app.schemas.post_schema import PostPreviewPanel
from app.services.insta_scrapy import baixar_post
from app.services.insta_controller import get_content
from pathlib import Path


class InstagramService:

    @staticmethod
    def get_post_content(url: str) -> PostPreviewPanel:
        """
        Downloads an Instagram post and extracts its content.
        """

        shortcode = baixar_post(url)

        image, title, caption = get_content(shortcode)
        image_path = Path(image)

        image_url = "/instagram/" + str(image_path.relative_to("data/instagram")).replace("\\", "/")
        
        return PostPreviewPanel(
            imageUrl= image_url,
            extractedText= title,
            caption= caption
        )
