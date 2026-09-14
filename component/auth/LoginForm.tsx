"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { authService } from "@/lib/services/auth.service";
import { ApiError } from "@/lib/services/http";
import { Button, Input } from "@/component/ui/primitives";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const session = await authService.login({ email, password });
      if (next) {
        router.push(next);
      } else if (session.role === "LANDLORD") {
        router.push("/landlord/dashboard");
      } else if (session.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard/tenant");
      }
    } catch (err) {
      const message =
        err instanceof ApiError
          ? "Invalid email or password. Please try again."
          : "Unable to sign in right now. Check your connection and try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <img src="/SH-LOGO.svg" alt="" className="mx-auto h-14 w-auto" />
        <h1 className="mt-4 text-2xl font-bold text-[#2E2E2E]">Welcome back</h1>
        <p className="mt-2 text-sm text-[#777777]">
          Sign in to continue to SpatialHunt — verified homes, direct to landlords.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-5 sm:p-6"
        noValidate
      >
        <div className="space-y-4">
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              className="absolute right-3 top-[34px] text-xs font-semibold text-[#1E5A4F]"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-[#C58D16]">
            {error}
          </p>
        )}

        <Button type="submit" variant="amber" className="mt-6 w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        <div className="mt-4 flex flex-col gap-2 text-center text-sm">
          <Link href="/forgot-password" className="font-medium text-[#1E5A4F] hover:underline">
            Forgot password?
          </Link>
          <p className="text-[#777777]">
            New to SpatialHunt?{" "}
            <Link href="/signup" className="font-semibold text-[#1E5A4F] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
