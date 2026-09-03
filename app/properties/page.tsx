import React from "react";
import Hero from "@/component/properties/hero";
import Filter from "@/component/properties/filter";
import AllSearch from "@/component/properties/allsearch";
import RefineSearch from "@/component/properties/refinesearch";
import PropertyResults from "@/component/properties/propertyresult";
import Aside from "@/component/properties/aside";

const Properties = () => {
  return (
    <main className="w-full">
      {/* ================= HERO ================= */}
      <Hero />
      {/* ================= SEARCH ================= */}
      <Filter />
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

<Aside />

        </div>

      </div>

    </main>
  );
};

export default Properties;