import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-forest-green sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand logo */}
          <a
            href="#home"
            onClick={closeMenu}
            className="flex-shrink-0 font-bold text-xl tracking-wide leading-none"
          >
            <span className="text-natural-cream">Khandesh </span>
            <span className="text-banana-yellow">Naturals</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-natural-cream/80 hover:text-banana-yellow text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:text-banana-yellow"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center bg-banana-yellow text-forest-green text-sm font-semibold px-5 py-2 rounded-full shadow-sm hover:brightness-110 transition-all duration-200"
            >
              Order Now
            </a>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden inline-flex items-center justify-center text-natural-cream p-2 rounded-lg hover:bg-white/10 transition-colors duration-150"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-natural-cream/10 bg-forest-green"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="text-natural-cream/85 hover:text-banana-yellow hover:bg-white/5 text-sm font-medium px-3 py-2.5 rounded-lg transition-colors duration-150"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 text-center bg-banana-yellow text-forest-green text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:brightness-110 transition-all duration-200"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
