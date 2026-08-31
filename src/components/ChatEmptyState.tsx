import { Sparkles } from 'lucide-react';
import { suggestions } from '@/data/mockData';

interface ChatEmptyStateProps {
  onPick: (text: string) => void;
}

export function ChatEmptyState({ onPick }: ChatEmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-900 text-white animate-fade-up">
        <Sparkles size={28} />
      </span>
      <h2 className="mt-6 font-display text-3xl font-semibold text-navy-900 animate-fade-up [animation-delay:80ms]">
        How can I help you understand BIS standards?
      </h2>
      <p className="mt-3 text-sm text-ink-soft animate-fade-up [animation-delay:160ms]">
        Ask about standards, products, certification, scope or requirements.
      </p>

      <div className="mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        {suggestions.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onPick(s.text)}
            className="card card-hover p-4 text-left animate-fade-up"
            style={{ animationDelay: `${240 + i * 80}ms` }}
          >
            <p className="text-sm font-medium text-navy-900">{s.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
