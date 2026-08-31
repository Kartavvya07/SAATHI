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

const categoryChipClass: Record<string, string> = {
  Electrical: 'chip-electrical',
  Household: 'chip-household',
  'Consumer Products': 'chip-consumer',
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
          <div className="h-14 w-14 shrink-0 rounded-2xl skeleton-shimmer" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-28 rounded skeleton-shimmer" />
            <div className="h-8 w-3/4 rounded skeleton-shimmer" />
            <div className="h-6 w-20 rounded-full skeleton-shimmer" />
          </div>
        </div>
        <div className="mt-10 space-y-4">
          <div className="h-28 rounded-2xl skeleton-shimmer" />
          <div className="h-28 rounded-2xl skeleton-shimmer" />
          <div className="h-36 rounded-2xl skeleton-shimmer" />
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
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-navy-50 hover:text-navy-900"
      >
        <ArrowLeft size={16} />
        Back to Standards
      </button>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
        {/* Main Content */}
        <div className="animate-fade-up">
          <div className="flex items-start gap-4 sm:gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white sm:h-16 sm:w-16">
              <FileText size={26} />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold text-accent-700">
                {standard.number}
              </p>
              <h1 className="mt-1 font-display text-2xl font-semibold leading-tight text-navy-900 sm:text-3xl lg:text-4xl">
                {standard.title}
              </h1>
              <span className={`mt-3 ${categoryChipClass[standard.category] ?? 'chip-neutral'}`}>
                {standard.category}
              </span>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <section className="card p-6 sm:p-8">
              <h2 className="section-overline">
                Overview
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {standard.overview}
              </p>
            </section>

            <section className="card p-6 sm:p-8">
              <h2 className="section-overline">
                Scope & Requirements
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {standard.scope}
              </p>
            </section>

            <section className="card p-6 sm:p-8">
              <h2 className="section-overline">
                Key Technical Parameters
              </h2>
              <ul className="mt-4 space-y-3">
                {standard.keyInformation.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Action Sidebar */}
        <aside className="animate-fade-up [animation-delay:120ms]">
          <div className="card sticky top-24 space-y-5 p-6">
            <div>
              <h3 className="section-overline">
                Source Document
              </h3>
              <p className="mt-2 text-sm font-semibold text-navy-900">
                {standard.source}
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                Official Indian Standards Catalog
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5">
              <p className="text-xs leading-relaxed text-amber-800">
                <strong>Prototype Notice:</strong> This is demonstration mock data curated for the Smart India Hackathon prototype.
              </p>
            </div>

            <a
              href={standard.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full"
            >
              Open official source
              <ExternalLink size={15} />
            </a>

            <div className="h-px bg-navy-100" />

            <div>
              <p className="section-overline">
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
          </div>
        </aside>
      </div>
    </div>
  );
}
