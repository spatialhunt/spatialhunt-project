"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * AllSearch — the purpose-tab strip (All / For Rent / For Sale) + sort label.
 * Sits between Filter and the 3-column results layout.
 */
export default function AllSearch() {
  const searchParams = useSearchParams();
  const currentPurpose = searchParams.get("purpose");

  /** Build a new href preserving all current params but swapping `purpose`. */
  const purposeHref = (purpose?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (purpose) {
      params.set("purpose", purpose);
    } else {
      params.delete("purpose");
    }
    const qs = params.toString();
    return qs ? `/properties?${qs}` : "/properties";
  };

  const tab = (
    label: string,
    count: string,
    purpose?: string,
  ) => {
    const active = purpose ? currentPurpose === purpose : !currentPurpose;
    return (
      <Link
        href={purposeHref(purpose)}
        className={[
          "inline-flex items-center gap-1.5 rounded-[7px] border px-3 py-1.5 text-xs font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#1E5A4F]",
          "sm:px-3.5 sm:py-2 sm:text-sm",
          active
            ? "border-[#1E5A4F] bg-[#1E5A4F] text-white"
            : "border-[#1E5A4F] bg-white text-[#1E5A4F] hover:bg-[#EAF3F0]",
        ].join(" ")}
      >
        {label}
        <span className={active ? "text-[#F4B942]" : "opacity-60"}>
          ({count})
        </span>
      </Link>
    );
  };

  return (
    <section className="mx-auto mb-4 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-[#2E2E2E] sm:text-base">
          Search Results
        </h2>
        <Link
          href="/properties"
          className="text-xs font-medium text-[#1E5A4F] transition-colors hover:text-[#F4B942] sm:text-sm"
        >
          Clear all filters
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* purpose tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {tab("All", "150+")}
          {tab("For Rent", "80", "rent")}
          {tab("For Sale", "70", "sale")}
        </div>

        {/* sort — now handled inside PropertyResult; this label is cosmetic */}
        <p className="text-xs text-[#666666] sm:text-sm">
          Sort by the dropdown below ↓
        </p>
      </div>

    </section>
  );
}
