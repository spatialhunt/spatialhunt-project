import Image from "next/image";

const values = [
  "Trust in everything we do.",
  "Transparency in every process.",
  "Simplicity in our solutions.",
  "Security in every transaction.",
  "Sustainability for our communities.",
];

export default function MissionVisionValues() {
  return (
    <section className="w-full px-6 py-8">
      <div className="mx-auto flex max-w-[1340px] flex-col rounded-[10px] border border-[#E1E5E3] bg-[#FCFCFB] px-8 py-8 md:flex-row">

        {/* Our Mission */}
        <div className="flex flex-1 items-center gap-5 border-b border-[#D9DEDC] pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
          <div className="shrink-0">
            <Image
              src="/pajamas_work-item-objective.svg"
              alt="Our Mission"
              width={58}
              height={58}
              className="h-[58px] w-[58px] object-contain"
            />
          </div>

          <div>
            <h2 className="text-[17px] font-bold text-[#1E5A4F]">
              Our Mission
            </h2>

            <p className="mt-1 max-w-[270px] text-[12px] leading-[18px] text-[#333333]">
              To become Africa’s most trusted property connection platform
              by making renting and property management simple, transparent
              and secure.
            </p>
          </div>
        </div>

        {/* Our Vision */}
        <div className="flex flex-1 items-center gap-5 border-b border-[#D9DEDC] py-6 md:border-b-0 md:border-r md:px-8 md:py-0">
          <div className="shrink-0">
            <Image
              src="/vectorT.svg"
              alt="Our Vision"
              width={58}
              height={58}
              className="h-[58px] w-[58px] object-contain"
            />
          </div>

          <div>
            <h2 className="text-[17px] font-bold text-[#1E5A4F]">
              Our Vision
            </h2>

            <p className="mt-1 max-w-[250px] text-[12px] leading-[18px] text-[#333333]">
              A future where everyone can find or manage property with
              confidence and peace of mind.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="flex flex-1 items-center gap-5 pt-6 md:pl-8 md:pt-0">
          <div className="shrink-0">
            <Image
              src="/vector (1).svg"
              alt="Our Values"
              width={58}
              height={58}
              className="h-[58px] w-[58px] object-contain"
            />
          </div>

          <div>
            <h2 className="text-[17px] font-bold text-[#1E5A4F]">
              Our Values
            </h2>

            <ul className="mt-2 space-y-1.5">
              {values.map((value) => (
                <li
                  key={value}
                  className="flex items-center gap-2 text-[11px] leading-4 text-[#333333]"
                >
                  <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-[#1E5A4F] text-[10px] text-[#1E5A4F]">
                    ✓
                  </span>

                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}