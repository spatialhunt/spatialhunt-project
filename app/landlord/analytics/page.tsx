"use client";

import { PageHeader, Surface } from "@/component/ui/primitives";
import { KpiCard } from "@/component/shared/KpiCard";
import { EmptyState } from "@/component/shared/AppStates";

export default function LandlordAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Listing performance will appear here once view and inquiry tracking is connected."
      />

      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data — not live metrics</p>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Profile views" value="—" hint="Tracking not enabled" demo />
        <KpiCard label="Listing impressions" value="—" hint="Tracking not enabled" demo />
        <KpiCard label="Inquiry conversion" value="—" hint="Requires analytics pipeline" demo />
      </div>

      <Surface>
        <EmptyState
          title="Analytics coming soon"
          description="We will show honest, aggregated metrics once listing analytics APIs are available. No fabricated live numbers are shown here."
        />
      </Surface>
    </div>
  );
}
