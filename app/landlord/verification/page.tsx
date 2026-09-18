"use client";

import { PageHeader } from "@/component/ui/Primitives";
import { VerificationWizard } from "@/component/landlord/VerificationWizard";

export default function LandlordVerificationPage() {
  return (
    <div>
      <PageHeader
        title="Verification"
        description="Complete identity and property checks to earn trust badges on your listings."
      />
      <VerificationWizard />
    </div>
  );
}
