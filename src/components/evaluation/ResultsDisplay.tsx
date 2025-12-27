import { EvaluationResult } from '../../types';
import { Loader2, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import Card from '../ui/Card';

interface ResultsDisplayProps {
  loading: boolean;
  result: EvaluationResult | null;
  error: string | null;
}

export default function ResultsDisplay({ loading, result, error }: ResultsDisplayProps) {
  // Empty state
  if (!loading && !result && !error) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <Lightbulb className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Ready to Evaluate
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your prompt, select a mode, and click "Evaluate" to get started.
        </p>
      </Card>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Analyzing your prompt...
        </p>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="p-8 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <div className="flex items-start gap-3 text-red-700 dark:text-red-300">
          <XCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Evaluation Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </Card>
    );
  }

  // Results state
  if (result) {
    return (
      <div className="space-y-6">
        {/* Overall Score */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Overall Score
          </h3>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {result.overallScore.toFixed(1)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">/ 10</div>
          </div>
        </Card>

        {/* Category Scores */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Category Scores
          </h3>
          <div className="space-y-4">
            {result.scores.map((score, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {score.category}
                  </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {score.score.toFixed(1)}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${score.score * 10}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {score.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths */}
        {result.strengths.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Strengths
              </h3>
            </div>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Weaknesses */}
        {result.weaknesses.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Areas for Improvement
              </h3>
            </div>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">!</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Suggestions */}
        {result.suggestions.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Suggestions
              </h3>
            </div>
            <ul className="space-y-2">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">💡</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    );
  }

  return null;
}
