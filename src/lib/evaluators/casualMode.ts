import { EvaluationResult } from '../../types';

/**
 * Build the system prompt for Claude to evaluate a casual mode prompt
 */
export function buildCasualModePrompt(userPrompt: string): string {
  return `You are an expert AI prompt evaluator specializing in casual, everyday conversations with AI assistants.

Evaluate the following user prompt for use in casual conversations with AI assistants like ChatGPT or Claude.

USER PROMPT TO EVALUATE:
"""
${userPrompt}
"""

Analyze this prompt based on these criteria:
1. **Clarity**: Is the request clear and easy to understand?
2. **Tone**: Is the tone appropriate for casual conversation? Is it friendly?
3. **Context**: Is there enough context for the AI to provide a helpful response?
4. **Specificity**: Is the prompt specific enough without being overly rigid?

Provide your evaluation in the following JSON format:
{
  "overallScore": <number between 0-10>,
  "scores": [
    {
      "category": "Clarity",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Tone",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Context",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Specificity",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    }
  ],
  "strengths": [
    "<strength 1>",
    "<strength 2>",
    "<strength 3>"
  ],
  "weaknesses": [
    "<weakness 1>",
    "<weakness 2>"
  ],
  "suggestions": [
    "<actionable suggestion 1>",
    "<actionable suggestion 2>",
    "<actionable suggestion 3>"
  ]
}

Focus on making your feedback constructive, specific, and actionable. The overall score should be the average of the four category scores.`;
}

/**
 * Parse the Claude API response into an EvaluationResult
 */
export function parseCasualModeResponse(response: string): EvaluationResult {
  try {
    // Extract JSON from the response (handles cases where Claude adds extra text)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      mode: 'casual',
      overallScore: parsed.overallScore || 0,
      scores: parsed.scores || [],
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      suggestions: parsed.suggestions || [],
    };
  } catch (error) {
    console.error('Error parsing casual mode response:', error);
    throw new Error('Failed to parse evaluation response');
  }
}
