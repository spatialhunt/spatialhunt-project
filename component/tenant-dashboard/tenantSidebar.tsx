"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    name: "Saved Properties",
    href: "/dashboard/tenant/saved-properties",
    icon: "/savedproperties.svg",
  },
  {
    name: "My Enquiries",
    href: "/dashboard/tenant/enquiries",
    icon: "/myenquiries.svg",
    badge: "/no3.svg",
  },
  {
    name: "Applications",
    href: "/dashboard/tenant/applications",
    icon: "/application.svg",
    badge: "/no2.svg",
  },
  {
    name: "Messages",
    href: "/dashboard/tenant/messages",
    icon: "/myenquiries.svg",
    badge: "/no2.svg",
  },
  {
    name: "Rent Payments",
    href: "/dashboard/tenant/payments",
    icon: "/payment.svg",
  },
  {
    name: "My Documents",
    href: "/dashboard/tenant/documents",
    icon: "/document.svg",
  },
  {
    name: "Profile Settings",
    href: "/dashboard/tenant/profile",
    icon: "/settings.svg",
  },
  {
    name: "Help & Support",
    href: "/dashboard/tenant/help",
    icon: "/help.svg",
  },
];

export default function TenantSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE MENU BUTTON ================= */}

      <div className="mb-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-lg
            bg-[#1E5A4F]
            px-5
            py-4
            text-white
            transition-all
            duration-200
            hover:bg-[#17483F]
          "
        >
          <span className="text-base font-bold">
            Tenant Dashboard
          </span>

          <span className="text-2xl leading-none">
            {mobileMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          w-full
          overflow-hidden
          rounded-[8px]
          bg-[#1E5A4F]
          transition-all
          duration-300

          md:w-[220px]
          md:min-w-[220px]

          lg:w-[230px]
          lg:min-w-[230px]

          ${
            mobileMenuOpen
              ? "max-h-[1200px] opacity-100"
              : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"
          }
        `}
      >
        <div
          className="
            flex
            min-h-full
            flex-col
            px-3
            py-4

            md:px-4
            md:py-5

            lg:min-h-[680px]
          "
        >

          {/* ================= DASHBOARD TITLE ================= */}

          <div
            className="
              mb-2
              flex
              items-center
              gap-3
              rounded-[6px]
              bg-[#117E2540]
              px-3
              py-4

              md:bg-[#1B6345]

              lg:px-4
              lg:py-4
            "
          >
            <Image
              src="/dashboardlogo.svg"
              alt="Dashboard"
              width={28}
              height={28}
              className="
                h-[24px]
                w-[24px]
                shrink-0

                md:h-[26px]
                md:w-[26px]

                lg:h-[28px]
                lg:w-[28px]
              "
            />

            <span
              className="
                whitespace-nowrap
                text-base
                font-semibold
                text-white

                lg:text-[17px]
              "
            >
              Dashboard
            </span>
          </div>

          {/* ================= NAVIGATION ================= */}

          <nav className="flex flex-col gap-1">

            {sidebarItems.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    group
                    flex
                    items-center
                    gap-3
                    rounded-[6px]
                    px-3
                    py-3
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-[#117E2540]"
                        : "hover:bg-[#117E2540]"
                    }
                  `}
                >

                  {/* ================= ICON ================= */}

                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={22}
                    height={22}
                    className="
                      h-[20px]
                      w-[20px]
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-105

                      md:h-[21px]
                      md:w-[21px]

                      lg:h-[22px]
                      lg:w-[22px]
                    "
                  />

                  {/* ================= TEXT ================= */}

                  <span
                    className={`
                      flex-1
                      whitespace-nowrap
                      text-sm
                      font-medium
                      transition-colors

                      md:text-[15px]

                      ${
                        isActive
                          ? "text-white"
                          : "text-[#D8E4E1]"
                      }
                    `}
                  >
                    {item.name}
                  </span>

                  {/* ================= BADGE ================= */}

                  {item.badge && (
                    <Image
                      src={item.badge}
                      alt="Notification"
                      width={22}
                      height={22}
                      className="
                        h-[19px]
                        w-[19px]
                        shrink-0

                        md:h-[20px]
                        md:w-[20px]
                      "
                    />
                  )}

                </Link>
              );
            })}

            {/* ================= LOG OUT ================= */}

            <button
              type="button"
              onClick={() => {
                console.log("Logging out...");
              }}
              className="
                group
                flex
                items-center
                gap-3
                rounded-[6px]
                px-3
                py-3
                text-left
                transition-all
                duration-200
                hover:bg-[#117E2540]
              "
            >

              <Image
                src="/logout.svg"
                alt="Log out"
                width={22}
                height={22}
                className="
                  h-[20px]
                  w-[20px]
                  shrink-0
                  transition-transform
                  duration-200
                  group-hover:scale-105

                  md:h-[21px]
                  md:w-[21px]

                  lg:h-[22px]
                  lg:w-[22px]
                "
              />

              <span
                className="
                  whitespace-nowrap
                  text-sm
                  font-medium
                  text-[#D8E4E1]

                  md:text-[15px]
                "
              >
                Log Out
              </span>

            </button>

          </nav>

          {/* ================= SPACER ================= */}

          <div className="flex-1" />

          {/* ================= VERIFICATION CARD ================= */}

          <div
            className="
              mt-6
              rounded-[8px]
              bg-[#1B6345]
              px-4
              py-5

              md:px-5
            "
          >

            {/* ================= VERIFIED ICON ================= */}

            <div
              className="
                mb-4
                flex
                w-full
                items-center
                justify-center
              "
            >
              <Image
                src="/gicon.svg"
                alt="Verified"
                width={30}
                height={30}
                className="
                  h-[28px]
                  w-[28px]

                  md:h-[30px]
                  md:w-[30px]
                "
              />
            </div>

            {/* ================= TITLE ================= */}

            <h3
              className="
                text-center
                text-base
                font-semibold
                leading-[23px]
                text-white

                md:text-[17px]
              "
            >
              Verified. Secure.
              <br />
              Stress-Free.
            </h3>

            {/* ================= DESCRIPTION ================= */}

            <p
              className="
                mt-3
                text-center
                text-xs
                leading-[18px]
                text-[#C9D8D4]
              "
            >
              Every property and landlord on SpatialHunt is verified for your peace of mind.
            </p>

            {/* ================= LEARN MORE ================= */}

            <Link
              href="/verification"
              onClick={closeMobileMenu}
              className="
                mt-5
                flex
                h-[36px]
                w-full
                items-center
                justify-center
                rounded-[5px]
                bg-[#F4B942]
                text-sm
                font-semibold
                text-[#1E5A4F]
                transition-all
                duration-200
                hover:scale-[1.02]
                hover:brightness-95
              "
            >
              Learn More
            </Link>

          </div>

        </div>
      </aside>
    </>
  );
}