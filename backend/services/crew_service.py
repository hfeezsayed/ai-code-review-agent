from crewai import Crew
from crewai import Task

from agents.reviewer_agent import reviewer_agent


def run_review_agent(code, language):

    review_task = Task(
        description=f"""
        Analyze the following {language} code.

        Code:

        {code}

        Return:

        1. Bugs
        2. Performance Issues
        3. Best Practices
        4. Security Issues
        5. Summary
        """,
        expected_output="""
        Structured code review report
        """,
        agent=reviewer_agent,
    )

    crew = Crew(agents=[reviewer_agent], tasks=[review_task])

    result = crew.kickoff()

    return str(result)
