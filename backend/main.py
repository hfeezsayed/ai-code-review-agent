from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.openai_service import test_openai
from services.review_service import review_code
from services.crew_service import run_review_agent

from routes.analyze_route import router as analyze_router

# Create FastAPI app first
app = FastAPI(title="AI Code Review Agent", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(analyze_router)


@app.get("/")
def root():
    return {"message": "AI Code Review Agent API Running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/test-ai")
def test_ai():
    result = test_openai()

    return {"response": result}


@app.get("/review-demo")
def review_demo():

    sample_code = """
def divide(a,b):
    return a/b

print(divide(10,0))
"""

    result = review_code(sample_code, "python")

    return {"review": result}


@app.get("/crew-review")
def crew_review():

    sample_code = """
def divide(a,b):
    return a/b

print(divide(10,0))
"""

    result = run_review_agent(sample_code, "python")

    return {"review": result}
