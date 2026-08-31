import { ArrowRight } from 'lucide-react';
import type { BISStandard } from '@/types';

interface StandardCardProps {
  standard: BISStandard;
  onClick: (standard: BISStandard) => void;
}

const categoryChipClass: Record<string, string> = {
  Electrical: 'chip-electrical',
  Household: 'chip-household',
  'Consumer Products': 'chip-consumer',
};

export function StandardCard({ standard, onClick }: StandardCardProps) {
  return (
    <button
      onClick={() => onClick(standard)}
      className="card card-hover group flex h-full flex-col p-6 text-left animate-fade-up"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs font-semibold text-accent-700 sm:text-sm">
          {standard.number}
        </span>
        <span className={categoryChipClass[standard.category] ?? 'chip-neutral'}>
          {standard.category}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-navy-900 group-hover:text-accent-700 transition-colors">
        {standard.title}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
        {standard.scope}
      </p>
      <div className="mt-6 flex items-center gap-1.5 border-t border-navy-100/60 pt-4 text-sm font-medium text-navy-700 transition-colors group-hover:text-accent-600">
        <span>View standard details</span>
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </button>
  );
}
