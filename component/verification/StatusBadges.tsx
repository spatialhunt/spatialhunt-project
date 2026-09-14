import type { PropertyStatus, VerificationStatus, BookingStatus, EscrowStatus } from "@/lib/types";

const base =
  "inline-flex items-center rounded-[5px] px-2.5 py-1 text-xs font-semibold whitespace-nowrap";

export function VerificationBadge({ verified = true }: { verified?: boolean }) {
  if (!verified) {
    return (
      <span className={`${base} bg-[#FFF6D9] text-[#C99A20]`}>Pending verification</span>
    );
  }
  return (
    <span className={`${base} bg-[#DDF2E4] text-[#117E25]`}>
      <img src="/grommet-icons_status-good.svg" alt="" className="mr-1 h-3.5 w-3.5" />
      Verified
    </span>
  );
}

export function PropertyStatusBadge({ status }: { status: PropertyStatus }) {
  const map: Record<PropertyStatus, string> = {
    DRAFT: "bg-[#E5E5E5] text-[#555555]",
    PENDING_VERIFICATION: "bg-[#FFF6D9] text-[#C99A20]",
    VERIFIED: "bg-[#DDF2E4] text-[#117E25]",
    REJECTED: "bg-[#FFF6D9] text-[#C58D16]",
    RENTED: "bg-[#EAF3F0] text-[#1E5A4F]",
  };
  const label: Record<PropertyStatus, string> = {
    DRAFT: "Draft",
    PENDING_VERIFICATION: "Pending verification",
    VERIFIED: "Verified",
    REJECTED: "Rejected",
    RENTED: "Rented",
  };
  return <span className={`${base} ${map[status]}`}>{label[status]}</span>;
}

export function VerificationStatusBadge({ status }: { status: VerificationStatus }) {
  const map: Record<VerificationStatus, string> = {
    PENDING: "bg-[#FFF6D9] text-[#C99A20]",
    APPROVED: "bg-[#DDF2E4] text-[#117E25]",
    REJECTED: "bg-[#FFF6D9] text-[#C58D16]",
  };
  return <span className={`${base} ${map[status]}`}>{status}</span>;
}

export function InspectionStatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<BookingStatus, string> = {
    REQUESTED: "bg-[#FFF6D9] text-[#C99A20]",
    CONFIRMED: "bg-[#DDF2E4] text-[#117E25]",
    DECLINED: "bg-[#E5E5E5] text-[#555555]",
    RESCHEDULED: "bg-[#FFF6D9] text-[#C99A20]",
    COMPLETED: "bg-[#EAF3F0] text-[#1E5A4F]",
  };
  const label: Record<BookingStatus, string> = {
    REQUESTED: "Requested",
    CONFIRMED: "Confirmed",
    DECLINED: "Cancelled",
    RESCHEDULED: "Reschedule requested",
    COMPLETED: "Completed",
  };
  return <span className={`${base} ${map[status]}`}>{label[status]}</span>;
}

export function PaymentStatusBadge({ status }: { status: EscrowStatus }) {
  const map: Record<EscrowStatus, string> = {
    PENDING: "bg-[#E5E5E5] text-[#555555]",
    FUNDED: "bg-[#FFF6D9] text-[#C99A20]",
    INSPECTION_CONFIRMED: "bg-[#EAF3F0] text-[#1E5A4F]",
    KEYS_RECEIVED: "bg-[#EAF3F0] text-[#1E5A4F]",
    AGREEMENT_SIGNED: "bg-[#EAF3F0] text-[#1E5A4F]",
    RELEASED: "bg-[#DDF2E4] text-[#117E25]",
    REFUNDED: "bg-[#E5E5E5] text-[#555555]",
    DISPUTED: "bg-[#FFF6D9] text-[#C58D16]",
  };
  const label: Record<EscrowStatus, string> = {
    PENDING: "Not started",
    FUNDED: "Held in escrow",
    INSPECTION_CONFIRMED: "Inspection confirmed",
    KEYS_RECEIVED: "Keys received",
    AGREEMENT_SIGNED: "Move-in confirmed",
    RELEASED: "Released",
    REFUNDED: "Refunded",
    DISPUTED: "Disputed",
  };
  return <span className={`${base} ${map[status]}`}>{label[status]}</span>;
}
