"use client";

import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/primitives";
import { PropertyStatusBadge } from "@/component/verification/StatusBadges";
import { MOCK_PROPERTIES, formatNaira } from "@/mocks";

export default function AdminPropertiesPage() {
  return (
    <div>
      <PageHeader title="Properties" description="All listings on the platform." />
      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>

      <Surface className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PROPERTIES.map((p) => (
              <tr key={p.id} className="border-b border-[#EEEEEE]">
                <td className="px-4 py-3">
                  <Link href={`/admin/properties/${p.id}`} className="font-medium text-[#1E5A4F] hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[#777777]">{p.city}, {p.state}</td>
                <td className="px-4 py-3">{formatNaira(p.price)}</td>
                <td className="px-4 py-3">{p.ownerId}</td>
                <td className="px-4 py-3"><PropertyStatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Surface>
    </div>
  );
}
