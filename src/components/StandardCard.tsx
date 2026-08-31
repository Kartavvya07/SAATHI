import { ArrowRight } from 'lucide-react';
import type { BISStandard } from '@/types';

interface StandardCardProps {
  standard: BISStandard;
  onClick: (standard: BISStandard) => void;
}

const categoryColors: Record<string, string> = {
  Electrical: 'bg-accent-50 text-accent-700',
  Household: 'bg-emerald-50 text-emerald-700',
  'Consumer Products': 'bg-amber-50 text-amber-700',
};

export function StandardCard({ standard, onClick }: StandardCardProps) {
  return (
    <button
      onClick={() => onClick(standard)}
      className="card card-hover group flex h-full flex-col p-6 text-left animate-fade-up"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-sm font-semibold text-accent-700">
          {standard.number}
        </span>
        <span className={`chip ${categoryColors[standard.category] ?? 'bg-navy-50 text-navy-700'}`}>
          {standard.category}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-navy-900">
        {standard.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {standard.scope}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-navy-600 transition-transform duration-300 group-hover:translate-x-0.5">
        View details
        <ArrowRight size={16} />
      </span>
    </button>
  );
}
