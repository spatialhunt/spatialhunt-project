"use client";

import Image from "next/image";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { ApiError } from "@/lib/services/http";
import { Button, Input } from "@/component/ui/Primitives";

export default function VerifyAccountPage() {
  const [code, setCode]       = useState("");
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (code.trim().length < 4) {
      setError("Please enter your verification code.");
      return;
    }
    setLoading(true);
    try {
      await authService.verifyAccount(code.trim());
      setDone(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1E5A4F]/10">
          <svg className="h-8 w-8 text-[#1E5A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-[#2E2E2E]">Account verified!</h1>
        <p className="mt-2 text-sm text-[#777]">
          Your account has been verified. You now have full access to SpatialHunt.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-xl bg-[#F4B940] px-6 py-3 text-sm font-bold text-[#1E5A4F] transition hover:bg-[#e0a830]"
        >
          Continue to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <Image src="/SH-LOGO.svg" alt="SpatialHunt" width={56} height={68} className="mx-auto" unoptimized />
        <h1 className="mt-5 text-2xl font-extrabold text-[#2E2E2E]">Verify your account</h1>
        <p className="mt-2 text-sm text-[#777]">
          Enter the 6-digit code sent to your email or phone number to complete verification.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 shadow-sm"
        noValidate
      >
        <Input
          label="Verification code"
          name="code"
          required
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="6-digit code"
        />

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" variant="amber" className="w-full" disabled={loading}>
          {loading ? "Verifying…" : "Verify account"}
        </Button>

        <p className="text-center text-sm text-[#777]">
          Didn't receive a code?{" "}
          <button type="button" className="font-bold text-[#1E5A4F] hover:underline">
            Resend
          </button>
        </p>
      </form>
    </div>
  );
}
