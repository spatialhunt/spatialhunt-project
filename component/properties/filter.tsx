"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Filter = () => {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [bedrooms, setBedrooms] = useState("Any");

 const handleSearch = () => {
  const params = new URLSearchParams();

  if (location.trim()) {
    params.set("location", location.trim());
  }

  if (propertyType !== "All Types") {
    params.set("propertyType", propertyType);
  }

  if (priceRange !== "Any Price") {
    params.set("priceRange", priceRange);
  }

  if (bedrooms !== "Any") {
    params.set("bedrooms", bedrooms);
  }

  const query = params.toString();

  router.push(query ? `/properties?${query}` : "/properties");
};

  return (
    <section className="w-full px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-16">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        <div className="flex flex-col rounded-xl bg-[#D9D9D9] p-4 sm:p-5">

          {/* Location */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-[#2E2E2E]">
              Location
            </label>

            <div className="flex h-12 w-full items-center rounded-lg bg-white px-3">
              <img
                src="/location.svg"
                alt="Location"
                className="h-7 w-7 shrink-0"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lagos, Nigeria"
                className="ml-2 min-w-0 flex-1 bg-transparent text-sm text-[#2E2E2E] outline-none placeholder:text-[#777]"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="mt-4 flex flex-col">
            <label className="mb-2 text-sm font-medium text-[#2E2E2E]">
              Property type
            </label>

            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="h-12 w-full appearance-none rounded-lg bg-white px-3 pr-10 text-sm text-[#2E2E2E] outline-none"
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
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4 flex flex-col">
            <label className="mb-2 text-sm font-medium text-[#2E2E2E]">
              Price Range
            </label>

            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="h-12 w-full appearance-none rounded-lg bg-white px-3 pr-10 text-sm text-[#2E2E2E] outline-none"
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
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="mt-4 flex flex-col">
            <label className="mb-2 text-sm font-medium text-[#2E2E2E]">
              Bedrooms
            </label>

            <div className="relative">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="h-12 w-full appearance-none rounded-lg bg-white px-3 pr-10 text-sm text-[#2E2E2E] outline-none"
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
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Filter */}
          <button
            type="button"
            onClick={handleSearch}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1E5A4F] px-5 text-sm font-medium text-white transition hover:opacity-90"
          >
            <img
              src="/filtericon.svg"
              alt=""
              className="h-5 w-5"
            />

            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* ================= MEDIUM ================= */}
      <div className="hidden md:block lg:hidden">

        <div className="flex w-full items-end rounded-lg bg-white">

          {/* Location */}
          <div className="flex min-w-0 flex-1 flex-col px-4 py-3">
            <label className="mb-2 block text-sm font-medium text-[#2E2E2E]">
              Location
            </label>

            <div className="flex h-10 items-center">
              <img
                src="/location.svg"
                alt="Location"
                className="h-8 w-8 shrink-0"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lagos, Nigeria"
                className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex min-w-0 flex-1 flex-col border-l border-[#D9D9D9] px-4 py-3">
            <label className="mb-2 block text-sm font-medium text-[#2E2E2E]">
              Property type
            </label>

            <div className="relative h-10">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-8 text-sm outline-none"
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
                className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="flex min-w-0 flex-1 flex-col border-l border-[#D9D9D9] px-4 py-3">
            <label className="mb-2 block text-sm font-medium text-[#2E2E2E]">
              Price Range
            </label>

            <div className="relative h-10">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-8 text-sm outline-none"
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
                className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="flex min-w-0 flex-1 flex-col border-l border-[#D9D9D9] px-4 py-3">
            <label className="mb-2 block text-sm font-medium text-[#2E2E2E]">
              Bedrooms
            </label>

            <div className="relative h-10">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-8 text-sm outline-none"
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
                className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="border-l border-[#D9D9D9] p-3">
            <button
              type="button"
              onClick={handleSearch}
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1E5A4F] px-5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <img
                src="/filtericon.svg"
                alt=""
                className="h-5 w-5"
              />

              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= LARGE + XL ================= */}
      <div className="hidden lg:block">

        <div className="flex w-full items-end rounded-lg bg-white">

          {/* Location */}
          <div className="flex min-w-0 flex-[1.5] flex-col px-5 py-4">
            <label className="mb-2 block text-sm font-medium text-[#2E2E2E] lg:text-base">
              Location
            </label>

            <div className="flex h-10 items-center">
              <img
                src="/location.svg"
                alt="Location"
                className="h-9 w-9 shrink-0 xl:h-6 xl:w-6"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lagos, Nigeria"
                className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none xl:text-base"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex min-w-0 flex-[1.1] flex-col border-l border-[#D9D9D9] px-5 py-4">
            <label className="mb-2 block text-sm font-medium text-[#2E2E2E] lg:text-base">
              Property type
            </label>

            <div className="relative h-10">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-8 text-sm outline-none xl:text-base"
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
                className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="flex min-w-0 flex-1 flex-col border-l border-[#D9D9D9] px-5 py-4">
            <label className="mb-2 block text-sm font-medium text-[#2E2E2E] lg:text-base">
              Price Range
            </label>

            <div className="relative h-10">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-8 text-sm outline-none xl:text-base"
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
                className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="flex min-w-0 flex-[0.8] flex-col border-l border-[#D9D9D9] px-5 py-4">
            <label className="mb-2 block text-sm font-medium text-[#2E2E2E] lg:text-base">
              Bedrooms
            </label>

            <div className="relative h-10">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="h-full w-full appearance-none bg-transparent pr-8 text-sm outline-none xl:text-base"
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
                className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="border-l border-[#D9D9D9] p-3">
            <button
              type="button"
              onClick={handleSearch}
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1E5A4F] px-7 text-sm font-medium text-white transition hover:opacity-90 xl:px-7"
            >
              <img
                src="/filtericon.svg"
                alt=""
                className="h-5 w-5"
              />

              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;