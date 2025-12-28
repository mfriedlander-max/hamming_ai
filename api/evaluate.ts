import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildCasualModePrompt, parseCasualModeResponse } from '../src/lib/evaluators/casualMode';
import { buildCodingModePrompt, parseCodingModeResponse } from '../src/lib/evaluators/codingMode';
import { buildResearchModePrompt, parseResearchModeResponse } from '../src/lib/evaluators/researchMode';

type EvaluationMode = 'casual' | 'coding' | 'research';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt, mode } = req.body as { prompt: string; mode: EvaluationMode };

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
    let systemPrompt: string;
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

    // Parse response based on mode
    let result;
    switch (mode) {
      case 'casual':
        result = parseCasualModeResponse(responseText);
        break;
      case 'coding':
        result = parseCodingModeResponse(responseText);
        break;
      case 'research':
        result = parseResearchModeResponse(responseText);
        break;
      default:
        throw new Error('Invalid mode');
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error evaluating prompt:', error);

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({
      message: 'Failed to evaluate prompt',
      error: errorMessage
    });
  }
}
