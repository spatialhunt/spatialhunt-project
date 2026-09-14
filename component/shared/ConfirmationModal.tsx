"use client";

import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "danger";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
};

export function ConfirmationModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  loading,
  onConfirm,
  onCancel,
  children,
}: Props) {
  if (!open) return null;

  const confirmClass =
    tone === "danger"
      ? "bg-[#B42318] text-white hover:brightness-95"
      : "bg-[#1E5A4F] text-white hover:bg-[#17483F]";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="w-full max-w-md rounded-[8px] bg-white p-6 shadow-lg">
        <h2 id="confirm-title" className="text-lg font-bold text-[#2E2E2E]">
          {title}
        </h2>
        {description && <p className="mt-2 text-sm text-[#777777]">{description}</p>}
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-[5px] border border-[#DDDDDD] px-4 py-2 text-sm font-semibold text-[#444444] hover:border-[#1E5A4F]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-[5px] px-4 py-2 text-sm font-semibold disabled:opacity-60 ${confirmClass}`}
          >
            {loading ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteConfirmationModal(
  props: Omit<Props, "tone" | "confirmLabel" | "title"> & { title?: string; confirmLabel?: string },
) {
  return (
    <ConfirmationModal
      {...props}
      title={props.title ?? "Delete this item?"}
      confirmLabel={props.confirmLabel ?? "Delete"}
      tone="danger"
    />
  );
}

export function UnsavedChangesModal(
  props: Omit<Props, "title" | "description" | "confirmLabel"> & {
    title?: string;
    description?: string;
  },
) {
  return (
    <ConfirmationModal
      {...props}
      title={props.title ?? "Unsaved changes"}
      description={
        props.description ?? "You have unsaved changes. Leave this page anyway?"
      }
      confirmLabel="Leave"
      tone="danger"
    />
  );
}
