"use client";

import Link from "next/link";
import { PageHeader, Button } from "@/component/ui/primitives";
import { VerificationRejectedState } from "@/component/shared/AppStates";
import { VerificationWizard } from "@/component/landlord/VerificationWizard";

export default function VerificationResubmitPage() {
  return (
    <div>
      <PageHeader
        title="Resubmit verification"
        description="Address the review notes and submit updated documents."
        actions={
          <Link href="/landlord/verification/status">
            <Button variant="ghost">Back to status</Button>
          </Link>
        }
      />
      <div className="mb-6">
        <VerificationRejectedState
          description="Your previous submission could not be approved. Update your documents below."
        />
      </div>
      <VerificationWizard rejected />
    </div>
  );
}
