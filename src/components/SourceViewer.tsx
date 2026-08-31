import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  X,
  FileText,
  ExternalLink,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import type { SourceRef } from '@/types';

interface SourceViewerProps {
  source: SourceRef | null;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  Electrical: 'bg-accent-50 text-accent-700',
  Household: 'bg-emerald-50 text-emerald-700',
  'Consumer Products': 'bg-amber-50 text-amber-700',
};

export function SourceViewer({ source, onClose }: SourceViewerProps) {
  useEffect(() => {
    if (!source) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [source, onClose]);

  if (!source) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-cream animate-fade-in overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-navy-100/80 bg-cream/90 px-5 backdrop-blur-md sm:px-8 lg:px-12">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-navy-50 hover:text-navy-900"
        >
          <ArrowLeft size={18} />
          Back to conversation
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-600">
          <ShieldCheck size={16} />
          <span className="hidden sm:inline">Source Reference</span>
        </div>

        <button
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-lg text-navy-700 transition-colors hover:bg-navy-50"
          aria-label="Close source viewer"
        >
          <X size={20} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="container-page py-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
            {/* Left Content */}
            <div className="animate-fade-up">
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white sm:h-16 sm:w-16">
                  <FileText size={26} />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-sm font-semibold text-accent-700">
                    {source.number}
                  </p>
                  <h1 className="mt-1 font-display text-2xl font-semibold leading-tight text-navy-900 sm:text-3xl lg:text-4xl">
                    {source.title}
                  </h1>
                  <span
                    className={`chip mt-3 ${
                      categoryColors[source.category] ?? 'bg-navy-50 text-navy-700'
                    }`}
                  >
                    {source.category}
                  </span>
                </div>
              </div>

              <div className="mt-10 space-y-8">
                <section className="card p-6 sm:p-8">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Scope & Requirements
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {source.scope}
                  </p>
                </section>

                <section className="card p-6 sm:p-8">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Source Information
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-navy-900 font-medium">
                    {source.source}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    Official Indian Standard published under the authority of the Bureau of Indian Standards.
                  </p>
                </section>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
                  <p className="text-sm leading-relaxed text-amber-800">
                    <strong>Prototype Notice:</strong> This source record is mock data created for demonstration purposes for the Smart India Hackathon. It provides a preview of how real BIS standards and clauses will be cited and verified in SAATHI.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Action Sidebar */}
            <aside className="animate-fade-up [animation-delay:100ms]">
              <div className="card sticky top-8 space-y-5 p-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Verified Reference
                  </h3>
                  <p className="mt-2 font-mono text-sm font-semibold text-accent-700">
                    {source.number}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {source.category} Category
                  </p>
                </div>

                <div className="h-px bg-navy-100" />

                <a
                  href={source.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Open official source
                  <ExternalLink size={16} />
                </a>

                {source.standardId && (
                  <Link
                    to={`/standards/${source.standardId}`}
                    onClick={onClose}
                    className="btn-secondary w-full"
                  >
                    <BookOpen size={16} />
                    View full standard details
                  </Link>
                )}

                <button
                  onClick={onClose}
                  className="btn-ghost w-full text-center"
                >
                  Return to chat
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>,
    document.body,
  );
}
