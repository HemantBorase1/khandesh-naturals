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

          {/* ── Contact column ── */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-natural-cream/45 uppercase mb-4">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href="tel:+919607313451"
                  className="group inline-flex items-center gap-2.5 text-sm text-natural-cream/70 hover:text-banana-yellow transition-colors duration-200"
                  aria-label="Call +91 96073 13451"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 text-banana-yellow/60 group-hover:text-banana-yellow transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +91 96073 13451
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919607313451?text=Hello%20Khandesh%20Naturals!%20I%20am%20interested%20in%20ordering%20your%20banana%20chips.%20Please%20share%20the%20available%20products%20and%20ordering%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-natural-cream/70 hover:text-banana-yellow transition-colors duration-200"
                  aria-label="Chat on WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 text-banana-yellow/60 group-hover:text-banana-yellow transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Shree+Swami+Samarth+Co-Operative+Housing+Society+Ravet+Pune+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2.5 text-sm text-natural-cream/70 hover:text-banana-yellow transition-colors duration-200"
                  aria-label="Open location in Google Maps"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 mt-0.5 text-banana-yellow/60 group-hover:text-banana-yellow transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>Ravet, Pune,<br />Maharashtra</span>
                </a>
              </li>
            </ul>
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
