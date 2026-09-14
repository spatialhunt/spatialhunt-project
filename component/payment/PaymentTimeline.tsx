import type { EscrowStatus } from "@/lib/types";

const STEPS: { key: EscrowStatus | "START"; label: string }[] = [
  { key: "START", label: "Payment initiated" },
  { key: "FUNDED", label: "Funds secured" },
  { key: "INSPECTION_CONFIRMED", label: "Property inspected" },
  { key: "KEYS_RECEIVED", label: "Keys received" },
  { key: "AGREEMENT_SIGNED", label: "Tenancy confirmed" },
  { key: "RELEASED", label: "Funds released" },
];

const ORDER: EscrowStatus[] = [
  "PENDING",
  "FUNDED",
  "INSPECTION_CONFIRMED",
  "KEYS_RECEIVED",
  "AGREEMENT_SIGNED",
  "RELEASED",
];

export function PaymentTimeline({ status }: { status: EscrowStatus }) {
  if (status === "REFUNDED" || status === "DISPUTED") {
    return (
      <p className="rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-4 py-3 text-sm text-[#C58D16]">
        This payment is currently <strong>{status.toLowerCase()}</strong>. Support will guide next
        steps. SpatialHunt UI is not itself a licensed escrow provider — provider integration is
        required.
      </p>
    );
  }

  const currentIdx = Math.max(0, ORDER.indexOf(status));

  return (
    <ol className="space-y-3">
      {STEPS.map((step, idx) => {
        const done = idx === 0 ? currentIdx >= 0 : currentIdx >= idx;
        const active = idx === currentIdx || (idx === 0 && status === "PENDING");
        return (
          <li key={step.label} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                done
                  ? "bg-[#1E5A4F] text-white"
                  : "border border-[#DDDDDD] bg-white text-[#8A8A8A]"
              } ${active ? "ring-2 ring-[#F4B942]" : ""}`}
            >
              {idx + 1}
            </span>
            <div>
              <p className={`text-sm font-semibold ${done ? "text-[#2E2E2E]" : "text-[#8A8A8A]"}`}>
                {step.label}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
