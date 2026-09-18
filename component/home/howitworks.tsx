import Image from "next/image";

const steps = [
  {
    icon: "/searchicon.svg",
    step: "01",
    title: "Search / List",
    desc: "Search verified properties or list your property in minutes with our simple guided flow.",
  },
  {
    icon: "/messageicon.svg",
    step: "02",
    title: "Connect",
    desc: "Chat directly with landlords or tenants inside the app — no middlemen, no stress.",
  },
  {
    icon: "/dealicon.svg",
    step: "03",
    title: "Close the Deal",
    desc: "Schedule inspection, make secure escrow payment, move in or get your verified tenant.",
  },
];

const why = [
  "100% Verified Landlords",
  "Direct Communication",
  "Transparent & Secure",
  "Built for Sustainability",
];

export default function HowItWorks() {
  return (
    <section className="bg-[#1E5A4F]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 md:px-10 lg:px-16 xl:px-20">

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#F4B940]">
            How It Works
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
            Find or list your property in{" "}
            <span className="text-[#F4B940]">3 simple steps</span>
          </h2>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">

          {/* Steps */}
          <div className="flex flex-col gap-8 sm:flex-row lg:w-[56%]">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative flex flex-1 flex-col gap-3 rounded-2xl bg-white/8 border border-white/10 p-6"
              >
                <span className="absolute -top-3 left-5 rounded-full bg-[#F4B940] px-2.5 py-0.5 text-xs font-extrabold text-[#1E5A4F]">
                  {s.step}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <Image src={s.icon} alt={s.title} width={26} height={26} unoptimized />
                </div>
                <h3 className="text-base font-bold text-[#F4B940]">{s.title}</h3>
                <p className="text-sm leading-6 text-white/75">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Why SpatialHunt */}
          <div className="flex flex-col gap-6 lg:w-[42%] lg:flex-row">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/8 p-6">
              <h3 className="mb-5 text-lg font-bold text-[#F4B940]">Why SpatialHunt?</h3>
              <ul className="flex flex-col gap-4">
                {why.map((w) => (
                  <li key={w} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4B940]/20">
                      <Image src="/goodicon.svg" alt="✓" width={14} height={14} unoptimized />
                    </span>
                    <span className="text-sm font-semibold text-white">{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* House illustration */}
            <div className="hidden items-end lg:flex lg:w-[160px] lg:shrink-0">
              <Image src="/house.svg" alt="house" width={160} height={200} className="h-auto w-full opacity-80" unoptimized />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
