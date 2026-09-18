"use client";

import { PageHeader, Surface } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalAgreementsPage() {
  return (
    <div>
      <PageHeader
        title="Agreements"
        description="Tenancy agreements and e-sign workflows for your portfolio."
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="Centralized agreement templates, signing status, and document storage will be added to the portal."
        />
      </Surface>
    </div>
  );
}
