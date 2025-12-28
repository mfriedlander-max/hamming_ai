import { EvaluationResult } from '../../types';

/**
 * Build the system prompt for Claude to evaluate a coding mode prompt
 */
export function buildCodingModePrompt(userPrompt: string): string {
  return `You evaluate technical and coding prompts for specificity, context, output expectations, and edge case handling.

USER PROMPT TO EVALUATE:
"""
${userPrompt}
"""

EVALUATION CRITERIA:
- **Tech Specificity**: Does it specify language, version, libraries, and frameworks?
- **Context**: Are constraints, dependencies, and existing code described?
- **Expected Output**: Is the desired format, style, and documentation clear?
- **Edge Cases**: Does it address error handling and validation needs?

SCORING RUBRIC:
- 1-4: Major issues, unclear or problematic
- 5-6: Workable but needs improvement
- 7-8: Good, minor improvements possible
- 9-10: Excellent, well-crafted

EXAMPLE:
Good: "Write a Python 3.11 function using requests library to fetch JSON from an API with retry logic and error handling"
Poor: "Write code to get data from API"

OUTPUT REQUIREMENTS:
- Return valid JSON only (no markdown, no extra text)
- Exactly 4 category scores: "Tech Specificity", "Context", "Expected Output", "Edge Cases"
- Category descriptions: Brief phrases (40-60 chars)
- 3-5 strengths, 2-4 weaknesses, 3-5 suggestions (all brief phrases, 50-100 chars)
- Overall score = average of 4 category scores

JSON FORMAT:
{
  "overallScore": 7.5,
  "scores": [
    {"category": "Tech Specificity", "score": 8.0, "description": "Language and libraries clearly specified"},
    {"category": "Context", "score": 7.0, "description": "Good technical context, could add constraints"},
    {"category": "Expected Output", "score": 7.5, "description": "Output format is reasonably clear"},
    {"category": "Edge Cases", "score": 7.5, "description": "Some error handling mentioned"}
  ],
  "strengths": [
    "Clear technical requirements specified",
    "Appropriate language and framework mentioned",
    "Good understanding of desired functionality"
  ],
  "weaknesses": [
    "Missing specific version numbers",
    "Could specify error handling requirements more clearly"
  ],
  "suggestions": [
    "Add specific version numbers (e.g., Python 3.11, requests 2.31+)",
    "Specify desired error handling behavior",
    "Mention code style preferences (PEP8, type hints, etc.)"
  ]
}`;
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
