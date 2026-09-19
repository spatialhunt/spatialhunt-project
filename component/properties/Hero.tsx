import React from "react";
import Link from "next/link";

/**
 * Properties page hero bar.
 * Stays a single row on all sizes; title stacks on very small screens.
 */
const Hero = () => {
  return (
    <section className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3">

        {/* title + subtitle */}
        <div>
          <h1 className="text-xl font-bold text-[#2E2E2E] sm:text-2xl md:text-3xl">
            Find Properties
          </h1>
          <p className="mt-0.5 text-sm text-[#666666] sm:text-base">
            Verified homes that fit your lifestyle.
          </p>
        </div>

        {/* map CTA */}
        <Link
          href="/properties/map"
          className="inline-flex items-center gap-2 rounded-[8px] border border-[#1E5A4F] px-3 py-2 text-sm font-medium text-[#1E5A4F] transition hover:bg-[#1E5A4F] hover:text-white focus-visible:ring-2 focus-visible:ring-[#1E5A4F] sm:px-4"
        >
          <img src="/mapicon.svg" alt="" className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>View on Map</span>
        </Link>

      </div>
    </section>
  );
};

export default Hero;
