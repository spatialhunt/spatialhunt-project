"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { Button, Input } from "@/component/ui/primitives";
import { SuccessState } from "@/component/shared/AppStates";

export default function VerifyAccountPage() {
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyAccount(code);
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <SuccessState
          title="Account verified"
          description="Your email/phone verification is recorded. Backend confirmation will plug in here."
          action={
            <Link href="/login" className="text-sm font-semibold text-[#1E5A4F] underline">
              Continue to sign in
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-[#2E2E2E]">Verify your account</h1>
      <p className="mt-2 text-sm text-[#777777]">
        Enter the code sent to your email or phone. Delivery is pending backend integration.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-5">
        <Input
          label="Verification code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6-digit code"
        />
        <Button type="submit" variant="amber" className="w-full" disabled={loading}>
          {loading ? "Verifying…" : "Verify"}
        </Button>
      </form>
    </div>
  );
}
