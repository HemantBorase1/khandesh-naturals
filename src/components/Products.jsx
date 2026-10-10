import ProductCard from './ProductCard';

const PRODUCTS = [
  {
    id: 'spicy-banana-chips',
    name: 'Spicy Banana Chips',
    description: 'A flavourful, spicy crunch for those who enjoy a little heat.',
    badge: '🌶 Spicy',
    imageUrl:
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&q=85&auto=format&fit=crop',
    imageAlt:
      'Khandesh Naturals Spicy Banana Chips — crispy golden chips with a spicy seasoning, served in a bowl',
  },
  {
    id: 'salty-banana-chips',
    name: 'Salty Banana Chips',
    description: 'A simple, savoury crunch for your everyday snack moments.',
    badge: '🧂 Salty',
    imageUrl:
      'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=85&auto=format&fit=crop',
    imageAlt:
      'Khandesh Naturals Salty Banana Chips — lightly salted, crispy banana chips in a bowl',
  },
];

// Shared section label used in multiple sections
function SectionLabel({ text }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="block w-5 h-px bg-banana-yellow" aria-hidden="true" />
      <span className="text-xs font-semibold tracking-[0.2em] text-earth-brown uppercase">
        {text}
      </span>
      <span className="block w-5 h-px bg-banana-yellow" aria-hidden="true" />
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="bg-natural-cream py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <SectionLabel text="Our Products" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green mb-4 leading-tight">
            Our Favourite Crunch
          </h2>
          <p className="text-forest-green/65 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Discover our two delicious banana chips varieties, made for your everyday snack moments.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              badge={product.badge}
              imageUrl={product.imageUrl}
              imageAlt={product.imageAlt}
              enquireHref="#contact"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
