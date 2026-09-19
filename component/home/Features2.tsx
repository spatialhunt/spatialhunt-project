const stats = [
  { icon: "/bi_people.svg",            value: "2,000+", label: "Happy Renters" },
  { icon: "/verifyproperty.svg",       value: "500+",   label: "Verified Properties" },
  { icon: "/ic_outline-gpp-good.svg",  value: "100%",   label: "Verified Landlords" },
  { icon: "/fa_handshake-o.svg",       value: "Zero",   label: "No Middlemen" },
];

export default function Features2() {
  return (
    <section className="bg-[#1E5A4F]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 md:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">

          {/* Left */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <img src="/gicon.svg" alt="verified" width={36} height={36} loading="lazy" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                  We verify so you can trust us
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Every landlord and property on SpatialHunt goes through a strict
                  3-step verification — government ID, proof of ownership, and a
                  live video walkthrough. We cannot afford to get it wrong.
                </p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-5 text-center backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4B940]/20">
                    <img src={s.icon} alt="" width={22} height={22} loading="lazy" />
                  </div>
                  <span className="text-xl font-extrabold text-[#F4B940]">{s.value}</span>
                  <span className="text-xs font-semibold text-white/70">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
            <img
              src="/feature2img.svg"
              alt="Verification process"
              className="h-auto w-full max-w-[440px] lg:max-w-[520px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
