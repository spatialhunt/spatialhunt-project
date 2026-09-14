"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Surface, Button } from "@/component/ui/primitives";
import { PaymentStatusBadge } from "@/component/verification/StatusBadges";
import { PaymentTimeline } from "@/component/payment/PaymentTimeline";
import { NotFoundState } from "@/component/shared/AppStates";
import { MOCK_ESCROWS, formatNaira } from "@/mocks";

export default function AdminTransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const tx = MOCK_ESCROWS.find((e) => e.id === id);

  if (!tx) {
    return (
      <NotFoundState
        title="Transaction not found"
        action={
          <Link href="/admin/transactions">
            <Button variant="primary">Back to transactions</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={`Transaction ${tx.id}`}
        description={tx.property?.title ?? tx.propertyId}
        actions={<PaymentStatusBadge status={tx.status} />}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Surface>
          <p className="text-2xl font-bold text-[#1E5A4F]">{formatNaira(tx.amount)}</p>
          <dl className="mt-4 grid gap-2 text-sm">
            <div><dt className="text-xs text-[#777777]">Tenant</dt><dd>{tx.tenantId}</dd></div>
            <div><dt className="text-xs text-[#777777]">Landlord</dt><dd>{tx.landlordId}</dd></div>
            <div><dt className="text-xs text-[#777777]">Funded</dt><dd>{tx.fundedAt ? new Date(tx.fundedAt).toLocaleString() : "—"}</dd></div>
          </dl>
        </Surface>
        <Surface>
          <h2 className="mb-3 font-semibold text-[#2E2E2E]">Escrow timeline</h2>
          <PaymentTimeline status={tx.status} />
        </Surface>
      </div>
    </div>
  );
}
