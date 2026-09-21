"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  { src: "/thumbnail1.svg", alt: "Verified apartment in Lekki" },
  { src: "/thumbnail2.svg", alt: "Modern duplex in Abuja" },
  { src: "/thumbnail3.svg", alt: "Luxury condo in Victoria Island" },
  { src: "/thumbnail4.svg", alt: "Mini flat in Ikeja" },
  { src: "/thumbnail5.svg", alt: "Family home in Port Harcourt" },
];

export default function Showcase() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating],
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col-reverse items-center gap-8 px-5 pb-6 pt-10 md:flex-row md:gap-10 md:px-10 lg:px-16 xl:px-20">

        {/* ── LEFT: headline + CTAs ─────────────────────────────────────── */}
        <div className="flex w-full flex-col md:w-[52%]">
          <h1 className="text-[2rem] font-extrabold leading-[1.15] tracking-tight text-[#2E2E2E] sm:text-[2.6rem] lg:text-[3.2rem]">
            Verified Homes.
          </h1>
          <h1 className="text-[2rem] font-extrabold leading-[1.15] tracking-tight text-[#2E2E2E] sm:text-[2.6rem] lg:text-[3.2rem]">
            Direct To Landlord.
          </h1>
          <h1 className="text-[2rem] font-extrabold leading-[1.15] tracking-tight text-[#F4B940] sm:text-[2.6rem] lg:text-[3.2rem]">
            Zero Stress.
          </h1>

          <p className="mt-4 max-w-[500px] text-[0.95rem] leading-[1.75] text-[#666]">
            <span className="font-bold text-[#F4B940]">SpatialHunt</span> connects
            you directly with verified landlords so you can rent or list properties
            with confidence. No middlemen. No hidden fees. Just trust and
            transparency.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/properties">
              <button type="button" className="rounded-xl bg-[#F4B940] px-7 py-3 text-sm font-bold text-[#1E5A4F] shadow-md transition-all duration-200 hover:bg-[#e0a830] hover:shadow-lg active:scale-95">
                Find a Home
              </button>
            </Link>
            <Link href="/list-property">
              <button type="button" className="rounded-xl border-2 border-[#1E5A4F] bg-[#1E5A4F] px-7 py-3 text-sm font-bold text-[#F4B940] shadow-md transition-all duration-200 hover:bg-[#174940] hover:shadow-lg active:scale-95">
                List Your Property
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            {[
              { icon: "/Vector (2).svg", label: "100% Verified" },
              { icon: "/communication.svg", label: "Direct Communication" },
              { icon: "/key.svg", label: "Safe & Secure" },
            ].map((b) => (
              <span key={b.label} className="flex items-center gap-2 text-sm font-semibold text-[#444]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4B940]/15">
                  <img src={b.icon} alt="" width={18} height={18} loading="lazy" />
                </span>
                {b.label}
              </span>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["/pic1.svg", "/pic2.svg", "/pic3.svg"].map((s, i) => (
                <img
                  key={i}
                  src={s}
                  alt="user"
                  width={34}
                  height={34}
                  className="rounded-full border-2 border-white shadow-sm"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-sm text-[#666]">
              Join <span className="font-bold text-[#1E5A4F]">2,000+</span> happy renters &amp; landlords
            </p>
          </div>
        </div>

        {/* ── RIGHT: auto-sliding image carousel ────────────────────────── */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl md:w-[46%]">
          <div className="relative h-[280px] w-full sm:h-[340px] md:h-[380px] lg:h-[440px]">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[#F4B940]" : "w-2 bg-white/60"}`}
                />
              ))}
            </div>

            <button type="button" onClick={() => goTo((current - 1 + slides.length) % slides.length)} aria-label="Previous" className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50">‹</button>
            <button type="button" onClick={() => goTo((current + 1) % slides.length)} aria-label="Next" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50">›</button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-1.5 bg-[#1E5A4F]/10 p-2">
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`relative h-12 flex-1 overflow-hidden rounded-lg transition-all duration-200 ${i === current ? "ring-2 ring-[#F4B940]" : "opacity-60 hover:opacity-90"}`}
              >
                <img src={s.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
