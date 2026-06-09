import { motion } from 'framer-motion';

export default function MissingSkills({ skills }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/20">
      <h3 className="mb-3 font-semibold text-red-700 dark:text-red-400">
        Missing Skills ({skills.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900/40 dark:text-red-300"
          >
            ✗ {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
