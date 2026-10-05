import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from app.services.insta_controller import Instagram


class InstagramControllerTests(unittest.TestCase):
    def test_baixar_post_rejects_url_without_post_shortcode(self):
        with self.assertRaisesRegex(ValueError, "URL do Instagram inválida"):
            Instagram.baixar_post("https://www.instagram.com/accounts/login/")

    def test_baixar_post_downloads_post_and_returns_shortcode(self):
        with (
            patch("app.services.insta_controller.instaloader.Instaloader") as loader,
            patch(
                "app.services.insta_controller.instaloader.Post.from_shortcode",
                return_value="post",
            ) as from_shortcode,
        ):
            shortcode = Instagram.baixar_post(
                "https://www.instagram.com/p/Abc_123/?img_index=1"
            )

        self.assertEqual(shortcode, "Abc_123")
        loader.assert_called_once()
        from_shortcode.assert_called_once_with(loader.return_value.context, "Abc_123")
        loader.return_value.download_post.assert_called_once_with(
            "post", target="Abc_123"
        )

    def test_get_content_reads_image_title_and_caption(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            previous_directory = os.getcwd()
            os.chdir(temporary_directory)
            self.addCleanup(os.chdir, previous_directory)

            post_directory = Path("data/instagram/Abc_123")
            post_directory.mkdir(parents=True)
            (post_directory / "image.jpg").write_bytes(b"image")
            (post_directory / "post.txt").write_text(
                "Post title\nFirst caption line\nSecond caption line\n",
                encoding="utf-8",
            )

            image, title, caption = Instagram.get_content("Abc_123")

        self.assertEqual(image, "data/instagram/Abc_123/image.jpg")
        self.assertEqual(title, "Post title")
        self.assertEqual(caption, "First caption line\nSecond caption line")

    def test_delete_folder_removes_post_directory(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            previous_directory = os.getcwd()
            os.chdir(temporary_directory)
            self.addCleanup(os.chdir, previous_directory)

            post_directory = Path("data/instagram/Abc_123")
            post_directory.mkdir(parents=True)
            (post_directory / "image.jpg").touch()

            Instagram.delete_folder("Abc_123")

            self.assertFalse(post_directory.exists())


if __name__ == "__main__":
    unittest.main()
