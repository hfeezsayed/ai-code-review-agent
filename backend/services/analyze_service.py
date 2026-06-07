from crewai import Crew, Task

from agents.reviewer_agent import reviewer_agent
from agents.fixer_agent import fixer_agent


def analyze_code(code: str, language: str):

    review_task = Task(
        description=f"""
        Review this {language} code:

        {code}

        Find:
        - Bugs
        - Performance Issues
        - Best Practices
        - Security Issues
        """,
        expected_output="Detailed review report",
        agent=reviewer_agent,
    )

    fix_task = Task(
        description=f"""
        Fix this code:

        {code}

        Use review findings from previous task.
        """,
        expected_output="""
        Improved code with improvements summary
        """,
        agent=fixer_agent,
    )

    crew = Crew(
        agents=[reviewer_agent, fixer_agent],
        tasks=[review_task, fix_task],
        verbose=True,
    )

    result = crew.kickoff()

    return str(result)
