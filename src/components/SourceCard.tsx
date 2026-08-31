import { FileText, ArrowRight } from 'lucide-react';
import type { SourceRef } from '@/types';

interface SourceCardProps {
  source: SourceRef;
  onView: (source: SourceRef) => void;
}

export function SourceCard({ source, onView }: SourceCardProps) {
  return (
    <button
      onClick={() => onView(source)}
      className="group w-full text-left rounded-xl border border-navy-100 bg-white p-4 transition-all duration-300 hover:border-navy-200 hover:shadow-card-hover"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700">
          <FileText size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs font-semibold text-accent-700">
            {source.number}
          </p>
          <p className="mt-0.5 truncate text-sm font-medium text-navy-900">
            {source.title}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Scope · {source.scope.slice(0, 70)}
            {source.scope.length > 70 ? '…' : ''}
          </p>
        </div>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-navy-600 transition-transform duration-300 group-hover:translate-x-0.5">
          View
          <ArrowRight size={14} />
        </span>
      </div>
    </button>
  );
}
