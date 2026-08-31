import { Sparkles, Info } from 'lucide-react';
import type { SourceRef } from '@/types';
import { SourceCard } from './SourceCard';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceRef[];
  pending?: boolean;
  declined?: boolean;
  onViewSource: (source: SourceRef) => void;
}

export function MessageBubble({
  role,
  content,
  sources,
  pending,
  declined,
  onViewSource,
}: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${
          isUser
            ? 'bg-navy-100 text-navy-700'
            : 'bg-navy-900 text-white'
        }`}
      >
        {isUser ? 'U' : <Sparkles size={15} />}
      </span>

      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-navy-900 text-white'
              : declined
              ? 'border border-amber-200 bg-amber-50/60 text-ink shadow-card'
              : 'bg-white text-ink border border-navy-100 shadow-card'
          }`}
        >
          {pending ? (
            <div>
              <span className="flex items-center gap-2 text-ink-soft">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse-soft" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse-soft [animation-delay:200ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse-soft [animation-delay:400ms]" />
                </span>
                SAATHI is checking the knowledge base…
              </span>
              <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-navy-100">
                <div className="h-full w-2/3 rounded-full skeleton-shimmer" />
              </div>
            </div>
          ) : declined ? (
            <>
              <span className="mb-2 flex items-center gap-1.5 text-xs font-medium text-amber-700">
                <Info size={14} />
                Limited information available
              </span>
              <p>{content}</p>
            </>
          ) : (
            content
          )}
        </div>

        {!isUser && !pending && sources && sources.length > 0 && (
          <div className="mt-3 w-full">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Sources
            </p>
            <div className="space-y-2">
              {sources.map((s) => (
                <SourceCard key={s.standardId} source={s} onView={onViewSource} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
