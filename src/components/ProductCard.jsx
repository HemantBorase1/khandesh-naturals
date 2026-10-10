/**
 * ProductCard — reusable card for a single product.
 *
 * Props:
 *  name        {string}  — product display name
 *  description {string}  — short product description
 *  imageUrl    {string}  — primary image URL
 *  imageAlt    {string}  — descriptive alt text
 *  badge       {string}  — optional small badge label (e.g. "🌶 Spicy")
 *  enquireHref {string}  — href for the Enquire Now button
 */
export default function ProductCard({
  name,
  description,
  imageUrl,
  imageAlt,
  badge,
  enquireHref = '#contact',
}) {
  return (
    <article className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-natural-cream/60 shadow-md hover:shadow-xl transition-shadow duration-300">

      {/* Image wrapper */}
      <div className="relative overflow-hidden h-60 sm:h-64 bg-natural-cream shrink-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.removeProperty('display');
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 hidden items-center justify-center text-forest-green/30 text-5xl bg-natural-cream"
          aria-hidden="true"
        >
          🍌
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white/50 to-transparent" aria-hidden="true" />

        {/* Optional spice/variety badge */}
        {badge && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-forest-green text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {badge}
          </div>
        )}
      </div>

      {/* Card body — flex-1 ensures equal heights across grid */}
      <div className="flex flex-col flex-1 p-6">
        {/* Accent bar */}
        <div className="w-8 h-1 rounded-full bg-banana-yellow mb-4" aria-hidden="true" />

        <h3 className="text-lg font-bold text-forest-green mb-2 leading-snug">
          {name}
        </h3>

        <p className="text-forest-green/60 text-sm leading-relaxed flex-1 mb-6">
          {description}
        </p>

        <a
          href={enquireHref}
          className="inline-flex items-center justify-center gap-2 bg-forest-green text-natural-cream text-sm font-semibold px-6 py-3 rounded-full shadow-sm hover:bg-forest-green/85 hover:shadow-md transition-all duration-200"
        >
          Enquire Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
