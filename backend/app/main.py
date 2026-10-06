"""
Main FastAPI application module.
Configures the app, CORS middleware, and includes API routers.
"""
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router
import os

FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI(title="Ta Certo Brasil API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.mount("/instagram", StaticFiles(directory="data/instagram"),name="instagram")