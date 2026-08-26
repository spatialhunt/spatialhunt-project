"use client";

import React from "react";
import Link from "next/link";

const PropertyCard = ({
  id,
  image,
  title,
  location,
  price,
  beds,
  bathrooms,
  parking,
  description,
}) => {
  return (
    <article className="w-full">

      <div className="flex w-full min-w-0 items-center gap-2 px-3 py-4 sm:gap-3 sm:px-4 md:px-3 lg:px-4">

        {/* ================= IMAGE ================= */}

        <Link
          href={`/properties/${id}`}
          className="
            flex
            h-[82px]
            w-[88px]
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-[7px]
            bg-[#F7F7F7]

            sm:h-[95px]
            sm:w-[100px]

            md:h-[88px]
            md:w-[95px]

            lg:h-[100px]
            lg:w-[105px]

            xl:h-[110px]
            xl:w-[115px]
          "
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain"
          />
        </Link>


        {/* ================= MIDDLE INFORMATION ================= */}

        <div className="min-w-0 flex-1">

          {/* TITLE */}

          <Link href={`/properties/${id}`}>
            <h2 className="truncate text-[12px] font-bold text-[#2E2E2E] sm:text-xs md:text-[12px] lg:text-sm">
              {title}
            </h2>
          </Link>


          {/* LOCATION */}

          <div className="mt-1 flex min-w-0 items-center gap-1">

            <img
              src="/location.svg"
              alt="Location"
              className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
            />

            <p className="truncate text-[9px] text-[#666666] sm:text-[10px] md:text-[9px] lg:text-[10px]">
              {location}
            </p>

          </div>


          {/* FEATURES */}

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">

            {/* BEDS */}

            <div className="flex items-center gap-1">

              <img
                src="/Beds.svg"
                alt="Beds"
                className="h-4 w-4 shrink-0 sm:h-4 sm:w-4"
              />

              <span className="whitespace-nowrap text-[9px] text-[#555555] sm:text-[9px] md:text-[9px] lg:text-[9px]">
                {beds} Beds
              </span>

            </div>


            {/* BATHROOM */}

            <div className="flex items-center gap-1">

              <img
                src="/bathroom.svg"
                alt="Bathroom"
                className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
              />

              <span className="whitespace-nowrap text-[9px] text-[#555555] sm:text-[9px] md:text-[9px] lg:text-[9px]">
                {bathrooms} Bedroom
              </span>

            </div>


            {/* PARKING */}

            <div className="flex items-center gap-1">

              <img
                src="/Parking.svg"
                alt="Parking"
                className="h-4 w-4 shrink-0 sm:h-4 sm:w-4"
              />

              <span className="whitespace-nowrap text-[9px] text-[#555555] sm:text-[9px] md:text-[9px] lg:text-[9px]">
                {parking} Parking
              </span>

            </div>

          </div>


          {/* DESCRIPTION */}

          <h1 className="mt-2 line-clamp-2 text-[9px] font-bold leading-3.5 text-[#2E2E2E] sm:text-[10px] sm:leading-4 md:text-[12px] lg:text-[14px]">
            {description}
          </h1>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="flex shrink-0 flex-col items-end gap-1.5">

          {/* PRICE */}

          <p className="whitespace-nowrap text-[9px] font-bold text-[#1E5A4F] sm:text-[10px] md:text-[9px] lg:text-xs md:mb-3">
            {price}
          </p>


          {/* VERIFIED */}

          <div className="inline-flex items-center gap-1 rounded-[0.5rem] bg-[#117E2526] px-4 py-2 text-[10px] font-medium text-[#117E25] sm:px-3 sm:text-[10px] md:text-[10px] lg:text-[12px]">

            <img
              src="/verify.svg"
              alt="Verified"
              className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3"
            />

            <span>
              Verified
            </span>

          </div>


          {/* VIEW DETAILS */}

          <Link
            href={`/properties/${id}`}
            className="
            mt-3
              whitespace-nowrap
              rounded-[0.5rem]
              border
              border-[#D9D9D9]
              bg-white
              px-3.5
              py-2
              text-[9px]
              font-medium
              text-[#2E2E2E]
              transition
              hover:border-[#1E5A4F]
              hover:text-[#1E5A4F]

              sm:px-2
              sm:py-1
              sm:text-[10px]

              lg:text-[12px]
            "
          >
            View Details
          </Link>

        </div>

      </div>

    </article>
  );
};

export default PropertyCard;