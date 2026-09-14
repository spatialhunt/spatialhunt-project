"use client";

import Image from "next/image";
import Link from "next/link";

const activities = [
  {
    icon: "/messages3.svg",
    time: "10 minutes ago",
    href: "/dashboard/tenant/messages",
    content: (
      <>
        You sent a message to{" "}
        <br />
        <span className="font-bold text-[#2E2E2E]">
          Mr. Adewale Johnson
        </span>
      </>
    ),
  },
  {
    icon: "/message4.svg",
    time: "2 hours ago",
    href: "/dashboard/tenant/enquiries",
    content: (
      <>
        You made an enquiry on{" "}
        <br />
        <span className="font-bold text-[#2E2E2E]">
          3 Bedroom Flat, Surulere
        </span>
      </>
    ),
  },
  {
    icon: "/application3.svg",
    time: "1 day ago",
    href: "/dashboard/tenant/applications",
    content: (
      <>
        Your application was viewed by{" "}
        <br />
        <span className="font-bold text-[#2E2E2E]">
          Mr. Adewale Johnson
        </span>
      </>
    ),
  },
  {
    icon: "/saved2.svg",
    time: "3 days ago",
    href: "/dashboard/tenant/saved-properties",
    content: (
      <>
        You saved{" "}
        <br />
        <span className="font-bold text-[#2E2E2E]">
          3 Bedroom Apartment, Lekki
        </span>
      </>
    ),
  },
];

const RecentActivity = () => {
  return (
    <section
      className="
        w-full
        min-w-0
        rounded-[7px]
        border
        border-[#EEEEEE]
        bg-[#FAFAF8]
        p-3
        transition-all
        duration-300

        hover:border-[#E1E8E5]

        sm:p-3.5

        lg:p-3.5

        xl:p-4
      "
    >
      {/* ================= HEADER ================= */}

      <div
        className="
          mb-3
          flex
          items-center
          justify-between

          lg:mb-3.5
        "
      >
        <h2
          className="
            text-[13px]
            font-bold
            tracking-[-0.01em]
            text-[#2E2E2E]

            sm:text-sm

            lg:text-[14px]
          "
        >
          Recent Activity
        </h2>

        <Link
          href="/dashboard/tenant/activity"
          className="
            rounded-sm
            px-1
            text-[9px]
            font-semibold
            text-[#1E5A4F]
            transition-all
            duration-200

            hover:bg-[#EAF3F0]
            hover:text-[#117E25]

            sm:text-[10px]

            lg:text-[10px]
          "
        >
          View all
        </Link>
      </div>

      {/* ================= ACTIVITIES ================= */}

      <div
        className="
          space-y-2.5

          sm:space-y-3

          lg:space-y-3
        "
      >
        {activities.map((activity, index) => (
          <Link
            key={index}
            href={activity.href}
            className="
              group
              flex
              min-w-0
              items-start
              gap-2.5
              rounded-[5px]
              px-1
              py-1
              transition-all
              duration-200

              hover:bg-white
              hover:shadow-[0_2px_8px_rgba(0,0,0,0.03)]

              sm:gap-3

              lg:gap-3
            "
          >
            {/* ================= ICON ================= */}

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F0F7F4]
                transition-all
                duration-300

                group-hover:scale-105
                group-hover:bg-[#E4F1EC]

                sm:h-8.5
                sm:w-8.5

                lg:h-9
                lg:w-9
              "
            >
              <Image
                src={activity.icon}
                alt=""
                width={17}
                height={17}
                className="
                  h-[16px]
                  w-[16px]
                  object-contain
                  transition-transform
                  duration-300

                  group-hover:scale-110

                  sm:h-[17px]
                  sm:w-[17px]

                  lg:h-[17px]
                  lg:w-[17px]
                "
              />
            </div>

            {/* ================= TEXT ================= */}

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[9.5px]
                  font-medium
                  leading-[13px]
                  text-[#2E2E2E]
                  transition-colors
                  duration-200

                  group-hover:text-[#1E5A4F]

                  sm:text-[10px]
                  sm:leading-[14px]

                  lg:text-[10px]
                  lg:leading-[14px]
                "
              >
                {activity.content}
              </p>

              {/* ================= TIME ================= */}

              <p
                className="
                  mt-0.5
                  text-[8px]
                  font-normal
                  leading-[11px]
                  text-[#9A9A9A]

                  sm:text-[8.5px]

                  lg:text-[8.5px]
                "
              >
                {activity.time}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;