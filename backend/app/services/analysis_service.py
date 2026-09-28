"""
Service for handling post analysis logic.
"""
from app.schemas.post_schema import AnalysisResultResponse
from app.schemas.post_schema import PostPreviewPanel

class AnalysisService:
    @staticmethod
    def analyze_post(post: PostPreviewPanel) -> AnalysisResultResponse:


        return AnalysisResultResponse(
            verdict="real",
            responseText="A análise indica que a informação compartilhada neste post é enganosa. Não há evidências oficiais que corroborem as alegações.",
            sources=[
                {"title": "G1 - Fato ou Fake", "url": "https://g1.globo.com/fato-ou-fake"},
                {"title": "Agência Lupa", "url": "https://lupa.uol.com.br"}
            ],
            highlightedTerms=["urgente", "compartilhe", "governo", "secreto"]
        )
