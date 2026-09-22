"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const propertyTypes = ["All Types", "2 Bedroom Apartment", "Mini Flat", "3 Bedroom Flat", "4 Bedroom Duplex", "Luxury Condo"];
const priceRanges   = ["Any Price", "₦800,000/year", "₦1,200,000/year", "₦2,500,000/year", "₦3,000,000/year", "₦40,000,000+"];
const bedroomOpts   = ["Any", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];

export default function SalesSection() {
  const router = useRouter();
  const [tab, setTab]                 = useState<"rent" | "sale">("rent");
  const [location, setLocation]       = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [priceRange, setPriceRange]   = useState("Any Price");
  const [bedrooms, setBedrooms]       = useState("Any");

  const handleSearch = () => {
    const p = new URLSearchParams({ purpose: tab });
    if (location.trim())              p.set("location", location.trim());
    if (propertyType !== "All Types") p.set("type", propertyType);
    if (priceRange !== "Any Price")   p.set("price", priceRange);
    if (bedrooms !== "Any")           p.set("bedrooms", bedrooms);
    router.push(`/properties?${p.toString()}`);
  };

  return (
    <section className="w-full bg-[#E8E8E8] px-5 py-10 md:px-10 md:py-12 lg:px-16 lg:py-14 xl:px-20">
      <div className="mx-auto w-full max-w-350">
        {/* Tab row */}
        <div className="mb-5 flex gap-3">
          {(["rent", "sale"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-5 py-2.5 text-sm font-bold capitalize shadow-sm transition-all duration-200 ${
                tab === t
                  ? "bg-[#1E5A4F] text-white"
                  : "bg-white text-[#1E5A4F] hover:bg-[#1E5A4F] hover:text-white"
              }`}
            >
              For {t === "rent" ? "Rent" : "Sale"}
            </button>
          ))}
        </div>

        {/* ── DESKTOP bar ── */}
        <div className="hidden overflow-hidden rounded-2xl bg-white shadow-lg md:flex">
          {/* Location */}
          <div className="flex min-w-0 flex-[1.8] flex-col justify-center gap-1 px-5 py-4">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#999]">Location</label>
            <div className="flex items-center gap-2">
              <img src="/location.svg" alt="" width={16} height={16} className="shrink-0 opacity-60" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Where are you looking?"
                className="w-full bg-transparent text-sm text-[#2E2E2E] outline-none placeholder:text-[#bbb]"
              />
            </div>
          </div>

          <div className="my-3 w-px bg-[#E5E5E5]" />

          {/* Property Type */}
          <div className="flex min-w-0 flex-[1.2] flex-col justify-center gap-1 px-5 py-4">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#999]">Property Type</label>
            <div className="relative">
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
                className="w-full appearance-none bg-transparent pr-5 text-sm text-[#2E2E2E] outline-none">
                {propertyTypes.map((o) => <option key={o}>{o}</option>)}
              </select>
              <img src="/dropdown.svg" alt="" width={14} height={14} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
          </div>

          <div className="my-3 w-px bg-[#E5E5E5]" />

          {/* Price */}
          <div className="flex min-w-0 flex-[1.2] flex-col justify-center gap-1 px-5 py-4">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#999]">Price Range</label>
            <div className="relative">
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                className="w-full appearance-none bg-transparent pr-5 text-sm text-[#2E2E2E] outline-none">
                {priceRanges.map((o) => <option key={o}>{o}</option>)}
              </select>
              <img src="/dropdown.svg" alt="" width={14} height={14} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
          </div>

          <div className="my-3 w-px bg-[#E5E5E5]" />

          {/* Bedrooms */}
          <div className="flex min-w-0 flex-[0.9] flex-col justify-center gap-1 px-5 py-4">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#999]">Bedrooms</label>
            <div className="relative">
              <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}
                className="w-full appearance-none bg-transparent pr-5 text-sm text-[#2E2E2E] outline-none">
                {bedroomOpts.map((o) => <option key={o}>{o}</option>)}
              </select>
              <img src="/dropdown.svg" alt="" width={14} height={14} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
          </div>

          {/* Search btn */}
          <div className="flex shrink-0 items-center p-3">
            <button onClick={handleSearch}
              className="rounded-xl bg-[#F4B940] px-6 py-3 text-sm font-bold text-[#1E5A4F] shadow transition-all duration-200 hover:bg-[#e0a830] active:scale-95 whitespace-nowrap">
              Search Properties
            </button>
          </div>
        </div>

        {/* ── MOBILE stack ── */}
        <div className="flex flex-col gap-3 md:hidden">
          {/* Location */}
          <div className="flex h-12 items-center gap-3 rounded-xl bg-white px-4 shadow-sm">
            <img src="/location.svg" alt="" width={16} height={16} className="shrink-0 opacity-50" />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you looking?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#bbb]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Type */}
            <div className="relative flex h-12 items-center rounded-xl bg-white px-4 shadow-sm">
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
                className="w-full appearance-none bg-transparent text-sm text-[#2E2E2E] outline-none">
                {propertyTypes.map((o) => <option key={o}>{o}</option>)}
              </select>
              <img src="/dropdown.svg" alt="" width={14} height={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
            {/* Price */}
            <div className="relative flex h-12 items-center rounded-xl bg-white px-4 shadow-sm">
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                className="w-full appearance-none bg-transparent text-sm text-[#2E2E2E] outline-none">
                {priceRanges.map((o) => <option key={o}>{o}</option>)}
              </select>
              <img src="/dropdown.svg" alt="" width={14} height={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="relative flex h-12 items-center rounded-xl bg-white px-4 shadow-sm">
            <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}
              className="w-full appearance-none bg-transparent text-sm text-[#2E2E2E] outline-none">
              {bedroomOpts.map((o) => <option key={o}>{o}</option>)}
            </select>
            <img src="/dropdown.svg" alt="" width={14} height={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
          </div>

          <button onClick={handleSearch}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[#F4B940] text-sm font-bold text-[#1E5A4F] shadow-md transition hover:bg-[#e0a830]">
            Search Properties
          </button>
        </div>
      </div>
    </section>
  );
}