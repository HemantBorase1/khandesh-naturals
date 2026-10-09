 import heroBananaChips from '../assets/hero.png';

// Decorative leaf SVG accent — inline so no extra file dependency
function LeafAccent({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M60 170 C10 130 0 60 60 10 C120 60 110 130 60 170Z"
        fill="currentColor"
        opacity="0.12"
      />
      <line
        x1="60" y1="10" x2="60" y2="170"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.18"
      />
      <path
        d="M60 50 Q80 70 60 90 Q40 70 60 50Z M60 90 Q85 110 60 130 Q35 110 60 90Z"
        fill="currentColor"
        opacity="0.10"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-natural-cream overflow-hidden"
    >
      {/* Decorative leaf accents */}
      <LeafAccent className="absolute -top-10 -left-8 w-48 h-72 text-forest-green pointer-events-none" />
      <LeafAccent className="absolute -bottom-12 -right-6 w-40 h-60 text-forest-green pointer-events-none rotate-180" />

      {/* Thin top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-banana-yellow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Text content ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Small label pill */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="block w-6 h-px bg-banana-yellow" />
              <span className="text-xs font-semibold tracking-[0.2em] text-earth-brown uppercase">
                The Taste of Khandesh
              </span>
              <span className="block w-6 h-px bg-banana-yellow" />
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-green leading-tight mb-6">
              A Crunch of{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Natural</span>
                {/* Banana-yellow underline highlight */}
                <span
                  className="absolute left-0 bottom-1 w-full h-3 bg-banana-yellow/40 -z-0 rounded"
                  aria-hidden="true"
                />
              </span>{' '}
              Goodness
            </h1>

            {/* Description */}
            <p className="text-forest-green/75 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              Discover the delightful crunch of Khandesh Naturals, featuring{' '}
              <strong className="text-forest-green font-semibold">Spicy Banana Chips</strong>{' '}
              and{' '}
              <strong className="text-forest-green font-semibold">Salty Banana Chips</strong>{' '}
              for your everyday snack moments.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-green text-natural-cream font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:bg-forest-green/90 hover:shadow-lg transition-all duration-200"
              >
                Explore Our Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
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

            {/* Trust badges */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-forest-green/60">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="text-banana-yellow text-base">✦</span>
                Handcrafted
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="text-banana-yellow text-base">✦</span>
                No Preservatives
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="text-banana-yellow text-base">✦</span>
                Farm Fresh
              </div>
            </div>
          </div>

          {/* ── Right: Product image ── */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg">

              {/* Decorative circle backdrop */}
              <div className="absolute inset-0 m-auto w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-banana-yellow/20 blur-2xl" />

              {/* Floating accent ring */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-banana-yellow/40" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-forest-green/20" />

              {/* Product image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-natural-cream/60">
                <img
                  src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=85&auto=format&fit=crop"
                  alt="Khandesh Naturals banana chips — spicy and salty varieties"
                  className="w-full h-72 sm:h-80 lg:h-96 object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to a solid-color placeholder if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder (hidden by default) */}
                <div
                  className="w-full h-72 sm:h-80 lg:h-96 bg-forest-green/10 items-center justify-center text-forest-green/40 text-sm font-medium"
                  style={{ display: 'none' }}
                >
                  🍌 Khandesh Naturals
                </div>

                {/* Gradient overlay at bottom for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-forest-green/20 to-transparent" />
              </div>

              {/* Floating product badge */}
              <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-natural-cream">
                <div className="w-8 h-8 rounded-full bg-banana-yellow/20 flex items-center justify-center text-base">
                  🌿
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-green leading-none mb-0.5">2 Flavours</p>
                  <p className="text-xs text-forest-green/60 leading-none">Spicy &amp; Salty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="relative -mb-px">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 lg:h-16 text-forest-green/5 fill-current"
          aria-hidden="true"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
