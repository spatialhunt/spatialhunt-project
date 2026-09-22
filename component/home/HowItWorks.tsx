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
      <div className="mx-auto w-full max-w-350 px-5 py-14 md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20">

        <div className="mb-10 text-center md:text-left">
          <p className="text-sm font-bold uppercase tracking-widest text-[#F4B940]">
            HOW IT WORKS
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
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
                className="relative flex flex-1 flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.08] p-6"
              >
                <span className="absolute -top-3 left-5 rounded-full bg-[#F4B940] px-2.5 py-0.5 text-xs font-extrabold text-[#1E5A4F]">
                  {s.step}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <img src={s.icon} alt={s.title} width={26} height={26} loading="lazy" />
                </div>
                <h3 className="text-base font-bold text-[#F4B940]">{s.title}</h3>
                <p className="text-sm leading-6 text-white/75">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Why SpatialHunt */}
          <div className="flex flex-col gap-6 lg:w-[42%] lg:flex-row">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.08] p-6">
              <h3 className="mb-5 text-lg font-bold text-[#F4B940]">Why SpatialHunt?</h3>
              <ul className="flex flex-col gap-4">
                {why.map((w) => (
                  <li key={w} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4B940]/20">
                      <img src="/goodicon.svg" alt="✓" width={14} height={14} loading="lazy" />
                    </span>
                    <span className="text-sm font-semibold text-white">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden items-end lg:flex lg:w-40 lg:shrink-0">
              <img src="/house.svg" alt="house" className="h-auto w-full opacity-80" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}