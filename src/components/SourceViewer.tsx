import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import type { SourceRef } from '@/types';

interface SourceViewerProps {
  source: SourceRef | null;
  onClose: () => void;
}

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
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-navy-950/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="absolute z-10 flex flex-col bg-cream shadow-drawer inset-x-0 bottom-0 max-h-[85dvh] rounded-t-2xl animate-slide-up sm:left-auto sm:bottom-auto sm:inset-y-0 sm:right-0 sm:max-h-none sm:w-full sm:max-w-lg sm:rounded-t-none sm:animate-slide-in-right">
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-navy-200" />
        </div>

        <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-ink-soft">
            <ShieldCheck size={16} className="text-accent-600" />
            Source reference
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-navy-700 hover:bg-navy-50"
            aria-label="Close source viewer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy-900 text-white">
              <FileText size={24} />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold text-accent-700">
                {source.number}
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold leading-tight text-navy-900">
                {source.title}
              </h2>
              <span className="chip mt-2 bg-navy-100 text-navy-700">
                {source.category}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Scope
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {source.scope}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Source
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {source.source}
              </p>
            </section>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
              <p className="text-xs leading-relaxed text-amber-800">
                <strong>Prototype notice:</strong> This source record is mock
                data created for demonstration purposes. It does not represent
                actual BIS clauses or a real BIS requirement.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-100 px-6 py-4">
          <a
            href={source.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full"
          >
            Open source
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
