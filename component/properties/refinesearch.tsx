"use client";

import React, { useState } from "react";

const RefineSearch = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [bedrooms, setBedrooms] = useState("Any");
  const [furnishing, setFurnishing] = useState("Any");

  const [filters, setFilters] = useState({
    parking: false,
    security: false,
    swimmingPool: false,
    airConditioning: false,
    verifiedProperty: false,
  });

  const handleCheckbox = (name) => {
    setFilters((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const handleApplyFilter = () => {
    console.log({
      location,
      propertyType,
      priceRange,
      bedrooms,
      furnishing,
      ...filters,
    });
  };

  return (
    <aside className="w-full rounded-[10px] border border-[#D9D9D9] bg-white p-4 sm:p-5 lg:w-[260px] xl:w-[280px]">

      {/* TITLE */}
      <h2 className="mb-5 text-lg font-semibold text-[#2E2E2E] sm:text-xl">
        Refine Search
      </h2>

      {/* MAIN FILTERS */}
      <div className="flex flex-col gap-4">

        {/* LOCATION */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2E2E2E]">
            Location
          </label>

          <div className="flex h-10 items-center rounded-[6px] border border-[#D9D9D9] px-3">
            <img
              src="/location.svg"
              alt="Location"
              className="h-4 w-4 shrink-0"
            />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#999999]"
            />
          </div>
        </div>

        {/* PROPERTY TYPE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2E2E2E]">
            Property Type
          </label>

          <div className="relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="h-10 w-full appearance-none rounded-[6px] border border-[#D9D9D9] bg-white px-3 pr-9 text-sm outline-none"
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
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
            />
          </div>
        </div>

        {/* PRICE RANGE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2E2E2E]">
            Price Range
          </label>

          <div className="relative">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="h-10 w-full appearance-none rounded-[6px] border border-[#D9D9D9] bg-white px-3 pr-9 text-sm outline-none"
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
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
            />
          </div>
        </div>

        {/* BEDROOMS */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2E2E2E]">
            Bedrooms
          </label>

          <div className="relative">
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="h-10 w-full appearance-none rounded-[6px] border border-[#D9D9D9] bg-white px-3 pr-9 text-sm outline-none"
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
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
            />
          </div>
        </div>

        {/* FURNISHING */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#2E2E2E]">
            Furnishing
          </label>

          <div className="relative">
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="h-10 w-full appearance-none rounded-[6px] border border-[#D9D9D9] bg-white px-3 pr-9 text-sm outline-none"
            >
              <option>Any</option>
              <option>Furnished</option>
              <option>Unfurnished</option>
              <option>Semi-Furnished</option>
            </select>

            <img
              src="/dropdown.svg"
              alt=""
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
            />
          </div>
        </div>

      </div>

      {/* MORE FILTERS */}
      <div className="mt-6 border-t border-[#D9D9D9] pt-5">

        <h3 className="mb-4 text-base font-semibold text-[#2E2E2E]">
          More Filters
        </h3>

        <div className="flex flex-col gap-3">

          {[
            ["parking", "Parking"],
            ["security", "Security"],
            ["swimmingPool", "Swimming Pool"],
            ["airConditioning", "Air Conditioning"],
            ["verifiedProperty", "Verified Property"],
          ].map(([name, label]) => (
            <label
              key={name}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters[name]}
                onChange={() => handleCheckbox(name)}
                className="h-4 w-4 cursor-pointer accent-[#1E5A4F]"
              />

              <span className="text-sm text-[#2E2E2E]">
                {label}
              </span>
            </label>
          ))}

        </div>
      </div>

      {/* APPLY FILTER */}
      <button
        type="button"
        onClick={handleApplyFilter}
        className="mt-6 w-full rounded-[7px] bg-[#1E5A4F] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        Apply Filter
      </button>

    </aside>
  );
};

export default RefineSearch;