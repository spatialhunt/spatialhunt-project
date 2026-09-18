"use client";

import { PageHeader, Surface } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";

export default function LandlordBillingPage() {
  return (
    <div>
      <PageHeader
        title="Billing"
        description="Listing fees and invoices managed by SpatialHunt operations."
      />

      <Surface className="mb-5">
        <p className="text-sm font-semibold text-[#2E2E2E]">Pricing configured by ops</p>
        <p className="mt-2 text-sm text-[#777777]">
          Fee schedules, promotions, and invoicing are set by the operations team. No placeholder prices are shown here.
        </p>
      </Surface>

      <EmptyState
        title="No invoices yet"
        description="When billing is enabled for your account, fee history and downloadable invoices will appear here."
      />
    </div>
  );
}
