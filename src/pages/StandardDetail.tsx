import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import type { BISStandard } from '@/types';
import { getStandardById } from '@/services/mockService';

const categoryColors: Record<string, string> = {
  Electrical: 'bg-accent-50 text-accent-700',
  Household: 'bg-emerald-50 text-emerald-700',
  'Consumer Products': 'bg-amber-50 text-amber-700',
};

export function StandardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [standard, setStandard] = useState<BISStandard | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;
    getStandardById(id).then((s) => {
      setStandard(s ?? null);
      setLoaded(true);
    });
  }, [id]);

  if (!loaded) {
    return (
      <div className="container-page py-16">
        <div className="h-4 w-32 rounded skeleton-shimmer" />
        <div className="mt-8 flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 rounded-xl skeleton-shimmer" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-28 rounded skeleton-shimmer" />
            <div className="h-8 w-3/4 rounded skeleton-shimmer" />
            <div className="h-6 w-20 rounded-full skeleton-shimmer" />
          </div>
        </div>
        <div className="mt-10 space-y-3">
          <div className="h-4 w-full rounded skeleton-shimmer" />
          <div className="h-4 w-5/6 rounded skeleton-shimmer" />
          <div className="h-4 w-4/5 rounded skeleton-shimmer" />
        </div>
      </div>
    );
  }

  if (!standard) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-lg font-medium text-navy-900">Standard not found.</p>
        <Link to="/standards" className="btn-secondary mt-6">
          Back to Standards
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <button
        onClick={() => navigate('/standards')}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-navy-900"
      >
        <ArrowLeft size={16} />
        Back to Standards
      </button>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
        {/* Main */}
        <div className="animate-fade-up">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy-900 text-white">
              <FileText size={24} />
            </span>
            <div>
              <p className="font-mono text-sm font-semibold text-accent-700">
                {standard.number}
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl">
                {standard.title}
              </h1>
              <span
                className={`chip mt-3 ${
                  categoryColors[standard.category] ?? 'bg-navy-50 text-navy-700'
                }`}
              >
                {standard.category}
              </span>
            </div>
          </div>

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Overview
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {standard.overview}
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Scope
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {standard.scope}
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Key information
              </h2>
              <ul className="mt-4 space-y-2.5">
                {standard.keyInformation.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-ink-soft"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-accent-600"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="animate-fade-up [animation-delay:120ms]">
          <div className="card sticky top-24 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Source
            </h3>
            <p className="mt-2 text-sm font-medium text-navy-900">
              {standard.source}
            </p>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5">
              <p className="text-xs leading-relaxed text-amber-800">
                Prototype record — this is mock data for demonstration only and
                does not represent an actual BIS standard.
              </p>
            </div>

            <a
              href={standard.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-5 w-full"
            >
              Open source
              <ExternalLink size={15} />
            </a>

            <div className="my-5 h-px bg-navy-100" />

            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Have a question?
            </p>
            <button
              onClick={() =>
                navigate(
                  `/assistant?q=${encodeURIComponent(
                    `What does ${standard.number} cover?`,
                  )}`,
                )
              }
              className="btn-primary mt-3 w-full"
            >
              <Sparkles size={15} />
              Ask SAATHI about this standard
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
