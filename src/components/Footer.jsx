const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-green text-natural-cream">

      {/* Banana-yellow top accent bar */}
      <div className="h-1 w-full bg-banana-yellow" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">

          {/* ── Brand column ── */}
          <div className="max-w-xs">
            <a href="#home" className="inline-block mb-4" aria-label="Khandesh Naturals — go to home">
              <div className="bg-natural-cream rounded-2xl px-3 py-2">
                <img
                  src="/images/logo.png"
                  alt="Khandesh Naturals Logo"
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </a>

            <p className="text-xs font-semibold tracking-[0.15em] text-banana-yellow/65 uppercase mb-3">
              A Crunch of Natural Goodness
            </p>

            <p className="text-natural-cream/55 text-sm leading-relaxed">
              Discover our Spicy Banana Chips and Salty Banana Chips, made for
              your everyday snack moments.
            </p>
          </div>

          {/* ── Navigation column ── */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-natural-cream/45 uppercase mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  {/* 'group' on <a> makes group-hover work on child span */}
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-natural-cream/70 hover:text-banana-yellow transition-colors duration-200"
                  >
                    <span
                      className="block h-px bg-banana-yellow/50 transition-all duration-200 w-3 group-hover:w-5"
                      aria-hidden="true"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 sm:mt-12 border-t border-natural-cream/10" />

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-natural-cream/40">
          <p>© {year} Khandesh Naturals. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="text-banana-yellow/50" aria-hidden="true">✦</span>
            Made with care in Khandesh
          </p>
        </div>
      </div>
    </footer>
  );
}
