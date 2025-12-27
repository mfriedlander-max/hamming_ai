interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function PromptInput({ value, onChange, disabled = false }: PromptInputProps) {
  return (
    <div className="flex flex-col h-full">
      <label htmlFor="prompt" className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        Your Prompt
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste your AI prompt here...

Example: Write a Python function that calculates the fibonacci sequence up to n terms."
        className="flex-1 min-h-[300px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      />
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {value.length} characters
      </div>
    </div>
  );
}
