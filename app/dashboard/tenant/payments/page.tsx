"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { EmptyState, LoadingState } from "@/component/shared/AppStates";
import { PaymentStatusBadge } from "@/component/verification/StatusBadges";
import { Button, PageHeader, Surface } from "@/component/ui/Primitives";
import { MOCK_ESCROWS, formatNaira } from "@/mocks";
import { paymentService } from "@/lib/services/payment.service";
import type { EscrowTransaction } from "@/lib/types";

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PaymentsPage() {
  const [escrows, setEscrows] = useState<EscrowTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await paymentService.getMine();
        if (!cancelled) {
          setEscrows(data.length > 0 ? data : MOCK_ESCROWS);
          setUsingMock(data.length === 0);
        }
      } catch {
        if (!cancelled) {
          setEscrows(MOCK_ESCROWS);
          setUsingMock(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Rent Payments"
        description="Track escrow-protected rent payments from start to release."
      />

      {usingMock && (
        <p className="mb-4 rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-4 py-2 text-xs text-[#C99A20]">
          Showing demo escrow transactions — connect payments API for live status.
        </p>
      )}

      {loading ? (
        <LoadingState title="Loading payments" />
      ) : escrows.length === 0 ? (
        <EmptyState
          title="No payments yet"
          description="When you pay rent through SpatialHunt escrow, your transactions will appear here."
          action={
            <Link href="/properties">
              <Button variant="primary">Find a property</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {escrows.map((escrow) => (
            <Surface key={escrow.id} className="!bg-white">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-[#2E2E2E]">
                    {escrow.property?.title || "Rent payment"}
                  </h3>
                  <p className="mt-1 text-sm text-[#777777]">
                    {escrow.property?.address}, {escrow.property?.city}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#1E5A4F]">
                    {formatNaira(escrow.amount)}
                  </p>
                  <p className="mt-1 text-xs text-[#999999]">
                    Funded {formatDate(escrow.fundedAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <PaymentStatusBadge status={escrow.status} />
                  <Link href={`/dashboard/tenant/payments/${escrow.id}`}>
                    <Button variant="secondary" className="!py-1.5 text-xs">
                      View timeline
                    </Button>
                  </Link>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      )}
    </TenantDashboardLayout>
  );
}
