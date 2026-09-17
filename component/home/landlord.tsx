import Link from "next/link";
import Image from "next/image";

const benefits = [
  "Thousands of landlords are getting quality, verified tenants with SpatialHunt.",
  "No Middlemen — just direct results.",
  "Secure escrow payments, guaranteed on move-in.",
];

export default function LandLord() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 md:px-10 lg:px-16 xl:px-20">

        {/* Section label */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#F4B940]/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#F4B940]">
            Are you a Landlord?
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-[#1E5A4F] md:text-3xl">
            List your Property and get quality tenants faster
          </h2>
        </div>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-6">

          {/* Left image */}
          <div className="w-full overflow-hidden rounded-2xl shadow-md lg:w-[36%]">
            <Image
              src="/landlordimg.svg"
              alt="Landlord smiling"
              width={500}
              height={400}
              className="h-full w-full object-cover"
              unoptimized
            />
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
                <Image src="/arrow.svg" alt="" width={16} height={16} unoptimized />
              </button>
            </Link>
          </div>

          {/* Right: benefits + image */}
          <div className="flex w-full flex-col gap-5 lg:w-[32%]">

            {/* Benefits card */}
            <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E5A4F]/10">
                  <Image src="/why.svg" alt="" width={22} height={22} unoptimized />
                </div>
                <h3 className="font-bold text-[#1E5A4F]">Why SpatialHunt?</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-[#555]">
                    <Image src="/greengood.svg" alt="✓" width={18} height={18} className="mt-0.5 shrink-0" unoptimized />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right image */}
            <div className="overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/landlord2.svg"
                alt="Happy tenants"
                width={480}
                height={200}
                className="h-auto w-full object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
