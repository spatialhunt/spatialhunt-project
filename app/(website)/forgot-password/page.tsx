"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { Button, Input } from "@/component/ui/Primitives";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.requestPasswordReset(email.trim());
      setSent(true);
    } catch {
      // Always show success — prevents email enumeration
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1E5A4F]/10">
          <svg className="h-8 w-8 text-[#1E5A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-[#2E2E2E]">Check your email</h1>
        <p className="mt-2 text-sm leading-6 text-[#777]">
          If an account exists for <span className="font-semibold text-[#2E2E2E]">{email}</span>,
          we've sent a password reset link. Check your inbox and spam folder.
        </p>
        <p className="mt-4 text-xs text-[#aaa]">Didn't receive it? The link expires in 1 hour.</p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={() => { setSent(false); }}
            className="text-sm font-semibold text-[#1E5A4F] hover:underline"
          >
            Try a different email
          </button>
          <Link href="/login" className="text-sm text-[#777] hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-[#2E2E2E]">Forgot your password?</h1>
        <p className="mt-2 text-sm text-[#777]">
          Enter the email address on your SpatialHunt account and we'll send you a reset link.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 shadow-sm"
        noValidate
      >
        <Input
          label="Email address"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" variant="amber" className="w-full" disabled={loading}>
          {loading ? "Sending reset link…" : "Send reset link"}
        </Button>

        <p className="text-center text-sm text-[#777]">
          Remembered it?{" "}
          <Link href="/login" className="font-bold text-[#1E5A4F] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
