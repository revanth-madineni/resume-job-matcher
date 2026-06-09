SUGGESTIONS_SYSTEM = (
    "You are a professional career coach and resume expert. "
    "Give concise, actionable advice. Respond ONLY with a JSON array of strings — "
    "no markdown fences, no extra keys, no explanation outside the array."
)

SUGGESTIONS_USER = """
Resume:
{resume_text}

Job Description:
{job_description}

Missing skills identified: {missing_skills}

Provide exactly 4 short, specific suggestions (each under 25 words) the candidate should act on to improve their match for this role.
Return a raw JSON array, e.g.: ["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4"]
"""

COVER_LETTER_SYSTEM = (
    "You are an expert cover letter writer. "
    "Write a professional, personalized cover letter in plain text (no markdown). "
    "Keep it under 350 words. Do not include a date or address header."
)

COVER_LETTER_USER = """
Resume:
{resume_text}

Job Description:
{job_description}

Write a compelling cover letter for this candidate applying to this role.
"""
