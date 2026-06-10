from crewai import Task

from agents.reviewer_agent import reviewer_agent
from agents.fixer_agent import fixer_agent


def analyze_code(code: str, language: str):

    # REVIEW TASK
    review_task = Task(
        description=f"""
Review this {language} code:

{code}

Return the review in markdown format.

Format:

## Bugs
- Bug 1
- Bug 2

## Performance Issues
- Issue 1

## Best Practices
- Practice 1
- Practice 2

## Security Issues
- Security Issue 1

## Summary
- Summary point
""",
        expected_output="Structured code review report",
        agent=reviewer_agent,
    )

    review_result = reviewer_agent.execute_task(review_task)

    # FIX TASK
    fix_task = Task(
        description=f"""
Fix and optimize this {language} code:

{code}

Return the result in markdown format.

Format:

## Fixed Code

Improved code here

## Improvements

- Improvement 1
- Improvement 2
- Improvement 3
""",
        expected_output="Fixed code and improvements report",
        agent=fixer_agent,
    )

    fix_result = fixer_agent.execute_task(fix_task)

    # Convert to string
    review_result = str(review_result)
    fix_result = str(fix_result)

    # Default values
    fixed_code = fix_result
    improvements = "No improvements found"

    # Extract Improvements section
    if "## Improvements" in fix_result:
        parts = fix_result.split("## Improvements", 1)

        fixed_code = parts[0].strip()
        improvements = parts[1].strip()

    return {
        "review": review_result,
        "fixed_code": fixed_code,
        "improvements": improvements,
    }
