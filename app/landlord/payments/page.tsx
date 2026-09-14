"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/primitives";
import { PaymentStatusBadge } from "@/component/verification/StatusBadges";
import { LoadingState, EmptyState } from "@/component/shared/AppStates";
import { paymentService } from "@/lib/services/payment.service";
import { MOCK_ESCROWS, formatNaira } from "@/mocks";
import type { EscrowTransaction } from "@/lib/types";

export default function LandlordPaymentsPage() {
  const [escrows, setEscrows] = useState<EscrowTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setEscrows(await paymentService.getMine());
      } catch {
        // TODO: remove mock fallback when /api/escrow/mine is live
        setEscrows(MOCK_ESCROWS);
        setDemo(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) return <LoadingState title="Loading payments" />;

  return (
    <div>
      <PageHeader
        title="Payments"
        description="Escrow and release history for your properties."
      />
      {demo && <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>}

      {escrows.length === 0 ? (
        <EmptyState
          title="No payment activity"
          description="When tenants fund escrow for your listings, transactions appear here."
        />
      ) : (
        <Surface className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Funded</th>
              </tr>
            </thead>
            <tbody>
              {escrows.map((e) => (
                <tr key={e.id} className="border-b border-[#EEEEEE]">
                  <td className="px-4 py-3">{e.property?.title ?? e.propertyId}</td>
                  <td className="px-4 py-3">{formatNaira(e.amount)}</td>
                  <td className="px-4 py-3"><PaymentStatusBadge status={e.status} /></td>
                  <td className="px-4 py-3">
                    {e.fundedAt ? new Date(e.fundedAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      )}

      <p className="mt-4 text-sm text-[#777777]">
        Platform fees: <strong>Pricing configured by ops</strong>.{" "}
        <Link href="/landlord/billing" className="text-[#1E5A4F] hover:underline">
          View billing →
        </Link>
      </p>
    </div>
  );
}
