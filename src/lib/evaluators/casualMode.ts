import { EvaluationResult } from '../../types';

/**
 * Build the system prompt for Claude to evaluate a casual mode prompt
 */
export function buildCasualModePrompt(userPrompt: string): string {
  return `You evaluate conversational AI prompts for clarity, tone, context, and specificity.

USER PROMPT TO EVALUATE:
"""
${userPrompt}
"""

EVALUATION CRITERIA:
- **Clarity**: Is the request unambiguous with clear intent?
- **Tone**: Is it appropriately friendly and conversational?
- **Context**: Is necessary background information provided?
- **Specificity**: Is the detail level balanced (not too vague or overly specific)?

SCORING RUBRIC:
- 1-4: Major issues, unclear or problematic
- 5-6: Workable but needs improvement
- 7-8: Good, minor improvements possible
- 9-10: Excellent, well-crafted

EXAMPLE:
Good: "Explain quantum entanglement in simple terms for a high school student"
Poor: "Tell me about quantum stuff"

OUTPUT REQUIREMENTS:
- Return valid JSON only (no markdown, no extra text)
- Exactly 4 category scores: "Clarity", "Tone", "Context", "Specificity"
- Category descriptions: Brief phrases (40-60 chars)
- 3-5 strengths, 2-4 weaknesses, 3-5 suggestions (all brief phrases, 50-100 chars)
- Overall score = average of 4 category scores

JSON FORMAT:
{
  "overallScore": 7.5,
  "scores": [
    {"category": "Clarity", "score": 8.0, "description": "Your request is clear and easy to understand"},
    {"category": "Tone", "score": 7.0, "description": "Friendly tone, could be slightly more specific"},
    {"category": "Context", "score": 7.5, "description": "Good context provided"},
    {"category": "Specificity", "score": 7.5, "description": "Specific enough for casual conversation"}
  ],
  "strengths": [
    "Clear and concise request",
    "Friendly conversational tone",
    "Adequate context for the AI to respond"
  ],
  "weaknesses": [
    "Could specify desired response format",
    "Missing some contextual details that might improve response quality"
  ],
  "suggestions": [
    "Consider adding what format you want the response in (bullet points, paragraph, etc.)",
    "Mention if you want examples or explanations",
    "Add any relevant background information"
  ]
}`;
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
