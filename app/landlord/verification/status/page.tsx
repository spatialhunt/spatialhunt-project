"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { VerificationStatusBadge } from "@/component/verification/StatusBadges";
import { LoadingState, EmptyState } from "@/component/shared/AppStates";
import { verificationService } from "@/lib/services/verification.service";
import { MOCK_VERIFICATIONS } from "@/mocks";
import type { Verification } from "@/lib/types";

export default function VerificationStatusPage() {
  const [items, setItems] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setItems(await verificationService.getMine());
      } catch {
        // TODO: remove mock fallback when /api/verifications/mine is live
        setItems(MOCK_VERIFICATIONS.filter((v) => v.userId === "landlord-1"));
        setDemo(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) return <LoadingState title="Loading verification status" />;

  return (
    <div>
      <PageHeader
        title="Verification status"
        description={demo ? "Showing demo data until the verification API is connected." : "Track your submission reviews."}
        actions={
          <Link href="/landlord/verification">
            <Button variant="secondary">Start new verification</Button>
          </Link>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          title="No verifications yet"
          description="Submit identity and property documents to get verified."
          action={
            <Link href="/landlord/verification">
              <Button variant="primary">Begin verification</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {demo && (
            <p className="text-xs font-semibold text-[#C99A20]">Demo data</p>
          )}
          {items.map((v) => (
            <Surface key={v.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#2E2E2E]">{v.type.replace(/_/g, " ")}</p>
                  <p className="mt-1 text-xs text-[#777777]">
                    Submitted {new Date(v.createdAt).toLocaleDateString()}
                  </p>
                  {v.reviewNotes && (
                    <p className="mt-2 text-sm text-[#C58D16]">Notes: {v.reviewNotes}</p>
                  )}
                </div>
                <VerificationStatusBadge status={v.status} />
              </div>
              {v.status === "REJECTED" && (
                <Link href="/landlord/verification/resubmit" className="mt-4 inline-block">
                  <Button variant="amber">Resubmit</Button>
                </Link>
              )}
            </Surface>
          ))}
        </div>
      )}
    </div>
  );
}
