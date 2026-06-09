import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import LoadingScreen from './components/LoadingScreen';
import { uploadResume, analyzeMatch } from './api/matcherApi';
import './index.css';

const VIEW = { UPLOAD: 'upload', LOADING: 'loading', RESULTS: 'results' };

export default function App() {
  const [view, setView] = useState(VIEW.UPLOAD);
  const [results, setResults] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (file, jd) => {
    setJobDescription(jd);
    setError(null);
    setView(VIEW.LOADING);

    try {
      const uploadRes = await uploadResume(file);
      const text = uploadRes.data.resume_text;
      setResumeText(text);

      const analyzeRes = await analyzeMatch(text, jd);
      setResults(analyzeRes.data);
      setView(VIEW.RESULTS);
    } catch (err) {
      console.error(err);
      setError('Could not reach the backend. Showing demo data for preview.');

      // Demo data so the UI is fully explorable without a backend
      setResults({
        score: 72,
        matched_skills: ['Python', 'FastAPI', 'REST APIs', 'Docker', 'PostgreSQL', 'Git'],
        missing_skills: ['Kubernetes', 'Terraform', 'AWS Lambda', 'GraphQL'],
        suggestions: [
          'Add specific metrics to your FastAPI projects (e.g., "served 10k req/day").',
          'Mention any experience with container orchestration like Kubernetes or ECS.',
          'Include keywords: CI/CD pipelines, infrastructure as code, cloud-native.',
          'Highlight any open-source contributions to boost credibility.',
        ],
      });
      setView(VIEW.RESULTS);
    }
  };

  const handleReset = () => {
    setView(VIEW.UPLOAD);
    setResults(null);
    setResumeText('');
    setJobDescription('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 px-4 py-2 text-center text-sm text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
        >
          ⚠️ {error}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {view === VIEW.UPLOAD && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <UploadPage onSubmit={handleSubmit} />
          </motion.div>
        )}
        {view === VIEW.LOADING && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingScreen />
          </motion.div>
        )}
        {view === VIEW.RESULTS && results && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsPage
              results={results}
              resumeText={resumeText}
              jobDescription={jobDescription}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
