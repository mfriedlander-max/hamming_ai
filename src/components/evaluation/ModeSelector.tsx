import { EvaluationMode } from '../../types';
import { Sparkles, Target, Brain } from 'lucide-react';

interface ModeSelectorProps {
  selectedMode: EvaluationMode;
  onChange: (mode: EvaluationMode) => void;
  disabled?: boolean;
}

const modes = [
  {
    id: 'casual' as EvaluationMode,
    icon: Sparkles,
    title: 'Casual Mode',
    description: 'For everyday conversations and general queries',
  },
  {
    id: 'coding' as EvaluationMode,
    icon: Target,
    title: 'Coding Mode',
    description: 'For technical and programming-related prompts',
  },
  {
    id: 'research' as EvaluationMode,
    icon: Brain,
    title: 'Research Mode',
    description: 'For in-depth information gathering and analysis',
  },
];

export default function ModeSelector({ selectedMode, onChange, disabled = false }: ModeSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Evaluation Mode
      </h3>
      <div className="space-y-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              disabled={disabled}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  isSelected
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {mode.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {mode.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
