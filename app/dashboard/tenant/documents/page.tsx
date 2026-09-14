import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { EmptyState } from "@/component/shared/AppStates";
import { Button, PageHeader, Surface } from "@/component/ui/primitives";

export default function DocumentsPage() {
  return (
    <TenantDashboardLayout>
      <PageHeader
        title="My Documents"
        description="Tenancy agreements and receipts — stored securely, never displayed publicly."
      />

      <Surface className="mb-4 border-[#EAF3F0] bg-[#F1F7F5]">
        <p className="text-sm font-semibold text-[#1E5A4F]">Privacy-first storage</p>
        <p className="mt-1 text-sm text-[#777777]">
          Identity documents used for verification are handled separately and are never shown in
          this dashboard. Only tenancy-related files you choose to keep will appear here.
        </p>
      </Surface>

      <EmptyState
        title="No documents yet"
        description="Signed agreements, rent receipts, and move-in checklists will be saved here after you complete a rental through SpatialHunt."
        action={
          <Link href="/dashboard/tenant/payments">
            <Button variant="secondary">View payments</Button>
          </Link>
        }
      />
    </TenantDashboardLayout>
  );
}
