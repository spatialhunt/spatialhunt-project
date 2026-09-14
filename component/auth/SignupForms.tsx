"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { ApiError } from "@/lib/services/http";
import type { Role } from "@/lib/types";
import { Button, Input } from "@/component/ui/primitives";

export function SignupRolePicker() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Join SpatialHunt</h1>
        <p className="mt-2 text-sm text-[#777777]">
          Are you looking for a home or listing one?
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/signup/tenant"
          className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-6 transition hover:border-[#1E5A4F]"
        >
          <p className="text-lg font-bold text-[#1E5A4F]">I’m a tenant</p>
          <p className="mt-2 text-sm text-[#777777]">
            Search verified homes, message landlords, and schedule inspections.
          </p>
        </Link>
        <Link
          href="/signup/landlord"
          className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-6 transition hover:border-[#F4B942]"
        >
          <p className="text-lg font-bold text-[#1E5A4F]">I’m a landlord</p>
          <p className="mt-2 text-sm text-[#777777]">
            Verify your identity, list properties, and reach serious tenants.
          </p>
        </Link>
      </div>
      <p className="mt-6 text-center text-sm text-[#777777]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#1E5A4F] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export function SignupForm({ role }: { role: Exclude<Role, "ADMIN"> }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await authService.register({
        email,
        password,
        fullName,
        phone: phone || undefined,
        role,
      });
      router.push(role === "LANDLORD" ? "/landlord/dashboard" : "/dashboard/tenant");
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError("That email is already registered. Try signing in instead.");
      } else {
        setError("Unable to create your account right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#2E2E2E]">
          Create {role === "TENANT" ? "tenant" : "landlord"} account
        </h1>
        <p className="mt-2 text-sm text-[#777777]">
          {role === "TENANT"
            ? "Find verified homes that fit your budget and commute."
            : "Get verified and list with confidence."}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-5 sm:p-6"
      >
        <Input
          label="Full name"
          name="fullName"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Phone (optional)"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 0803 000 0000"
        />
        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-[34px] text-xs font-semibold text-[#1E5A4F]"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <p role="alert" className="text-sm text-[#C58D16]">
            {error}
          </p>
        )}

        <Button type="submit" variant="amber" className="w-full" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>

        <p className="text-center text-sm text-[#777777]">
          Wrong role?{" "}
          <Link href="/signup" className="font-semibold text-[#1E5A4F] hover:underline">
            Choose again
          </Link>
        </p>
      </form>
    </div>
  );
}
