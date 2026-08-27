"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SalesSection = () => {
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
      params.set("type", propertyType);
    }

    if (priceRange !== "Any Price") {
      params.set("price", priceRange);
    }

    if (bedrooms !== "Any") {
      params.set("bedrooms", bedrooms);
    }

    const query = params.toString();

    router.push(query ? `/properties?${query}` : "/properties");
  };

  return (
    <section className="mt-10 w-full bg-[#D9D9D9] px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">

      {/* ================= MOBILE ================= */}

      <div className="md:hidden">

        {/* Rent / Sale */}
        <div className="flex gap-4">

          <Link
            href="/properties?purpose=rent"
            className="rounded-[0.5rem] bg-[#1E5A4F] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            For Rent
          </Link>

          <Link
            href="/properties?purpose=sale"
            className="rounded-[0.5rem] border border-[#1E5A4F] px-4 py-2.5 text-sm font-medium text-[#1E5A4F] transition hover:bg-[#1E5A4F] hover:text-white"
          >
            For Sale
          </Link>

        </div>


        <div className="mt-6 flex flex-col">

          {/* Location */}

          <div className="flex flex-col">

            <label className="mb-2 text-sm font-medium text-[#2E2E2E]">
              Location
            </label>

            <div className="flex h-12 items-center rounded-[0.5rem] bg-white px-3">

              <img
                src="/location.svg"
                alt="location icon"
                className="h-5 w-5 shrink-0"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where are you looking?"
                className="ml-2 w-full bg-transparent text-sm outline-none"
              />

            </div>

          </div>


          {/* Property Type */}

          <div className="mt-5 flex flex-col">

            <label className="mb-2 text-sm font-medium text-[#2E2E2E]">
              Property type
            </label>

            <div className="relative">

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="h-12 w-full appearance-none rounded-[0.5rem] bg-white px-3 pr-10 text-sm outline-none"
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

          <div className="mt-5 flex flex-col">

            <label className="mb-2 text-sm font-medium text-[#2E2E2E]">
              Price Range
            </label>

            <div className="relative">

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="h-12 w-full appearance-none rounded-[0.5rem] bg-white px-3 pr-10 text-sm outline-none"
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

          <div className="mt-5 flex flex-col">

            <label className="mb-2 text-sm font-medium text-[#2E2E2E]">
              Bedrooms
            </label>

            <div className="relative">

              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="h-12 w-full appearance-none rounded-[0.5rem] bg-white px-3 pr-10 text-sm outline-none"
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


          {/* Search */}

          <button
            type="button"
            onClick={handleSearch}
            className="mt-6 flex w-full items-center justify-center rounded-[0.5rem] bg-[#F4B940] px-5 py-3 text-sm font-medium text-[#1E5A4F] transition hover:opacity-90"
          >
            Search Properties
          </button>

        </div>

      </div>


      {/* ================= TABLET + DESKTOP ================= */}

      <div className="hidden md:block">

        {/* Rent / Sale */}

        <div className="flex gap-8 lg:gap-10">

          <Link
            href="/properties?purpose=rent"
            className="rounded-[0.5rem] bg-[#1E5A4F] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            For Rent
          </Link>

          <Link
            href="/properties?purpose=sale"
            className="rounded-[0.5rem] border border-[#1E5A4F] px-4 py-2.5 text-sm font-medium text-[#1E5A4F] transition hover:bg-[#1E5A4F] hover:text-white"
          >
            For Sale
          </Link>

        </div>


        {/* Search Row */}

        <div className="mt-6 flex w-full items-stretch rounded-[0.5rem] bg-white">


          {/* Location */}

          <div className="flex min-w-0 flex-[1.4] flex-col justify-center px-4 py-3 lg:px-5">

            <label className="mb-2 text-sm font-medium text-[#2E2E2E] lg:text-base">
              Location
            </label>

            <div className="flex min-w-0 items-center">

              <img
                src="/location.svg"
                alt="location icon"
                className="h-6 w-6 shrink-0"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where are you looking?"
                className="ml-2 min-w-0 w-full bg-transparent text-sm outline-none lg:text-base"
              />

            </div>

          </div>


          {/* Property Type */}

          <div className="flex min-w-0 flex-[1.1] flex-col justify-center border-l border-[#D9D9D9] px-4 py-3 lg:px-5">

            <label className="mb-2 text-sm font-medium text-[#2E2E2E] lg:text-base">
              Property type
            </label>

            <div className="relative">

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full appearance-none bg-transparent pr-8 text-sm outline-none lg:text-base"
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

          <div className="flex min-w-0 flex-[1.1] flex-col justify-center border-l border-[#D9D9D9] px-4 py-3 lg:px-5">

            <label className="mb-2 text-sm font-medium text-[#2E2E2E] lg:text-base">
              Price Range
            </label>

            <div className="relative">

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full appearance-none bg-transparent pr-8 text-sm outline-none lg:text-base"
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

          <div className="flex min-w-0 flex-[0.8] flex-col justify-center border-l border-[#D9D9D9] px-4 py-3 lg:px-5">

            <label className="mb-2 text-sm font-medium text-[#2E2E2E] lg:text-base">
              Bedrooms
            </label>

            <div className="relative">

              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full appearance-none bg-transparent pr-8 text-sm outline-none lg:text-base"
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


          {/* Search Button */}

          <div className="flex shrink-0 items-center border-l border-[#D9D9D9] px-3 lg:px-4">

            <button
              type="button"
              onClick={handleSearch}
              className="whitespace-nowrap rounded-[0.5rem] bg-[#F4B940] px-4 py-2.5 text-sm font-medium text-[#1E5A4F] transition hover:opacity-90 lg:px-5 lg:py-3"
            >
              Search Properties
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SalesSection;