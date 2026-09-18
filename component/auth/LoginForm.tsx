"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { ApiError } from "@/lib/services/http";
import { Button, Input } from "@/component/ui/Primitives";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [loading, setLoading]           = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const session = await authService.login({ email: email.trim(), password });
      const destination =
        next ||
        (session.role === "LANDLORD" ? "/landlord/dashboard" :
         session.role === "ADMIN"    ? "/admin/dashboard"    :
                                       "/dashboard/tenant");
      router.push(destination);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          err.status === 401
            ? "Invalid email or password. Please try again."
            : err.status === 500
            ? "Something went wrong on our end. Please try again in a moment."
            : err.message,
        );
      } else {
        setError("Unable to sign in. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">

      {/* Logo + headline */}
      <div className="mb-8 text-center">
        <Image src="/SH-LOGO.svg" alt="SpatialHunt" width={56} height={68} className="mx-auto" unoptimized />
        <h1 className="mt-5 text-2xl font-extrabold text-[#2E2E2E]">Welcome back</h1>
        <p className="mt-2 text-sm text-[#777]">
          Sign in to continue to SpatialHunt — verified homes, direct to landlords.
        </p>
      </div>

      {/* Form card */}
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 shadow-sm"
        noValidate
      >
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />

        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-[34px] text-xs font-semibold text-[#1E5A4F]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" variant="amber" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        <div className="flex flex-col items-center gap-2 pt-1 text-sm">
          <Link href="/forgot-password" className="font-medium text-[#1E5A4F] hover:underline">
            Forgot password?
          </Link>
          <p className="text-[#777]">
            New to SpatialHunt?{" "}
            <Link href="/signup" className="font-bold text-[#1E5A4F] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
