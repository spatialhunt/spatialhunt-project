"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader, Surface, Input, Button } from "@/component/ui/Primitives";
import { clearSession } from "@/lib/auth-client";

export default function HunterSettingsPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your hunter account preferences."
      />

      <div className="space-y-5 max-w-xl">
        <Surface>
          <h2 className="mb-4 font-semibold text-[#2E2E2E]">Notification Preferences</h2>
          <form onSubmit={handleSave} className="space-y-3">
            {[
              { label: "New match commissions", defaultChecked: true },
              { label: "Tenant enquiry activity", defaultChecked: true },
              { label: "Escrow & payment updates", defaultChecked: true },
              { label: "Platform updates & news", defaultChecked: false },
            ].map((pref) => (
              <label
                key={pref.label}
                className="flex items-center justify-between rounded-[6px] border border-[#EEEEEE] bg-white px-3 py-2.5 cursor-pointer"
              >
                <span className="text-sm text-[#2E2E2E]">{pref.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={pref.defaultChecked}
                  className="h-4 w-4 accent-[#1E5A4F]"
                />
              </label>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="amber">Save Preferences</Button>
              {saved && <span className="text-sm font-medium text-[#117E25]">✅ Saved</span>}
            </div>
          </form>
        </Surface>

        <Surface>
          <h2 className="mb-4 font-semibold text-[#2E2E2E]">Bank Account for Payouts</h2>
          <div className="space-y-3">
            <Input label="Bank Name" placeholder="e.g. Access Bank" />
            <Input label="Account Number" placeholder="10-digit account number" maxLength={10} />
            <Input label="Account Name" placeholder="As it appears on your bank statement" />
            <Button variant="primary">Save Bank Details</Button>
          </div>
        </Surface>

        <Surface>
          <h2 className="mb-3 font-semibold text-[#2E2E2E]">Danger Zone</h2>
          <p className="mb-3 text-sm text-[#777777]">
            Signing out will clear your session. Your account and data remain intact.
          </p>
          <Button
            variant="danger"
            onClick={() => {
              clearSession();
              router.push("/login");
            }}
          >
            Sign out
          </Button>
        </Surface>
      </div>
    </div>
  );
}
