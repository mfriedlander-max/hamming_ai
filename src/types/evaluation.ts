export type EvaluationMode = 'casual' | 'coding' | 'research';

export interface ScoreCategory {
  category: string;
  score: number;
  description: string;
}

export interface EvaluationResult {
  mode: EvaluationMode;
  strengths: string[];
  weaknesses: string[];
  scores: ScoreCategory[];
  overallScore: number;
  suggestions: string[];
}
