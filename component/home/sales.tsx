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

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="bg-[#D9D9D9] mt-10 p-10">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">

        <div className="flex gap-4">

          <Link
            href="/properties?purpose=rent"
            className="rounded-[0.5rem] bg-[#1E5A4F] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            For Rent
          </Link>

          <Link
            href="/properties?purpose=sale"
            className="rounded-[0.5rem] border border-[#1E5A4F] text-[#1E5A4F] px-4 py-2.5 text-sm font-medium transition hover:bg-[#1E5A4F] hover:text-white"
          >
            For Sale
          </Link>

        </div>

        <div className="mt-6">

          {/* Location */}
          <label className="block font-medium text-sm mb-2">
            Location
          </label>

          <div className="flex items-center bg-white rounded-[0.5rem] px-3 py-3">

            <img
              src="./location.svg"
              alt="location icon"
              className="w-6 h-6"
            />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you looking?"
              className="ml-2 w-full outline-none bg-transparent text-sm"
            />

          </div>


          {/* Property Type */}
          <label className="block font-medium text-sm mt-5 mb-2">
            Property type
          </label>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-white rounded-[0.5rem] px-3 py-3 outline-none text-sm"
          >
            <option>All Types</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Duplex</option>
            <option>Land</option>
          </select>


          {/* Price */}
          <label className="block font-medium text-sm mt-5 mb-2">
            Price Range
          </label>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full bg-white rounded-[0.5rem] px-3 py-3 outline-none text-sm"
          >
            <option>Any Price</option>
            <option>₦100,000 - ₦500,000</option>
            <option>₦500,000 - ₦1,000,000</option>
            <option>₦1,000,000+</option>
          </select>


          {/* Bedrooms */}
          <label className="block font-medium text-sm mt-5 mb-2">
            Bedrooms
          </label>

          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-white rounded-[0.5rem] px-3 py-3 outline-none text-sm"
          >
            <option>Any</option>
            <option>1 Bedroom</option>
            <option>2 Bedrooms</option>
            <option>3 Bedrooms</option>
            <option>4+ Bedrooms</option>
          </select>


          {/* Search */}
          <button
            onClick={handleSearch}
            className="w-full mt-6 rounded-[0.5rem] bg-[#F4B940] px-5 py-3 text-sm font-medium text-[#1E5A4F] transition hover:opacity-90"
          >
            Search Properties
          </button>

        </div>
      </div>


      {/* ================= MEDIUM + LARGE ================= */}
      <div className="hidden md:block">

        {/* Rent / Sale */}
        <div className="flex gap-40">

          <Link
            href="/properties?purpose=rent"
            className="rounded-[0.5rem] bg-[#1E5A4F] px-4 py-2.5 text-sm font-medium text-[#ffffff] transition hover:opacity-90"
          >
            For Rent
          </Link>

          <Link
            href="/properties?purpose=sale"
            className="rounded-[0.5rem] border border-[#1E5A4F] text-[#1E5A4F] px-4 py-2.5 text-sm font-medium transition hover:opacity-100"
          >
            For Sale
          </Link>

        </div>


        {/* Labels */}
        <div className="flex font-medium mt-4">

          <h1>Location</h1>

          <h1 className="ml-65">
            Property type
          </h1>

          <h1 className="ml-30">
            Price Range
          </h1>

          <h1 className="ml-30">
            Bedrooms
          </h1>

        </div>


        {/* Search Controls */}
        <div className="mt-4.5 flex items-center">

          {/* Location */}
          <img
            src="./location.svg"
            alt="location icon"
            className="w-9 h-9 ml-2"
          />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={"Where are you looking?"}
            className="mt-2 ml-2 bg-transparent outline-none w-40"
          />


          {/* Property Type */}
          <div className="relative ml-27 mt-2">

            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="bg-transparent outline-none appearance-none pr-8 cursor-pointer"
            >
              <option>All Types</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Duplex</option>
              <option>Land</option>
            </select>

            <img
              src="./dropdown.svg"
              alt="dropdown icon"
              className="w-5 h-5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            />

          </div>


          {/* Price Range */}
          <div className="relative ml-14 mt-2">

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-transparent outline-none appearance-none pr-8 cursor-pointer"
            >
              <option>Any Price</option>
              <option>₦100,000 - ₦500,000</option>
              <option>₦500,000 - ₦1,000,000</option>
              <option>₦1,000,000+</option>
            </select>

            <img
              src="./dropdown.svg"
              alt="dropdown icon"
              className="w-5 h-5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            />

          </div>


          {/* Bedrooms */}
          <div className="relative ml-14 mt-2">

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="bg-transparent outline-none appearance-none pr-8 cursor-pointer"
            >
              <option>Any</option>
              <option>1 Bedroom</option>
              <option>2 Bedrooms</option>
              <option>3 Bedrooms</option>
              <option>4+ Bedrooms</option>
            </select>

            <img
              src="./dropdown.svg"
              alt="dropdown icon"
              className="w-5 h-5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            />

          </div>


          {/* Search */}
          <button
            onClick={handleSearch}
            className="rounded-[0.5rem] bg-[#F4B940] px-4 py-2.5 text-sm font-medium text-[#1E5A4F] transition hover:opacity-90 sm:px-5 sm:py-3 sm:text-base ml-22 mb-1"
          >
            Search Properties
          </button>

        </div>
      </div>

    </section>
  );
};

export default SalesSection;