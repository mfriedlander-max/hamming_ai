import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 scale-in">
      <Loader2 className="w-12 h-12 text-primary-600 dark:text-primary-400 animate-spin mb-4" />
      <p className="text-lg text-gray-700 dark:text-gray-300 animate-pulse">
        {message}
      </p>
    </div>
  );
}
