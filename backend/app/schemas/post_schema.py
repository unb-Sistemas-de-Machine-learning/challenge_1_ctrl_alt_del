from pydantic import BaseModel, Field
"""
Pydantic schemas for the FastAPI Instagram‑post analysis API.
The request model uses a plain string for `url`; validation is performed
in the endpoint so we can return a `400 Bad Request` instead of FastAPI's
default `422 Unprocessable Entity`.
"""

from pydantic import BaseModel

class InstagramPostSubmissionRequest(BaseModel):
    url: str = Field(pattern=r'^https?://(www\.)?instagram\.com/p/[A-Za-z0-9_-]+/?(\?.*)?$')
    url: str

class Source(BaseModel):
    title: str
    url: str

class AnalysisResultResponse(BaseModel):
    verdict: str
    responseText: str

class ErrorResponse(BaseModel):
    detail: str
    errorCode: str

class PostPreviewPanel(BaseModel):
    imageUrl: str
    extractedText: str
    caption: str
    shortcode: str

