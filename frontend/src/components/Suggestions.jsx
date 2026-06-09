import { motion } from 'framer-motion';

export default function Suggestions({ suggestions }) {
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/20">
      <h3 className="mb-3 font-semibold text-violet-700 dark:text-violet-400">
        AI Suggestions
      </h3>
      <ul className="flex flex-col gap-3">
        {suggestions.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3 text-sm text-gray-700 dark:text-gray-300"
          >
            <span className="mt-0.5 shrink-0 text-violet-500">→</span>
            <span>{s}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
