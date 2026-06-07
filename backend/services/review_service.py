from services.langchain_service import ask_llm

from prompts.reviewer_prompt import REVIEWER_PROMPT


def review_code(code: str, language: str):

    prompt = REVIEWER_PROMPT.format(code=code, language=language)

    result = ask_llm(prompt)

    return result
