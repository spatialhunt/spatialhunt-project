"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Top-of-page quick filter bar.
 *
 * Responsive strategy
 * ───────────────────
 * xs / sm  : vertical stacked card  (each field full-width)
 * md +     : single horizontal pill row  (border-divided segments)
 *
 * Seeding from existing URL params means navigating back to /properties
 * preserves whatever RefineSearch already set.
 */
/* ── shared select wrapper ───────────────────────────────────────────── */
const SelectField = ({
  label,
  value,
  onChange,
  children,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold text-[#2E2E2E] md:text-sm">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-[6px] border border-[#D9D9D9] bg-white px-3 pr-9 text-sm text-[#2E2E2E] outline-none focus-visible:ring-2 focus-visible:ring-[#1E5A4F] md:rounded-none md:border-0 md:bg-transparent md:px-0 md:pr-6"
      >
        {children}
      </select>
      <img
        src="/dropdown.svg"
        alt=""
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 md:right-0"
      />
    </div>
  </div>
);

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(
    searchParams.get("location") ?? "",
  );
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") ?? "All Types",
  );
  const [priceRange, setPriceRange] = useState(
    searchParams.get("priceRange") ?? "Any Price",
  );
  const [bedrooms, setBedrooms] = useState(
    searchParams.get("bedrooms") ?? "Any",
  );

  const handleSearch = () => {
    // Preserve any extra params (furnishing, amenity checkboxes) already set
    const params = new URLSearchParams(searchParams.toString());

    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    if (propertyType !== "All Types") {
      params.set("propertyType", propertyType);
    } else {
      params.delete("propertyType");
    }

    if (priceRange !== "Any Price") {
      params.set("priceRange", priceRange);
    } else {
      params.delete("priceRange");
    }

    if (bedrooms !== "Any") {
      params.set("bedrooms", bedrooms);
    } else {
      params.delete("bedrooms");
    }

    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="w-full px-4 pb-5 pt-2 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-7xl">

        {/* ── mobile / sm: vertical card ──────────────────────────────────── */}
        <div className="flex flex-col gap-4 rounded-[10px] bg-[#F0F0F0] p-4 sm:p-5 md:hidden">

          {/* location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2E2E2E]">
              Location
            </label>
            <div className="flex h-10 items-center rounded-[6px] border border-[#D9D9D9] bg-white px-3">
              <img src="/location.svg" alt="" className="h-4 w-4 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Lagos, Nigeria"
                className="ml-2 min-w-0 flex-1 bg-transparent text-sm text-[#2E2E2E] outline-none placeholder:text-[#999]"
              />
            </div>
          </div>

          {/* 2-col grid for dropdowns on sm */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SelectField
              label="Property Type"
              value={propertyType}
              onChange={setPropertyType}
            >
              <option>All Types</option>
              <option>2 Bedroom Apartment</option>
              <option>Mini Flat</option>
              <option>3 Bedroom Flat</option>
              <option>4 Bedroom Duplex</option>
              <option>Luxury Condo</option>
            </SelectField>

            <SelectField
              label="Price Range"
              value={priceRange}
              onChange={setPriceRange}
            >
              <option>Any Price</option>
              <option>₦800,000/year</option>
              <option>₦2,500,000/year</option>
              <option>₦3,000,000/year</option>
              <option>₦85,000,000</option>
              <option>₦3,000,000,000</option>
            </SelectField>

            <SelectField
              label="Bedrooms"
              value={bedrooms}
              onChange={setBedrooms}
            >
              <option>Any</option>
              <option>1 Bedroom</option>
              <option>2 Bedrooms</option>
              <option>3 Bedrooms</option>
              <option>4+ Bedrooms</option>
            </SelectField>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#1E5A4F] text-sm font-semibold text-white transition hover:bg-[#17483F] focus-visible:ring-2 focus-visible:ring-[#1E5A4F]"
          >
            <img src="/filtericon.svg" alt="" className="h-4 w-4" />
            Search
          </button>
        </div>

        {/* ── md+: horizontal pill row ────────────────────────────────────── */}
        <div className="hidden overflow-hidden rounded-[10px] border border-[#E0E0E0] bg-white shadow-sm md:flex md:items-stretch">

          {/* location */}
          <div className="flex min-w-0 flex-[1.5] flex-col gap-1.5 px-5 py-3.5">
            <label className="text-xs font-semibold text-[#2E2E2E]">
              Location
            </label>
            <div className="flex h-9 items-center">
              <img src="/location.svg" alt="" className="h-5 w-5 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="City, neighborhood…"
                className="ml-2 min-w-0 flex-1 bg-transparent text-sm text-[#2E2E2E] outline-none placeholder:text-[#999]"
              />
            </div>
          </div>

          <div className="my-3 w-px bg-[#E0E0E0]" />

          {/* property type */}
          <div className="flex min-w-0 flex-[1.1] flex-col gap-1.5 px-5 py-3.5">
            <label className="text-xs font-semibold text-[#2E2E2E]">
              Property Type
            </label>
            <div className="relative h-9">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-6 text-sm text-[#2E2E2E] outline-none"
              >
                <option>All Types</option>
                <option>2 Bedroom Apartment</option>
                <option>Mini Flat</option>
                <option>3 Bedroom Flat</option>
                <option>4 Bedroom Duplex</option>
                <option>Luxury Condo</option>
              </select>
              <img
                src="/dropdown.svg"
                alt=""
                className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="my-3 w-px bg-[#E0E0E0]" />

          {/* price range */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-5 py-3.5">
            <label className="text-xs font-semibold text-[#2E2E2E]">
              Price Range
            </label>
            <div className="relative h-9">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-6 text-sm text-[#2E2E2E] outline-none"
              >
                <option>Any Price</option>
                <option>₦800,000/year</option>
                <option>₦2,500,000/year</option>
                <option>₦3,000,000/year</option>
                <option>₦85,000,000</option>
                <option>₦3,000,000,000</option>
              </select>
              <img
                src="/dropdown.svg"
                alt=""
                className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="my-3 w-px bg-[#E0E0E0]" />

          {/* bedrooms */}
          <div className="flex min-w-0 flex-[0.8] flex-col gap-1.5 px-5 py-3.5">
            <label className="text-xs font-semibold text-[#2E2E2E]">
              Bedrooms
            </label>
            <div className="relative h-9">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-6 text-sm text-[#2E2E2E] outline-none"
              >
                <option>Any</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4+ Bedrooms</option>
              </select>
              <img
                src="/dropdown.svg"
                alt=""
                className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2"
              />
            </div>
          </div>

          {/* search button */}
          <button
            type="button"
            onClick={handleSearch}
            className="flex shrink-0 items-center gap-2 self-stretch bg-[#1E5A4F] px-6 text-sm font-semibold text-white transition hover:bg-[#17483F] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1E5A4F] lg:px-8"
          >
            <img src="/filtericon.svg" alt="" className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Filter;
