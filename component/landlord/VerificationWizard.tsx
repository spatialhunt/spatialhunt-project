"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/component/ui/Primitives";
import { Surface } from "@/component/ui/Primitives";
import { apiFetch, ApiError } from "@/lib/services/http";
import { propertyService } from "@/lib/services/property.service";
import { maskNin } from "@/mocks";
import { SuccessState } from "@/component/shared/AppStates";
import type { Property, Verification, VerificationType } from "@/lib/types";

const STEPS = ["Identity", "Property authority", "Walkthrough", "Review", "Result"] as const;

type SubmitError = { message: string; network: boolean };

function isUrl(value: string): boolean {
  try {
    new URL(value.trim());
    return true;
  } catch {
    return false;
  }
}

/** Turns any thrown error into something the person can actually read. */
function readError(err: unknown): SubmitError {
  if (err instanceof ApiError) {
    const body = err.body as { message?: unknown } | string | null;
    const raw = body && typeof body === "object" ? body.message : undefined;

    // Zod failures can arrive as an array of issues
    if (Array.isArray(raw)) {
      const text = raw
        .map((issue) => {
          if (issue && typeof issue === "object" && "message" in issue) {
            const i = issue as { message?: unknown; path?: unknown };
            const field = Array.isArray(i.path) && i.path.length ? `${i.path.join(".")}: ` : "";
            return `${field}${String(i.message)}`;
          }
          return String(issue);
        })
        .join("; ");
      return { message: text, network: false };
    }
    return { message: err.message, network: false };
  }
  // Not an ApiError = fetch itself failed (offline, DNS, blocked)
  return { message: "", network: true };
}

