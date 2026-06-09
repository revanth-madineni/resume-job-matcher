import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({ baseURL: API_BASE });

export const uploadResume = (file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/upload-resume', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const analyzeMatch = (resumeText, jobDescription) =>
  api.post('/analyze', { resume_text: resumeText, job_description: jobDescription });

export const generateCoverLetter = (resumeText, jobDescription) =>
  api.post('/cover-letter', { resume_text: resumeText, job_description: jobDescription });
