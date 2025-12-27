import { Link } from 'react-router-dom';
import { Sparkles, Target, Brain } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Elevate Your AI Prompts
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              Get instant, intelligent feedback on your AI prompts. Improve clarity, effectiveness, and results across casual conversations, coding tasks, and research queries.
            </p>
            <Link to="/evaluate">
              <Button size="lg" className="text-lg px-8 py-4">
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Three Specialized Evaluation Modes
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Casual Mode */}
          <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">
              Casual Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              Perfect for everyday conversations with AI assistants.
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Evaluates clarity and tone</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Ensures friendly communication</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Checks context and specificity</span>
              </li>
            </ul>
          </Card>

          {/* Coding Mode */}
          <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent-100 dark:bg-accent-900 rounded-full">
                <Target className="w-8 h-8 text-accent-600 dark:text-accent-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">
              Coding Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              Optimized for technical and coding queries.
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Technical specificity check</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Context and constraints validation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Expected output clarity</span>
              </li>
            </ul>
          </Card>

          {/* Research Mode */}
          <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                <Brain className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">
              Research Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              Designed for in-depth information gathering.
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Scope clarity assessment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Depth and detail indicators</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Source and format requirements</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Paste Your Prompt
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter the prompt you plan to use with your AI assistant.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Choose Your Mode
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select Casual, Coding, or Research based on your use case.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Get Instant Feedback
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receive detailed analysis with strengths, weaknesses, scores, and actionable suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Ready to Improve Your Prompts?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Start getting better results from your AI conversations today.
        </p>
        <Link to="/evaluate">
          <Button size="lg" className="text-lg px-8 py-4">
            Evaluate Your Prompt
          </Button>
        </Link>
      </div>
    </div>
  );
}
