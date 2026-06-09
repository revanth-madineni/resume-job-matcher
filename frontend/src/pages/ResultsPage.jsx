import { useState } from 'react';
import { motion } from 'framer-motion';
import MatchScoreCircle from '../components/MatchScoreCircle';
import MatchedSkills from '../components/MatchedSkills';
import MissingSkills from '../components/MissingSkills';
import Suggestions from '../components/Suggestions';
import CoverLetterModal from '../components/CoverLetterModal';
import { generateCoverLetter } from '../api/matcherApi';

export default function ResultsPage({ results, resumeText, jobDescription, onReset }) {
  const { score, matched_skills, missing_skills, suggestions } = results;

  const [coverLetter, setCoverLetter] = useState(null);
  const [loadingCL, setLoadingCL] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCoverLetter = async () => {
    if (coverLetter) { setShowModal(true); return; }
    setLoadingCL(true);
    try {
      const res = await generateCoverLetter(resumeText, jobDescription);
      setCoverLetter(res.data.cover_letter);
      setShowModal(true);
    } catch {
      alert('Failed to generate cover letter. Make sure the backend is running.');
    } finally {
      setLoadingCL(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Match Report</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Here's how your resume stacks up</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <MatchScoreCircle score={score} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MatchedSkills skills={matched_skills} />
          <MissingSkills skills={missing_skills} />
        </div>

        <Suggestions suggestions={suggestions} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleCoverLetter}
            disabled={loadingCL}
            className="flex-1 rounded-2xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
          >
            {loadingCL ? 'Generating...' : coverLetter ? 'View Cover Letter' : 'Generate Cover Letter'}
          </button>
          <button
            onClick={onReset}
            className="flex-1 rounded-2xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Analyze Another Resume
          </button>
        </div>
      </motion.div>

      {showModal && coverLetter && (
        <CoverLetterModal text={coverLetter} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
