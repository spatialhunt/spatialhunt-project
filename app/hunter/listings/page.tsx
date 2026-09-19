"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader, Input, Select, Surface } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";
import { PropertyStatusBadge } from "@/component/verification/StatusBadges";
import { MOCK_PROPERTIES, formatNaira } from "@/mocks";

export default function HunterListingsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");

  const verified = MOCK_PROPERTIES.filter((p) => p.status === "VERIFIED");

  const filtered = verified.filter((p) => {
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchCity = city === "all" || p.city.toLowerCase() === city;
    const matchType = type === "all" || p.type === type;
    return matchSearch && matchCity && matchType;
  });

  return (
    <div>
      <PageHeader
        title="Browse Verified Listings"
        description="Match your tenant leads with verified properties on the platform."
      />

      {/* filters */}
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Input
          placeholder="Search by title or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="all">All cities</option>
          <option value="lagos">Lagos</option>
          <option value="abuja">Abuja</option>
          <option value="port harcourt">Port Harcourt</option>
        </Select>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All types</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="SINGLE_ROOM">Single Room</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No listings match your filters"
          description="Try adjusting the search or filters to find verified properties."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="flex flex-col overflow-hidden rounded-[8px] border border-[#EEEEEE] bg-white"
            >
              <div className="relative h-36 w-full bg-[#E9F0EE]">
                {p.photos?.[0]?.url ? (
                  <img
                    src={p.photos[0].url}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-[#777777]">
                    No photo
                  </div>
                )}
                <div className="absolute left-2 top-2">
                  <PropertyStatusBadge status={p.status} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3">
                <p className="line-clamp-1 text-sm font-semibold text-[#2E2E2E]">{p.title}</p>
                <p className="text-xs text-[#777777]">
                  {p.city}, {p.state} · {p.bedrooms} bed · {p.bathrooms} bath
                </p>
                <p className="text-sm font-bold text-[#1E5A4F]">
                  {formatNaira(p.price)}
                  <span className="text-xs font-normal text-[#777777]">/yr</span>
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.amenities.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className="rounded-[4px] bg-[#EAF3F0] px-1.5 py-0.5 text-[10px] text-[#1E5A4F]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/hunter/listings/${p.id}`}
                    className="flex-1 rounded-[5px] border border-[#DDDDDD] py-1.5 text-center text-xs font-semibold text-[#444444] hover:border-[#1E5A4F]"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/hunter/matches/new?propertyId=${p.id}`}
                    className="flex-1 rounded-[5px] bg-[#1E5A4F] py-1.5 text-center text-xs font-semibold text-white hover:bg-[#17483F]"
                  >
                    Match Tenant
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
