"use client";

import { Suspense, FormEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authService } from "@/lib/services/auth.service";
import { ApiError } from "@/lib/services/http";
import { Button, Input } from "@/component/ui/primitives";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  // Invalid link — no token in URL
  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <Image src="/SH-LOGO.svg" alt="" width={56} height={68} className="mx-auto" unoptimized />
        <h1 className="mt-6 text-2xl font-bold text-[#2E2E2E]">Invalid reset link</h1>
        <p className="mt-2 text-sm text-[#777]">
          This password reset link is missing or has expired.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 inline-block rounded-xl bg-[#F4B940] px-6 py-3 text-sm font-bold text-[#1E5A4F] transition hover:bg-[#e0a830]"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1E5A4F]/10">
          <svg className="h-8 w-8 text-[#1E5A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-5 text-2xl font-bold text-[#2E2E2E]">Password updated</h1>
        <p className="mt-2 text-sm text-[#777]">
          Your password has been changed. You can now sign in with your new password.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-xl bg-[#F4B940] px-6 py-3 text-sm font-bold text-[#1E5A4F] transition hover:bg-[#e0a830]"
        >
          Sign in
        </Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(token!, password);
      setDone(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to reset password right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <Image src="/SH-LOGO.svg" alt="" width={56} height={68} className="mx-auto" unoptimized />
        <h1 className="mt-5 text-2xl font-bold text-[#2E2E2E]">Set a new password</h1>
        <p className="mt-2 text-sm text-[#777]">
          Choose a strong password for your SpatialHunt account.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 shadow-sm"
        noValidate
      >
        {/* Password */}
        <div className="relative">
          <Input
            label="New password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-[34px] text-xs font-semibold text-[#1E5A4F]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm */}
        <Input
          label="Confirm new password"
          name="confirm"
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter password"
        />

        {/* Password strength hints */}
        <ul className="space-y-1 text-xs text-[#888]">
          {[
            { ok: password.length >= 8,     text: "At least 8 characters" },
            { ok: /[A-Z]/.test(password),   text: "One uppercase letter" },
            { ok: /[0-9]/.test(password),   text: "One number" },
            { ok: password === confirm && confirm.length > 0, text: "Passwords match" },
          ].map(({ ok, text }) => (
            <li key={text} className={`flex items-center gap-2 ${ok ? "text-[#1E5A4F]" : "text-[#aaa]"}`}>
              <span>{ok ? "✓" : "○"}</span> {text}
            </li>
          ))}
        </ul>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" variant="amber" className="w-full" disabled={loading}>
          {loading ? "Updating password…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-[#777]">Loading…</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
