"""
Service for handling post analysis logic.
"""
from app.schemas.post_schema import AnalysisResultResponse
from app.schemas.post_schema import PostPreviewPanel
from app.modelo.modelo_service import ModeloService

class AnalysisService:
    @staticmethod
    def analyze_post(post: PostPreviewPanel, text: str) -> AnalysisResultResponse:
        
        modelo_service = ModeloService()
        data = modelo_service.response_model(post, text)

        return AnalysisResultResponse(
            verdict=data["verdict"],
            responseText=data["responseText"]
        )