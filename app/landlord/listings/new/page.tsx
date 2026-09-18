"use client";

import Link from "next/link";
import { PageHeader, Button } from "@/component/ui/Primitives";
import { ListingWizard } from "@/component/landlord/ListingWizard";

export default function NewListingPage() {
  return (
    <div>
      <PageHeader
        title="Create listing"
        description="Draft is kept in this session until you submit."
        actions={
          <Link href="/landlord/listings">
            <Button variant="ghost">Cancel</Button>
          </Link>
        }
      />
      <ListingWizard />
    </div>
  );
}
