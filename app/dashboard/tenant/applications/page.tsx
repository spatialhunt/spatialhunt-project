import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { EmptyState } from "@/component/shared/AppStates";
import { Button, PageHeader } from "@/component/ui/Primitives";

export default function ApplicationsPage() {
  return (
    <TenantDashboardLayout>
      <PageHeader
        title="My Applications"
        description="Rental applications you submit will appear here for tracking."
      />

      <EmptyState
        title="Applications coming soon"
        description="We're building a streamlined way to apply for verified rentals directly on SpatialHunt. For now, continue enquiries and inspections with landlords."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/dashboard/tenant/enquiries">
              <Button variant="secondary">View enquiries</Button>
            </Link>
            <Link href="/properties">
              <Button variant="primary">Browse properties</Button>
            </Link>
          </div>
        }
      />
    </TenantDashboardLayout>
  );
}
