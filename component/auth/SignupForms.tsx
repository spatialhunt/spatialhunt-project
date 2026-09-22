"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { ApiError } from "@/lib/services/http";
import type { Role } from "@/lib/types";
import { Button, Input } from "@/component/ui/Primitives";

/* ─────────────────────────────────────────────
   Role Picker  (/signup)
───────────────────────────────────────────── */
export function SignupRolePicker() {
  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-[#2E2E2E]">Join SpatialHunt</h1>
        <p className="mt-2 text-sm text-[#777]">
          Are you looking for a home or listing one?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/signup/tenant"
          className="group rounded-2xl border-2 border-[#E8E8E8] bg-white p-6 shadow-sm transition-all hover:border-[#1E5A4F] hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E5A4F]/10 transition group-hover:bg-[#1E5A4F]/20">
            <Image src="/akar-icons_person-add.svg" alt="" width={24} height={24} unoptimized />
          </div>
          <p className="text-lg font-extrabold text-[#1E5A4F]">I&apos;m a tenant</p>
          <p className="mt-2 text-sm leading-6 text-[#777]">
            Search verified homes, message landlords directly, and schedule inspections — no agents, no fees.
          </p>
        </Link>

        <Link
          href="/signup/landlord"
          className="group rounded-2xl border-2 border-[#E8E8E8] bg-white p-6 shadow-sm transition-all hover:border-[#F4B940] hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B940]/15 transition group-hover:bg-[#F4B940]/25">
            <Image src="/ci_house-01.svg" alt="" width={24} height={24} unoptimized />
          </div>
          <p className="text-lg font-extrabold text-[#1E5A4F]">I&apos;m a landlord</p>
          <p className="mt-2 text-sm leading-6 text-[#777]">
            Get verified, list your property, and connect directly with serious tenants. No commission to agents.
          </p>
        </Link>
      </div>

      <p className="mt-6 text-center text-sm text-[#777]">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-[#1E5A4F] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Signup Form  (/signup/tenant | /signup/landlord)
───────────────────────────────────────────── */
export function SignupForm({ role }: { role: Exclude<Role, "ADMIN"> }) {
  const router = useRouter();
  const isTenant = role === "TENANT";

  const [fullName, setFullName]         = useState("");
  const [email, setEmail]               = useState("");
  const [phone, setPhone]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [loading, setLoading]           = useState(false);

  const passwordOk =
    password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!passwordOk) {
      setError("Password must be at least 8 characters, include an uppercase letter and a number.");
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        phone: phone.trim() || undefined,
        role,
      });
      router.push(isTenant ? "/dashboard/tenant" : "/landlord/dashboard");
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          err.status === 409
            ? "That email is already registered. Try signing in instead."
            : err.status === 400
            ? err.message
            : err.status === 500
            ? "Something went wrong on our end. Please try again."
            : err.message,
        );
      } else {
        setError("Unable to create your account right now. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-[#2E2E2E]">
          Create {isTenant ? "tenant" : "landlord"} account
        </h1>
        <p className="mt-2 text-sm text-[#777]">
          {isTenant
            ? "Find verified homes that fit your budget and commute."
            : "Get verified and start reaching serious tenants today."}
        </p>
      </div>

      {/* Form card */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-[#E0E0E0] bg-white p-8 shadow-lg"
        noValidate
      >
        <Input
          label="Full name"
          name="fullName"
          required
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Amaka Johnson"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />
        <Input
          label="Phone (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 0803 000 0000"
        />

        {/* Password */}
        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
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

        {/* Password strength checklist */}
        {password.length > 0 && (
          <ul className="space-y-1 text-xs">
            {[
              { ok: password.length >= 8,    text: "At least 8 characters" },
              { ok: /[A-Z]/.test(password),  text: "One uppercase letter" },
              { ok: /[0-9]/.test(password),  text: "One number" },
            ].map(({ ok, text }) => (
              <li key={text} className={`flex items-center gap-2 ${ok ? "text-[#1E5A4F]" : "text-[#bbb]"}`}>
                {ok ? "✓" : "○"} {text}
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" variant="amber" className="h-12 w-full rounded-xl text-base font-bold" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>

        <p className="text-center text-sm text-[#777]">
          Wrong role?{" "}
          <Link href="/signup" className="font-bold text-[#1E5A4F] hover:underline">
            Choose again
          </Link>
        </p>
      </form>

      {/* PRD note: landlords go through identity verification after account creation */}
      {!isTenant && (
        <p className="mt-4 text-center text-xs text-[#999]">
          After creating your account, you&apos;ll be guided through identity verification before
          your first listing goes live.
        </p>
      )}
    </div>
  );
}
