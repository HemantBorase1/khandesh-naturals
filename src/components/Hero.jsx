// Minimal inline leaf accent — no file dependency
function LeafAccent({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M60 170 C10 130 0 60 60 10 C120 60 110 130 60 170Z" fill="currentColor" opacity="0.08" />
      <line x1="60" y1="10" x2="60" y2="170" stroke="currentColor" strokeWidth="1.5" opacity="0.12" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative bg-natural-cream overflow-hidden">

      {/* Subtle leaf accents — toned down */}
      <LeafAccent className="absolute -top-8 -left-6 w-40 h-60 text-forest-green pointer-events-none select-none" />
      <LeafAccent className="absolute -bottom-8 -right-4 w-32 h-48 text-forest-green pointer-events-none select-none rotate-180" />

      {/* Banana-yellow top accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-banana-yellow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── Left: Text ── */}
          <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">

            {/* Small label */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="block w-5 h-px bg-banana-yellow" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-[0.2em] text-earth-brown uppercase">
                The Taste of Khandesh
              </span>
              <span className="block w-5 h-px bg-banana-yellow" aria-hidden="true" />
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-forest-green leading-tight mb-5">
              A Crunch of{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Natural</span>
                <span
                  className="absolute left-0 bottom-0.5 w-full h-3 bg-banana-yellow/35 -z-0 rounded-sm"
                  aria-hidden="true"
                />
              </span>{' '}
              Goodness
            </h1>

            {/* Description */}
            <p className="text-forest-green/70 text-base sm:text-lg leading-relaxed mb-8">
              Discover the delightful crunch of Khandesh Naturals, featuring{' '}
              <strong className="text-forest-green font-semibold">Spicy Banana Chips</strong>{' '}
              and{' '}
              <strong className="text-forest-green font-semibold">Salty Banana Chips</strong>{' '}
              — made for your everyday snack moments.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-green text-natural-cream font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg hover:bg-forest-green/90 transition-all duration-200"
              >
                Explore Our Products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-banana-yellow text-forest-green font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200"
              >
                Order Now
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
              {['Handcrafted', 'No Preservatives', 'Farm Fresh'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-forest-green/55">
                  <span className="text-banana-yellow text-sm" aria-hidden="true">✦</span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">

              {/* Soft glow behind image */}
              <div className="absolute inset-4 rounded-3xl bg-banana-yellow/15 blur-2xl" aria-hidden="true" />

              {/* Accent rings */}
              <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full border-2 border-banana-yellow/30" aria-hidden="true" />
              <div className="absolute -bottom-3 -left-3 w-14 h-14 rounded-full border-2 border-forest-green/15" aria-hidden="true" />

              {/* Product image card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/HomeImg.png"
                  alt="Khandesh Naturals Salty and Spicy Banana Chips — two varieties of crispy, golden banana chips"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback */}
                <div
                  className="w-full h-64 sm:h-80 lg:h-96 bg-forest-green/10 items-center justify-center text-forest-green/30 text-sm font-medium"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                >
                  🍌 Khandesh Naturals
                </div>
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/10 to-transparent" aria-hidden="true" />
              </div>

              {/* Floating "2 Flavours" badge — positioned below image with pb to prevent clip */}
              <div className="absolute -bottom-4 left-5 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2.5 border border-natural-cream/80">
                <div className="w-7 h-7 rounded-full bg-banana-yellow/20 flex items-center justify-center text-sm" aria-hidden="true">
                  🌿
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-green leading-none mb-0.5">2 Flavours</p>
                  <p className="text-xs text-forest-green/55 leading-none">Spicy &amp; Salty</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Extra bottom padding so the floating badge isn't clipped */}
      <div className="h-8 bg-natural-cream" />
    </section>
  );
}
