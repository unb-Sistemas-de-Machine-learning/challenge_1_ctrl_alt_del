Para uma melhor padronização de respostas e coleta de requests foi criado alguns **Schemas**:


## Schemas criados

``` python
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

class BlueSkyResponse (BaseModel):
  verdict: str
  responseText: str
  url: str
```

Esses Schemas são utilizados para as respostas serem enviadas de uma melhor forma, pois assim, os resultados já são esperados do outro lado.