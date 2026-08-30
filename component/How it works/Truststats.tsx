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
      <div className="mx-auto flex max-w-[1340px] items-center rounded-[8px] bg-[#1E5A4F] px-7 py-4 text-white md:flex-row md:justify-between">

        {/* Trust Message */}
        <div className="flex max-w-[360px] items-center gap-4">
          
          {/* Trust Icon */}
          <div className="shrink-0">
            <Image
              src="/ic_outline-gpp-good1.svg"
              alt="Trust"
              width={45}
              height={45}
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-[14px] font-bold leading-5">
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
        <div className="mx-7 h-[55px] w-px bg-white/30" />

        {/* Statistics */}
        <div className="grid flex-1 grid-cols-4">
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
                  className="h-8 w-8 object-contain"
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