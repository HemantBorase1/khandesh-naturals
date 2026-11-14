import ProductCard from './ProductCard';

const PRODUCTS = [
  {
    id: 'spicy-banana-chips',
    name: 'Spicy Banana Chips',
    price: '₹250 / kg',
    description: 'A flavourful, spicy crunch for those who enjoy a little heat.',
    badge: '🌶 Spicy',
    imageUrl: '/images/SpicyImg.png',
    imageAlt:
      'Khandesh Naturals Spicy Banana Chips — crispy golden chips with a spicy seasoning, served in a bowl',
  },
  {
    id: 'salty-banana-chips',
    name: 'Salty Banana Chips',
    price: '₹250 / kg',
    description: 'A simple, savoury crunch for your everyday snack moments.',
    badge: '🧂 Salty',
    imageUrl: '/images/SaltyChips.png',
    imageAlt:
      'Khandesh Naturals Salty Banana Chips — lightly salted, crispy banana chips in a bowl',
  },
  {
    id: 'homemade-imali-candy',
    name: 'HomeMade ImaliCandy',
    price: '₹10 / piece',
    description: 'A tangy, homemade tamarind candy — a traditional Khandeshi treat.',
    badge: '🍬 Candy',
    imageUrl: '/images/ImaliCandyImage.jpeg',
    imageAlt:
      'Khandesh Naturals HomeMade ImaliCandy — traditional tangy tamarind candy',
  },
  {
    id: '',
    name: 'HomeMade Imali Pepsi',
    price: '₹5 / piece',
    description: 'A refreshing homemade fizzy drink inspired by classic flavours.',
    badge: '🥤 Drink',
    imageUrl: '/images/Pepsi.jpeg',
    imageAlt:
      'Khandesh Naturals HomeMade Imali Pepsi — refreshing homemade fizzy drink',
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
            Discover our delicious range of homemade snacks and treats, made for your everyday moments.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
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
