"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Surface, Button, Textarea } from "@/component/ui/Primitives";
import { VerificationStatusBadge } from "@/component/verification/StatusBadges";
import { LoadingState, NotFoundState } from "@/component/shared/AppStates";
import { ConfirmationModal } from "@/component/shared/ConfirmationModal";
import { verificationService } from "@/lib/services/verification.service";
import { MOCK_VERIFICATIONS } from "@/mocks";
import type { Verification, VerificationStatus } from "@/lib/types";

export default function AdminVerificationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Verification | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [modal, setModal] = useState<Exclude<VerificationStatus, "PENDING"> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const pending = await verificationService.getPending();
        setItem(pending.find((v) => v.id === id) ?? null);
      } catch {
        setItem(MOCK_VERIFICATIONS.find((v) => v.id === id) ?? null);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [id]);

  async function review(status: Exclude<VerificationStatus, "PENDING">) {
    if (!item) return;
    setSubmitting(true);
    try {
      const updated = await verificationService.review(item.id, { status, reviewNotes: notes || undefined });
      setItem(updated);
    } catch {
      // TODO: remove mock fallback when /api/verifications/:id/review is live
      setItem({ ...item, status, reviewNotes: notes, reviewedAt: new Date().toISOString() });
    } finally {
      setSubmitting(false);
      setModal(null);
    }
  }

  if (loading) return <LoadingState title="Loading verification" />;
  if (!item) {
    return (
      <NotFoundState
        title="Verification not found"
        action={
          <Link href="/admin/verifications">
            <Button variant="primary">Back to queue</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Review verification"
        description={item.type.replace(/_/g, " ")}
        actions={<VerificationStatusBadge status={item.status} />}
      />

      <Surface className="mb-5 max-w-2xl">
        <dl className="grid gap-3 text-sm">
          <div><dt className="text-xs text-[#777777]">User</dt><dd>{item.userId}</dd></div>
          <div><dt className="text-xs text-[#777777]">Document</dt><dd className="break-all">{item.documentUrl}</dd></div>
          <div><dt className="text-xs text-[#777777]">Submitted</dt><dd>{new Date(item.createdAt).toLocaleString()}</dd></div>
        </dl>
      </Surface>

      {item.status === "PENDING" && (
        <Surface className="max-w-2xl">
          <Textarea
            label="Review notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes for approve, reject, or correction request…"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="primary" onClick={() => setModal("APPROVED")}>Approve</Button>
            <Button variant="danger" onClick={() => setModal("REJECTED")}>Reject</Button>
            <Button variant="secondary" onClick={() => setModal("REJECTED")}>Request correction</Button>
          </div>
          <p className="mt-2 text-xs text-[#777777]">
            Request correction uses reject flow with notes until a dedicated status exists.
          </p>
        </Surface>
      )}

      {item.reviewNotes && (
        <Surface className="mt-5 max-w-2xl">
          <p className="text-sm text-[#C58D16]">Review notes: {item.reviewNotes}</p>
        </Surface>
      )}

      <ConfirmationModal
        open={modal === "APPROVED"}
        title="Approve verification?"
        description="The landlord will receive an approval notification."
        confirmLabel="Approve"
        loading={submitting}
        onConfirm={() => void review("APPROVED")}
        onCancel={() => setModal(null)}
      />
      <ConfirmationModal
        open={modal === "REJECTED"}
        title="Reject verification?"
        description="Include clear notes so the landlord can resubmit."
        confirmLabel="Reject"
        tone="danger"
        loading={submitting}
        onConfirm={() => void review("REJECTED")}
        onCancel={() => setModal(null)}
      />
    </div>
  );
}
