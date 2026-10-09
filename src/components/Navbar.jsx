import { useState } from 'react';

const navLinks = [
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

          {/* Logo */}
          <a
            href="#home"
            className="flex-shrink-0 text-natural-cream font-bold text-xl tracking-wide leading-tight"
            onClick={closeMenu}
          >
            Khandesh{' '}
            <span className="text-banana-yellow">Naturals</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-natural-cream/90 hover:text-banana-yellow text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-4">
            {/* Order Now button — visible on all sizes */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center bg-banana-yellow text-forest-green text-sm font-semibold px-5 py-2 rounded-full hover:brightness-110 transition-all duration-200 shadow-sm"
            >
              Order Now
            </a>

            {/* Hamburger button — mobile only */}
            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="md:hidden text-natural-cream p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-banana-yellow"
            >
              {menuOpen ? (
                /* X icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-forest-green border-t border-natural-cream/10 px-4 pb-4 pt-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-natural-cream/90 hover:text-banana-yellow hover:bg-white/5 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 text-center bg-banana-yellow text-forest-green text-sm font-semibold px-5 py-2 rounded-full hover:brightness-110 transition-all duration-200 shadow-sm"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
