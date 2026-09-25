import React, { Suspense } from "react";
import type { Metadata } from "next";
import Hero from "@/component/properties/Hero";
import Filter from "@/component/properties/Filter";
import AllSearch from "@/component/properties/AllSearch";
import RefineSearch from "@/component/properties/RefineSearch";
import PropertyResults from "@/component/properties/PropertyResult";
import Aside from "@/component/properties/Aside";

export const metadata: Metadata = {
  title: "Properties for Rent in Nigeria",
  description:
    "Browse verified houses, apartments, and rental properties in Nigeria on SpatialHunt.",
  keywords: [
    "properties for rent in Nigeria",
    "houses for rent in Nigeria",
    "apartments in Nigeria",
    "verified rental listings",
    "SpatialHunt properties",
  ],
  openGraph: {
    title: "Properties for Rent in Nigeria",
    description:
      "Browse verified houses, apartments, and rental properties in Nigeria on SpatialHunt.",
    url: "http://thespatialhunt.com/properties",
    siteName: "SpatialHunt",
    images: [
      {
        url: "/property-one.svg",
        width: 1200,
        height: 630,
        alt: "SpatialHunt Properties",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties for Rent in Nigeria",
    description:
      "Browse verified houses, apartments, and rental properties in Nigeria on SpatialHunt.",
    images: ["/property-one.svg"],
  },
};

/**
 * /properties — public listing search page.
 *
 * Column layout
 * ─────────────
 * xs – md   : single column stacked
 *             [Filter] → [AllSearch] → [RefineSearch toggle] → [Results]
 *             Aside hidden
 *
 * lg         : 2 columns
 *             [RefineSearch sidebar 235px] | [Results]
 *             Aside still hidden (not enough room for 3 cols)
 *
 * xl (1280+) : 3 columns
 *             [RefineSearch 255px] | [Results flex-1] | [Aside 232px]
 */
function PropertiesContent() {
  return (
    <main className="w-full">

      {/* top hero bar + search pill */}
      <Hero />
      <Filter />
      <AllSearch />

      {/* body: sidebar + results + aside */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-start lg:gap-5">

          {/* ── sidebar (RefineSearch) ─────────────────────────────────────
               On mobile → collapsible toggle inside RefineSearch itself.
               On lg+    → sticky panel, fixed width.
          ────────────────────────────────────────────────────────────────── */}
          <div className="w-full shrink-0 lg:w-59 xl:w-64">
            <RefineSearch />
          </div>

          {/* ── results column ──────────────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            <PropertyResults />
          </div>

          {/* ── aside (Why Choose + Did You Know) ─────────────────────────
               Hidden below xl to avoid crowding the results column.
          ────────────────────────────────────────────────────────────────── */}
          <div className="hidden xl:block xl:w-58 xl:shrink-0">
            <Aside />
          </div>

        </div>
      </div>

    </main>
  );
}

const Properties = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center py-16 text-sm text-[#777777]">
          Loading properties…
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
};

export default Properties;
