"use client";

import React from "react";
import Link from "next/link";

const Aside = () => {
  return (
    <aside
      className="
        w-full
        shrink-0

        lg:w-[220px]
        xl:w-[232px]
      "
    >
      {/* ================================================= */}
      {/* WHY CHOOSE SPATIALHUNT */}
      {/* ================================================= */}

      <div
        className="
          w-full
          rounded-[10px]
          bg-[#F7F7F7]
          p-5

          sm:p-6
          lg:p-5
          xl:p-6
        "
      >
        {/* TITLE */}

        <h2
          className="
            text-base
            font-bold
            leading-6
            text-[#1E5A4F]

            sm:text-lg
            sm:leading-7

            lg:text-base
            xl:text-lg
          "
        >
          Why Choose SpatialHunt?
        </h2>

        {/* ================================================= */}
        {/* BENEFITS */}
        {/* ================================================= */}

        <div
          className="
            mt-7
            flex
            flex-col
            gap-7

            sm:gap-8

            lg:mt-4
            lg:gap-4

            xl:mt-7
            xl:gap-8
          "
        >
          {/* ================= VERIFIED LANDLORDS ================= */}

          <div className="flex items-start gap-3">
            <img
              src="/Yicon.svg"
              alt=""
              className="
                h-6
                w-6
                shrink-0
                object-contain

                sm:h-7
                sm:w-7

                lg:h-6
                lg:w-6

                xl:h-7
                xl:w-7
              "
            />

            <div className="min-w-0 flex-1">
              <h3
                className="
                  text-xs
                  font-semibold
                  leading-5
                  text-[#2E2E2E]

                  sm:text-sm
                  sm:leading-6

                  lg:text-xs
                  xl:text-md
                "
              >
                100% Verified Landlords
              </h3>

              <p
                className="
                  mt-1.5
                  text-[12px]
                  leading-5
                  text-[#666666]

                  sm:text-xs
                  sm:leading-5

                  lg:text-[11px]
                  xl:text-xs
                "
              >
                Every landlord is verified
              </p>
            </div>
          </div>

          {/* ================= DIRECT COMMUNICATION ================= */}

          <div className="flex items-start gap-3">
            <img
              src="/Yicon.svg"
              alt=""
              className="
                h-6
                w-6
                shrink-0
                object-contain

                sm:h-7
                sm:w-7

                lg:h-6
                lg:w-6

                xl:h-7
                xl:w-7
              "
            />

            <div className="min-w-0 flex-1">
              <h3
                className="
                  text-xs
                  font-semibold
                  leading-6
                  text-[#2E2E2E]

                  sm:text-sm
                  sm:leading-5

                  lg:text-xs
                  xl:text-sm
                "
              >
                Direct Communication
              </h3>

              <p
                className="
                  mt-1.5
                  text-[12px]
                  leading-4
                  text-[#666666]

                  sm:text-xs
                  sm:leading-5

                  lg:text-[11px]
                  xl:text-xs
                "
              >
                Chat directly with landlords
              </p>
            </div>
          </div>

          {/* ================= TRANSPARENT & SECURE ================= */}

          <div className="flex items-start gap-3">
            <img
              src="/Yicon.svg"
              alt=""
              className="
                h-6
                w-6
                shrink-0
                object-contain

                sm:h-7
                sm:w-7

                lg:h-6
                lg:w-6

                xl:h-7
                xl:w-7
              "
            />

            <div className="min-w-0 flex-1">
              <h3
                className="
                  text-xs
                  font-bold
                  leading-5
                  text-[#2E2E2E]

                  sm:text-sm
                  sm:leading-5

                  lg:text-xs
                  xl:text-sm
                "
              >
                Transparent &amp; Secure
              </h3>

              <p
                className="
                  mt-1.5
                  text-[12px]
                  leading-4
                  text-[#666666]

                  sm:text-xs
                  sm:leading-5

                  lg:text-[11px]
                  xl:text-xs
                "
              >
                No hidden fees. No stress.
              </p>
            </div>
          </div>

          {/* ================= BUILT FOR SUSTAINABILITY ================= */}

          <div className="flex items-start gap-3">
            <img
              src="/Yicon.svg"
              alt=""
              className="
                h-6
                w-6
                shrink-0
                object-contain

                sm:h-7
                sm:w-7

                lg:h-6
                lg:w-6

                xl:h-7
                xl:w-7
              "
            />

            <div className="min-w-0 flex-1">
              <h3
                className="
                  text-xs
                  font-bold
                  leading-5
                  text-[#2E2E2E]

                  sm:text-sm
                  sm:leading-5

                  lg:text-xs
                  xl:text-sm
                "
              >
                Built for Sustainability
              </h3>

              <p
                className="
                  mt-1.5
                  text-[12px]
                  leading-4
                  text-[#666666]

                  sm:text-xs
                  sm:leading-5

                  lg:text-[11px]
                  xl:text-xs
                "
              >
                We care about our communities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* DID YOU KNOW */}
      {/* ================================================= */}

      <div
        className="
          mt-10
          w-full
          rounded-[10px]
          bg-[#F7F7F7]
          p-5

          sm:mt-12
          sm:p-6

          lg:mt-10
          lg:p-5

          xl:mt-12
          xl:p-6
        "
      >
        {/* TITLE */}

        <h2
          className="
            text-base
            font-semibold
            leading-6
            text-[#2E2E2E]

            sm:text-lg
            sm:leading-7

            lg:text-base
            xl:text-lg
          "
        >
          Did You Know?
        </h2>

        {/* ================================================= */}
        {/* IMAGE + DESCRIPTION */}
        {/* ================================================= */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3

            sm:mt-6
            sm:gap-4
          "
        >
          {/* IMAGE */}

          <img
            src="/did.svg"
            alt="Did You Know"
            className="
              h-12
              w-12
              shrink-0
              object-contain

              sm:h-14
              sm:w-14

              lg:h-12
              lg:w-12

              xl:h-14
              xl:w-14
            "
          />

          {/* DESCRIPTION */}

          <p
            className="
              min-w-0
              flex-1
              text-[11.5px]
              leading-5
              text-[#666666]

              sm:text-xs
              sm:leading-5

              lg:text-[11px]
              lg:leading-5

              xl:text-xs
              xl:leading-5
            "
          >
            Over 2,000+ tenants have found their perfect homes on
            SpatialHunt.
          </p>
        </div>

        {/* ================================================= */}
        {/* LIST YOUR PROPERTY BUTTON */}
        {/* ================================================= */}

        <Link
          href="/listproperty"
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            rounded-[6px]
            bg-[#1E5A4F]
            px-3
            py-2.5
            text-xs
            font-medium
            text-white
            transition
            hover:opacity-90

            sm:mt-7
            sm:py-3
            sm:text-sm

            lg:text-xs

            xl:text-sm
          "
        >
          List Your Property
        </Link>

        {/* ================================================= */}
        {/* BOTTOM TEXT */}
        {/* ================================================= */}

        <p
          className="
            mt-5
            text-center
            text-[11.5px]
            leading-4
            text-[#666666]

            sm:mt-6
            sm:text-[11px]
            sm:leading-5

            lg:text-[11px]

            xl:text-[11px]
          "
        >
          It&apos;s free, easy and takes less than 5 minutes.
        </p>
      </div>
    </aside>
  );
};

export default Aside;