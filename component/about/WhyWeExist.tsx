import Image from "next/image";

const problems = [
  "Unverified properties and landlords",
  "Hidden fees and zero transparency",
  "Poor communication",
  "Time wasted with unreliable agents",
];

const solutions = [
  "100% verified properties & landlords",
  "Direct communication, no middleman",
  "Transparent and secure process",
  "Everything you need in one platform",
];

export default function WhyWeExist() {
  return (
    <section className="w-full px-6 py-8">
      <div className="mx-auto grid max-w-[1340px] grid-cols-1 items-center gap-5 lg:grid-cols-[145px_1fr_1fr_1.15fr]">

        {/* Why We Exist */}
        <div>
          <h2 className="text-[12px] font-bold text-[#1E5A4F]">
            Why We Exist
          </h2>

          <p className="mt-2 text-[8px] leading-[12px] text-[#333333]">
            Finding a good home or genuine tenant in Nigeria and Africa
            can be stressful, time-consuming and costly. Hidden fees,
            unverified landlords and unreliable agents have made the
            process difficult for too long.
          </p>
        </div>

        {/* The Problem */}
        <div className="relative h-[94px] bg-[#FDE6E9] px-5 py-4 pr-8">

          {/* Arrow tip */}
          <div className="absolute right-[-22px] top-0 z-10 h-full w-[44px] overflow-hidden">
            <div className="absolute right-[10px] top-1/2 h-[63px] w-[63px] -translate-y-1/2 rotate-45 bg-[#FDE6E9]" />
          </div>

          <div className="relative z-20 flex h-full gap-3">

            
            {/* X Icon */}
            <Image
            src="/hugeicons_multiplication-sign-circle.svg"
            alt="Properties"
            width={35}
            height={35}
            className="flex h-[35px] w-[35px]"
            />

            <div>
              <h3 className="text-[11px] font-bold text-[#1E5A4F]">
                The Problem
              </h3>

              <ul className="mt-1 space-y-[2px]">
                {problems.map((problem) => (
                  <li
                    key={problem}
                    className="text-[7px] leading-[10px] text-[#333333]"
                  >
                    {problem}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Our Solution */}
        <div className="relative h-[94px] bg-[#E5F2E9] px-5 py-4 pr-8">

          {/* Arrow tip */}
          <div className="absolute right-[-22px] top-0 z-10 h-full w-[44px] overflow-hidden">
            <div className="absolute right-[10px] top-1/2 h-[63px] w-[63px] -translate-y-1/2 rotate-45 bg-[#E5F2E9]" />
          </div>

          <div className="relative z-20 flex h-full gap-3">

            {/* Check Icon */}
            <Image
            src="/grommet-icons_status-good.svg"
            alt="Properties"
            width={35}
            height={35}
            className="flex h-[35px] w-[35px]"
            />

            <div>
              <h3 className="text-[11px] font-bold text-[#1E5A4F]">
                Our Solution
              </h3>

              <ul className="mt-1 space-y-[2px]">
                {solutions.map((solution) => (
                  <li
                    key={solution}
                    className="text-[7px] leading-[10px] text-[#333333]"
                  >
                    {solution}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Property Image */}
        <div className="h-[94px] overflow-hidden rounded-[2px]">
          <Image
            src="/spatialhunt_second_thumbnail_original 1.svg"
            alt="Properties"
            width={450}
            height={150}
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}