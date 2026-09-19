"use client";

import React from "react";
import Link from "next/link";

export type PropertyCardProps = {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number | string;
  bathrooms: number | string;
  parking: number | string;
  description: string;
  verified?: boolean;
};

/**
 * PropertyCard — horizontal list-card used in the public /properties page.
 *
 * Layout strategy
 * ───────────────
 * xs  (< 640 px)   : stacked — thumbnail top, body below
 * sm  (≥ 640 px)   : side-by-side row, compact thumbnail
 * lg  (≥ 1024 px)  : wider thumbnail, larger type
 * xl  (≥ 1280 px)  : max comfort sizing
 *
 * The card sits inside a flex column inside PropertyResult which already
 * constrains the width, so the card just fills 100 %.
 */
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
  verified = true,
}: PropertyCardProps) => {
  const detailHref = `/properties/${id}`;

  return (
    <article className="w-full overflow-hidden rounded-[10px] border border-[#EEEEEE] bg-white transition-shadow duration-200 hover:shadow-md">

      {/* ── xs: stacked layout ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-stretch">

        {/* ── THUMBNAIL ─────────────────────────────────────────────────────── */}
        <Link
          href={detailHref}
          className="relative block h-48 w-full shrink-0 overflow-hidden bg-[#F7F7F7] sm:h-auto sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]"
          tabIndex={-1}
          aria-hidden
        >
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* verified badge overlay on mobile */}
          {verified && (
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-[6px] bg-[#117E2526] px-2 py-1 text-[10px] font-semibold text-[#117E25] backdrop-blur-sm sm:hidden">
              <img src="/verify.svg" alt="" className="h-3 w-3" />
              Verified
            </span>
          )}
        </Link>

        {/* ── BODY ──────────────────────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 sm:gap-2 sm:p-4 md:p-5">

          {/* ── top block: title + location ─────────────────────────────────── */}
          <div className="min-w-0">
            <Link href={detailHref} className="group block">
              <h2 className="truncate text-[15px] font-bold leading-snug text-[#2E2E2E] transition-colors group-hover:text-[#1E5A4F] sm:text-sm md:text-[15px] lg:text-base xl:text-[17px]">
                {title}
              </h2>
            </Link>

            <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
              <img src="/location.svg" alt="" className="h-3.5 w-3.5 shrink-0" />
              <p className="truncate text-[11px] text-[#666666] sm:text-xs lg:text-[13px]">
                {location}
              </p>
            </div>
          </div>

          {/* ── features row ────────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#555555] sm:text-xs lg:text-[13px]">
              <img src="/Beds.svg" alt="Beds" className="h-4 w-4 shrink-0" />
              {beds} {Number(beds) === 1 ? "Bed" : "Beds"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#555555] sm:text-xs lg:text-[13px]">
              <img src="/bathroom.svg" alt="Bathrooms" className="h-4 w-4 shrink-0" />
              {bathrooms} {Number(bathrooms) === 1 ? "Bath" : "Baths"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#555555] sm:text-xs lg:text-[13px]">
              <img src="/Parking.svg" alt="Parking" className="h-4 w-4 shrink-0" />
              {parking} Parking
            </span>
          </div>

          {/* ── description ─────────────────────────────────────────────────── */}
          <p className="line-clamp-2 text-[11px] leading-relaxed text-[#555555] sm:text-xs md:text-[13px]">
            {description}
          </p>

          {/* ── bottom row: price + actions ─────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-sm font-bold text-[#1E5A4F] md:text-[15px] lg:text-base">
              {price}
            </p>

            <div className="flex items-center gap-2">
              {/* verified badge — desktop only (mobile uses overlay above) */}
              {verified && (
                <span className="hidden items-center gap-1 rounded-[6px] bg-[#117E2526] px-2.5 py-1.5 text-[10px] font-semibold text-[#117E25] sm:inline-flex md:text-[11px] lg:text-xs">
                  <img src="/verify.svg" alt="" className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  Verified
                </span>
              )}

              <Link
                href={detailHref}
                className="whitespace-nowrap rounded-[7px] border border-[#D9D9D9] bg-white px-3 py-1.5 text-[11px] font-medium text-[#2E2E2E] transition hover:border-[#1E5A4F] hover:text-[#1E5A4F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5A4F] sm:text-xs md:px-4 md:py-2 md:text-[12px] lg:text-[13px]"
              >
                View Details
              </Link>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
