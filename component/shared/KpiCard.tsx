import type { ReactNode } from "react";

export function KpiCard({
  label,
  value,
  hint,
  demo,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  demo?: boolean;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-[#777777]">{label}</p>
        {demo && (
          <span className="rounded-[4px] bg-[#FFF6D9] px-1.5 py-0.5 text-[10px] font-semibold text-[#C99A20]">
            Demo data
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold text-[#2E2E2E]">{value}</p>
      {hint && <p className="mt-1 text-xs text-[#777777]">{hint}</p>}
      {icon && <div className="mt-2">{icon}</div>}
    </div>
  );
}
