import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// System prompts (copied from the TypeScript files)
const buildCasualModePrompt = (userPrompt) => `You evaluate conversational AI prompts for clarity, tone, context, and specificity.

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

const buildCodingModePrompt = (userPrompt) => `You evaluate technical and coding prompts for specificity, context, output expectations, and edge case handling.

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

const buildResearchModePrompt = (userPrompt) => `You evaluate research and information-gathering prompts for scope clarity, depth indicators, source requirements, and format expectations.

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
Good: "Research peer-reviewed studies from 2020-2024 on CRISPR gene editing in agriculture, focusing on corn and wheat. Provide a 2-page summary with APA citations."
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

app.post('/api/evaluate', async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    // Validate input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    if (!mode || !['casual', 'coding', 'research'].includes(mode)) {
      return res.status(400).json({ message: 'Invalid evaluation mode' });
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return res.status(500).json({ message: 'API key not configured' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({ apiKey });

    // Build system prompt based on mode
    let systemPrompt;
    switch (mode) {
      case 'casual':
        systemPrompt = buildCasualModePrompt(prompt);
        break;
      case 'coding':
        systemPrompt = buildCodingModePrompt(prompt);
        break;
      case 'research':
        systemPrompt = buildResearchModePrompt(prompt);
        break;
      default:
        return res.status(400).json({ message: 'Invalid mode' });
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: systemPrompt
      }]
    });

    // Extract text response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    if (!responseText) {
      throw new Error('No response from Claude');
    }

    // Parse response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const result = {
      mode,
      overallScore: parsed.overallScore || 0,
      scores: parsed.scores || [],
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      suggestions: parsed.suggestions || [],
    };

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error evaluating prompt:', error);

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({
      message: 'Failed to evaluate prompt',
      error: errorMessage
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
