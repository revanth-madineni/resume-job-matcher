from backend.nlp.skill_extractor import extract_skills
from backend.nlp.keyword_matcher import cosine_score


def compute_match(resume_text: str, job_description: str) -> dict:
    resume_skills = set(extract_skills(resume_text))
    jd_skills = set(extract_skills(job_description))

    matched = sorted(resume_skills & jd_skills)
    missing = sorted(jd_skills - resume_skills)

    # TF-IDF cosine similarity as base score, scaled to 0-100
    similarity = cosine_score(resume_text, job_description)

    # Blend: 60% cosine similarity + 40% skill overlap ratio
    if jd_skills:
        skill_ratio = len(matched) / len(jd_skills)
    else:
        skill_ratio = similarity  # fallback if JD has no recognised skills

    blended = 0.6 * similarity + 0.4 * skill_ratio
    score = round(min(max(blended * 100, 0), 100))

    return {
        "score": score,
        "matched_skills": matched,
        "missing_skills": missing,
    }
