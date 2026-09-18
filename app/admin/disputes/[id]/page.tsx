"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Surface, Button, Textarea } from "@/component/ui/Primitives";
import { NotFoundState } from "@/component/shared/AppStates";
import { MOCK_DISPUTES } from "@/mocks";

export default function AdminDisputeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispute = MOCK_DISPUTES.find((d) => d.id === id);

  if (!dispute) {
    return (
      <NotFoundState
        title="Dispute not found"
        action={
          <Link href="/admin/disputes">
            <Button variant="primary">Back to disputes</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={dispute.category}
        description={`Filed ${new Date(dispute.createdAt).toLocaleString()}`}
        actions={
          <Link href="/admin/disputes">
            <Button variant="ghost">Back</Button>
          </Link>
        }
      />

      <Surface className="mb-5 max-w-2xl">
        <p className="text-sm text-[#2E2E2E]">{dispute.summary}</p>
        <dl className="mt-4 grid gap-2 text-sm">
          <div><dt className="text-xs text-[#777777]">Claimant</dt><dd>{dispute.claimantId}</dd></div>
          <div><dt className="text-xs text-[#777777]">Respondent</dt><dd>{dispute.respondentId}</dd></div>
          <div><dt className="text-xs text-[#777777]">Property</dt><dd>{dispute.propertyId ?? "—"}</dd></div>
          <div><dt className="text-xs text-[#777777]">Transaction</dt><dd>{dispute.transactionId ?? "—"}</dd></div>
        </dl>
      </Surface>

      <Surface className="max-w-2xl">
        <Textarea label="Ops notes" rows={4} placeholder="Internal resolution notes…" />
        <div className="mt-4 flex gap-2">
          <Button variant="primary">Mark under review</Button>
          <Button variant="secondary">Resolve</Button>
        </div>
        <p className="mt-2 text-xs text-[#777777]">
          {/* TODO: wire dispute resolution API when /api/admin/disputes is available */}
          Dispute actions are UI-only until the disputes API ships.
        </p>
      </Surface>
    </div>
  );
}
