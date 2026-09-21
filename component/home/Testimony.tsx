"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Tunde",
    location: "Lagos",
    avatar: "/tunde.svg",
    stars: 5,
    text: "Found my dream 2-bedroom apartment within a week. The landlord verification gave me total peace of mind — I knew exactly who I was dealing with. Direct communication saved so much stress.",
  },
  {
    name: "Chidinma",
    location: "Abuja",
    avatar: "/adewale.svg",
    stars: 5,
    text: "Listing Property on SpatialHunt saves me way more effort than using agents. I get quality verified tenants in less time. The platform handles everything professionally.",
  },
  {
    name: "Ibrahim",
    location: "Port Harcourt",
    avatar: "/Ibrahim.svg",
    stars: 5,
    text: "Finally verified, trusted, landlord-direct rentals exist in Nigeria! No shady agents, no inflated fees. Just direct results with full transparency.",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-[#F4B940]">
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.31L10 13.27l-4.78 2.51.91-5.31-3.86-3.76 5.34-.78z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t, active }: { t: (typeof testimonials)[0]; active?: boolean }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 shadow-sm transition-all duration-300 ${
        active
          ? "border-[#F4B940] bg-white shadow-lg scale-[1.02]"
          : "border-[#E8E8E8] bg-white"
      }`}
    >
      <StarRow count={t.stars} />
      <p className="mt-4 flex-1 text-sm leading-7 text-[#555]">"{t.text}"</p>
      <div className="mt-5 flex items-center gap-3 border-t border-[#F5F5F5] pt-4">
        <img
          src={t.avatar}
          alt={t.name}
          width={42}
          height={42}
          className="rounded-full object-cover ring-2 ring-[#F4B940]/30"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-bold text-[#2E2E2E]">{t.name}</p>
          <p className="text-xs text-[#999]">{t.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimony() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % testimonials.length);
  }, []);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  // Auto-advance every 5 s
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="w-full bg-[#F5F5F5]">
      <div className="mx-auto w-full max-w-350 px-5 py-14 md:px-10 lg:px-16 xl:px-20">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#F4B940]">
            WHAT OUR USERS SAY
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[#2E2E2E] md:text-3xl">
            Trusted by thousands
          </h2>
        </div>

        {/* Desktop: 3 cards side by side */}
        <div className="hidden gap-5 md:grid md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={t.name} t={t} active={i === active} />
          ))}
        </div>

        {/* Mobile: single auto-advancing card */}
        <div className="md:hidden">
          <Card t={testimonials[active]} active />
          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1E5A4F] text-lg text-[#1E5A4F] transition hover:bg-[#1E5A4F] hover:text-white"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-[#1E5A4F]" : "w-2 bg-[#ccc]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1E5A4F] text-lg text-[#1E5A4F] transition hover:bg-[#1E5A4F] hover:text-white"
            >
              ›
            </button>
          </div>
        </div>

        {/* Desktop dot indicators */}
        <div className="mt-8 hidden justify-center gap-2 md:flex">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-[#1E5A4F]" : "w-2 bg-[#ccc]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
