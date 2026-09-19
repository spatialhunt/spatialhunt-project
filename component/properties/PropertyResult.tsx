"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/component/properties/PropertyCard";
import { propertyService } from "@/lib/services/property.service";
import { MOCK_PROPERTIES, formatNaira } from "@/mocks";
import type { Property } from "@/lib/types";

// ─── helpers ─────────────────────────────────────────────────────────────────

/** Naïve price string → number parser for the legacy string-based filter. */
function parsePriceStr(s: string): number {
  return Number(s.replace(/[₦,]/g, "").split("/")[0]);
}

function formatPeriod(p?: string | null) {
  if (p === "MONTHLY") return "/month";
  if (p === "YEARLY") return "/year";
  return "";
}

function propertyToCardProps(p: Property) {
  const image = p.photos?.[0]?.url ?? "/property1.svg";
  return {
    id: p.id,
    image,
    title: p.title,
    location: `${p.address}, ${p.city}`,
    price: `${formatNaira(p.price)}${formatPeriod(p.pricePeriod)}`,
    beds: p.bedrooms,
    bathrooms: p.bathrooms,
    parking: p.amenities.includes("Parking") ? 1 : 0,
    description: p.description,
    verified: p.status === "VERIFIED",
  };
}

// ─── skeleton card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="w-full overflow-hidden rounded-[10px] border border-[#EEEEEE] bg-white">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="h-48 w-full animate-pulse bg-[#EAEAEA] sm:h-auto sm:w-[140px] md:w-[160px]" />
        <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
          <div className="h-4 w-3/4 animate-pulse rounded bg-[#EAEAEA]" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-[#EAEAEA]" />
          <div className="flex gap-3">
            <div className="h-3 w-16 animate-pulse rounded bg-[#EAEAEA]" />
            <div className="h-3 w-16 animate-pulse rounded bg-[#EAEAEA]" />
            <div className="h-3 w-16 animate-pulse rounded bg-[#EAEAEA]" />
          </div>
          <div className="h-3 w-full animate-pulse rounded bg-[#EAEAEA]" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-[#EAEAEA]" />
          <div className="mt-auto flex items-center justify-between">
            <div className="h-5 w-28 animate-pulse rounded bg-[#EAEAEA]" />
            <div className="h-8 w-24 animate-pulse rounded-[7px] bg-[#EAEAEA]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── sort helper ─────────────────────────────────────────────────────────────

type SortKey = "newest" | "price-asc" | "price-desc" | "beds-asc";

function sortProperties(list: Property[], key: SortKey): Property[] {
  const copy = [...list];
  switch (key) {
    case "price-asc":
      return copy.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return copy.sort((a, b) => Number(b.price) - Number(a.price));
    case "beds-asc":
      return copy.sort((a, b) => a.bedrooms - b.bedrooms);
    case "newest":
    default:
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      );
  }
}

// ─── component ───────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const PropertyResults = () => {
  const searchParams = useSearchParams();

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);

  // Track the last fetch params so we don't double-fetch on same values
  const lastFetchRef = useRef<string>("");

  // ── derive API filter params from URL ──────────────────────────────────────
  const apiFilters = useMemo(() => {
    const location = searchParams.get("location") ?? "";
    const propertyType = searchParams.get("propertyType") ?? "";
    const priceRange = searchParams.get("priceRange") ?? "";
    const bedrooms = searchParams.get("bedrooms") ?? "";

    return {
      city: location || undefined,
      type: propertyType
        ? propertyType.toUpperCase().replace(/\s+/g, "_")
        : undefined,
      maxPrice: priceRange ? parsePriceStr(priceRange) || undefined : undefined,
      bedrooms: bedrooms
        ? bedrooms === "4+ Bedrooms"
          ? undefined           // API can't do "4+" simply; filter client-side
          : parseInt(bedrooms)
        : undefined,
    };
  }, [searchParams]);

  // ── fetch whenever URL filters change ─────────────────────────────────────
  const fetchKey = JSON.stringify(apiFilters);
  useEffect(() => {
    if (lastFetchRef.current === fetchKey) return;
    lastFetchRef.current = fetchKey;
    setPage(1);

    let cancelled = false;
    setLoading(true);

    propertyService
      .getProperties(apiFilters)
      .then((data) => {
        if (cancelled) return;
        setAllProperties(data);
        setUsingMock(false);
      })
      .catch(() => {
        if (cancelled) return;
        // API unavailable — fall back to mock data, apply basic client filter
        setAllProperties(MOCK_PROPERTIES);
        setUsingMock(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── client-side filter pass (handles filters the API can't express) ────────
  const clientFiltered = useMemo(() => {
    const purpose = searchParams.get("purpose");
    const furnishing = searchParams.get("furnishing");
    const parking = searchParams.get("parking");
    const security = searchParams.get("security");
    const swimmingPool = searchParams.get("swimmingPool");
    const airConditioning = searchParams.get("airConditioning");
    const verifiedOnly = searchParams.get("verifiedProperty");
    const bedroomsParam = searchParams.get("bedrooms");

    return allProperties.filter((p) => {
      // purpose (rent / sale) — not in DB schema yet, skip silently
      if (purpose === "rent" && p.listingIntent === "SALE") return false;
      if (purpose === "sale" && p.listingIntent === "RENT") return false;

      // 4+ bedrooms edge case
      if (bedroomsParam === "4+ Bedrooms" && p.bedrooms < 4) return false;

      // furnishing
      if (furnishing && furnishing !== "Any") {
        const map: Record<string, string> = {
          Furnished: "FURNISHED",
          Unfurnished: "UNFURNISHED",
          "Semi-Furnished": "SEMI_FURNISHED",
        };
        if (p.furnishing !== map[furnishing]) return false;
      }

      // amenity checkboxes
      if (parking === "true" && !p.amenities.includes("Parking")) return false;
      if (security === "true" && !p.amenities.includes("Security")) return false;
      if (swimmingPool === "true" && !p.amenities.includes("Swimming Pool"))
        return false;
      if (airConditioning === "true" && !p.amenities.includes("Air Conditioning"))
        return false;
      if (verifiedOnly === "true" && p.status !== "VERIFIED") return false;

      return true;
    });
  }, [allProperties, searchParams]);

  const sorted = useMemo(
    () => sortProperties(clientFiltered, sortKey),
    [clientFiltered, sortKey],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = page < totalPages;

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortKey(e.target.value as SortKey);
      setPage(1);
    },
    [],
  );

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <section className="w-full min-w-0">

      {/* ── toolbar: count + sort ──────────────────────────────────────────── */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#666666]">
          {loading ? (
            <span className="inline-block h-4 w-32 animate-pulse rounded bg-[#EAEAEA]" />
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-[#2E2E2E]">
                {sorted.length}
              </span>{" "}
              {sorted.length === 1 ? "property" : "properties"}
              {usingMock && (
                <span className="ml-2 rounded-[4px] bg-[#FFF6D9] px-1.5 py-0.5 text-[10px] font-semibold text-[#C99A20]">
                  Demo data
                </span>
              )}
            </>
          )}
        </p>

        {/* sort selector */}
        <div className="relative">
          <select
            value={sortKey}
            onChange={handleSortChange}
            aria-label="Sort properties"
            className="h-9 appearance-none rounded-[7px] border border-[#D9D9D9] bg-white pl-3 pr-8 text-xs font-medium text-[#2E2E2E] outline-none focus-visible:ring-2 focus-visible:ring-[#1E5A4F] sm:text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="beds-asc">Fewest Beds First</option>
          </select>
          <img
            src="/dropdown.svg"
            alt=""
            className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
          />
        </div>
      </div>

      {/* ── skeleton loading ──────────────────────────────────────────────── */}
      {loading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* ── results ───────────────────────────────────────────────────────── */}
      {!loading && sorted.length > 0 && (
        <>
          <div className="flex flex-col gap-3">
            {paginated.map((property) => (
              <PropertyCard
                key={property.id}
                {...propertyToCardProps(property)}
              />
            ))}
          </div>

          {/* ── load more ─────────────────────────────────────────────────── */}
          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="rounded-[8px] border border-[#1E5A4F] px-6 py-2.5 text-sm font-medium text-[#1E5A4F] transition hover:bg-[#1E5A4F] hover:text-white focus-visible:ring-2 focus-visible:ring-[#1E5A4F]"
              >
                Load more ({sorted.length - paginated.length} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* ── empty state ───────────────────────────────────────────────────── */}
      {!loading && sorted.length === 0 && (
        <div className="flex min-h-[240px] flex-col items-center justify-center rounded-[10px] border border-dashed border-[#D9D9D9] bg-[#FAFAF8] px-6 py-12 text-center">
          <img src="/location.svg" alt="" className="mb-4 h-10 w-10 opacity-30" />
          <h2 className="text-base font-semibold text-[#2E2E2E]">
            No properties found
          </h2>
          <p className="mt-2 max-w-xs text-sm text-[#666666]">
            Try adjusting your search filters or clearing them to see all
            available properties.
          </p>
        </div>
      )}

    </section>
  );
};

export default PropertyResults;
