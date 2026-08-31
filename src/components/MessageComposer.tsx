import { useState, type FormEvent } from 'react';
import { ArrowUp } from 'lucide-react';

interface MessageComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function MessageComposer({ onSend, disabled }: MessageComposerProps) {
  const [value, setValue] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue('');
  };

  return (
    <div className="border-t border-navy-100 bg-cream/80 backdrop-blur-sm px-4 py-4 sm:px-6">
      <form onSubmit={submit} className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-navy-200 bg-white p-2 shadow-card transition-colors focus-within:border-accent-400 focus-within:ring-2 focus-within:ring-accent-100">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit(e as unknown as FormEvent);
              }
            }}
            rows={1}
            placeholder="Ask about BIS standards, products, certification, scope or requirements…"
            className="max-h-32 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none scrollbar-thin"
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={!value.trim() || disabled}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-900 text-white transition-all hover:bg-navy-800 disabled:opacity-30 disabled:hover:bg-navy-900"
            aria-label="Send message"
          >
            <ArrowUp size={18} />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-ink-muted">
          SAATHI prototype · responses are generated from mock data, not live BIS content.
        </p>
      </form>
    </div>
  );
}
