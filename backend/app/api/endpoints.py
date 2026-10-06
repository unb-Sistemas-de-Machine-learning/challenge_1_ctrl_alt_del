from fastapi import APIRouter
from fastapi import APIRouter, HTTPException
import re
from app.schemas.post_schema import InstagramPostSubmissionRequest, PostPreviewPanel, BlueSkyResponse
from app.services.post_preview import InstagramService
from app.services.analysis_service import AnalysisService
from app.services.insta_controller import Instagram
from app.services.ocr_service import TesseractOCR
from app.services.bluesky_bot import BlueskyBot


router = APIRouter()
tesseract_ocr = TesseractOCR()

@router.post("/scrapy", response_model=PostPreviewPanel)
def scrapy_post(request: InstagramPostSubmissionRequest):

    pattern = r'^https?://(www\.)?instagram\.com/p/[A-Za-z0-9_-]+/?(\?.*)?$'

    if not re.match(pattern, request.url):
        raise HTTPException(status_code=400, detail="Invalid Instagram post URL. Only feed posts (/p/) are accepted.")

    return InstagramService.get_post_content(request.url)


@router.post("/modelo")
def analyse_response(request: PostPreviewPanel):
    text = tesseract_ocr.extract_text_from_image(request.shortcode)
    Instagram.delete_folder(request.shortcode)
    return AnalysisService.analyze_post(request, text)

@router.post("/bluesky")
def send_post_to_bluesky(request: BlueSkyResponse):
    return BlueskyBot.send_post(request.responseText, request.verdict, request.url)

@router.get("/health")
def health_check():
    return {"status": "ok"}
