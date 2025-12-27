import { ScoreCategory } from '../../types';

interface ScoreCardProps {
  score: ScoreCategory;
  index: number;
}

export default function ScoreCard({ score, index }: ScoreCardProps) {
  return (
    <div
      className="slide-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {score.category}
        </span>
        <span className="text-gray-900 dark:text-white font-semibold">
          {score.score.toFixed(1)}/10
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full progress-grow"
          style={{ width: `${score.score * 10}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {score.description}
      </p>
    </div>
  );
}
