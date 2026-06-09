import { motion } from 'framer-motion';

export default function MatchedSkills({ skills }) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/20">
      <h3 className="mb-3 font-semibold text-green-700 dark:text-green-400">
        Matched Skills ({skills.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300"
          >
            ✓ {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
