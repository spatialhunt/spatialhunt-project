"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatNaira } from "@/mocks";
import { VerificationBadge } from "@/component/verification/StatusBadges";
import { Button } from "@/component/ui/primitives";

type Props = {
  property: Property;
  onRemove?: (id: string) => void;
  showSave?: boolean;
};

export function CompactPropertyCard({ property, onRemove }: Props) {
  const image = property.photos?.[0]?.url || "/property1.svg";
  const period = property.pricePeriod === "MONTHLY" ? "/month" : "/year";

  return (
    <article className="overflow-hidden rounded-[8px] border border-[#EEEEEE] bg-white transition hover:border-[#1E5A4F]/40">
      <Link href={`/properties/${property.id}`} className="block">
        <img src={image} alt="" className="h-40 w-full object-cover bg-[#F7F7F7]" />
      </Link>
      <div className="p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <VerificationBadge verified={property.status === "VERIFIED"} />
        </div>
        <Link href={`/properties/${property.id}`}>
          <h3 className="truncate text-base font-bold text-[#2E2E2E]">{property.title}</h3>
        </Link>
        <p className="mt-1 truncate text-sm text-[#777777]">
          {property.address}, {property.city}
        </p>
        <p className="mt-2 text-sm font-semibold text-[#1E5A4F]">
          {formatNaira(property.price)}
          <span className="font-medium text-[#777777]">{period}</span>
        </p>
        <p className="mt-1 text-xs text-[#8A8A8A]">
          {property.bedrooms} bed · {property.bathrooms} bath · {property.type.replace("_", " ")}
        </p>
        {property.amenities?.length > 0 && (
          <p className="mt-2 line-clamp-1 text-xs text-[#777777]">
            {property.amenities.slice(0, 4).join(" · ")}
          </p>
        )}
        {onRemove && (
          <Button
            variant="secondary"
            className="mt-4 w-full"
            onClick={() => onRemove(property.id)}
          >
            Remove from saved
          </Button>
        )}
      </div>
    </article>
  );
}
