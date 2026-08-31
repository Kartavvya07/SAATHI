import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import {
  ArrowRight,
  MessageSquareText,
  ShieldCheck,
  Library,
  FileText,
  Search,
  Sparkles,
} from 'lucide-react';

export function Landing() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <WhatIsSaathi />
      <Features />
      <HowItWorks />
      <Trust />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent-100/40 blur-3xl" />
      </div>

      <div className="container-page pt-16 pb-20 sm:pt-24 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <span className="chip border border-navy-200 bg-white/70 text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              Standards Assistant · Prototype
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl lg:text-7xl">
              Understand Indian Standards with confidence.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              An intelligent assistant for discovering relevant BIS standards,
              understanding requirements, and finding source-backed information.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/assistant" className="btn-primary text-base">
                Explore SAATHI
                <ArrowRight size={18} />
              </Link>
              <Link to="/standards" className="btn-secondary text-base">
                Explore Standards
              </Link>
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative animate-fade-up [animation-delay:120ms]">
      <div className="relative mx-auto max-w-md">
        {/* Question card */}
        <div className="card p-5 animate-fade-up [animation-delay:200ms]">
          <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-900 text-white">
              <MessageSquareText size={13} />
            </span>
            Your question
          </div>
          <p className="mt-3 text-sm font-medium text-navy-900">
            "What standard applies to LED bulbs?"
          </p>
        </div>

        {/* Answer card */}
        <div className="card mt-3 p-5 animate-fade-up [animation-delay:320ms]">
          <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-600 text-white">
              <Sparkles size={13} />
            </span>
            SAATHI
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            The relevant standard is{' '}
            <span className="font-mono font-semibold text-accent-700">
              IS 16152:2012
            </span>
            . It covers safety and performance requirements for self-ballasted
            LED lamps for general lighting.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50/60 p-3">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-navy-700 shadow-sm">
              <FileText size={15} />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-xs font-semibold text-accent-700">
                IS 16152:2012
              </p>
              <p className="truncate text-xs text-ink-muted">
                Self-Ballasted LED Lamps
              </p>
            </div>
            <span className="ml-auto chip bg-accent-50 text-accent-700">
              <ShieldCheck size={12} /> Source-backed
            </span>
          </div>
        </div>

        {/* Floating standard chip */}
        <div className="absolute -right-3 -top-4 hidden rotate-3 sm:block">
          <div className="card px-3 py-2 text-xs font-medium text-navy-700 shadow-card-hover">
            IS 10322:2022 · Pressure Cookers
          </div>
        </div>
        <div className="absolute -left-4 bottom-8 hidden -rotate-2 sm:block">
          <div className="card px-3 py-2 text-xs font-medium text-navy-700 shadow-card-hover">
            IS 9473:2019 · BIS Certification
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatIsSaathi() {
  return (
    <section className="border-t border-navy-100/60 bg-white/50">
      <div className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
            What is SAATHI
          </span>
          <p className="mt-5 font-display text-3xl font-medium leading-snug text-navy-900 sm:text-4xl">
            SAATHI helps users navigate the large and complex ecosystem of
            Indian Standards and BIS information through natural language.
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      num: '01',
      icon: MessageSquareText,
      title: 'Ask SAATHI',
      desc: 'Ask questions about Indian Standards and BIS-related information in plain language.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Source-backed Answers',
      desc: 'See the sources supporting an answer so information can be verified.',
    },
    {
      num: '03',
      icon: Library,
      title: 'Explore Standards',
      desc: 'Browse a structured collection of standards and their basic information.',
    },
  ];

  return (
    <section className="container-page py-20 lg:py-28">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
          What SAATHI can do
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
          Three core capabilities
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={f.num}
            className="card card-hover p-7 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-white">
                <f.icon size={22} />
              </span>
              <span className="font-display text-3xl font-semibold text-navy-100">
                {f.num}
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-navy-900">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: MessageSquareText, label: 'Ask a question' },
    { icon: Search, label: 'Find relevant BIS information' },
    { icon: Sparkles, label: 'Generate an answer' },
    { icon: ShieldCheck, label: 'Show supporting sources' },
  ];

  return (
    <section className="border-t border-navy-100/60 bg-navy-900 text-white">
      <div className="container-page py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            From question to source-backed answer
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className="relative animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-accent-300">
                    <s.icon size={20} />
                  </span>
                  <span className="font-display text-2xl font-semibold text-white/20">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-5 text-sm font-medium leading-snug">
                  {s.label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/20">
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="container-page py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-600">
            Trust
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
            Built around source-backed information.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            SAATHI is designed to avoid unsupported answers and to clearly
            indicate when relevant information is unavailable. Every answer is
            paired with its source so you can verify what you read.
          </p>
        </div>
        <div className="grid gap-4 animate-fade-up [animation-delay:120ms]">
          {[
            {
              icon: ShieldCheck,
              title: 'Sources shown with every answer',
              desc: 'Each response links to the standard it draws from.',
            },
            {
              icon: FileText,
              title: 'Clear when information is unavailable',
              desc: 'SAATHI declines rather than guessing when the knowledge base has no match.',
            },
            {
              icon: Search,
              title: 'Browse the knowledge base directly',
              desc: 'Explore standards by category and open any record for details.',
            },
          ].map((t) => (
            <div key={t.title} className="card card-hover flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                <t.icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-900">{t.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container-page pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-8 py-16 text-center sm:px-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-accent-500/15 blur-3xl" />
        </div>
        <div className="relative animate-fade-up">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Start exploring BIS information
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-navy-200">
            Open the SAATHI assistant and ask your first question about Indian
            Standards.
          </p>
          <Link to="/assistant" className="btn-primary mt-9 bg-white text-navy-900 hover:bg-cream">
            Open SAATHI
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white/50">
      <div className="container-page py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              An intelligent assistant for discovering and understanding BIS
              standards through natural language.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link
              to="/"
              className="text-sm text-ink-soft transition-colors hover:text-navy-900"
            >
              Home
            </Link>
            <Link
              to="/assistant"
              className="text-sm text-ink-soft transition-colors hover:text-navy-900"
            >
              Assistant
            </Link>
            <Link
              to="/standards"
              className="text-sm text-ink-soft transition-colors hover:text-navy-900"
            >
              Standards
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-navy-100 pt-6">
          <p className="text-center text-xs leading-relaxed text-ink-muted">
            SAATHI is a prototype built for Smart India Hackathon. This
            application is not affiliated with or endorsed by the Bureau of
            Indian Standards. All standard references shown are mock data for
            demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
