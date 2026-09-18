"use client";

import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalTeamPage() {
  return (
    <div>
      <PageHeader
        title="Team"
        description="Manage portal users and permissions."
        actions={
          <Button variant="secondary" disabled>
            Invite member
          </Button>
        }
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="Invite colleagues, assign roles, and control access to properties and agreements."
        />
      </Surface>
    </div>
  );
}
