"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * RefineSearch — sidebar filter panel.
 *
 * On mobile (< lg) it renders as a collapsible drawer triggered by a button.
 * On lg+ it is always visible as a sticky sidebar.
 *
 * Seeds its state from the current URL so the panel reflects active filters
 * even after a page refresh or back-navigation.
 */
const RefineSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ── seed from URL ───────────────────────────────────────────────────── */
  const [open, setOpen] = useState(false); // mobile drawer

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
  const [furnishing, setFurnishing] = useState(
    searchParams.get("furnishing") ?? "Any",
  );
  const [filters, setFilters] = useState({
    parking:          searchParams.get("parking") === "true",
    security:         searchParams.get("security") === "true",
    swimmingPool:     searchParams.get("swimmingPool") === "true",
    airConditioning:  searchParams.get("airConditioning") === "true",
    verifiedProperty: searchParams.get("verifiedProperty") === "true",
  });

  const toggleFilter = (name: keyof typeof filters) =>
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));

  /* ── active filter count (for the mobile badge) ─────────────────────── */
  const activeCount = [
    location !== "",
    propertyType !== "All Types",
    priceRange !== "Any Price",
    bedrooms !== "Any",
    furnishing !== "Any",
    ...Object.values(filters),
  ].filter(Boolean).length;

  /* ── apply ───────────────────────────────────────────────────────────── */
  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    const set = (key: string, val: string, empty: string) => {
      if (val && val !== empty) params.set(key, val);
      else params.delete(key);
    };

    set("location",     location,     "");
    set("propertyType", propertyType, "All Types");
    set("priceRange",   priceRange,   "Any Price");
    set("bedrooms",     bedrooms,     "Any");
    set("furnishing",   furnishing,   "Any");

    const booleans: (keyof typeof filters)[] = [
      "parking", "security", "swimmingPool", "airConditioning", "verifiedProperty",
    ];
    booleans.forEach((k) => {
      if (filters[k]) params.set(k, "true");
      else params.delete(k);
    });

    router.push(`/properties?${params.toString()}`);
    setOpen(false);
  };

  /* ── clear ───────────────────────────────────────────────────────────── */
  const handleClear = () => {
    setLocation("");
    setPropertyType("All Types");
    setPriceRange("Any Price");
    setBedrooms("Any");
    setFurnishing("Any");
    setFilters({
      parking: false, security: false, swimmingPool: false,
      airConditioning: false, verifiedProperty: false,
    });
    router.push("/properties");
    setOpen(false);
  };

  /* ── shared field components ─────────────────────────────────────────── */
  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <span className="text-sm font-medium text-[#2E2E2E]">{children}</span>
  );

  const DropdownField = ({
    label,
    value,
    onChange,
    children,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full appearance-none rounded-[6px] border border-[#D9D9D9] bg-white px-3 pr-9 text-sm text-[#2E2E2E] outline-none focus-visible:ring-2 focus-visible:ring-[#1E5A4F]"
        >
          {children}
        </select>
        <img
          src="/dropdown.svg"
          alt=""
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
        />
      </div>
    </div>
  );

  /* ── panel content (shared between drawer + sidebar) ─────────────────── */
  const PanelContent = () => (
    <>
      {/* title row */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#2E2E2E] sm:text-lg">
          Refine Search
        </h2>
        <button
          type="button"
          onClick={handleClear}
          className="shrink-0 text-xs font-semibold text-[#1E5A4F] hover:text-[#F4B942] sm:text-sm"
        >
          Clear All
        </button>
      </div>

      {/* main filters */}
      <div className="flex flex-col gap-4">

        {/* location */}
        <div className="flex flex-col gap-2">
          <FieldLabel>Location</FieldLabel>
          <div className="flex h-10 items-center rounded-[6px] border border-[#D9D9D9] bg-white px-3 focus-within:ring-2 focus-within:ring-[#1E5A4F]">
            <img src="/location.svg" alt="" className="h-4 w-4 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#999]"
            />
          </div>
        </div>

        <DropdownField
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
        </DropdownField>

        <DropdownField
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
        </DropdownField>

        <DropdownField
          label="Bedrooms"
          value={bedrooms}
          onChange={setBedrooms}
        >
          <option>Any</option>
          <option>1 Bedroom</option>
          <option>2 Bedrooms</option>
          <option>3 Bedrooms</option>
          <option>4+ Bedrooms</option>
        </DropdownField>

        <DropdownField
          label="Furnishing"
          value={furnishing}
          onChange={setFurnishing}
        >
          <option>Any</option>
          <option>Furnished</option>
          <option>Unfurnished</option>
          <option>Semi-Furnished</option>
        </DropdownField>
      </div>

      {/* more filters */}
      <div className="mt-6 border-t border-[#EEEEEE] pt-5">
        <h3 className="mb-4 text-sm font-bold text-[#2E2E2E]">
          More Filters
        </h3>
        <div className="flex flex-col gap-3">
          {(
            [
              ["parking",          "Parking"],
              ["security",         "Security"],
              ["swimmingPool",     "Swimming Pool"],
              ["airConditioning",  "Air Conditioning"],
              ["verifiedProperty", "Verified Property Only"],
            ] as [keyof typeof filters, string][]
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={() => toggleFilter(key)}
                className="h-4 w-4 cursor-pointer rounded accent-[#1E5A4F]"
              />
              <span className="text-sm text-[#2E2E2E]">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* apply button */}
      <button
        type="button"
        onClick={handleApply}
        className="mt-6 w-full rounded-[8px] bg-[#1E5A4F] py-3 text-sm font-semibold text-white transition hover:bg-[#17483F] focus-visible:ring-2 focus-visible:ring-[#1E5A4F]"
      >
        Apply Filters
      </button>
    </>
  );

  return (
    <>
      {/* ── mobile: toggle button ──────────────────────────────────────── */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-[10px] border border-[#D9D9D9] bg-white px-4 py-3 text-sm font-semibold text-[#2E2E2E] shadow-sm transition hover:border-[#1E5A4F]"
          aria-expanded={open}
          aria-controls="refine-panel"
        >
          <span className="flex items-center gap-2">
            <img src="/filtericon.svg" alt="" className="h-4 w-4" />
            Refine Search
            {activeCount > 0 && (
              <span className="rounded-full bg-[#1E5A4F] px-2 py-0.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </span>
          <img
            src="/dropdown.svg"
            alt=""
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* collapsible drawer */}
        <div
          id="refine-panel"
          className={`overflow-hidden transition-all duration-300 ${
            open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 rounded-[10px] border border-[#D9D9D9] bg-white p-4 sm:p-5">
            <PanelContent />
          </div>
        </div>
      </div>

      {/* ── lg+: always-visible sticky sidebar ────────────────────────── */}
      <aside className="hidden lg:block">
        <div className="sticky top-4 w-full rounded-[10px] border border-[#D9D9D9] bg-white p-4 xl:p-5">
          <PanelContent />
        </div>
      </aside>
    </>
  );
};

export default RefineSearch;
