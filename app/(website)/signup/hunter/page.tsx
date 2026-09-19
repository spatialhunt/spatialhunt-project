"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Textarea, Button, Select } from "@/component/ui/Primitives";

const LAGOS_AREAS = [
  "Lekki", "Yaba", "Surulere", "Ikeja", "Victoria Island", "Ikoyi",
  "Ajah", "Gbagada", "Magodo", "Ojodu", "Agege", "Apapa",
];

export default function HunterSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bio: "",
    coverageAreas: [] as string[],
    yearsExperience: "",
    idDocument: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    bio?: string;
    coverageAreas?: string;
    yearsExperience?: string;
    idDocument?: string;
    agreeTerms?: string;
    general?: string;
  }>({});

  function update(field: keyof typeof form, value: string | boolean | string[]) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function toggleArea(area: string) {
    update(
      "coverageAreas",
      form.coverageAreas.includes(area)
        ? form.coverageAreas.filter((a) => a !== area)
        : [...form.coverageAreas, area],
    );
  }

  function validateStep1() {
    const e: typeof errors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: typeof errors = {};
    if (form.coverageAreas.length === 0) e.coverageAreas = "Select at least one area";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3() {
    const e: typeof errors = {};
    if (!form.agreeTerms) e.agreeTerms = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep3()) return;
    setSubmitting(true);
    // TODO: wire to POST /api/auth/signup/hunter
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-4">
        <div className="w-full max-w-md rounded-[12px] border border-[#EEEEEE] bg-white p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">🎉</div>
          <h1 className="text-xl font-bold text-[#2E2E2E]">Application Submitted!</h1>
          <p className="mt-3 text-sm text-[#777777]">
            Thanks for applying to become a SpatialHunt Hunter. Our team will review your
            application and get back to you within 2 business days.
          </p>
          <p className="mt-2 text-sm text-[#777777]">
            We&apos;ll send confirmation to <strong>{form.email}</strong>.
          </p>
          <div className="mt-6 space-y-2">
            <Link href="/" className="block">
              <Button variant="amber" className="w-full">Back to Home</Button>
            </Link>
            <Link href="/login" className="block">
              <Button variant="secondary" className="w-full">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] px-4 py-12">
      <div className="mx-auto max-w-lg">
        {/* header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <p className="text-xl font-bold">
              <span className="text-[#F4B942]">SPATIAL</span>
              <span className="text-[#1E5A4F]">HUNT</span>
            </p>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#2E2E2E]">Become a Hunter</h1>
          <p className="mt-2 text-sm text-[#777777]">
            Connect tenants with verified landlords and earn commission on every successful lease.
          </p>
        </div>

        {/* step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {([1, 2, 3] as const).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  step >= s
                    ? "bg-[#1E5A4F] text-white"
                    : "bg-[#EEEEEE] text-[#777777]"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 w-12 rounded-full transition-colors ${step > s ? "bg-[#1E5A4F]" : "bg-[#EEEEEE]"}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mb-6 flex justify-center gap-12 text-xs text-[#777777]">
          <span className={step >= 1 ? "text-[#1E5A4F] font-semibold" : ""}>Account</span>
          <span className={step >= 2 ? "text-[#1E5A4F] font-semibold" : ""}>Coverage</span>
          <span className={step >= 3 ? "text-[#1E5A4F] font-semibold" : ""}>Review</span>
        </div>

        {/* card */}
        <div className="rounded-[12px] border border-[#EEEEEE] bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* ── Step 1: Account ── */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-[#2E2E2E]">Your Account Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Tunde Adeyemi"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    error={errors.fullName}
                    required
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+234 8xx xxx xxxx"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    error={errors.phone}
                    required
                  />
                </div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    error={errors.password}
                    required
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    error={errors.confirmPassword}
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="amber"
                  className="w-full"
                  onClick={nextStep}
                >
                  Continue →
                </Button>
              </div>
            )}

            {/* ── Step 2: Coverage & Experience ── */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-[#2E2E2E]">Your Hunting Coverage</h2>

                <div>
                  <p className="mb-1.5 block text-sm font-medium text-[#2E2E2E]">
                    Coverage Areas <span className="text-[#777777]">(select all that apply)</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {LAGOS_AREAS.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleArea(area)}
                        className={`rounded-[6px] border px-3 py-1.5 text-xs font-medium transition ${
                          form.coverageAreas.includes(area)
                            ? "border-[#1E5A4F] bg-[#EAF3F0] text-[#1E5A4F]"
                            : "border-[#DDDDDD] text-[#555555] hover:border-[#1E5A4F]"
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                  {errors.coverageAreas && (
                    <p className="mt-1 text-xs text-[#C58D16]">{errors.coverageAreas}</p>
                  )}
                </div>

                <Select
                  label="Years of Experience"
                  value={form.yearsExperience}
                  onChange={(e) => update("yearsExperience", e.target.value)}
                >
                  <option value="">Select range</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-3">1 – 3 years</option>
                  <option value="3-5">3 – 5 years</option>
                  <option value="5+">5+ years</option>
                </Select>

                <Textarea
                  label="Brief Bio"
                  rows={3}
                  value={form.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="Tell us about your experience connecting tenants with landlords…"
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    variant="amber"
                    className="flex-1"
                    onClick={nextStep}
                  >
                    Continue →
                  </Button>
                </div>
              </div>
            )}

            {/* ── Step 3: Review & Agree ── */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-[#2E2E2E]">Review & Submit</h2>

                {/* summary */}
                <div className="rounded-[8px] bg-[#F1F7F5] p-4 text-sm space-y-2">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#777777]">Name</span>
                    <span className="font-medium text-[#2E2E2E]">{form.fullName || "—"}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#777777]">Email</span>
                    <span className="font-medium text-[#2E2E2E]">{form.email || "—"}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#777777]">Phone</span>
                    <span className="font-medium text-[#2E2E2E]">{form.phone || "—"}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#777777]">Coverage</span>
                    <span className="text-right font-medium text-[#2E2E2E]">
                      {form.coverageAreas.length > 0
                        ? form.coverageAreas.join(", ")
                        : "—"}
                    </span>
                  </div>
                  {form.yearsExperience && (
                    <div className="flex justify-between gap-2">
                      <span className="text-[#777777]">Experience</span>
                      <span className="font-medium text-[#2E2E2E]">{form.yearsExperience} years</span>
                    </div>
                  )}
                </div>

                {/* how it works summary */}
                <div className="rounded-[8px] border border-[#EEEEEE] p-4 text-xs text-[#777777] space-y-2">
                  <p className="font-semibold text-[#2E2E2E] text-sm">What happens next?</p>
                  <p>
                    1. Our team reviews your application within 2 business days.
                  </p>
                  <p>
                    2. Once approved, you get access to the Hunter Dashboard to manage leads and
                    browse verified listings.
                  </p>
                  <p>
                    3. Connect tenants to listings, facilitate inspections, and earn{" "}
                    <strong>5% commission</strong> on every successfully closed lease.
                  </p>
                </div>

                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => update("agreeTerms", e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#1E5A4F]"
                  />
                  <span className="text-xs text-[#777777]">
                    I agree to the SpatialHunt{" "}
                    <Link href="/how-it-works" className="text-[#1E5A4F] underline">
                      Terms of Service
                    </Link>{" "}
                    and the Hunter Commission Agreement. I confirm that all information I have
                    provided is accurate.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-xs text-[#C58D16]">{errors.agreeTerms}</p>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setStep(2)}
                  >
                    ← Back
                  </Button>
                  <Button
                    type="submit"
                    variant="amber"
                    className="flex-1"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "Submit Application"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[#777777]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#1E5A4F] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
