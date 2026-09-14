"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { Button, Input } from "@/component/ui/primitives";
import { SuccessState } from "@/component/shared/AppStates";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword("pending-token", password);
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <SuccessState
          title="Password updated"
          description="You can now sign in with your new password."
          action={
            <Link href="/login" className="text-sm font-semibold text-[#1E5A4F] underline">
              Sign in
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-[#2E2E2E]">Reset password</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-5">
        <Input
          label="New password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm password"
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && <p className="text-sm text-[#C58D16]">{error}</p>}
        <Button type="submit" variant="amber" className="w-full" disabled={loading}>
          {loading ? "Updating…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
