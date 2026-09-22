import Link from "next/link";

const benefits = [
  "Thousands of landlords are getting quality, verified tenants with SpatialHunt.",
  "No Middlemen — just direct results.",
  "Secure escrow payments, guaranteed on move-in.",
];

export default function LandLord() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-350 px-5 py-14 md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20">

        {/* Section label */}
        <div className="mb-8 text-left">
          <h2 className="text-xl font-bold text-[#2E2E2E] md:text-2xl">
            ARE YOU A LANDLORD?
          </h2>
          <p className="mt-1 text-base font-bold text-[#1E5A4F]">
            List your Property and get quality tenants faster
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-6">

          {/* Left image */}
          <div className="w-full overflow-hidden rounded-2xl shadow-md lg:w-[36%]">
            <img src="/landlordimg.svg" alt="Landlord smiling" className="h-full w-full object-cover" loading="lazy" />
          </div>

          {/* Centre text */}
          <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-[#E8E8E8] bg-[#F9FDFB] p-8 text-center shadow-sm lg:w-[30%]">
            <p className="text-sm leading-7 text-[#666]">
              Reach thousands of serious and genuine renters looking for their
              next home. List once, get noticed fast!
            </p>
            <Link href="/list-property">
              <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F4B942] px-7 py-3 text-sm font-bold text-[#1E5A4F] shadow-md transition-all duration-200 hover:bg-[#e0a830] hover:shadow-lg active:scale-95">
                List Your Property Now
                <img src="/arrow.svg" alt="" width={16} height={16} loading="lazy" />
              </button>
            </Link>
          </div>

          {/* Right: benefits + image */}
          <div className="flex w-full flex-col gap-5 lg:w-[32%]">

            {/* Benefits card */}
            <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E5A4F]/10">
                  <img src="/why.svg" alt="" width={22} height={22} loading="lazy" />
                </div>
                <h3 className="font-bold text-[#1E5A4F]">Why SpatialHunt?</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-[#555]">
                    <img src="/greengood.svg" alt="✓" width={18} height={18} className="mt-0.5 shrink-0" loading="lazy" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right image */}
            <div className="overflow-hidden rounded-2xl shadow-md">
              <img src="/landlord2.svg" alt="Happy tenants" className="h-auto w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}