import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

function scoreColor(score) {
  if (score >= 75) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function scoreLabel(score) {
  if (score >= 75) return 'Strong Match';
  if (score >= 50) return 'Partial Match';
  return 'Weak Match';
}

export default function MatchScoreCircle({ score }) {
  const color = scoreColor(score);
  const data = [{ value: score, fill: color }];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <RadialBarChart
          width={200}
          height={200}
          cx={100}
          cy={100}
          innerRadius={70}
          outerRadius={90}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#e5e7eb' }} />
        </RadialBarChart>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className="text-4xl font-bold" style={{ color }}>
            {score}%
          </span>
        </motion.div>
      </div>

      <span className="text-sm font-semibold" style={{ color }}>
        {scoreLabel(score)}
      </span>
    </div>
  );
}
