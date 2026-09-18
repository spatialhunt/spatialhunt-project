"use client";

import { PageHeader, Surface, Button } from "@/component/ui/Primitives";

export default function AdminSettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Platform configuration for operations." />
      <Surface className="max-w-lg space-y-4">
        <label className="flex items-center justify-between gap-4 text-sm text-[#2E2E2E]">
          <span>Require verification before listing publish</span>
          <input type="checkbox" defaultChecked className="accent-[#1E5A4F]" />
        </label>
        <label className="flex items-center justify-between gap-4 text-sm text-[#2E2E2E]">
          <span>Auto-flag disputed escrow transactions</span>
          <input type="checkbox" defaultChecked className="accent-[#1E5A4F]" />
        </label>
        <Button variant="primary">Save settings</Button>
        <p className="text-xs text-[#777777]">
          {/* TODO: wire /api/admin/settings when platform config API is available */}
          Admin settings are UI-only until the config API ships.
        </p>
      </Surface>
    </div>
  );
}
