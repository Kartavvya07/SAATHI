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
      className="card card-hover group w-full text-left p-4 transition-all duration-200"
    >
      <div className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-900 group-hover:text-white">
          <FileText size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs font-semibold text-accent-700">
            {source.number}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-navy-900 group-hover:text-accent-700 transition-colors">
            {source.title}
          </p>
          <p className="mt-1 text-xs leading-normal text-ink-muted line-clamp-1">
            Scope · {source.scope}
          </p>
        </div>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-navy-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent-600">
          <span>View</span>
          <ArrowRight size={13} />
        </span>
      </div>
    </button>
  );
}
