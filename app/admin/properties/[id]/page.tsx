"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { PropertyStatusBadge } from "@/component/verification/StatusBadges";
import { NotFoundState } from "@/component/shared/AppStates";
import { MOCK_PROPERTIES, formatNaira } from "@/mocks";

export default function AdminPropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return (
      <NotFoundState
        title="Property not found"
        action={
          <Link href="/admin/properties">
            <Button variant="primary">Back to properties</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={property.title}
        description={`${property.address}, ${property.city}`}
        actions={
          <Link href="/admin/properties">
            <Button variant="ghost">Back</Button>
          </Link>
        }
      />
      <Surface>
        <div className="mb-4"><PropertyStatusBadge status={property.status} /></div>
        <p className="text-xl font-bold text-[#1E5A4F]">{formatNaira(property.price)}</p>
        <p className="mt-4 text-sm text-[#2E2E2E]">{property.description}</p>
        <p className="mt-4 text-xs text-[#777777]">Owner: {property.ownerId}</p>
      </Surface>
    </div>
  );
}
