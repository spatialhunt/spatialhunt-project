"use client";

import { PageHeader, Surface } from "@/component/ui/primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Portal dashboard"
        description="Multi-property management for agencies and portfolio landlords."
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="The property manager portal is under development. You'll manage portfolios, teams, and bulk listings from here."
        />
      </Surface>
    </div>
  );
}
