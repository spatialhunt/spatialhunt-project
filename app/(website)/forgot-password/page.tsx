"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { Button, Input } from "@/component/ui/primitives";
import { SuccessState } from "@/component/shared/AppStates";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <SuccessState
          title="Check your email"
          description="If an account exists for that address, password reset instructions will arrive shortly. (Backend hookup pending.)"
          action={
            <Link href="/login" className="text-sm font-semibold text-[#1E5A4F] underline">
              Back to sign in
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-[#2E2E2E]">Forgot password</h1>
      <p className="mt-2 text-sm text-[#777777]">
        Enter your email and we’ll send reset instructions when the mail service is connected.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-5">
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="amber" className="w-full" disabled={loading}>
          {loading ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </div>
  );
}
