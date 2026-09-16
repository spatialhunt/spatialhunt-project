import Image from "next/image";

type TrustStat = {
  value: string;
  label: string;
  icon: string;
};

const trustStats: TrustStat[] = [
  {
    value: "10,000+",
    label: "Verified Landlords",
    icon: "/bi_people1.svg",
  },
  {
    value: "25,000+",
    label: "Verified Properties",
    icon: "/ci_house-02.svg",
  },
  {
    value: "50,000+",
    label: "Happy Tenants",
    icon: "/boxicons_happy1.svg",
  },
  {
    value: "15+",
    label: "Cities Covered",
    icon: "/tdesign_secured1.svg",
  },
];

export default function TrustStats() {
  return (
    <section className="w-full px-6 py-8">
      <div className="mx-auto flex max-w-[1340px] flex-col items-stretch rounded-[8px] bg-[#1E5A4F] px-5 py-6 text-white md:flex-row md:items-center md:justify-between md:px-7 md:py-4">

        {/* Trust Message */}
        <div className="flex max-w-none items-center gap-4 md:max-w-[360px]">
          
          {/* Trust Icon */}
          <div className="shrink-0">
            <Image
              src="/ic_outline-gpp-good1.svg"
              alt="Trust"
              width={45}
              height={45}
              className="h-9 w-9 md:h-[45px] md:w-[45px]"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-[13px] font-bold leading-5 md:text-[14px]">
              Trust is our foundation
            </h2>

            <p className="mt-1 text-[10px] leading-[15px] text-white/90">
              Every property, landlord and agent on SpatialHunt is
              thoroughly verified so you rent, list and manage
              with total confidence and trust.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-white/30 md:mx-7 md:my-0 md:h-[55px] md:w-px" />

        {/* Statistics */}
        <div className="grid flex-1 grid-cols-2 gap-y-4 md:grid-cols-4 md:gap-y-0">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3"
            >
              {/* Icon */}
              <div className="shrink-0">
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain md:h-8 md:w-8"
                />
              </div>

              {/* Stat */}
              <div>
                <p className="text-[13px] font-bold leading-5">
                  {stat.value}
                </p>

                <p className="text-[9px] leading-4 text-white/90">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}