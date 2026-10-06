"""
Service for handling post analysis logic.
"""
from app.schemas.post_schema import PostPreviewPanel
from pathlib import Path
from app.services.insta_controller import Instagram

class InstagramService:

    @staticmethod
    def get_post_content(url: str) -> PostPreviewPanel:

        shortcode = Instagram.baixar_post(url)
        image, title, caption = Instagram.get_content(shortcode)
        image_path = Path(image)
        image_url = "/instagram/" + str(image_path.relative_to("data/instagram")).replace("\\", "/")
        
        return PostPreviewPanel(
            imageUrl= image_url,
            extractedText= title,
            caption= caption,
            shortcode= shortcode
        )
