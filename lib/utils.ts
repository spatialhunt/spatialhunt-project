/**
 * Shared utility helpers for SpatialHunt.
 * Import from "@/lib/utils" — NOT from "@/mocks".
 */

/** Format a number or numeric string as Nigerian Naira. */
export function formatNaira(amount: number | string): string {
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (Number.isNaN(n)) return "₦—";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Format an ISO date string for display. Falls back to "—" for null/undefined. */
export function formatDate(
  iso?: string | null,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  },
): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-NG", options);
  } catch {
    return "—";
  }
}

/** Format a relative time string ("2 hours ago", "just now", etc.). */
export function timeAgo(iso?: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

/** Truncate a string to a given length, appending "…" if cut. */
export function truncate(str: string, max: number): string {
  return str.length <= max ? str : str.slice(0, max - 1) + "…";
}

/** Capitalise the first letter of a string. */
export function capitalise(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
