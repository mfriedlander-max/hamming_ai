import { EvaluationResult } from '../../types';

/**
 * Build the system prompt for Claude to evaluate a coding mode prompt
 */
export function buildCodingModePrompt(userPrompt: string): string {
  return `You are an expert AI prompt evaluator specializing in technical and coding-related prompts.

Evaluate the following user prompt for use in requesting coding assistance from AI assistants like ChatGPT, Claude, or GitHub Copilot.

USER PROMPT TO EVALUATE:
"""
${userPrompt}
"""

Analyze this prompt based on these criteria:
1. **Technical Specificity**: Does it specify language, framework, versions, or libraries needed?
2. **Context**: Is there enough technical context (codebase structure, constraints, existing code)?
3. **Expected Output**: Is it clear what deliverable is expected (function, class, full app, snippet)?
4. **Edge Cases**: Are edge cases, error handling, or special scenarios mentioned?

Provide your evaluation in the following JSON format:
{
  "overallScore": <number between 0-10>,
  "scores": [
    {
      "category": "Technical Specificity",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Context",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Expected Output",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Edge Cases",
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
    "<weakness 2>",
    "<weakness 3>"
  ],
  "suggestions": [
    "<actionable suggestion 1>",
    "<actionable suggestion 2>",
    "<actionable suggestion 3>",
    "<actionable suggestion 4>"
  ]
}

Focus on making your feedback specific to coding prompts. Suggest improvements like specifying versions, mentioning frameworks, including example inputs/outputs, describing edge cases, or clarifying code style preferences. The overall score should be the average of the four category scores.`;
}

/**
 * Parse the Claude API response into an EvaluationResult
 */
export function parseCodingModeResponse(response: string): EvaluationResult {
  try {
    // Extract JSON from the response (handles cases where Claude adds extra text)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      mode: 'coding',
      overallScore: parsed.overallScore || 0,
      scores: parsed.scores || [],
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      suggestions: parsed.suggestions || [],
    };
  } catch (error) {
    console.error('Error parsing coding mode response:', error);
    throw new Error('Failed to parse evaluation response');
  }
}
