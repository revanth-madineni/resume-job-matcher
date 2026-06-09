import { motion, AnimatePresence } from 'framer-motion';

export default function CoverLetterModal({ text, onClose }) {
  const copy = () => navigator.clipboard.writeText(text);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Cover Letter
            </h2>
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700 transition hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-300"
              >
                Copy
              </button>
              <button
                onClick={onClose}
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
              >
                Close
              </button>
            </div>
          </div>
          <div className="max-h-[60vh] overflow-y-auto rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {text}
            </pre>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
