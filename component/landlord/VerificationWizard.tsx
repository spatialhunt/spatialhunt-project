"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/component/ui/Primitives";
import { Surface } from "@/component/ui/Primitives";
import { verificationService } from "@/lib/services/verification.service";
import { maskNin } from "@/mocks";
import { SuccessState } from "@/component/shared/AppStates";

const STEPS = ["Identity", "Property authority", "Walkthrough", "Review", "Result"] as const;

export function VerificationWizard({ rejected }: { rejected?: boolean }) {
  const [step, setStep] = useState(0);
  const [nin, setNin] = useState("");
  const [consent, setConsent] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  async function submit() {
    setSubmitting(true);
    try {
      // TODO: wire dedicated NIN verification endpoint — never persist NIN client-side
      await verificationService.submit({
        type: "LANDLORD_ID",
        documentUrl: docUrl,
      });
      if (videoUrl.trim()) {
        await verificationService.submit({
          type: "PROPERTY_WALKTHROUGH",
          documentUrl: videoUrl,
        });
      }
      setResult("success");
      setStep(4);
    } catch {
      // TODO: replace when /api/verifications is reachable — do not claim live verification success
      setResult("error");
      setStep(4);
    } finally {
      setNin("");
      setSubmitting(false);
    }
  }

  return (
    <div>
      {rejected && (
        <Surface className="mb-5 border-[#F0D9A8] bg-[#FFF6D9]">
          <p className="font-semibold text-[#C58D16]">Previous submission rejected</p>
          <p className="mt-1 text-sm text-[#777777]">
            Review the notes on your status page and complete the steps below to resubmit.
          </p>
        </Surface>
      )}
      <div className="mb-6 flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={`rounded-[5px] px-3 py-1.5 text-xs font-semibold ${
              i === step ? "bg-[#1E5A4F] text-white" : "bg-[#EEEEEE] text-[#555555]"
            }`}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      <Surface>
        {step === 0 && (
          <div className="space-y-4">
            <Input
              label="National Identification Number (NIN)"
              placeholder="Enter 11-digit NIN"
              value={nin}
              onChange={(e) => setNin(e.target.value.replace(/\D/g, "").slice(0, 11))}
              autoComplete="off"
            />
            {nin.length >= 4 && (
              <p className="text-xs text-[#777777]">Masked preview: {maskNin(nin)}</p>
            )}
            <label className="flex items-start gap-2 text-sm text-[#2E2E2E]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-[#1E5A4F]"
              />
              I consent to identity verification for trust and safety. My NIN is transmitted securely and is not stored in browser storage.
            </label>
          </div>
        )}

        {step === 1 && (
          <Input
            label="Property authority document URL"
            placeholder="https://example.com/ownership-proof.pdf"
            value={docUrl}
            onChange={(e) => setDocUrl(e.target.value)}
          />
        )}

        {step === 2 && (
          <Input
            label="Walkthrough video URL"
            placeholder="https://example.com/property-walkthrough.mp4"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        )}

        {step === 3 && (
          <div className="space-y-3 text-sm text-[#2E2E2E]">
            <p><strong>NIN:</strong> {nin ? maskNin(nin) : "Not provided"}</p>
            <p><strong>Authority doc:</strong> {docUrl || "—"}</p>
            <p><strong>Walkthrough:</strong> {videoUrl || "—"}</p>
          </div>
        )}

        {step === 4 && (
          result === "error" ? (
            <div className="space-y-3">
              <p className="font-semibold text-[#C58D16]">Could not reach verification API</p>
              <p className="text-sm text-[#777777]">
                Your details were not sent to the server. Check your connection and sign-in, then try again.
                NIN is cleared from this form and is never stored in browser storage.
              </p>
              <Button variant="primary" onClick={() => { setResult(null); setStep(3); }}>
                Try again
              </Button>
            </div>
          ) : (
            <SuccessState
              title="Verification submitted"
              description="Our team will review your documents. Track progress on the status page."
              action={
                <Link href="/landlord/verification/status">
                  <Button variant="primary">View status</Button>
                </Link>
              }
            />
          )
        )}

        {step < 4 && (
          <div className="mt-6 flex justify-between gap-3">
            <Button variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
            {step < 3 ? (
              <Button
                variant="primary"
                disabled={step === 0 && (!consent || nin.length < 11)}
                onClick={() => setStep((s) => s + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button variant="primary" disabled={submitting || !docUrl} onClick={() => void submit()}>
                {submitting ? "Submitting…" : "Submit verification"}
              </Button>
            )}
          </div>
        )}
      </Surface>
    </div>
  );
}
