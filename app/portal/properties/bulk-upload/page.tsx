"use client";

import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function PortalBulkUploadPage() {
  return (
    <div>
      <PageHeader
        title="Bulk upload"
        description="Import multiple properties via CSV."
        actions={
          <Link href="/portal/properties">
            <Button variant="ghost">Back</Button>
          </Link>
        }
      />
      <Surface>
        <EmptyState
          title="Coming soon"
          description="CSV bulk import with validation and preview will be available in a future release."
        />
      </Surface>
    </div>
  );
}
