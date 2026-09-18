"use client";

import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalTeamMemberPage() {
  return (
    <div>
      <PageHeader
        title="Team member"
        description="Member profile and permissions."
        actions={
          <Link href="/portal/team">
            <Button variant="ghost">Back to team</Button>
          </Link>
        }
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="Team member details, role assignments, and activity history will be available in the portal release."
        />
      </Surface>
    </div>
  );
}
