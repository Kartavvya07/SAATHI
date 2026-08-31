import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Assistant', to: '/assistant' },
  { label: 'Standards', to: '/standards' },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100/70 bg-cream/85 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(item.to)
                  ? 'text-navy-900'
                  : 'text-ink-soft hover:text-navy-900'
              }`}
            >
              {isActive(item.to) && (
                <span className="absolute inset-0 rounded-full bg-navy-100" />
              )}
              <span className="relative">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/assistant" className="btn-primary">
            Explore SAATHI
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-navy-900 hover:bg-navy-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy-100 bg-cream md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? 'bg-navy-100 text-navy-900'
                    : 'text-ink-soft hover:bg-navy-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/assistant"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Explore SAATHI
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
