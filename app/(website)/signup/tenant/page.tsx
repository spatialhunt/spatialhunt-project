import { SignupForm } from "@/component/auth/SignupForms";

export default function SignupTenantPage() {
  return (
    <div className="flex min-h-[calc(100vh-70px)]">
      <aside className="hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-between bg-[#1E5A4F] p-16">
        <div>
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Find your next home<br />without the stress.<br />
            <span className="text-[#F4B940]">Verified. Direct. Safe.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Browse verified listings, message landlords directly, and pay securely
            through escrow — no agents, no inspection fees.
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {["No non-refundable inspection fees", "Video-verified listings only", "Escrow-protected deposit"].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4B940]/20 text-sm font-bold text-[#F4B940]">✓</span>
              <span className="text-sm font-semibold text-white/85">{t}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-white/40">Join 2,000+ renters &amp; landlords on SpatialHunt</p>
      </aside>

      <div className="flex flex-1 items-center justify-center bg-white px-6 py-14 sm:px-10">
        <div className="w-full max-w-sm">
          <SignupForm role="TENANT" />
        </div>
      </div>
    </div>
  );
}
