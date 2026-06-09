import json
import os
import anthropic
from backend.agent.prompts import (
    SUGGESTIONS_SYSTEM, SUGGESTIONS_USER,
    COVER_LETTER_SYSTEM, COVER_LETTER_USER,
)

_client: anthropic.Anthropic | None = None

MODEL = "claude-opus-4-8"


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        api_key = os.environ.get("ANTHROPIC_API_KEY", "")
        if not api_key:
            raise EnvironmentError("ANTHROPIC_API_KEY is not set.")
        _client = anthropic.Anthropic(api_key=api_key)
    return _client


def get_suggestions(resume_text: str, job_description: str, missing_skills: list[str]) -> list[str]:
    client = _get_client()
    user_msg = SUGGESTIONS_USER.format(
        resume_text=resume_text[:3000],
        job_description=job_description[:2000],
        missing_skills=", ".join(missing_skills[:10]) or "none identified",
    )
    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        thinking={"type": "adaptive"},
        system=SUGGESTIONS_SYSTEM,
        messages=[{"role": "user", "content": user_msg}],
    )
    # Extract text block
    text = next((b.text for b in response.content if b.type == "text"), "[]")
    try:
        suggestions = json.loads(text)
        if isinstance(suggestions, list):
            return [str(s) for s in suggestions[:4]]
    except json.JSONDecodeError:
        pass
    # Fallback: split by newline if JSON parse fails
    lines = [l.strip("- •1234567890.) ").strip() for l in text.splitlines() if l.strip()]
    return [l for l in lines if l][:4]


def generate_cover_letter(resume_text: str, job_description: str) -> str:
    client = _get_client()
    user_msg = COVER_LETTER_USER.format(
        resume_text=resume_text[:3000],
        job_description=job_description[:2000],
    )
    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        thinking={"type": "adaptive"},
        system=COVER_LETTER_SYSTEM,
        messages=[{"role": "user", "content": user_msg}],
    )
    text = next((b.text for b in response.content if b.type == "text"), "")
    return text.strip()
