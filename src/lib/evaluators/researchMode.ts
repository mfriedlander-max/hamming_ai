import { EvaluationResult } from '../../types';

/**
 * Build the system prompt for Claude to evaluate a research mode prompt
 */
export function buildResearchModePrompt(userPrompt: string): string {
  return `You evaluate research and information-gathering prompts for scope clarity, depth indicators, source requirements, and format expectations.

USER PROMPT TO EVALUATE:
"""
${userPrompt}
"""

EVALUATION CRITERIA:
- **Scope Clarity**: Are topic boundaries and focus areas well-defined?
- **Depth Indicators**: Is the required level of detail and technical depth specified?
- **Source Requirements**: Are preferred source types, time periods, and credibility levels indicated?
- **Format Expectations**: Is the desired structure, citation style, and length clear?

SCORING RUBRIC:
- 1-4: Major issues, unclear or problematic
- 5-6: Workable but needs improvement
- 7-8: Good, minor improvements possible
- 9-10: Excellent, well-crafted

EXAMPLE:
Good: "Research peer-reviewed studies from 2020-2024 on CRISPR gene editing in agriculture, focusing on corn and wheat. Provide a 2-page summary with citations."
Poor: "Research CRISPR stuff"

OUTPUT REQUIREMENTS:
- Return valid JSON only (no markdown, no extra text)
- Exactly 4 category scores: "Scope Clarity", "Depth Indicators", "Source Requirements", "Format Expectations"
- Category descriptions: Brief phrases (40-60 chars)
- 3-5 strengths, 2-4 weaknesses, 3-5 suggestions (all brief phrases, 50-100 chars)
- Overall score = average of 4 category scores

JSON FORMAT:
{
  "overallScore": 7.5,
  "scores": [
    {"category": "Scope Clarity", "score": 8.0, "description": "Research topic is well-defined and focused"},
    {"category": "Depth Indicators", "score": 7.0, "description": "Detail level specified, could be more precise"},
    {"category": "Source Requirements", "score": 7.5, "description": "Source types and timeframe mentioned"},
    {"category": "Format Expectations", "score": 7.5, "description": "Output format and length are clear"}
  ],
  "strengths": [
    "Clear research scope with specific focus area",
    "Time period and source types specified",
    "Output format requirements are clear"
  ],
  "weaknesses": [
    "Could specify preferred depth of technical detail",
    "Citation style not mentioned"
  ],
  "suggestions": [
    "Specify desired technical depth (high-level overview vs detailed analysis)",
    "Mention preferred citation style (APA, MLA, Chicago, etc.)",
    "Add any specific subtopics or questions to address"
  ]
}`;
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
