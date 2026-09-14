import Link from "next/link";

export default function ListPropertyPage() {
  return (
    <main className="bg-[#FAFAF8]">
      <section className="w-full px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#1E5A4F]">
            For landlords
          </p>
          <h1 className="mt-4 text-[32px] font-bold leading-tight text-[#2E2E2E] sm:text-[40px]">
            List your property on{" "}
            <span className="text-[#F4B942]">SpatialHunt</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-relaxed text-[#555555] sm:text-base">
            Reach verified tenants directly — no agents, no hidden fees. Create your landlord
            account, verify your identity and property, and start receiving enquiries today.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup/landlord"
              className="inline-flex h-11 min-w-[200px] items-center justify-center rounded-[5px] bg-[#1E5A4F] px-6 text-sm font-semibold text-white transition hover:bg-[#17483F]"
            >
              Create landlord account
            </Link>
            <Link
              href="/landlord/verification"
              className="inline-flex h-11 min-w-[200px] items-center justify-center rounded-[5px] bg-[#F4B942] px-6 text-sm font-semibold text-[#1E5A4F] transition hover:brightness-95"
            >
              Start verification
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEEEEE] bg-white px-6 py-12">
        <div className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-3">
          {[
            {
              title: "Verified trust",
              body: "Every landlord and listing goes through verification so tenants can rent with confidence.",
            },
            {
              title: "Direct enquiries",
              body: "Tenants message you in-app. No middlemen taking a cut of your rent.",
            },
            {
              title: "Secure payments",
              body: "Optional escrow-protected rent collection keeps both sides protected through move-in.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-5"
            >
              <h2 className="text-base font-bold text-[#1E5A4F]">{item.title}</h2>
              <p className="mt-2 text-sm text-[#777777]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-[700px] rounded-[8px] border border-[#EAF3F0] bg-[#F1F7F5] px-6 py-8 text-center">
          <p className="text-sm font-semibold text-[#1E5A4F]">Already have an account?</p>
          <p className="mt-2 text-sm text-[#777777]">
            Sign in to your landlord dashboard to manage listings and respond to tenants.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-flex items-center justify-center rounded-[5px] border border-[#1E5A4F] px-5 py-2.5 text-sm font-semibold text-[#1E5A4F] transition hover:bg-[#1E5A4F] hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
