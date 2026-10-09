/**
 * ProductCard — reusable card for a single product.
 *
 * Props:
 *  name        {string}  — product display name
 *  description {string}  — short product description
 *  imageUrl    {string}  — primary image URL
 *  imageAlt    {string}  — descriptive alt text
 *  enquireHref {string}  — anchor href for the Enquire Now button
 */
export default function ProductCard({
  name,
  description,
  imageUrl,
  imageAlt,
  enquireHref = '#contact',
}) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border border-natural-cream">

      {/* Product image */}
      <div className="relative overflow-hidden h-64 sm:h-72 bg-natural-cream">
        <img
          src={imageUrl}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'flex';
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 items-center justify-center text-forest-green/30 text-4xl bg-natural-cream"
          style={{ display: 'none' }}
        >
          🍌
        </div>

        {/* Subtle gradient overlay at the bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 sm:p-8">

        {/* Decorative accent line */}
        <div className="w-10 h-1 rounded-full bg-banana-yellow mb-4" />

        <h3 className="text-xl font-bold text-forest-green mb-2 leading-snug">
          {name}
        </h3>

        <p className="text-forest-green/65 text-sm leading-relaxed flex-1 mb-6">
          {description}
        </p>

        <a
          href={enquireHref}
          className="inline-flex items-center justify-center gap-2 bg-forest-green text-natural-cream text-sm font-semibold px-6 py-3 rounded-full shadow hover:bg-forest-green/85 hover:shadow-md transition-all duration-200"
        >
          Enquire Now
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
      </div>
    </article>
  );
}
