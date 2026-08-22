import React from "react";
import Link from "next/link";

const Showcase = () => {
  return (
    <section className="mx-5 mt-8 flex flex-col-reverse gap-8 md:mx-8 md:mt-12 md:flex-row md:items-center md:justify-between lg:mx-12">
      
      {/* Text Content */}
      <div className="flex w-full flex-col md:w-1/2">
        <h1 className="text-center text-3xl font-bold leading-tight text-[#2E2E2E]  md:text-5xl md:text-start">
          Verified Homes.
        </h1>

        <h1 className="text-center pt-2 text-3xl font-bold leading-tight text-[#2E2E2E] md:text-5xl md:text-start">
          Direct To Landlords.
        </h1>

        <h1 className="text-center pt-2 text-3xl font-bold leading-tight text-[#F4B940] md:text-5xl md:text-start">
          Zero Stress.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#2E2E2E] sm:text-lg sm:leading-8 lg:text-xl">
          <span className="text-[#F4B940]">SpatialHunt</span> connects you
          directly with verified landlords so you can rent or list properties
          with confidence. No middlemen. No hidden fees. Just trust and
          transparency.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap ml-10 md:ml-0 gap-20 md:gap-3">
            <Link href="/properties">
            <button className="rounded-[0.5rem] bg-[#F4B940] px-4 py-2.5 text-sm font-medium text-[#1E5A4F] transition hover:opacity-90 sm:px-5 sm:py-3 sm:text-base">
              Find a Home
            </button>
            </Link>

            <Link href="/list-property">
           <button className="rounded-[0.5rem] border border-[#F4B940] bg-[#1E5A4F] px-4 py-2.5 text-sm font-medium text-[#F4B940] transition hover:opacity-90 sm:px-5 sm:py-3 sm:text-base">
            List Your Property
            </button>
            </Link>
        </div>
      </div>

      {/* Showcase Image */}
      <div className="flex w-full justify-center md:w-1/2 md:justify-end">
        <img
          src="/showcase.svg"
          alt="SpatialHunt property showcase"
          className="h-auto w-full max-w-647px object-contain"
        />
      </div>
    </section>
  );
};

export default Showcase;