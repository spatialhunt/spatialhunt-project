"use client";

import { PageHeader, Surface } from "@/component/ui/primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function AdminReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Export platform metrics and compliance reports."
      />

      <Surface className="mb-5">
        <p className="text-sm text-[#777777]">
          Report generation requires connected analytics and transaction APIs. No sample exports are fabricated.
        </p>
      </Surface>

      <EmptyState
        title="Reports not configured"
        description="Ops can enable CSV/PDF exports once reporting endpoints are available."
      />
    </div>
  );
}
