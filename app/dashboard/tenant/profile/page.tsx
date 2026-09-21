"use client";

import { useEffect, useState } from "react";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { Button, Input, PageHeader, Surface } from "@/component/ui/Primitives";
import { useAuthSession } from "@/lib/use-auth-session";
import { authHeaders } from "@/lib/auth-client";
import { ApiError } from "@/lib/services/http";

interface ProfileForm {
  fullName: string;
  email:    string;
  phone:    string;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export default function ProfilePage() {
  const session = useAuthSession();

  const [form, setForm]       = useState<ProfileForm>({ fullName: "", email: "", phone: "" });
  const [loaded, setLoaded]   = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);

  // Fetch real profile from API on mount
  useEffect(() => {
    if (!session) return;
    async function load() {
      try {
        const res = await fetch("/api/users/me", { headers: authHeaders() });
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setForm({
          fullName: data.fullName ?? "",
          email:    data.email    ?? "",
          phone:    data.phone    ?? "",
        });
      } catch {
        // Fallback: seed from session so the form is never blank
        setForm({
          fullName: session?.fullName ?? "",
          email:    session?.email    ?? "",
          phone:    "",
        });
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, [session]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSaveState("saving");

    try {
      const res = await fetch("/api/users/me", {
        method:  "PATCH",
        headers: authHeaders(),
        body:    JSON.stringify({
          fullName: form.fullName.trim(),
          phone:    form.phone.trim() || null,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new ApiError(res.status, json.message ?? "Update failed.");
      }

      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch (err) {
      setErrorMsg(
        err instanceof ApiError ? err.message : "Unable to save. Please try again.",
      );
      setSaveState("error");
    }
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Profile"
        description="Your personal details used across SpatialHunt."
      />

      <Surface className="max-w-xl !bg-white">
        {!loaded ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded-lg bg-[#F0F0F0]" />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Full name"
              name="fullName"
              required
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="e.g. Amaka Johnson"
            />

            {/* Email is read-only — changing it requires a separate verified flow */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#2E2E2E]">
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                readOnly
                aria-label="Email address (read-only)"
                className="rounded-lg border border-[#E0E0E0] bg-[#F7F7F7] px-3 py-2.5 text-sm text-[#888] cursor-not-allowed"
              />
              <p className="text-xs text-[#aaa]">
                Email cannot be changed here. Contact support if needed.
              </p>
            </div>

            <Input
              label="Phone number"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="e.g. 0803 000 0000"
            />

            {errorMsg && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {errorMsg}
              </p>
            )}

            {saveState === "saved" && (
              <p className="rounded-lg bg-[#DDF2E4] px-3 py-2 text-sm font-semibold text-[#117E25]">
                ✓ Profile saved successfully.
              </p>
            )}

            <Button
              type="submit"
              variant="amber"
              className="w-full"
              disabled={saveState === "saving"}
            >
              {saveState === "saving" ? "Saving…" : "Save changes"}
            </Button>
          </form>
        )}
      </Surface>
    </TenantDashboardLayout>
  );
}
