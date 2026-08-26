import React from "react";
import Hero from "@/component/properties/hero";
import SalesSection from "@/component/properties/search";
import AllSearch from "@/component/properties/allsearch";
import RefineSearch from "@/component/properties/refinesearch";
import PropertyResults from "@/component/properties/propertyresult";

const Properties = () => {
  return (
    <main className="w-full">
      {/* ================= HERO ================= */}
      <Hero />
      {/* ================= SEARCH ================= */}
      <SalesSection />
      {/* ================= RECENT SEARCH ================= */}
      <AllSearch />
      {/* ================= PROPERTY CONTENT ================= */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div
          className="
            flex
            w-full
            flex-col
            gap-6

            lg:flex-row
            lg:items-start
            lg:gap-4

            xl:gap-5
          "
        >
          {/* ================= REFINE SEARCH ================= */}
          <div
            className="
              w-full
              shrink-0
              lg:w-[235px]
              xl:w-[255px]
            "
          >
            <RefineSearch />
          </div>
          {/* ================= PROPERTY RESULTS ================= */}
          <div
            className="
              min-w-0
              w-full
              lg:flex-2
            "
          >
            <PropertyResults />
          </div>


          {/* ================= RIGHT SIDEBAR ================= */}

          <aside
            className="
              w-full
              shrink-0

              lg:w-[205px]

              xl:w-[225px]
            "
          >

            {/* ================= WHY CHOOSE ================= */}

            <div className="rounded-[10px] bg-[#F7F7F7] p-4 sm:p-5">

              <h2 className="text-base font-semibold text-[#1E5A4F] xl:text-lg">
                Why Choose SpatialHunt?
              </h2>

              {/* Your Why Choose content goes here */}

            </div>


            {/* ================= DID YOU KNOW ================= */}

            <div className="mt-5 rounded-[10px] bg-[#F7F7F7] p-4 sm:p-5">

              <h2 className="text-base font-semibold text-[#2E2E2E] xl:text-lg">
                Did You Know?
              </h2>

              {/* Your Did You Know content goes here */}

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
};

export default Properties;