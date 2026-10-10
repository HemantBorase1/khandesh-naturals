/* ─────────────────────────────────────────────────────────
   About.jsx
   Contains:
     1. "A Taste of Khandesh" — existing brand story panel (forest-green bg)
     2. "From Our Farm to Your Snack" — new process section (cream bg)
   ───────────────────────────────────────────────────────── */

const FEATURES = [
  { emoji: '🍌', label: 'Two Flavours' },
  { emoji: '✦', label: 'Handcrafted' },
  { emoji: '🌿', label: 'No Preservatives' },
];

const PROCESS_STEPS = [
  {
    number: '01',
    heading: 'Fresh Bananas from Our Farm',
    description:
      'Our journey begins with bananas grown on our own farm, bringing the story of Khandesh Naturals closer to its roots.',
    imageUrl: '/images/About1.jpg',
    imageAlt:
      'Fresh green banana plants with bunches of bananas growing on a farm — Step 1 of the Khandesh Naturals process',
  },
  {
    number: '02',
    heading: 'Carefully Prepared',
    description:
      'The bananas are prepared and sliced to begin their transformation into delicious banana chips.',
    imageUrl: '/images/About2.jpg',
    imageAlt:
      'Bananas being peeled and sliced in preparation for making Khandesh Naturals banana chips — Step 2',
  },
  {
    number: '03',
    heading: 'A Delicious, Crispy Snack',
    description:
      'The prepared slices become the crunchy banana chips you can enjoy in our Spicy and Salty flavours.',
    imageUrl: '/images/About3.jpg',
    imageAlt:
      'Golden crispy Khandesh Naturals banana chips served in a natural bowl, ready to enjoy — Step 3',
  },
];

/* ── Reusable section label ───────────────────────────── */
function SectionLabel({ text, light = false }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="block w-5 h-px bg-banana-yellow" aria-hidden="true" />
      <span
        className={`text-xs font-semibold tracking-[0.2em] uppercase ${
          light ? 'text-banana-yellow/75' : 'text-earth-brown'
        }`}
      >
        {text}
      </span>
      <span className="block w-5 h-px bg-banana-yellow" aria-hidden="true" />
    </div>
  );
}

/* ── Individual process step card ────────────────────── */
function ProcessCard({ step, isLast }) {
  return (
    <div className="relative flex flex-col group">

      {/* Connector line — shown between cards on desktop, hidden on last */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-[120px] left-[calc(100%+0px)] w-full h-px z-10"
          aria-hidden="true"
          style={{ width: 'calc(var(--gap, 2rem) + 2px)' }}
        >
          {/* Drawn via the grid gap; actual connector is the dashed rule below */}
        </div>
      )}

      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden mb-5 shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-[4/3] bg-natural-cream">
          <img
            src={step.imageUrl}
            alt={step.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.removeProperty('display');
            }}
          />
          {/* Fallback */}
          <div
            className="hidden absolute inset-0 items-center justify-center bg-natural-cream text-forest-green/25 text-5xl"
            aria-hidden="true"
          >
            🍌
          </div>
        </div>

        {/* Step number badge — overlaps top-left of image */}
        <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-forest-green flex items-center justify-center shadow-md">
          <span className="text-banana-yellow text-xs font-bold tracking-tight leading-none">
            {step.number}
          </span>
        </div>

        {/* Subtle gradient at bottom for text legibility on card */}
        <div
          className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/10 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Text */}
      <div className="px-1">
        <h3 className="text-base sm:text-lg font-bold text-forest-green mb-2 leading-snug">
          {step.heading}
        </h3>
        <p className="text-forest-green/60 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════════════════ */
