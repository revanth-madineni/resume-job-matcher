import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.parser.resume_parser import extract_text_from_pdf
from backend.ml.scorer import compute_match
from backend.agent.agent import get_suggestions, generate_cover_letter

app = FastAPI(title="Resume Job Matcher API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str


class CoverLetterRequest(BaseModel):
    resume_text: str
    job_description: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    if file.content_type not in ("application/pdf", "application/octet-stream"):
        # Allow any file for text-based resumes; parse only if PDF
        pass
    data = await file.read()
    try:
        if file.filename and file.filename.lower().endswith(".pdf"):
            text = extract_text_from_pdf(data)
        else:
            text = data.decode("utf-8", errors="replace")
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"Could not parse file: {exc}")
    if not text.strip():
        raise HTTPException(status_code=422, detail="No text could be extracted from the file.")
    return {"resume_text": text}


@app.post("/analyze")
async def analyze(req: AnalyzeRequest):
    if not req.resume_text.strip() or not req.job_description.strip():
        raise HTTPException(status_code=422, detail="Both resume_text and job_description are required.")
    match = compute_match(req.resume_text, req.job_description)
    suggestions = get_suggestions(
        req.resume_text,
        req.job_description,
        match["missing_skills"],
    )
    return {
        "score": match["score"],
        "matched_skills": match["matched_skills"],
        "missing_skills": match["missing_skills"],
        "suggestions": suggestions,
    }


@app.post("/cover-letter")
async def cover_letter(req: CoverLetterRequest):
    if not req.resume_text.strip() or not req.job_description.strip():
        raise HTTPException(status_code=422, detail="Both resume_text and job_description are required.")
    letter = generate_cover_letter(req.resume_text, req.job_description)
    return {"cover_letter": letter}
