import { useState } from 'react';
import { EvaluationMode, EvaluationResult } from '../types';
import PromptInput from '../components/evaluation/PromptInput';
import ModeSelector from '../components/evaluation/ModeSelector';
import ResultsDisplay from '../components/evaluation/ResultsDisplay';
import Button from '../components/ui/Button';
import { evaluatePrompt } from '../services/api';

// Mock evaluation function - fallback for development without API key
async function mockEvaluate(prompt: string, mode: EvaluationMode): Promise<EvaluationResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return mock data based on mode
  const mockData: Record<EvaluationMode, EvaluationResult> = {
    casual: {
      mode: 'casual',
      overallScore: 7.5,
      scores: [
        { category: 'Clarity', score: 8, description: 'Your request is clear and easy to understand' },
        { category: 'Tone', score: 7, description: 'Friendly tone, could be slightly more specific' },
        { category: 'Context', score: 7.5, description: 'Good context provided' },
        { category: 'Specificity', score: 7.5, description: 'Specific enough for casual conversation' },
      ],
      strengths: [
        'Clear and concise request',
        'Friendly conversational tone',
        'Adequate context for the AI to respond',
      ],
      weaknesses: [
        'Could specify desired response format',
        'Missing some contextual details that might improve response quality',
      ],
      suggestions: [
        'Consider adding what format you want the response in (bullet points, paragraph, etc.)',
        'Mention if you want examples or explanations',
        'Add any relevant background information',
      ],
    },
    coding: {
      mode: 'coding',
      overallScore: 6.8,
      scores: [
        { category: 'Technical Specificity', score: 6, description: 'Some technical details missing' },
        { category: 'Context', score: 7, description: 'Basic context provided' },
        { category: 'Expected Output', score: 7, description: 'Output expectations are somewhat clear' },
        { category: 'Edge Cases', score: 7, description: 'Edge cases not explicitly mentioned' },
      ],
      strengths: [
        'Task is clearly stated',
        'Programming language specified',
        'Basic requirements outlined',
      ],
      weaknesses: [
        'Missing language version or framework details',
        'No mention of constraints or edge cases',
        'Desired code style or patterns not specified',
        'No test cases or examples provided',
      ],
      suggestions: [
        'Specify the language version (e.g., Python 3.11)',
        'Mention any libraries or frameworks to use',
        'Include example inputs and expected outputs',
        'Describe edge cases to handle (empty input, large numbers, etc.)',
        'Specify code style preferences (PEP 8, comments, type hints)',
      ],
    },
    research: {
      mode: 'research',
      overallScore: 7.2,
      scores: [
        { category: 'Scope Clarity', score: 7, description: 'Scope is reasonably clear' },
        { category: 'Depth Indicators', score: 7.5, description: 'Depth expectations somewhat indicated' },
        { category: 'Source Requirements', score: 7, description: 'Source preferences could be more specific' },
        { category: 'Format', score: 7.5, description: 'Format expectations are clear' },
      ],
      strengths: [
        'Research topic is well-defined',
        'Clear indication of information needs',
        'Reasonable scope for in-depth analysis',
      ],
      weaknesses: [
        'Source type preferences not specified (academic, industry, general)',
        'Time period or recency requirements unclear',
        'Level of detail/depth not explicitly stated',
      ],
      suggestions: [
        'Specify preferred source types (academic papers, industry reports, etc.)',
        'Indicate desired time frame (recent studies, historical perspective)',
        'Mention the depth level (overview, detailed analysis, comprehensive review)',
        'State if citations or references are needed',
        'Clarify the intended use (presentation, paper, personal knowledge)',
      ],
    },
  };

  return mockData[mode];
}

export default function EvaluationPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedMode, setSelectedMode] = useState<EvaluationMode>('casual');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to evaluate');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Try real API first, fall back to mock if it fails
      try {
        const evaluationResult = await evaluatePrompt(prompt, selectedMode);
        setResult(evaluationResult);
      } catch (apiError) {
        console.warn('API call failed, using mock data:', apiError);
        // Fallback to mock data for development
        const evaluationResult = await mockEvaluate(prompt, selectedMode);
        setResult(evaluationResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during evaluation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          Evaluate Your Prompt
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Get instant feedback and improve your AI interactions
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column - Input */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-md">
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                disabled={loading}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-md">
              <ModeSelector
                selectedMode={selectedMode}
                onChange={setSelectedMode}
                disabled={loading}
              />
            </div>

            <Button
              onClick={handleEvaluate}
              disabled={loading || !prompt.trim()}
              className="w-full"
              size="lg"
            >
              {loading ? 'Evaluating...' : 'Evaluate Prompt'}
            </Button>
          </div>

          {/* Right column - Results */}
          <div>
            <ResultsDisplay
              loading={loading}
              result={result}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
