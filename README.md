# Prompt Evaluator

A web application that provides intelligent feedback on AI prompts using Claude API. Get instant analysis with strengths, weaknesses, scores, and actionable suggestions across three specialized modes.

## Features

- **Three Evaluation Modes:**
  - **Casual Mode**: For everyday conversations with AI assistants
  - **Coding Mode**: For technical and programming-related prompts
  - **Research Mode**: For in-depth information gathering

- **Comprehensive Analysis:**
  - Overall score (0-10)
  - Category-specific scores with explanations
  - Strengths and areas for improvement
  - Actionable suggestions

- **Clean, Responsive UI:**
  - Tech-inspired minimalistic design
  - Smooth animations and transitions
  - Mobile-friendly responsive layout

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **LLM**: Anthropic Claude 3.5 Sonnet
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hamming_project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Add your Anthropic API key to `.env`:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variable in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your API key

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

3. Add environment variable in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add `ANTHROPIC_API_KEY` with your API key

## Project Structure

```
hamming_project/
├── api/
│   └── evaluate.ts              # Serverless function for Claude API
├── src/
│   ├── components/
│   │   ├── evaluation/          # Evaluation UI components
│   │   ├── layout/              # Layout components (Header, Footer)
│   │   └── ui/                  # Reusable UI components (Button, Card)
│   ├── lib/
│   │   ├── evaluators/          # Mode-specific evaluation logic
│   │   └── utils/               # Utility functions
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page
│   │   └── EvaluationPage.tsx   # Main evaluation interface
│   ├── services/
│   │   └── api.ts               # API client
│   ├── styles/
│   │   └── animations.css       # CSS animations
│   └── types/
│       └── evaluation.ts        # TypeScript types
├── .env.example                 # Environment variable template
├── package.json
└── vite.config.ts
```

## Features in Detail

### Casual Mode
Evaluates prompts for everyday AI conversations:
- **Clarity**: Is the request clear and understandable?
- **Tone**: Is it friendly and conversational?
- **Context**: Enough background information?
- **Specificity**: Balanced detail level?

### Coding Mode
Analyzes technical and coding prompts:
- **Technical Specificity**: Language, framework, version details
- **Context**: Technical background and constraints
- **Expected Output**: Clear deliverable expectations
- **Edge Cases**: Error handling and special scenarios

### Research Mode
Optimized for information-gathering prompts:
- **Scope Clarity**: Well-defined and manageable scope
- **Depth Indicators**: Level of detail needed
- **Source Requirements**: Preferred source types
- **Format Expectations**: Desired output format

## Development Notes

### Fallback Mode

The app includes a fallback to mock data if the API is unavailable (useful for development without an API key). In production with a configured API key, it will use Claude for real evaluations.

### Adding New Modes

To add a new evaluation mode:

1. Create evaluator in `src/lib/evaluators/<modeName>.ts`
2. Export from `src/lib/evaluators/index.ts`
3. Add to `api/evaluate.ts`
4. Update TypeScript types in `src/types/evaluation.ts`
5. Add to mode selector in `src/components/evaluation/ModeSelector.tsx`

## License

MIT

## Acknowledgments

Built with Claude Code by Anthropic
