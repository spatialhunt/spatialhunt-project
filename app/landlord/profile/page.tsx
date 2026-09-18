"use client";

import { PageHeader, Surface, Input, Button } from "@/component/ui/Primitives";
import { getSession } from "@/lib/auth-client";

export default function LandlordProfilePage() {
  const session = getSession();

  return (
    <div>
      <PageHeader title="Profile" description="Your landlord account details." />
      <Surface className="max-w-lg space-y-4">
        <Input label="Full name" defaultValue={session?.fullName ?? ""} />
        <Input label="Email" type="email" defaultValue={session?.email ?? ""} readOnly />
        <Input label="Phone" placeholder="+234 …" />
        <Button variant="primary">Save profile</Button>
        <p className="text-xs text-[#777777]">
          {/* TODO: wire profile update API when /api/users/me PATCH is available */}
          Profile updates will sync when the user profile API is connected.
        </p>
      </Surface>
    </div>
  );
}
