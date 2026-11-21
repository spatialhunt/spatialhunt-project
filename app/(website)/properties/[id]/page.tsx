"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// ─── property data ───────────────────────────────────────────────────────────
const propertyData = {
  "two-bedroom-apartment": {
    title: "2 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000/year",
    beds: 2,
    bathrooms: 2,
    parking: 1,
    propertyType: "Apartment",
    furnishing: "Semi-Furnished",
    status: "Available",
    listedOn: "Aug 22, 2026",
    propertyId: "SH-LP1-A-1023",
    description:
      "Lovely 2 bedroom apartment in a secure estate with 24/7 electricity, security, clean water and well maintained environment.",
    about:
      "This modern 2 bedroom apartment offers comfort and convenience in one of Lagos most sought-after locations. Situated in a well secured estate with constant power supply, treated water supply, and 24/7 security.",
    response: "Response rate: 96%",
    responseTime: "Response time: within 30 mins",
  },
  "mock-lekki-2bed": {
    title: "2 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000/year",
    beds: 2,
    bathrooms: 2,
    parking: 1,
    propertyType: "Apartment",
    furnishing: "Semi-Furnished",
    status: "Available",
    listedOn: "Aug 1, 2026",
    propertyId: "SH-LP1-A-1001",
    description:
      "Secure estate apartment with 24/7 electricity and security in Lekki Phase 1.",
    about:
      "This 2 bedroom apartment sits inside a well-managed estate in Lekki Phase 1 with treated water, constant power supply, and professional security. Ideal for professionals and small families.",
    response: "Response rate: 94%",
    responseTime: "Response time: within 1 hour",
  },
  "mock-yaba-mini": {
    title: "Mini Flat near UNILAG",
    location: "Yaba, Lagos",
    price: "₦900,000/year",
    beds: 1,
    bathrooms: 1,
    parking: 0,
    propertyType: "Mini Flat",
    furnishing: "Unfurnished",
    status: "Available",
    listedOn: "Aug 5, 2026",
    propertyId: "SH-YB-M-2001",
    description:
      "Compact mini flat ideal for students — walkable to campus shuttle.",
    about:
      "A well-maintained mini flat in Yaba, perfectly positioned for students at UNILAG or staff at nearby institutions. Steady water supply and secure compound.",
    response: "Response rate: 90%",
    responseTime: "Response time: within 2 hours",
  },
  "mock-ikeja-3bed": {
    title: "3 Bedroom Duplex",
    location: "Ikeja GRA, Lagos",
    price: "₦4,500,000/year",
    beds: 3,
    bathrooms: 3,
    parking: 2,
    propertyType: "House",
    furnishing: "Semi-Furnished",
    status: "Pending Verification",
    listedOn: "Sep 12, 2026",
    propertyId: "SH-IK-D-3001",
    description:
      "Family duplex with parking and estate security in Ikeja GRA.",
    about:
      "Spacious family duplex in a serene Ikeja GRA location. Features ample parking for 2 cars, 24/7 estate security, and a well-designed layout for comfortable family living.",
    response: "Response rate: 88%",
    responseTime: "Response time: within 3 hours",
  },
};

const galleryImages = [
  "/property-one.svg",
  "/thumbnail1.svg",
  "/thumbnail2.svg",
  "/thumbnail3.svg",
  "/thumbnail4.svg",
  "/thumbnail5.svg",
];

const amenities = [
  { name: "Fitted Kitchen",       icon: "/filteredkitchen.svg" },
  { name: "Swimming Pool",        icon: "/swimming.svg"        },
  { name: "Prepaid Meter",        icon: "/preparedmeter.svg"   },
  { name: "Balcony",              icon: "/balcony.svg"         },
  { name: "Air Conditioning",     icon: "/aircondition.svg"    },
  { name: "Tiled Floor",          icon: "/tiledfloor.svg"      },
  { name: "POP Ceiling",          icon: "/ceiling.svg"         },
  { name: "Ample Parking Space",  icon: "/parking.svg"         },
];

