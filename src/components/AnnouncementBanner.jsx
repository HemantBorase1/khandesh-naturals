/**
 * AnnouncementBanner.jsx
 *
 * Promotional announcement banner for Khandesh Naturals.
 * Informs customers that banana chips are now delivering to Pune.
 *
 * Features:
 *  - Follows Khandesh Naturals organic brand palette (forest green, banana yellow, natural cream, earth brown).
 *  - Subtle delivery van icon with an active status pulse indicator.
 *  - Organic leaf accent watermark for brand coherence.
 *  - Fully responsive across mobile, tablet, and desktop screens.
 *  - Elegant rounded corners and smooth entrance animation.
 *  - Easily configurable via props or default values for future city rollouts or promo updates.
 */

// Subtle decorative banana leaf SVG matching Hero styling
function BannerLeafAccent({ className = '' }) {
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
      />
      <line
        x1="60"
        y1="10"
        x2="60"
        y2="170"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Subtle delivery vehicle icon with parcel details
function DeliveryIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Truck body */}
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      {/* Truck cabin */}
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14v10Z" />
      {/* Wheels */}
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
      {/* Speed lines */}
      <path d="M2 9h3" strokeWidth="1.8" />
      <path d="M1 12h2.5" strokeWidth="1.8" />
    </svg>
  );
}

export default function AnnouncementBanner({
  badgeText = "Pune Express Delivery",
  headline = "Good News, Pune! 🎉 Khandesh Naturals is Now Delivering in Pune!",
  supportingText = "Enjoy our delicious, homemade Spicy & Salty Banana Chips. Freshness from Khandesh, delivered to your doorstep in Pune.",
  ctaText = "Order in Pune",
  ctaHref = "#contact",
}) {
  return (
    <aside
      aria-label="Promotional Delivery Announcement"
      className="relative z-40 bg-natural-cream border-b border-banana-yellow/30 animate-banner-entrance"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FFFBEB] via-[#FFFDF5] to-[#F2F7F2] border border-banana-yellow/50 shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-5">
          {/* Subtle background leaf watermarks */}
          <BannerLeafAccent className="absolute -top-6 -right-6 w-24 h-36 text-forest-green opacity-[0.06] pointer-events-none select-none rotate-45" />
          <BannerLeafAccent className="absolute -bottom-8 right-28 w-20 h-28 text-banana-yellow opacity-[0.12] pointer-events-none select-none -rotate-12" />

          {/* Golden accent bar on the left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-banana-yellow via-banana-yellow to-forest-green"
            aria-hidden="true"
          />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-1 sm:pl-2">
            {/* Left section: Icon + Text */}
            <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
              {/* Delivery Icon with active ping pulse */}
              <div className="relative shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-banana-yellow via-[#E9B949] to-[#D59E27] text-forest-green shadow-sm shadow-banana-yellow/30 border border-white/70 mt-0.5">
                <DeliveryIcon className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
                {/* Active live delivery pulse dot */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-forest-green border-2 border-white" />
                </span>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                {/* City badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase bg-forest-green/10 text-forest-green border border-forest-green/15 mb-1.5">
                  <span className="text-banana-yellow text-xs" aria-hidden="true">✦</span>
                  <span>{badgeText}</span>
                  <span className="text-banana-yellow text-xs" aria-hidden="true">✦</span>
                </div>

                {/* Primary Headline */}
                <h2 className="text-forest-green font-bold text-base sm:text-lg lg:text-[1.15rem] leading-snug tracking-tight">
                  {headline}
                </h2>

                {/* Supporting Message */}
                <p className="text-forest-green/80 text-xs sm:text-sm leading-relaxed mt-1 font-medium">
                  {supportingText}
                </p>
              </div>
            </div>

            {/* Right section: CTA Button */}
            <div className="flex items-center sm:self-center shrink-0 pt-1 md:pt-0">
              <a
                href={ctaHref}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-forest-green hover:bg-forest-green/90 text-natural-cream text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 group"
              >
                <span>{ctaText}</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
