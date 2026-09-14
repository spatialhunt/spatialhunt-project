"use client";

import { useState } from "react";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { SuccessState } from "@/component/shared/AppStates";
import { Button, Input, PageHeader, Surface } from "@/component/ui/primitives";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Ada Okonkwo",
    email: "ada.okonkwo@example.com",
    phone: "+234 801 234 5678",
    location: "Lekki, Lagos",
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Profile"
        description="Your personal details used across SpatialHunt."
      />

      {saved && (
        <div className="mb-4">
          <SuccessState
            title="Profile saved"
            description="Your changes are stored locally until the profile API is connected."
          />
        </div>
      )}

      <Surface className="max-w-xl !bg-white">
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="Email address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Phone number"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="Preferred location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Lekki, Lagos"
          />
          <Button type="submit" variant="primary">
            Save profile
          </Button>
        </form>
      </Surface>
    </TenantDashboardLayout>
  );
}
