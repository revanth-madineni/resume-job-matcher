import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STEPS = [
  { icon: '📄', label: 'Parsing resume...' },
  { icon: '🔍', label: 'Extracting skills with NLP...' },
  { icon: '🤖', label: 'Running ML scorer...' },
  { icon: '✨', label: 'Generating suggestions...' },
];

export default function LoadingScreen() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= STEPS.length - 1) return;
    const t = setTimeout(() => setCurrent((c) => c + 1), 1800);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        className="text-5xl"
      >
        ⚙️
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: i <= current ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="text-2xl">{step.icon}</span>
            <span
              className={`text-sm font-medium transition-colors ${
                i < current
                  ? 'text-green-500'
                  : i === current
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
            {i < current && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto text-green-500"
              >
                ✓
              </motion.span>
            )}
            {i === current && (
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
                className="ml-auto text-xs text-violet-500"
              >
                Processing...
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
