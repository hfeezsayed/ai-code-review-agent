from fastapi import APIRouter

from models.request_models import CodeAnalysisRequest

from services.analyze_service import analyze_code

router = APIRouter()


@router.post("/analyze-code")
def analyze(payload: CodeAnalysisRequest):

    result = analyze_code(payload.code, payload.language)

    return result
