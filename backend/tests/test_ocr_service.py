import unittest
from unittest.mock import patch

from app.services.ocr_service import TesseractOCR


class TesseractOCRTests(unittest.TestCase):
    def setUp(self):
        self.ocr = TesseractOCR()

    def test_extract_text_from_image_processes_supported_image_files(self):
        with (
            patch(
                "app.services.ocr_service.os.listdir",
                return_value=["first.jpg", "notes.txt", "second.png", "third.jpeg"],
            ),
            patch.object(
                self.ocr, "collect_text", return_value="recognized text"
            ) as collect_text,
        ):
            result = self.ocr.extract_text_from_image("Abc_123")

        self.assertEqual(result, "recognized text")
        self.assertEqual(
            collect_text.call_args.args[0],
            [
                "data/instagram/Abc_123/first.jpg",
                "data/instagram/Abc_123/second.png",
                "data/instagram/Abc_123/third.jpeg",
            ],
        )

    def test_extract_text_from_image_returns_message_when_directory_is_missing(self):
        with patch(
            "app.services.ocr_service.os.listdir",
            side_effect=FileNotFoundError,
        ):
            result = self.ocr.extract_text_from_image("missing")

        self.assertEqual(result, "Diretório não encontrado.")

    def test_extract_text_from_image_returns_message_when_no_images_exist(self):
        with patch("app.services.ocr_service.os.listdir", return_value=["post.txt"]):
            result = self.ocr.extract_text_from_image("Abc_123")

        self.assertEqual(result, "Nenhuma imagem encotnrada.")

    def test_collect_text_concatenates_text_from_each_image(self):
        with (
            patch(
                "app.services.ocr_service.Image.open",
                side_effect=["first image", "second image"],
            ),
            patch(
                "app.services.ocr_service.pytesseract.pytesseract.image_to_string",
                side_effect=["first text", " second text"],
            ) as image_to_string,
        ):
            result = self.ocr.collect_text(["first.jpg", "second.jpg"])

        self.assertEqual(result, "first text second text")
        self.assertEqual(image_to_string.call_count, 2)

    def test_collect_text_returns_error_when_image_processing_fails(self):
        with patch(
            "app.services.ocr_service.Image.open",
            side_effect=OSError("image cannot be opened"),
        ):
            result = self.ocr.collect_text(["broken.jpg"])

        self.assertEqual(result, "error")


if __name__ == "__main__":
    unittest.main()
