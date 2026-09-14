"use client";

import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalPropertiesPage() {
  return (
    <div>
      <PageHeader
        title="Properties"
        description="Portfolio-wide listing management."
        actions={
          <>
            <Link href="/portal/properties/new">
              <Button variant="secondary">Add property</Button>
            </Link>
            <Link href="/portal/properties/bulk-upload">
              <Button variant="amber">Bulk upload</Button>
            </Link>
          </>
        }
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="Import and manage properties across your portfolio. Bulk CSV upload and team assignments will live here."
        />
      </Surface>
    </div>
  );
}
