"use client";

import { PageHeader, Surface } from "@/component/ui/primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Portfolio-level performance insights."
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="Cross-property analytics and occupancy trends will appear here once the portal analytics pipeline is connected."
        />
      </Surface>
    </div>
  );
}
