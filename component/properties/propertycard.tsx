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

      <div
        className="
          flex
          w-full
          min-w-0
          items-center
          gap-3
          px-3
          py-4

          sm:gap-4
          sm:px-4
          sm:py-5

          md:gap-4
          md:px-5
          md:py-5

          lg:gap-5
          lg:px-8
          lg:py-5

          xl:gap-6
          xl:px-10
        "
      >

        {/* ================= IMAGE ================= */}

        <Link
          href={`/properties/${id}`}
          className="
            block
            h-[85px]
            w-[92px]
            shrink-0
            overflow-hidden
            rounded-[7px]
            bg-[#F7F7F7]

            sm:h-[100px]
            sm:w-[105px]

            md:h-[105px]
            md:w-[115px]

            lg:h-[110px]
            lg:w-[120px]

            xl:h-[120px]
            xl:w-[130px]
          "
        >
          <img
            src={image}
            alt={title}
            className="block h-full w-full object-cover"
          />
        </Link>


        {/* ================= MIDDLE INFORMATION ================= */}

        <div className="min-w-0 flex-1">

          {/* ================= TITLE ================= */}

          <Link href={`/properties/${id}`}>
            <h2
              className="
                truncate
                text-[13px]
                font-bold
                leading-tight
                text-[#2E2E2E]

                sm:text-[14px]

                md:text-[16px]

                lg:text-[17px]

                xl:text-[18px]
              "
            >
              {title}
            </h2>
          </Link>


          {/* ================= LOCATION ================= */}

          <div className="mt-1.5 flex min-w-0 items-center gap-1.5">

            <img
              src="/location.svg"
              alt="Location"
              className="
                h-3.5
                w-3.5
                shrink-0

                sm:h-4
                sm:w-4

                md:h-4
                md:w-4

                lg:h-4
                lg:w-4
              "
            />

            <p
              className="
                truncate
                text-[10px]
                leading-tight
                text-[#666666]

                sm:text-[11px]

                md:text-[12px]

                lg:text-[13px]

                xl:text-[14px]
              "
            >
              {location}
            </p>

          </div>


          {/* ================= FEATURES ================= */}

          <div
            className="
              mt-2.5
              flex
              flex-wrap
              items-center
              gap-x-3
              gap-y-1.5

              sm:mt-3
              sm:gap-x-4

              md:mt-3
              md:gap-x-4

              lg:gap-x-5
            "
          >

            {/* ================= BEDS ================= */}

            <div className="flex items-center gap-1.5">

              <img
                src="/Beds.svg"
                alt="Beds"
                className="
                  h-4
                  w-4
                  shrink-0

                  sm:h-4
                  sm:w-4

                  md:h-5
                  md:w-5

                  lg:h-5
                  lg:w-5
                "
              />

              <span
                className="
                  whitespace-nowrap
                  text-[10px]
                  text-[#555555]

                  sm:text-[11px]

                  md:text-[12px]

                  lg:text-[13px]

                  xl:text-[14px]
                "
              >
                {beds} Beds
              </span>

            </div>


            {/* ================= BATHROOMS ================= */}

            <div className="flex items-center gap-1.5">

              <img
                src="/bathroom.svg"
                alt="Bathrooms"
                className="
                  h-4
                  w-4
                  shrink-0

                  sm:h-4
                  sm:w-4

                  md:h-5
                  md:w-5

                  lg:h-5
                  lg:w-5
                "
              />

              <span
                className="
                  whitespace-nowrap
                  text-[10px]
                  text-[#555555]

                  sm:text-[11px]

                  md:text-[12px]

                  lg:text-[13px]

                  xl:text-[14px]
                "
              >
                {bathrooms} Bathrooms
              </span>

            </div>


            {/* ================= PARKING ================= */}

            <div className="flex items-center gap-1.5">

              <img
                src="/Parking.svg"
                alt="Parking"
                className="
                  h-4
                  w-4
                  shrink-0

                  sm:h-4
                  sm:w-4

                  md:h-5
                  md:w-5

                  lg:h-5
                  lg:w-5
                "
              />

              <span
                className="
                  whitespace-nowrap
                  text-[10px]
                  text-[#555555]

                  sm:text-[11px]

                  md:text-[12px]

                  lg:text-[13px]

                  xl:text-[14px]
                "
              >
                {parking} Parking
              </span>

            </div>

          </div>


          {/* ================= DESCRIPTION ================= */}

          <p
            className="
              mt-2
              line-clamp-2
              text-[10px]
              font-medium
              leading-4
              text-[#2E2E2E]

              sm:mt-2
              sm:text-[11px]
              sm:leading-4

              md:mt-2.5
              md:text-[12px]
              md:leading-[18px]

              lg:mt-3
              lg:text-[13px]
              lg:leading-5

              xl:text-[14px]
              xl:leading-5
            "
          >
            {description}
          </p>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div
          className="
            flex
            shrink-0
            flex-col
            items-end
            gap-2

            sm:gap-2.5

            md:gap-3

            lg:gap-3
          "
        >

          {/* ================= PRICE ================= */}

          <p
            className="
              whitespace-nowrap
              text-[10px]
              font-bold
              text-[#1E5A4F]

              sm:text-[11px]

              md:text-[13px]

              lg:text-[14px]

              xl:text-[15px]
            "
          >
            {price}
          </p>


          {/* ================= VERIFIED ================= */}

          <div
            className="
              inline-flex
              items-center
              gap-1
              rounded-[0.5rem]
              bg-[#117E2526]
              px-2.5
              py-1.5
              text-[9px]
              font-medium
              text-[#117E25]

              sm:px-3
              sm:py-1.5
              sm:text-[10px]

              md:px-3
              md:py-2
              md:text-[11px]

              lg:px-3.5
              lg:py-2
              lg:text-[12px]
            "
          >

            <img
              src="/verify.svg"
              alt="Verified"
              className="
                h-2.5
                w-2.5
                shrink-0

                sm:h-3
                sm:w-3

                md:h-3.5
                md:w-3.5
              "
            />

            <span>
              Verified
            </span>

          </div>


          {/* ================= VIEW DETAILS ================= */}

          <Link
            href={`/properties/${id}`}
            className="
              mt-1
              whitespace-nowrap
              rounded-[0.5rem]
              border
              border-[#D9D9D9]
              bg-white
              px-3
              py-1.5
              text-[10px]
              font-medium
              text-[#2E2E2E]
              transition
              hover:border-[#1E5A4F]
              hover:text-[#1E5A4F]

              sm:px-3
              sm:py-1.5
              sm:text-[11px]

              md:mt-1
              md:px-3.5
              md:py-2
              md:text-[12px]

              lg:px-4
              lg:py-2
              lg:text-[13px]

              xl:text-[14px]
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