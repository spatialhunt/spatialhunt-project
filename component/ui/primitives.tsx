"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "amber" | "ghost" | "danger";
}) {
  const variants: Record<string, string> = {
    primary: "bg-[#1E5A4F] text-white hover:bg-[#17483F]",
    secondary: "border border-[#DDDDDD] text-[#444444] hover:border-[#1E5A4F]",
    amber: "bg-[#F4B942] text-[#1E5A4F] hover:brightness-95",
    ghost: "text-[#1E5A4F] hover:bg-[#F1F7F5]",
    danger: "bg-[#B42318] text-white hover:brightness-95",
  };
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-[5px] px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  const inputId = id || props.name;
  return (
    <label className="block w-full">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-[#2E2E2E]">{label}</span>
      )}
      <input
        id={inputId}
        className={`w-full rounded-[6px] border border-[#E5E5E5] bg-white px-3 py-2.5 text-sm text-[#2E2E2E] outline-none transition placeholder:text-[#A0A0A0] focus:border-[#1E5A4F] ${error ? "border-[#C58D16]" : ""} ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-[#C58D16]">{error}</span>}
    </label>
  );
}

export function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  const inputId = id || props.name;
  return (
    <label className="block w-full">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-[#2E2E2E]">{label}</span>
      )}
      <textarea
        id={inputId}
        className={`w-full rounded-[6px] border border-[#E5E5E5] bg-white px-3 py-2.5 text-sm text-[#2E2E2E] outline-none transition placeholder:text-[#A0A0A0] focus:border-[#1E5A4F] ${error ? "border-[#C58D16]" : ""} ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-[#C58D16]">{error}</span>}
    </label>
  );
}

export function Select({
  label,
  error,
  children,
  className = "",
  id,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children: ReactNode;
}) {
  const inputId = id || props.name;
  return (
    <label className="block w-full">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-[#2E2E2E]">{label}</span>
      )}
      <select
        id={inputId}
        className={`w-full rounded-[6px] border border-[#E5E5E5] bg-white px-3 py-2.5 text-sm text-[#2E2E2E] outline-none focus:border-[#1E5A4F] ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="mt-1 block text-xs text-[#C58D16]">{error}</span>}
    </label>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-[#2E2E2E] sm:text-2xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#777777]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Surface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
}
