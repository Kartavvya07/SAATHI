import { Link } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-900 text-white font-display font-semibold transition-transform duration-300 group-hover:scale-105">
        S
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-navy-900">
        SAATHI
      </span>
    </Link>
  );
}
