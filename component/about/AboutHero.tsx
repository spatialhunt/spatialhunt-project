import Image from "next/image";

const features = [
  {
    icon: "/vector 1.svg",
    title: "Verified Properties",
    subtitle: "and Landlords",
  },
  {
    icon: "/Group1.svg",
    title: "Direct Communication",
    subtitle: "No Agents",
  },
  {
    icon: "/uil_padlock.svg",
    title: "Secure Payments",
    subtitle: "and Documents",
  },
  {
    icon: "/akar_leaf.svg",
    title: "Built for",
    subtitle: "Sustainability",
  },
];

export default function AboutHero() {
  return (
    <section className="w-full px-6 py-8">
      <div className="mx-auto grid max-w-[1340px] grid-cols-1 items-center gap-10 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div>
          {/* Small Heading */}
          <p className="text-[16px] font-bold uppercase text-[#1E5A4F]">
            About SpatialHunt
          </p>

          {/* Main Heading */}
          <h1 className="mt-5 max-w-[570px] text-[40px] font-bold leading-[1.15] text-[#333333]">
            We are building a better way to rent and manage properties{" "}
            <span className="text-[#F4B942]">
              in Africa.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[560px] text-[14px] leading-[21px] text-[#555555]">
            SpatialHunt connects tenants and landlords on one trusted
            platform. We remove middlemen, promote transparency and make
            renting simple, secure and stress-free for everyone.
          </p>

          {/* Features */}
          <div className="mt-7 grid grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />

                {/* Feature Text */}
                <p className="mt-3 text-[11px] font-semibold leading-4 text-[#1E5A4F]">
                  {feature.title}
                  <br />
                  {feature.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <Image
            src="/file_65 1.svg"
            alt="People using SpatialHunt"
            width={650}
            height={320}
            className="h-[320px] w-full rounded-[8px] object-cover"
          />

          {/* Mission Card */}
          <div className="absolute -bottom-1 left-0 w-[270px] rounded-[8px] bg-[#1E5A4F] px-4 py-3 text-white shadow-md">
            <p className="text-[10px] leading-4">
              <span className="text-[#F4B942]">“</span>
              <br />
              Our mission is simple:
            </p>

            <p className="text-[11px] font-bold leading-4 text-[#F4B942]">
              Trust. Transparency. Zero Stress.
            </p>

            <p className="text-[9px] leading-4 text-white">
              Better renting. Better homes. Better Africa.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}