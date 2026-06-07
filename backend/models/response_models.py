from pydantic import BaseModel
from typing import List


class ReviewResponse(BaseModel):
    bugs: List[str]
    performance_issues: List[str]
    best_practices: List[str]
    security_issues: List[str]
    summary: str


class AnalysisResponse(BaseModel):
    review: ReviewResponse
    fixed_code: str
    improvements: List[str]
