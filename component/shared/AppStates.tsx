import type { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function LoadingState({
  title = "Loading…",
  description = "Please wait a moment.",
  className = "",
}: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] px-6 py-12 text-center ${className}`}
    >
      <div className="mb-4 h-8 w-8 animate-pulse rounded-full bg-[#1E5A4F]/30" />
      <p className="text-base font-semibold text-[#2E2E2E]">{title}</p>
      <p className="mt-1 text-sm text-[#777777]">{description}</p>
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[8px] border border-dashed border-[#DDDDDD] bg-[#FAFAF8] px-6 py-12 text-center ${className}`}
    >
      <p className="text-base font-semibold text-[#2E2E2E]">{title}</p>
      {description && <p className="mt-2 max-w-md text-sm text-[#777777]">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn’t complete that request. Please try again.",
  action,
  className = "",
}: Props) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center rounded-[8px] border border-[#F0D9A8] bg-[#FFF6D9] px-6 py-10 text-center ${className}`}
    >
      <p className="text-base font-semibold text-[#2E2E2E]">{title}</p>
      <p className="mt-2 max-w-md text-sm text-[#777777]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function UnauthorizedState({
  title = "You don’t have access",
  description = "This area requires a different account role. Sign in with the correct account or return home.",
  action,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[8px] border border-[#EEEEEE] bg-white px-6 py-12 text-center ${className}`}
    >
      <p className="text-base font-semibold text-[#2E2E2E]">{title}</p>
      <p className="mt-2 max-w-md text-sm text-[#777777]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function NotFoundState({
  title = "Page not found",
  description = "The page you’re looking for doesn’t exist or has moved.",
  action,
  className = "",
}: Props) {
  return (
    <EmptyState title={title} description={description} action={action} className={className} />
  );
}

export function NetworkErrorState({
  title = "Connection problem",
  description = "Check your internet connection and try again.",
  action,
  className = "",
}: Props) {
  return (
    <ErrorState title={title} description={description} action={action} className={className} />
  );
}

export function SuccessState({
  title = "Done",
  description,
  action,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[8px] border border-[#DDF2E4] bg-[#F0F7F4] px-6 py-10 text-center ${className}`}
    >
      <p className="text-base font-semibold text-[#117E25]">{title}</p>
      {description && <p className="mt-2 max-w-md text-sm text-[#777777]">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function VerificationPendingState({
  title = "Verification in progress",
  description = "We’re reviewing your submission. You’ll be notified when it’s complete.",
  action,
}: Props) {
  return (
    <div className="rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-5 py-6">
      <p className="font-semibold text-[#C99A20]">{title}</p>
      <p className="mt-1 text-sm text-[#777777]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function VerificationRejectedState({
  title = "Verification needs attention",
  description = "Some details couldn’t be approved. Review the notes and resubmit.",
  action,
}: Props) {
  return (
    <div className="rounded-[8px] border border-[#F0D9A8] bg-[#FFF6D9] px-5 py-6">
      <p className="font-semibold text-[#C58D16]">{title}</p>
      <p className="mt-1 text-sm text-[#777777]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-[#EAEAEA] ${className}`} />;
}
