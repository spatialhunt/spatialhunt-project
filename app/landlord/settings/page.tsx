"use client";

import { PageHeader, Surface, Button } from "@/component/ui/primitives";

export default function LandlordSettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Notification and account preferences." />
      <Surface className="max-w-lg space-y-4">
        <label className="flex items-center justify-between gap-4 text-sm text-[#2E2E2E]">
          <span>Email notifications for new inquiries</span>
          <input type="checkbox" defaultChecked className="accent-[#1E5A4F]" />
        </label>
        <label className="flex items-center justify-between gap-4 text-sm text-[#2E2E2E]">
          <span>Inspection reminders</span>
          <input type="checkbox" defaultChecked className="accent-[#1E5A4F]" />
        </label>
        <label className="flex items-center justify-between gap-4 text-sm text-[#2E2E2E]">
          <span>Verification status updates</span>
          <input type="checkbox" defaultChecked className="accent-[#1E5A4F]" />
        </label>
        <Button variant="primary">Save preferences</Button>
        <p className="text-xs text-[#777777]">
          {/* TODO: wire settings API when user preferences endpoint is available */}
          Preferences are stored locally until the settings API ships.
        </p>
      </Surface>
    </div>
  );
}
