import Link from "next/link";

export default function ListPropertyPage() {
  return (
    <main className="bg-[#FAFAF8]">

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-350 px-5 py-14 text-center md:px-10 lg:px-16 xl:px-20">
          <p className="text-sm font-bold uppercase tracking-widest text-[#1E5A4F]">
            For Landlords
          </p>
          <h1 className="mx-auto mt-4 max-w-180 text-[2rem] font-extrabold leading-tight text-[#2E2E2E] sm:text-[2.6rem]">
            List your property on{" "}
            <span className="text-[#F4B942]">SpatialHunt</span>
          </h1>
          <p className="mx-auto mt-4 max-w-140 text-base leading-7 text-[#555]">
            Reach verified tenants directly — no agents, no hidden fees. Create your landlord
            account, verify your identity and property, and start receiving enquiries today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup/landlord"
              className="inline-flex h-12 min-w-52.5 items-center justify-center rounded-xl bg-[#1E5A4F] px-6 text-sm font-bold text-white shadow-md transition hover:bg-[#17483F] hover:shadow-lg active:scale-95"
            >
              Create landlord account
            </Link>
            <Link
              href="/landlord/verification"
              className="inline-flex h-12 min-w-52.5 items-center justify-center rounded-xl bg-[#F4B942] px-6 text-sm font-bold text-[#1E5A4F] shadow-md transition hover:brightness-95 hover:shadow-lg active:scale-95"
            >
              Start verification
            </Link>
          </div>
        </div>
      </section>

      {/* ── Value props ── */}
      <section className="w-full border-t border-[#EEEEEE] bg-[#FAFAF8]">
        <div className="mx-auto w-full max-w-350 px-5 py-14 md:px-10 lg:px-16 xl:px-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Verified Trust",
                body: "Every landlord and listing goes through a 3-step verification so tenants can rent with confidence.",
              },
              {
                title: "Direct Enquiries",
                body: "Tenants message you in-app. No middlemen, no agents, no commission cut.",
              },
              {
                title: "Secure Payments",
                body: "Escrow-protected rent collection keeps both sides protected through to move-in.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#EEEEEE] bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E5A4F]/10">
                  <span className="text-lg font-bold text-[#1E5A4F]">✓</span>
                </div>
                <h2 className="text-base font-extrabold text-[#1E5A4F]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#777]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Already have an account ── */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-350 px-5 py-12 md:px-10 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-170 rounded-2xl border border-[#EAF3F0] bg-[#F1F7F5] px-8 py-10 text-center">
            <p className="text-base font-bold text-[#1E5A4F]">Already have an account?</p>
            <p className="mt-2 text-sm leading-6 text-[#777]">
              Sign in to your landlord dashboard to manage listings and respond to tenants.
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex items-center justify-center rounded-xl border-2 border-[#1E5A4F] px-6 py-2.5 text-sm font-bold text-[#1E5A4F] transition hover:bg-[#1E5A4F] hover:text-white"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
