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

// Right-pointing arrow/chevron card shape, traced from the Figma export
// (Group_384.svg). preserveAspectRatio="none" stretches it to fill any
// card size, so it stays correct at every breakpoint.
function ArrowShapeBg({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 362 125"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M0 9.51C0 4.26 4.26 0 9.51 0H298.6C301.12 0 303.54 1 305.33 2.79L358.13 55.59C361.85 59.3 361.85 65.33 358.13 69.04L305.33 121.85C303.54 123.63 301.12 124.63 298.6 124.63H9.51C4.26 124.63 0 120.37 0 115.12V9.51Z"
        fill={fill}
      />
    </svg>
  );
}

export default function WhyWeExist() {
  return (
    <section className="w-full px-6 py-8">
      <div className="mx-auto grid max-w-[1340px] grid-cols-1 gap-5 lg:grid-cols-[145px_1fr_1fr_1.15fr] lg:items-center">

        {/* Why We Exist */}
        <div>
          <h2 className="text-[15px] font-bold text-[#1E5A4F] lg:text-[12px]">
            Why We Exist
          </h2>

          <p className="mt-2 text-[11px] leading-[16px] text-[#333333] lg:text-[8px] lg:leading-[12px]">
            Finding a good home or genuine tenant in Nigeria and Africa
            can be stressful, time-consuming and costly. Hidden fees,
            unverified landlords and unreliable agents have made the
            process difficult for too long.
          </p>
        </div>

        {/* The Problem */}
        <div className="relative rounded-xl bg-[#FDE6E9] px-5 py-4 lg:h-[94px] lg:rounded-none lg:bg-transparent lg:pr-10">

          {/* Arrow shape — only meaningful once cards sit in a row */}
          <div className="hidden lg:block">
            <ArrowShapeBg fill="#FDE6E9" />
          </div>

          <div className="relative z-10 flex gap-3">
            <Image
              src="/hugeicons_multiplication-sign-circle.svg"
              alt="Problem icon"
              width={35}
              height={35}
              className="h-[35px] w-[35px] shrink-0"
            />

            <div>
              <h3 className="text-[13px] font-bold text-[#1E5A4F] lg:text-[11px]">
                The Problem
              </h3>

              <ul className="mt-1 space-y-[3px] lg:space-y-[2px]">
                {problems.map((problem) => (
                  <li
                    key={problem}
                    className="text-[10px] leading-[14px] text-[#333333] lg:text-[7px] lg:leading-[10px]"
                  >
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Our Solution */}
        <div className="relative rounded-xl bg-[#E5F2E9] px-5 py-4 lg:h-[94px] lg:rounded-none lg:bg-transparent lg:pr-10">

          <div className="hidden lg:block">
            <ArrowShapeBg fill="#E5F2E9" />
          </div>

          <div className="relative z-10 flex gap-3">
            <Image
              src="/grommet-icons_status-good.svg"
              alt="Solution icon"
              width={35}
              height={35}
              className="h-[35px] w-[35px] shrink-0"
            />

            <div>
              <h3 className="text-[13px] font-bold text-[#1E5A4F] lg:text-[11px]">
                Our Solution
              </h3>

              <ul className="mt-1 space-y-[3px] lg:space-y-[2px]">
                {solutions.map((solution) => (
                  <li
                    key={solution}
                    className="text-[10px] leading-[14px] text-[#333333] lg:text-[7px] lg:leading-[10px]"
                  >
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Property Image */}
        <div className="h-[160px] overflow-hidden rounded-[8px] lg:h-[94px] lg:rounded-[2px]">
          <Image
            src="/spatialhunt_second_thumbnail_original 1.svg"
            alt="Property showcase"
            width={450}
            height={150}
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}