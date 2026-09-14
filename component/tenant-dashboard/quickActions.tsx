"use client";

import Image from "next/image";
import Link from "next/link";

const quickActions = [
  {
    title: "Find a Home",
    icon: "/home.svg",
    href: "/properties",
  },
  {
    title: "List Your Property",
    icon: "/listproperty.svg",
    href: "/listproperty",
  },
  {
    title: "Chat with Landlord",
    icon: "/enquiries.svg",
    href: "/dashboard/tenant/messages",
  },
  {
    title: "Help & Support",
    icon: "/help2.svg",
    href: "/dashboard/tenant/help",
  },
];

const QuickActions = () => {
  return (
    <section
      className="
        w-full
        min-w-0
        rounded-[7px]
        border
        border-[#EEEEEE]
        bg-[#FAFAF8]
        p-3.5
        transition-all
        duration-300
        hover:border-[#E1E8E5]
        sm:p-4
        lg:p-4.5
        xl:p-5
      "
    >
      {/* ================= HEADER ================= */}

      <h2
        className="
          mb-4
          text-[13px]
          font-bold
          tracking-[-0.01em]
          text-[#2E2E2E]
          sm:text-sm
          lg:text-[15px]
        "
      >
        Quick Actions
      </h2>

      {/* ================= ACTION GRID ================= */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:gap-4
          lg:gap-x-5
          lg:gap-y-5
        "
      >
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="
              group
              flex
              min-w-0
              flex-col
              items-center
              justify-center
              rounded-[7px]
              px-2
              py-2.5
              text-center
              transition-all
              duration-200
              hover:bg-white
              hover:shadow-[0_3px_10px_rgba(0,0,0,0.04)]
              active:scale-[0.97]
            "
          >
            {/* ================= ICON ================= */}

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#F0F7F4]
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:bg-[#E4F1EC]
                group-hover:shadow-[0_3px_8px_rgba(30,90,79,0.10)]
                sm:h-10
                sm:w-10
              "
            >
              <Image
                src={action.icon}
                alt={action.title}
                width={20}
                height={20}
                className="
                  h-[18px]
                  w-[18px]
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  sm:h-5
                  sm:w-5
                "
              />
            </div>

            {/* ================= TEXT ================= */}

            <span
              className="
                mt-2
                whitespace-nowrap
                text-[8.5px]
                font-bold
                leading-tight
                text-[#4A4A4A]
                transition-all
                duration-200
                group-hover:text-[#1E5A4F]
                sm:text-[9px]
                lg:text-[9.5px]
              "
            >
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;