// ─── auto-sliding gallery component ─────────────────────────────────────────
function PropertyGallery() {
  const [active, setActive]       = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused]       = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setActive(index);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating],
  );

  const next = useCallback(
    () => goTo((active + 1) % galleryImages.length),
    [active, goTo],
  );

  const prev = useCallback(
    () => goTo((active - 1 + galleryImages.length) % galleryImages.length),
    [active, goTo],
  );

  // Auto-advance every 4 s unless user is hovering / swiping
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next, paused]);

  return (
    <div className="min-w-0">
      {/* ── main slide ── */}
      <div
        className="relative h-[250px] w-full overflow-hidden rounded-[8px] border border-[#D9D9D9] bg-[#F7F7F7] sm:h-[300px] md:h-[330px] lg:h-[345px] xl:h-[380px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* slides with cross-fade */}
        {galleryImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === active ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={src}
              alt={`Property image ${i + 1}`}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* prev arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-bold shadow transition hover:bg-white active:scale-95 sm:h-9 sm:w-9"
        >
          ‹
        </button>

        {/* next arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-bold shadow transition hover:bg-white active:scale-95 sm:h-9 sm:w-9"
        >
          ›
        </button>

        {/* dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-5 h-2 bg-[#F4B942]"
                  : "w-2 h-2 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>

        {/* image counter badge */}
        <span className="absolute right-3 top-3 z-30 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
          {active + 1} / {galleryImages.length}
        </span>
      </div>

      {/* ── thumbnail strip ── */}
      <div className="mt-3 flex w-full gap-2 overflow-x-auto pb-1 sm:gap-2.5">
        {galleryImages.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`View property image ${i + 1}`}
            className={`relative h-[52px] w-[62px] shrink-0 overflow-hidden rounded-[5px] border bg-[#F7F7F7] transition-all duration-200 sm:h-[60px] sm:w-[72px] md:h-[62px] md:w-[76px] lg:h-[58px] lg:w-[72px] ${
              active === i
                ? "border-2 border-[#1E5A4F] opacity-100"
                : "border-[#D9D9D9] opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {/* active ring overlay */}
            {active === i && (
              <span className="absolute inset-0 rounded-[4px] ring-2 ring-inset ring-[#1E5A4F]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function PropertyDetailsPage() {
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id ?? "two-bedroom-apartment";

  const property =
    propertyData[id as keyof typeof propertyData] ??
    propertyData["two-bedroom-apartment"];

  const [saved,          setSaved]          = useState(false);
  const [requested,      setRequested]      = useState(false);
  const [showMoreAbout,  setShowMoreAbout]  = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Check out this property on SpatialHunt: ${property.title}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Property link copied!");
      }
    } catch { /* user cancelled */ }
  };

  return (
    <main className="w-full bg-white text-[#2E2E2E]">
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-10 pt-6 sm:px-5 sm:pt-8 md:px-7 md:pt-10 lg:px-10 lg:pt-8 xl:px-12">

        {/* ── breadcrumb + share/save ── */}
        <div className="flex w-full flex-col gap-4 border-b border-[#EAEAEA] py-5 sm:py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] sm:text-xs md:text-sm">
            <Link href="/" className="whitespace-nowrap font-medium text-[#2E2E2E] hover:text-[#1E5A4F] transition">Home</Link>
            <img src="/arrow1.svg" alt="" className="h-3 w-3 shrink-0" />
            <Link href="/properties" className="whitespace-nowrap font-medium text-[#2E2E2E] hover:text-[#1E5A4F] transition">Properties</Link>
            <img src="/arrow1.svg" alt="" className="h-3 w-3 shrink-0" />
            <span className="truncate font-medium text-[#2E2E2E]">{property.title}</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 text-[11px] font-medium text-[#2E2E2E] hover:text-[#1E5A4F] transition sm:text-xs md:text-[13px]"
            >
              <img src="/share.svg" alt="Share" className="h-4 w-4 shrink-0" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={() => setSaved((v) => !v)}
              className={`flex items-center gap-2 text-[11px] font-medium transition sm:text-xs md:text-[13px] ${saved ? "text-[#1E5A4F]" : "text-[#2E2E2E] hover:text-[#1E5A4F]"}`}
            >
              <img src="/save.svg" alt="Save" className="h-4 w-4 shrink-0" />
              <span>{saved ? "Saved Property" : "Save Property"}</span>
            </button>
          </div>
        </div>

        {/* ── main content grid ── */}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">

          {/* ── LEFT ── */}
          <div className="min-w-0">

            {/* gallery + property info */}
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-[minmax(0,1.25fr)_minmax(250px,0.75fr)] lg:grid-cols-[minmax(0,1.18fr)_minmax(235px,0.82fr)]">

              {/* AUTO-SLIDING GALLERY */}
              <PropertyGallery />

              {/* property info */}
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h1 className="text-base font-bold leading-tight text-[#2E2E2E] sm:text-lg md:text-xl lg:text-[17px] xl:text-lg">
                      {property.title}
                    </h1>
                    <div className="mt-2 flex items-center gap-1.5">
                      <img src="/location.svg" alt="" className="h-4 w-4 shrink-0" />
                      <span className="text-[11px] text-[#666666] sm:text-[12px]">{property.location}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSaved((v) => !v)}
                    className="flex shrink-0 items-center gap-1.5 text-[10px] text-[#555555] hover:text-[#1E5A4F] transition sm:text-xs"
                  >
                    <img src="/save.svg" alt="" className="h-4 w-4" />
                    <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
                  </button>
                </div>

                {/* price */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-base font-bold text-[#1E5A4F] sm:text-lg md:text-xl lg:text-base xl:text-lg">
                    {property.price}
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-[4px] bg-[#117E2526] px-2 py-1 text-[8px] font-medium text-[#117E25] sm:text-[9px]">
                    <img src="/verify.svg" alt="" className="h-3 w-3" />
                    Verified property
                  </span>
                </div>

                {/* features */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#D9D9D9] pb-4">
                  {[
                    { icon: "/beds.svg",     label: `${property.beds} Beds`         },
                    { icon: "/bathroom.svg", label: `${property.bathrooms} Bathrooms` },
                    { icon: "/parking.svg",  label: `${property.parking} Parking`   },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center gap-1.5">
                      <img src={f.icon} alt="" className="h-4 w-4 shrink-0" />
                      <span className="text-[11px] text-[#555555] sm:text-xs">{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* description */}
                <p className="mt-4 text-[12px] font-medium leading-5 text-[#666666] sm:text-xs sm:leading-5">
                  {property.description}
                </p>

                {/* property detail rows */}
                <div className="mt-5 flex w-full flex-row gap-8 border-b border-[#D9D9D9] pb-5 sm:gap-12 md:gap-16 lg:gap-12 xl:gap-16">
                  <div className="flex flex-1 flex-col gap-3 sm:gap-4 text-xs font-medium text-[#777777] sm:text-sm">
                    <p>Property Type</p>
                    <p>Furnishing</p>
                    <p>Status</p>
                    <p>Listed on</p>
                    <p>Property ID</p>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 sm:gap-4 text-xs font-semibold sm:text-sm">
                    <p className="truncate text-[#2E2E2E]">{property.propertyType}</p>
                    <p className="truncate text-[#2E2E2E]">{property.furnishing}</p>
                    <p className="truncate text-[#117E25]">{property.status}</p>
                    <p className="truncate text-[#2E2E2E]">{property.listedOn}</p>
                    <p className="truncate text-[#2E2E2E]">{property.propertyId}</p>
                  </div>
                </div>

                {/* badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <img src="/water.svg"    alt="Electricity and water"       className="h-8 w-auto max-w-full object-contain" />
                  <img src="/security.svg" alt="Security and clean environment" className="h-8 w-auto max-w-full object-contain" />
                </div>
              </div>
            </div>

            {/* ── about + amenities ── */}
            <div className="mt-6 grid grid-cols-1 gap-7 border-t border-[#D9D9D9] pt-6 sm:mt-7 sm:gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
              <section>
                <h2 className="text-base font-bold text-[#2E2E2E] sm:text-[17px] md:text-lg">About this Property</h2>
                <p className="mt-3 text-[13px] font-medium leading-5 text-[#666666] sm:text-sm sm:leading-6 md:text-[15px] md:leading-6">
                  {showMoreAbout ? property.about : property.about.slice(0, 180) + "…"}
                </p>
                <button
                  type="button"
                  onClick={() => setShowMoreAbout((v) => !v)}
                  className="mt-3 text-[12px] font-bold text-[#1E5A4F] underline underline-offset-2 hover:opacity-75 transition sm:text-[13px] md:text-sm"
                >
                  {showMoreAbout ? "Show less" : "Show more"}
                </button>
              </section>

              <section>
                <h2 className="text-base font-bold text-[#2E2E2E] sm:text-[17px] md:text-lg">Amenities</h2>
                <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 sm:gap-x-6 md:gap-x-7 md:gap-y-5">
                  {amenities.map((a) => (
                    <div key={a.name} className="flex items-center gap-2.5">
                      <img src={a.icon} alt="" className="h-5 w-5 shrink-0 object-contain sm:h-[21px] sm:w-[21px]" />
                      <span className="text-[12px] font-semibold text-[#555555] sm:text-[13px] md:text-sm">{a.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ── landmarks ── */}
            <section className="mt-7 border-t border-[#D9D9D9] pt-6 sm:mt-8 md:mt-9 lg:mt-8">
              <h2 className="text-base font-bold text-[#2E2E2E] sm:text-lg">Landmarks</h2>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 sm:mt-6 md:grid-cols-4 lg:grid-cols-5 xl:flex xl:flex-wrap xl:gap-6">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex items-center">
                    <img
                      src={`/landmark${n}.svg`}
                      alt={`Landmark ${n}`}
                      className="h-9 w-auto max-w-[200px] object-contain object-left"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="w-full lg:w-auto">

            {/* landlord card */}
            <div className="rounded-[8px] border border-[#D9D9D9] bg-white p-4 sm:p-5 lg:p-4 xl:p-5">
              <h2 className="text-[13px] font-semibold text-[#2E2E2E] sm:text-sm md:text-[15px]">
                Connect Directly with Landlord
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <img
                  src="/adewale.svg"
                  alt="Adewale Johnson"
                  className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="whitespace-nowrap text-[14px] font-bold text-[#2E2E2E] sm:text-[15px] md:text-base">
                      Mr. Adewale Johnson
                    </h3>
                    <img src="/verify.svg" alt="Verified" className="h-4 w-4 shrink-0 sm:h-[17px] sm:w-[17px]" />
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-[#117E25] sm:text-xs md:text-[13px]">Verified Landlord</p>
                  <div className="mt-2 space-y-0.5 text-[11px] leading-4 text-[#555555] sm:text-xs sm:leading-5 md:text-[13px]">
                    <p>Member since Jan 2026</p>
                    <p>Properties listed: 12</p>
                    <p>{property.response}</p>
                    <p>{property.responseTime}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Chat with landlord coming soon.")}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#1E5A4F] px-4 py-3 text-[12px] font-semibold text-white hover:opacity-90 transition sm:text-[13px] md:text-sm"
              >
                <img src="/chat.svg" alt="" className="h-5 w-5 shrink-0" />
                <span>Connect with Landlord</span>
              </button>

              <button
                type="button"
                onClick={() => window.open("https://wa.me/2348000000000", "_blank")}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9D9D9] bg-white px-4 py-3 text-[12px] font-semibold text-[#1E5A4F] hover:border-[#1E5A4F] hover:bg-[#F7F7F7] transition sm:text-[13px] md:text-sm"
              >
                <span className="text-base sm:text-lg">◉</span>
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* why rent on SpatialHunt */}
            <div className="mt-6 rounded-[8px] border border-[#D9D9D9] bg-[#F7F7F7] p-4 sm:mt-9 sm:p-5 md:p-6">
              <div className="flex items-center gap-2">
                <img src="/why.svg" alt="" className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6" />
                <h2 className="text-sm font-bold text-[#1E5A4F] sm:text-base md:text-lg">Why rent direct on SpatialHunt?</h2>
              </div>
              <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
                {[
                  "No agent fee",
                  "Direct communication with landlord",
                  "Transparent & secure process",
                  "100% verified landlords",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 sm:gap-3">
                    <img src="/greengood.svg" alt="" className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium text-[#555555] sm:text-sm md:text-[15px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* map */}
            <div className="mt-5 overflow-hidden rounded-[8px] border border-[#E1E1E1] bg-white">
              <div className="p-4 pb-2">
                <h2 className="text-[14px] font-bold text-[#2E2E2E] sm:text-[15px] md:text-base">Location</h2>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Lekki+Phase+1+Lagos+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-[150px] w-full overflow-hidden sm:h-[180px] md:h-[190px] lg:h-[145px] xl:h-[170px]"
              >
                <img src="/map.svg" alt="Map" className="h-full w-full object-cover" loading="lazy" />
              </a>

              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-start gap-2">
                  <img src="/maplocation.svg" alt="" className="mt-0.5 h-5 w-5 shrink-0 object-contain" />
                  <p className="text-[11px] font-medium leading-4 text-[#555555] sm:text-xs sm:leading-5 md:text-[13px]">
                    Lekki Phase 1, Lagos, Nigeria
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lekki+Phase+1+Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-2 rounded-[5px] border border-[#2E2E2E] px-3 py-1.5 text-[10px] font-semibold text-[#2E2E2E] hover:border-[#1E5A4F] hover:text-[#1E5A4F] transition sm:px-3.5 sm:py-2 sm:text-[11px] md:text-xs"
                >
                  <img src="/mapicon.svg" alt="" className="h-4 w-4 shrink-0 sm:h-[17px] sm:w-[17px]" />
                  <span>View on Map</span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* ── sticky bottom action bar ── */}
        <div className="sticky bottom-0 z-20 mt-8 flex flex-col gap-3 rounded-[8px] border border-[#D9D9D9] bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-4 md:gap-4 lg:mt-7">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 md:gap-3">
            <span className="whitespace-nowrap text-sm font-bold text-[#2E2E2E] sm:text-base lg:text-lg">
              {property.price}
            </span>
            <div className="hidden h-5 w-px bg-[#D9D9D9] sm:block" />
            {[
              { icon: "/beds.svg",     label: `${property.beds} Beds`         },
              { icon: "/bathroom.svg", label: `${property.bathrooms} Bathrooms` },
              { icon: "/parking.svg",  label: `${property.parking} Parking`   },
              { icon: "/swimming.svg", label: "Swimming Pool"                  },
            ].map((f) => (
              <span key={f.label} className="flex items-center gap-1.5 rounded-[5px] border border-[#D9D9D9] px-2 py-1.5 text-[10px] font-medium text-[#555555] sm:px-2.5 sm:text-[11px] md:text-xs">
                <img src={f.icon} alt="" className="h-4 w-4 shrink-0 sm:h-[17px] sm:w-[17px]" />
                {f.label}
              </span>
            ))}
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => setSaved((v) => !v)}
              className="flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#D9D9D9] bg-white px-4 py-2.5 text-[10px] font-medium text-[#555555] hover:border-[#1E5A4F] hover:text-[#1E5A4F] transition sm:flex-none sm:text-[11px] md:text-xs"
            >
              <img src="/save.svg" alt="" className="h-4 w-4" />
              {saved ? "Saved" : "Save Property"}
            </button>

            <button
              type="button"
              onClick={() => setRequested((v) => !v)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-[6px] px-4 py-2.5 text-[10px] font-medium transition sm:flex-none sm:min-w-[145px] sm:text-[11px] md:text-xs ${
                requested ? "bg-[#117E25] text-white" : "bg-[#F4B942] text-[#2E2E2E]"
              }`}
            >
              <img src="/request.svg" alt="" className="h-4 w-4" />
              {requested ? "Request Sent" : "Request to Rent"}
            </button>
          </div>
        </div>

        {/* floating share */}
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share property"
          className="fixed bottom-24 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#D9D9D9] bg-white shadow-md hover:border-[#1E5A4F] transition sm:bottom-20 sm:right-6"
        >
          <img src="/share.svg" alt="Share" className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}
