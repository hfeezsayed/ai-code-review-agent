from pydantic import BaseModel


class CodeAnalysisRequest(BaseModel):
    code: str
    language: str
