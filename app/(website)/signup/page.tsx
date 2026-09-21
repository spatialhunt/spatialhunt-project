import { SignupRolePicker } from "@/component/auth/SignupForms";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-70px)]">
      <aside className="hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-between bg-[#1E5A4F] p-16">
        <div>
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Join thousands<br />renting smarter<br />
            <span className="text-[#F4B940]">with SpatialHunt.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Create your free account in under 2 minutes. Find or list verified
            properties — no agents, no hidden fees.
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {["Verified landlords only", "Escrow-protected payments", "Direct tenant–landlord chat"].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4B940]/20 text-sm font-bold text-[#F4B940]">✓</span>
              <span className="text-sm font-semibold text-white/85">{t}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-white/40">Join 2,000+ renters &amp; landlords on SpatialHunt</p>
      </aside>

      <div className="flex flex-1 items-center justify-center bg-white px-6 py-14 sm:px-10">
        <div className="w-full max-w-lg">
          <SignupRolePicker />
        </div>
      </div>
    </div>
  );
}
