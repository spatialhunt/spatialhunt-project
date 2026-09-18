"use client";

import { PageHeader, Surface } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Portal organization and integration preferences."
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="Organization branding, webhook integrations, and notification defaults will be configurable here."
        />
      </Surface>
    </div>
  );
}