async function postVerification(payload: {
  type: VerificationType;
  documentUrl: string;
  propertyId?: string;
}): Promise<void> {
  try {
    await apiFetch<Verification>(
      "/api/verifications",
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  } catch (err) {
    // 409 = an identical verification is already pending, so treat it as done
    if (err instanceof ApiError && err.status === 409) return;
    throw err;
  }
}

export function VerificationWizard({ rejected }: { rejected?: boolean }) {
  const [step, setStep] = useState(0);
  const [nin, setNin] = useState("");
  const [consent, setConsent] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const [idSubmitted, setIdSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [errorInfo, setErrorInfo] = useState<SubmitError | null>(null);

  // Load the landlord's listings (for the walkthrough picker) and any
  // identity verification they've already submitted (so we never duplicate it).
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [propsRes, verRes] = await Promise.allSettled([
        propertyService.getMine(),
        apiFetch<Verification[]>("/api/verifications/mine", {}, true),
      ]);
      if (cancelled) return;

      if (propsRes.status === "fulfilled" && Array.isArray(propsRes.value)) {
        setProperties(propsRes.value);
        if (propsRes.value.length === 1) {
          setPropertyId((prev) => prev || propsRes.value[0].id);
        }
      }
      if (verRes.status === "fulfilled" && Array.isArray(verRes.value)) {
        setIdSubmitted(
          verRes.value.some((v) => v.type === "LANDLORD_ID" && v.status !== "REJECTED"),
        );
      }
      setLoadingProps(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const needsId = !idSubmitted;
  const wantsWalkthrough = videoUrl.trim() !== "";
  const docOk = !needsId || isUrl(docUrl);
  const videoOk = !wantsWalkthrough || (isUrl(videoUrl) && propertyId !== "");
  const canSubmit = !submitting && (needsId || wantsWalkthrough) && docOk && videoOk;

  const continueDisabled =
    (step === 0 && needsId && (!consent || nin.length < 11)) ||
    (step === 2 && wantsWalkthrough && (!isUrl(videoUrl) || propertyId === ""));

  const selectedProperty = properties.find((p) => p.id === propertyId);

  async function submit() {
    setSubmitting(true);
    setErrorInfo(null);
    try {
      // TODO: wire dedicated NIN verification endpoint — never persist NIN client-side
      if (needsId) {
        await postVerification({ type: "LANDLORD_ID", documentUrl: docUrl.trim() });
        setIdSubmitted(true);
      }
      if (wantsWalkthrough) {
        await postVerification({
          type: "PROPERTY_WALKTHROUGH",
          documentUrl: videoUrl.trim(),
          propertyId,
        });
      }
      setResult("success");
      setStep(4);
    } catch (err) {
      setErrorInfo(readError(err));
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
            {idSubmitted && (
              <p className="rounded-[7px] bg-[#EAF3F0] px-3 py-2 text-sm text-[#1E5A4F]">
                Your identity verification is already submitted. You can continue to add a
                property walkthrough.
              </p>
            )}
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
          <div className="space-y-2">
            <Input
              label="Property authority document URL"
              placeholder="https://example.com/ownership-proof.pdf"
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
            />
            {docUrl.trim() !== "" && !isUrl(docUrl) && (
              <p className="text-xs text-[#B42318]">
                Enter a full link, starting with https://
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                label="Walkthrough video URL (optional)"
                placeholder="https://example.com/property-walkthrough.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              {wantsWalkthrough && !isUrl(videoUrl) && (
                <p className="text-xs text-[#B42318]">
                  Enter a full link, starting with https://
                </p>
              )}
            </div>

            {wantsWalkthrough &&
              (loadingProps ? (
                <p className="text-sm text-[#777777]">Loading your listings…</p>
              ) : properties.length === 0 ? (
                <p className="text-sm text-[#C58D16]">
                  A walkthrough has to be attached to a listing, and you don&apos;t have one yet.{" "}
                  <Link href="/landlord/listings/new" className="font-semibold underline">
                    Create a listing
                  </Link>{" "}
                  first, or clear the video link to continue without it.
                </p>
              ) : (
                <div>
                  <label
                    htmlFor="walkthrough-property"
                    className="mb-1.5 block text-sm font-medium text-[#2E2E2E]"
                  >
                    Which property is this video for?
                  </label>
                  <select
                    id="walkthrough-property"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    className="h-11 w-full rounded-[7px] border border-[#D9D9D9] bg-white px-3 text-sm text-[#2E2E2E] outline-none focus-visible:ring-2 focus-visible:ring-[#1E5A4F]"
                  >
                    <option value="">Select a property</option>
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} — {p.city}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3 text-sm text-[#2E2E2E]">
            <p><strong>NIN:</strong> {nin ? maskNin(nin) : "Not provided"}</p>
            <p>
              <strong>Authority doc:</strong>{" "}
              {idSubmitted ? "Already submitted" : docUrl || "—"}
            </p>
            <p><strong>Walkthrough:</strong> {videoUrl || "—"}</p>
            {wantsWalkthrough && (
              <p><strong>Property:</strong> {selectedProperty?.title ?? "—"}</p>
            )}
          </div>
        )}

        {step === 4 &&
          (result === "error" ? (
            <div className="space-y-3">
              <p className="font-semibold text-[#C58D16]">
                {errorInfo?.network ? "Could not reach verification API" : "Submission failed"}
              </p>
              <p className="text-sm text-[#777777]">
                {errorInfo?.network
                  ? "Your details were not sent to the server. Check your connection and sign-in, then try again."
                  : errorInfo?.message || "Something went wrong. Please try again."}
              </p>
              {idSubmitted && !errorInfo?.network && (
                <p className="text-sm text-[#1E5A4F]">
                  Your identity verification was received. Trying again will only resend what is
                  missing.
                </p>
              )}
              <p className="text-xs text-[#999999]">
                NIN is cleared from this form and is never stored in browser storage.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setResult(null);
                  setErrorInfo(null);
                  setStep(3);
                }}
              >
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
          ))}

        {step < 4 && (
          <div className="mt-6 flex justify-between gap-3">
            <Button variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
            {step < 3 ? (
              <Button
                variant="primary"
                disabled={continueDisabled}
                onClick={() => setStep((s) => s + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button variant="primary" disabled={!canSubmit} onClick={() => void submit()}>
                {submitting ? "Submitting…" : "Submit verification"}
              </Button>
            )}
          </div>
        )}
      </Surface>
    </div>
  );
}