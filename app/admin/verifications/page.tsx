"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/Primitives";
import { VerificationStatusBadge } from "@/component/verification/StatusBadges";
import { LoadingState } from "@/component/shared/AppStates";
import { verificationService } from "@/lib/services/verification.service";
import { MOCK_VERIFICATIONS } from "@/mocks";
import type { Verification } from "@/lib/types";

export default function AdminVerificationsPage() {
  const [items, setItems] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setItems(await verificationService.getPending());
      } catch {
        // TODO: remove mock fallback when /api/verifications/pending is live
        setItems(MOCK_VERIFICATIONS);
        setDemo(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) return <LoadingState title="Loading verification queue" />;

  return (
    <div>
      <PageHeader title="Verifications" description="Review landlord identity and property submissions." />
      {demo && <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>}

      <Surface className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Review</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v) => (
              <tr key={v.id} className="border-b border-[#EEEEEE]">
                <td className="px-4 py-3">{v.type.replace(/_/g, " ")}</td>
                <td className="px-4 py-3">{v.userId}</td>
                <td className="px-4 py-3">{new Date(v.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3"><VerificationStatusBadge status={v.status} /></td>
                <td className="px-4 py-3">
                  <Link href={`/admin/verifications/${v.id}`} className="text-[#1E5A4F] hover:underline">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Surface>
    </div>
  );
}
