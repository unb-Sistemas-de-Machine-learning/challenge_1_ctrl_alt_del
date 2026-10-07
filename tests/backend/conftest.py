import os
import sys
from pathlib import Path
import pytest
from fastapi.testclient import TestClient

# Ensure backend directory is in sys.path
backend_dir = Path(__file__).resolve().parent.parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Ensure required static directory exists so app.main mounts without error
os.makedirs("data/instagram", exist_ok=True)

from app.main import app

@pytest.fixture
def client():
    return TestClient(app)

