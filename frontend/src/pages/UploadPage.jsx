import { useState } from 'react';
import { motion } from 'framer-motion';
import FileDropZone from '../components/FileDropZone';
import JobDescriptionInput from '../components/JobDescriptionInput';

export default function UploadPage({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');

  const canSubmit = file && jd.trim().length > 50;

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Resume<span className="text-violet-600"> Match</span> Scorer
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Upload your resume and paste a job description — AI will score the fit and suggest improvements.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <FileDropZone onFileAccepted={setFile} />
          <JobDescriptionInput value={jd} onChange={setJd} />

          <motion.button
            whileHover={{ scale: canSubmit ? 1.02 : 1 }}
            whileTap={{ scale: canSubmit ? 0.98 : 1 }}
            disabled={!canSubmit}
            onClick={() => onSubmit(file, jd)}
            className={`w-full rounded-2xl py-4 text-base font-semibold transition-all ${
              canSubmit
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700 dark:shadow-violet-900'
                : 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
            }`}
          >
            {canSubmit ? 'Analyze Match →' : 'Upload PDF + add job description to continue'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
