"use client";

import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/primitives";
import { PaymentStatusBadge } from "@/component/verification/StatusBadges";
import { MOCK_ESCROWS, formatNaira } from "@/mocks";

export default function AdminTransactionsPage() {
  return (
    <div>
      <PageHeader title="Transactions" description="Escrow movements across the platform." />
      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>

      <Surface className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">View</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ESCROWS.map((e) => (
              <tr key={e.id} className="border-b border-[#EEEEEE]">
                <td className="px-4 py-3 font-mono text-xs">{e.id}</td>
                <td className="px-4 py-3">{e.property?.title ?? e.propertyId}</td>
                <td className="px-4 py-3">{formatNaira(e.amount)}</td>
                <td className="px-4 py-3"><PaymentStatusBadge status={e.status} /></td>
                <td className="px-4 py-3">
                  <Link href={`/admin/transactions/${e.id}`} className="text-[#1E5A4F] hover:underline">Open</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Surface>
    </div>
  );
}
