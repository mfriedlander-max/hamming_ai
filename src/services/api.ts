import { EvaluationMode, EvaluationResult } from '../types';

/**
 * Call the serverless function to evaluate a prompt
 */
export async function evaluatePrompt(
  prompt: string,
  mode: EvaluationMode
): Promise<EvaluationResult> {
  try {
    const response = await fetch('/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, mode }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Evaluation failed' }));
      throw new Error(error.message || 'Evaluation failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error instanceof Error ? error : new Error('Failed to evaluate prompt');
  }
}
