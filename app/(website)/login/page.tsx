import { Suspense } from "react";
import LoginForm from "@/component/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-70px)]">

      {/* ── Left brand panel ── desktop only ── */}
      <aside className="hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-between bg-[#1E5A4F] p-16">
        <div>
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Verified Homes.<br />
            Direct To Landlord.<br />
            <span className="text-[#F4B940]">Zero Stress.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Every landlord and listing is verified before it reaches a tenant.
            No agents, no inflated fees, no fraud.
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {["100% Verified Landlords", "Secure Escrow Payments", "Direct Communication"].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4B940]/20 text-sm font-bold text-[#F4B940]">
                ✓
              </span>
              <span className="text-sm font-semibold text-white/85">{t}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs text-white/40">
          Join 2,000+ renters &amp; landlords on SpatialHunt
        </p>
      </aside>

      {/* ── Right form panel ── */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-14 sm:px-10">
        <div className="w-full max-w-sm">
          <Suspense fallback={<p className="text-sm text-[#777]">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

    </div>
  );
}
