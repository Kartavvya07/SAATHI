import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Library } from 'lucide-react';
import type { BISStandard, StandardCategory } from '@/types';
import { getStandards } from '@/services/mockService';
import { StandardCard } from '@/components/StandardCard';

const categories: ('All' | StandardCategory)[] = [
  'All',
  'Electrical',
  'Household',
  'Consumer Products',
];

export function Standards() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<'All' | StandardCategory>('All');
  const [standards, setStandards] = useState<BISStandard[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getStandards().then((s) => {
      setStandards(s);
      setLoaded(true);
    });
  }, []);

  const filtered = standards.filter((s) => {
    const matchesCat = activeCat === 'All' || s.category === activeCat;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.number.toLowerCase().includes(q) ||
      s.scope.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="container-page py-12 lg:py-16">
      <div className="animate-fade-up">
        <span className="chip-neutral">
          <Library size={13} />
          Knowledge base · Prototype
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl">
          Explore Indian Standards
        </h1>
        <p className="section-subtitle max-w-2xl">
          Browse the standards currently available in the SAATHI prototype
          knowledge base.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mt-10 animate-fade-up [animation-delay:80ms]">
        <div className="relative max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search standards by number, title, or scope…"
            className="input pl-11"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 active:scale-[0.98] ${
                activeCat === cat
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'border border-navy-200 bg-white text-ink-soft hover:border-navy-300 hover:text-navy-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10">
        {!loaded ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-navy-100 bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="h-4 w-24 rounded skeleton-shimmer" />
                  <div className="h-6 w-20 rounded-full skeleton-shimmer" />
                </div>
                <div className="mt-5 h-5 w-3/4 rounded skeleton-shimmer" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full rounded skeleton-shimmer" />
                  <div className="h-4 w-2/3 rounded skeleton-shimmer" />
                </div>
                <div className="mt-5 h-4 w-24 rounded skeleton-shimmer" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-400">
              <Search size={24} />
            </span>
            <p className="mt-4 text-base font-medium text-navy-900">
              No standards found.
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <StandardCard
                key={s.id}
                standard={s}
                onClick={(std) => navigate(`/standards/${std.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
