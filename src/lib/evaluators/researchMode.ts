import { EvaluationResult } from '../../types';

/**
 * Build the system prompt for Claude to evaluate a research mode prompt
 */
export function buildResearchModePrompt(userPrompt: string): string {
  return `You are an expert AI prompt evaluator specializing in research and information-gathering prompts.

Evaluate the following user prompt for use in research tasks with AI assistants like ChatGPT, Claude, or Perplexity.

USER PROMPT TO EVALUATE:
"""
${userPrompt}
"""

Analyze this prompt based on these criteria:
1. **Scope Clarity**: Is the research scope well-defined? Is it broad enough to be useful but focused enough to be manageable?
2. **Depth Indicators**: Does it specify the level of detail or depth needed (overview, detailed analysis, comprehensive review)?
3. **Source Requirements**: Are preferred source types mentioned (academic papers, industry reports, recent studies, historical data)?
4. **Format Expectations**: Is the desired output format clear (summary, detailed report, comparison, bullet points, etc.)?

Provide your evaluation in the following JSON format:
{
  "overallScore": <number between 0-10>,
  "scores": [
    {
      "category": "Scope Clarity",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Depth Indicators",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Source Requirements",
      "score": <number between 0-10>,
      "description": "<brief explanation of the score>"
    },
    {
      "category": "Format Expectations",
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

Focus on helping improve research prompts. Suggest specifying time frames, source preferences, depth levels, citation needs, and intended use cases. The overall score should be the average of the four category scores.`;
}

/**
 * Parse the Claude API response into an EvaluationResult
 */
export function parseResearchModeResponse(response: string): EvaluationResult {
  try {
    // Extract JSON from the response (handles cases where Claude adds extra text)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      mode: 'research',
      overallScore: parsed.overallScore || 0,
      scores: parsed.scores || [],
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      suggestions: parsed.suggestions || [],
    };
  } catch (error) {
    console.error('Error parsing research mode response:', error);
    throw new Error('Failed to parse evaluation response');
  }
}
