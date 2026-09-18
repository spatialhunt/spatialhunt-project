"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { PaymentTimeline } from "@/component/payment/PaymentTimeline";
import { LoadingState, NotFoundState } from "@/component/shared/AppStates";
import { PaymentStatusBadge } from "@/component/verification/StatusBadges";
import { Button, PageHeader, Surface } from "@/component/ui/Primitives";
import { MOCK_ESCROWS, formatNaira } from "@/mocks";
import { paymentService } from "@/lib/services/payment.service";
import type { EscrowTransaction } from "@/lib/types";

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PaymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [escrow, setEscrow] = useState<EscrowTransaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await paymentService.getMine();
        const found = data.find((e) => e.id === id);
        if (!cancelled) {
          setEscrow(found || MOCK_ESCROWS.find((e) => e.id === id) || null);
        }
      } catch {
        if (!cancelled) {
          setEscrow(MOCK_ESCROWS.find((e) => e.id === id) || null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <TenantDashboardLayout>
        <LoadingState title="Loading payment" />
      </TenantDashboardLayout>
    );
  }

  if (!escrow) {
    return (
      <TenantDashboardLayout>
        <NotFoundState
          title="Payment not found"
          description="This escrow transaction may not exist or you may not have access."
          action={
            <Link href="/dashboard/tenant/payments">
              <Button variant="primary">Back to payments</Button>
            </Link>
          }
        />
      </TenantDashboardLayout>
    );
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Payment details"
        description={escrow.property?.title || "Escrow-protected rent payment"}
        actions={
          <Link href="/dashboard/tenant/payments">
            <Button variant="secondary">All payments</Button>
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Surface className="!bg-white">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#2E2E2E]">Transaction</h2>
            <PaymentStatusBadge status={escrow.status} />
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-[#777777]">Amount</dt>
              <dd className="mt-0.5 text-lg font-bold text-[#1E5A4F]">
                {formatNaira(escrow.amount)}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-[#777777]">Property</dt>
              <dd className="mt-0.5 font-semibold text-[#2E2E2E]">
                {escrow.property?.title || "—"}
              </dd>
              <dd className="text-[#777777]">
                {escrow.property?.address}, {escrow.property?.city}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-[#777777]">Funded on</dt>
              <dd className="mt-0.5 text-[#2E2E2E]">{formatDate(escrow.fundedAt)}</dd>
            </div>
          </dl>
        </Surface>

        <Surface className="!bg-white">
          <h2 className="text-base font-bold text-[#2E2E2E]">Payment progress</h2>
          <div className="mt-4">
            <PaymentTimeline status={escrow.status} />
          </div>
        </Surface>
      </div>

      <Surface className="mt-4 border-[#FFF4D6] bg-[#FFF6D9]">
        <p className="text-sm font-semibold text-[#C99A20]">Escrow provider notice</p>
        <p className="mt-2 text-sm text-[#777777]">
          SpatialHunt coordinates rent payments through a licensed third-party escrow provider.
          Funds are held securely until you confirm inspection, key handover, and tenancy agreement.
          SpatialHunt is not itself a licensed escrow institution — your payment is protected by
          our integrated provider&apos;s terms and regulatory oversight.
        </p>
      </Surface>
    </TenantDashboardLayout>
  );
}
