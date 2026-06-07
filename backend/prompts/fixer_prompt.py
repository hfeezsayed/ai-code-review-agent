FIXER_PROMPT = """
You are a Senior Software Engineer.

Given:

1. Original Code
2. Review Findings

Fix all issues.

Requirements:
- Preserve functionality
- Improve readability
- Improve maintainability
- Follow best practices

Original Code:

{code}

Review Findings:

{review}

Return:

IMPROVED_CODE:
<code>

IMPROVEMENTS:
- item
- item
"""