export default function About() {
  return (
    <>
      {/* ════════════════════════════════════════════
          Part 1 — "A Taste of Khandesh" (forest-green)
          Existing brand story section — unchanged
          ════════════════════════════════════════════ */}
      <section id="about" className="bg-forest-green overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* ── Left: Image ── */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative mx-auto max-w-md lg:max-w-full">

                {/* Offset border accent */}
                <div
                  className="absolute -top-3 -left-3 w-full h-full rounded-3xl border-2 border-banana-yellow/25"
                  aria-hidden="true"
                />

                {/* Dot pattern */}
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E9B949 1.5px, transparent 1.5px)',
                    backgroundSize: '10px 10px',
                  }}
                  aria-hidden="true"
                />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=85&auto=format&fit=crop"
                    alt="A bowl of crispy banana chips representing the snacks offered by Khandesh Naturals"
                    loading="lazy"
                    className="w-full h-64 sm:h-80 lg:h-[400px] object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.removeProperty('display');
                    }}
                  />
                  <div
                    className="hidden w-full h-64 sm:h-80 lg:h-[400px] bg-forest-green/30 items-center justify-center text-natural-cream/30 text-5xl"
                    aria-hidden="true"
                  >
                    🍌
                  </div>
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" aria-hidden="true" />
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 right-4 bg-banana-yellow text-forest-green text-xs font-bold px-4 py-1.5 rounded-full shadow-md tracking-wide">
                  EST. IN KHANDESH
                </div>
              </div>
            </div>

            {/* ── Right: Text ── */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">

              <SectionLabel text="Our Story" light />

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-natural-cream leading-tight mb-6">
                A Taste of{' '}
                <span className="text-banana-yellow">Khandesh</span>
              </h2>

              <p className="text-natural-cream/75 text-base sm:text-lg leading-relaxed mb-5">
                Khandesh Naturals brings you the delightful crunch of banana chips in two
                flavours:{' '}
                <strong className="text-natural-cream font-semibold">Spicy Banana Chips</strong>{' '}
                and{' '}
                <strong className="text-natural-cream font-semibold">Salty Banana Chips</strong>.{' '}
                Our brand celebrates simple snack moments and the familiar joy of sharing
                something delicious with family and friends.
              </p>

              <p className="text-natural-cream/50 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Whether you enjoy a little spice or prefer a savoury crunch, discover a
                flavour that fits your snack time.
              </p>

              {/* Feature tiles */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8 flex-wrap">
                {FEATURES.map(({ emoji, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 min-w-[80px]"
                  >
                    <span className="text-lg leading-none" aria-hidden="true">{emoji}</span>
                    <span className="text-natural-cream/60 text-xs font-medium whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-banana-yellow text-forest-green font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200"
              >
                Explore Our Products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Part 2 — "From Our Farm to Your Snack" (cream)
          New process section
          ════════════════════════════════════════════ */}
      <section
        id="our-process"
        className="bg-natural-cream py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-14 lg:mb-18">
            <SectionLabel text="Our Process" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green leading-tight mb-4">
              From Our Farm to{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Your Snack</span>
                <span
                  className="absolute left-0 bottom-0.5 w-full h-3 bg-banana-yellow/35 -z-0 rounded-sm"
                  aria-hidden="true"
                />
              </span>
            </h2>
            <p className="text-forest-green/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Discover the journey behind Khandesh Naturals banana chips, from carefully
              sourced bananas to a delicious, crunchy snack.
            </p>
          </div>

          {/* ── Step cards grid ── */}
          <div className="relative">
            {/* Desktop connector — dashed line running through card midpoints */}
            <div
              className="hidden lg:block absolute top-[120px] left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-px border-t-2 border-dashed border-forest-green/15 z-0"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
              {PROCESS_STEPS.map((step, idx) => (
                <ProcessCard
                  key={step.number}
                  step={step}
                  isLast={idx === PROCESS_STEPS.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA nudge */}
          <div className="mt-14 text-center">
            <p className="text-forest-green/50 text-sm mb-4">
              Ready to taste the result?
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-forest-green text-natural-cream font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:bg-forest-green/85 hover:shadow-lg transition-all duration-200"
            >
              See Our Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
