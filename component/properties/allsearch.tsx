"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AllSearch() {
  const searchParams = useSearchParams();
  const currentPurpose = searchParams.get("purpose");

  const clearAllHref = "/properties";

  return (
    <section className="mx-auto mb-5 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

      {/* ================= RECENT SEARCH HEADER ================= */}

      <div className="mb-4 flex w-full items-center justify-between">

        <h2 className="text-sm font-semibold text-[#2E2E2E] sm:text-base">
          Recent Search
        </h2>

        <Link
          href={clearAllHref}
          className="text-xs font-medium text-[#1E5A4F] transition-colors hover:text-[#F4B942] sm:text-sm"
        >
          Clear All
        </Link>

      </div>


      {/* ================= PROPERTY FILTER TABS ================= */}

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">

          {/* ALL */}

          <Link
            href="/properties"
            className={`rounded-[7px] border px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-3.5 sm:py-2 sm:text-sm ${
              !currentPurpose
                ? "border-[#1E5A4F] bg-[#1E5A4F] text-white"
                : "border-[#1E5A4F] bg-white text-[#1E5A4F] hover:bg-[#1E5A4F] hover:text-white"
            }`}
          >
            All{" "}
            <span
              className={
                !currentPurpose
                  ? "text-white"
                  : "text-[#1E5A4F]"
              }
            >
              (150+)
            </span>
          </Link>


          {/* FOR RENT */}

          <Link
            href="/properties?purpose=rent"
            className={`rounded-[7px] border px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-3.5 sm:py-2 sm:text-sm ${
              currentPurpose === "rent"
                ? "border-[#1E5A4F] bg-[#1E5A4F] text-white"
                : "border-[#1E5A4F] bg-white text-[#1E5A4F] hover:bg-[#1E5A4F] hover:text-white"
            }`}
          >
            For Rent{" "}
            <span
              className={
                currentPurpose === "rent"
                  ? "text-white"
                  : "text-[#1E5A4F]"
              }
            >
              (80)
            </span>
          </Link>


          {/* FOR SALE */}

          <Link
            href="/properties?purpose=sale"
            className={`rounded-[7px] border px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-3.5 sm:py-2 sm:text-sm ${
              currentPurpose === "sale"
                ? "border-[#1E5A4F] bg-[#1E5A4F] text-white"
                : "border-[#1E5A4F] bg-white text-[#1E5A4F] hover:bg-[#1E5A4F] hover:text-white"
            }`}
          >
            For Sale{" "}
            <span
              className={
                currentPurpose === "sale"
                  ? "text-white"
                  : "text-[#1E5A4F]"
              }
            >
              (70)
            </span>
          </Link>

        </div>


        {/* SORT */}

        <button
          type="button"
          className="flex w-fit items-center gap-1.5 text-xs font-medium text-[#2E2E2E] transition-colors hover:text-[#1E5A4F] sm:text-sm"
        >
          <span>Sort by: Newest</span>

          <img
            src="/dropdown.svg"
            alt="Dropdown Icon"
            className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
          />
        </button>

      </div>

    </section>
  );
}