"use client";

import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalNewPropertyPage() {
  return (
    <div>
      <PageHeader
        title="Add property"
        description="Create a listing on behalf of your portfolio."
        actions={
          <Link href="/portal/properties">
            <Button variant="ghost">Back</Button>
          </Link>
        }
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="Portal listing creation with team assignment and approval workflows is not yet available."
        />
      </Surface>
    </div>
  );
}
