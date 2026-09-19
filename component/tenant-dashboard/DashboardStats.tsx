"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthSession } from "@/lib/use-auth-session";

const stats = [
  { title: "Saved Properties", value: "0", icon: "/savedproperties2.svg", href: "/dashboard/tenant/saved-properties" },
  { title: "Active Enquiries", value: "0", icon: "/enquiries.svg",         href: "/dashboard/tenant/enquiries" },
  { title: "Applications",     value: "0", icon: "/application2.svg",      href: "/dashboard/tenant/applications" },
  { title: "Messages",         value: "0", icon: "/message2.svg",          href: "/dashboard/tenant/messages" },
  { title: "Rent Payments",    value: "0", icon: "/payment2.svg",          href: "/dashboard/tenant/payments" },
];

export default function DashboardStats() {
  const session = useAuthSession();
  const firstName = session?.fullName?.split(" ")[0] ?? "there";
  return (
    <section className="w-full min-w-0">
      {/* ================= WELCOME TEXT ================= */}
      <div className="bg-[#FAFAF8]">
        <div className="mb-4">
        <h1 className="text-lg font-semibold text-[#000000] sm:text-xl">
          Welcome back, {firstName}!
        </h1>

        <p className="mt-1 font-bold text-sm text-[#000000]">
          Here is what is happening with your account today.
        </p>
      </div>

      {/* ================= STATS ================= */}

      <div
        className="
          grid
          w-full
          min-w-0
          grid-cols-2
          overflow-hidden
          rounded-lg
          border
          border-[#EEEEEE]
          bg-[#FAFAF8]
          sm:grid-cols-3
          lg:grid-cols-5
        "
      >
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="
              group
              flex
              min-w-0
              items-center
              gap-2
              px-2.5
              py-3
              transition-all
              duration-200
              hover:bg-[#F8FAF9]
              sm:gap-2.5
              sm:px-3
              lg:px-2.5
              lg:py-3
            "
          >
            {/* ================= ICON ================= */}

            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-md
                bg-[#F3F8F6]
                transition-transform
                duration-200
                group-hover:scale-105
                sm:h-8
                sm:w-8
                lg:h-7
                lg:w-7
              "
            >
              <Image
                src={stat.icon}
                alt={stat.title}
                width={16}
                height={16}
                className="
                  h-6
                  w-6
                  object-contain
                "
              />
            </div>

            {/* ================= TEXT ================= */}

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-[11px]
                  font-medium
                  leading-tight
                  text-[#7A7A7A]
                  sm:text-xs
                  lg:text-[11px]
                "
              >
                {stat.title}
              </p>

              <p
                className="
                  mt-1
                  text-[15px]
                  font-bold
                  leading-none
                  text-[#1E5A4F]
                  sm:text-base
                  lg:text-[15px]
                "
              >
                {stat.value}
              </p>
            </div>
          </Link>
        ))}
      </div>
      </div>
      
    </section>
  );
}