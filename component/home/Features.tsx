/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const properties = [
  {
    image: "/property-one.svg",
    badge: "FOR RENT",
    badgeBg: "bg-[#1E5A4F]",
    badgeFg: "text-white",
    title: "2 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000",
    period: "/year",
    beds: "2 beds",
    baths: "2 bathrooms",
    extraIcon: "/services-icon.svg",
    extraLabel: "Serviced",
    href: "/properties/two-bedroom-apartment",
  },
  {
    image: "/property-two.svg",
    badge: "FOR SALE",
    badgeBg: "bg-[#F4B940]",
    badgeFg: "text-[#1E5A4F]",
    title: "4 Bedroom Duplex",
    location: "Asaba, Delta",
    price: "₦40,000,000",
    period: "",
    beds: "4 beds",
    baths: "5 bathrooms",
    extraIcon: "/parking1.svg",
    extraLabel: "Parking",
    href: "/properties/four-bedroom-duplex",
  },
  {
    image: "/miniflat2.svg",
    badge: "FOR RENT",
    badgeBg: "bg-[#1E5A4F]",
    badgeFg: "text-white",
    title: "Mini Flat",
    location: "Abuja, FCT",
    price: "₦1,200,000",
    period: "/year",
    beds: "1 bed",
    baths: "1 bathroom",
    extraIcon: "/services-icon.svg",
    extraLabel: "Serviced",
    href: "/properties/mini-flat",
  },
];

export default function FeatureProperties() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-350 px-5 py-14 md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20">
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1E5A4F] sm:text-2xl">
              FEATURED PROPERTIES
            </h2>
          </div>
          <Link href="/properties" className="mt-2 self-start text-sm font-semibold text-[#1E5A4F] underline underline-offset-2 hover:text-[#F4B940] sm:mt-0">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <Link key={p.title} href={p.href} className="group block">
              <article className="overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className={`absolute left-3 top-3 rounded-lg px-3 py-1 text-xs font-extrabold shadow ${p.badgeBg} ${p.badgeFg}`}>
                    {p.badge}
                  </span>
                  <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-[#1E5A4F] shadow">
                    <img src="/icon verify.svg" alt="" width={12} height={12} loading="lazy" />
                    Verified
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-[#2E2E2E]">{p.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#888]">
                    <img src="/maplocation.svg" alt="" width={13} height={13} loading="lazy" />
                    {p.location}
                  </p>
                  <p className="mt-3 text-[1.05rem] font-extrabold text-[#1E5A4F]">
                    {p.price}
                    {p.period && <span className="ml-0.5 text-xs font-medium text-[#aaa]">{p.period}</span>}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 border-t border-[#F5F5F5] pt-3">
                    {[
                      { icon: "/bed1.svg", label: p.beds },
                      { icon: "/bathroom1.svg", label: p.baths },
                      { icon: p.extraIcon, label: p.extraLabel },
                    ].map((a) => (
                      <span key={a.label} className="flex items-center gap-1.5 text-xs font-semibold text-[#555]">
                        <img src={a.icon} alt="" width={16} height={16} loading="lazy" />
                        {a.label}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}