"use client";

import { useState } from "react";
import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { DeleteConfirmationModal } from "@/component/shared/ConfirmationModal";
import { Button, Input, PageHeader, Surface } from "@/component/ui/primitives";

export default function SecurityPage() {
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to authService.changePassword when API is ready
    setSaved(true);
    setPasswordForm({ current: "", next: "", confirm: "" });
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Security"
        description="Protect your account and manage access."
      />

      <Surface className="mb-6 max-w-xl !bg-white">
        <h2 className="text-base font-bold text-[#2E2E2E]">Change password</h2>
        <p className="mt-1 text-sm text-[#777777]">
          Use a strong password you don&apos;t use elsewhere.
        </p>

        {saved && (
          <p className="mt-3 rounded-[6px] bg-[#DDF2E4] px-3 py-2 text-sm text-[#117E25]">
            Password change saved locally — connect auth API to apply.
          </p>
        )}

        <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
          <Input
            label="Current password"
            type="password"
            value={passwordForm.current}
            onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
            required
          />
          <Input
            label="New password"
            type="password"
            value={passwordForm.next}
            onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
            required
          />
          <Input
            label="Confirm new password"
            type="password"
            value={passwordForm.confirm}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
            required
          />
          <Button type="submit" variant="primary">
            Update password
          </Button>
        </form>
      </Surface>

      <Surface className="mb-6 max-w-xl !bg-white">
        <h2 className="text-base font-bold text-[#2E2E2E]">Session</h2>
        <p className="mt-1 text-sm text-[#777777]">
          Sign out of SpatialHunt on this device.
        </p>
        <Link href="/logout" className="mt-4 inline-block">
          <Button variant="secondary">Log out</Button>
        </Link>
      </Surface>

      <Surface className="max-w-xl border-[#F0D9A8] !bg-[#FFF6D9]">
        <h2 className="text-base font-bold text-[#2E2E2E]">Delete account</h2>
        <p className="mt-1 text-sm text-[#777777]">
          Request permanent deletion of your tenant account and associated data. This action
          cannot be undone once processed.
        </p>
        <Button
          variant="danger"
          className="mt-4"
          onClick={() => setDeleteOpen(true)}
        >
          Request account deletion
        </Button>
      </Surface>

      <DeleteConfirmationModal
        open={deleteOpen}
        title="Request account deletion?"
        description="Our team will review your request and confirm by email. Active tenancies or escrow payments may delay deletion."
        confirmLabel="Submit request"
        onConfirm={() => setDeleteOpen(false)}
        onCancel={() => setDeleteOpen(false)}
      />
    </TenantDashboardLayout>
  );
}
