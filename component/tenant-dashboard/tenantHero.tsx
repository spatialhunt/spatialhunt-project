
"use client";

import { useState } from "react";
import Image from "next/image";

const locations = [
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Port Harcourt, Nigeria",
  "Enugu, Nigeria",
  "Ibadan, Nigeria",
  "Kano, Nigeria",
  "Benin City, Nigeria",
];

export default function TenantHero() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Lagos, Nigeria");
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log({
      search,
      location,
    });
  };

  const filteredLocations = locations.filter((item) =>
    item.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const selectLocation = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setLocationOpen(false);
    setLocationSearch("");
  };

  return (
    <header className="relative z-30 w-full border-b border-[#EAEAEA] bg-white">
      <div
        className="
          mx-auto
          flex
          min-h-[72px]
          w-full
          items-center
          gap-3
          px-4
          sm:gap-4
          sm:px-6
          lg:gap-5
          lg:px-8
          xl:px-10
        "
      >
        {/* ================= LOGO ================= */}

        <div className="flex shrink-0 items-center">
          <Image
            src="/SH-LOGO.svg"
            alt="SpatialHunt Logo"
            width={130}
            height={45}
            priority
            className="
              h-auto
              w-[75px]
              xs:w-[85px]
              sm:w-[100px]
              md:w-[110px]
              lg:w-[120px]
              xl:w-[130px]
            "
          />

          <h1 className="hidden font-manrope text-sm font-bold sm:block md:text-base">
            <span className="text-[#F4B942]">SPATIAL</span>
            <span className="text-[#1E5A4F]">HUNT</span>
          </h1>
        </div>

        {/* ================= SEARCH SECTION ================= */}

        <div className="flex min-w-0 flex-1 justify-center">
          <form
            onSubmit={handleSearch}
            className="
              flex
              h-[40px]
              w-full
              min-w-0
              max-w-[520px]
              items-center
              rounded-md
              border
              border-[#E5E5E5]
              bg-white
              px-2
              shadow-sm
              transition
              duration-200
              focus-within:border-[#1E5A4F]
              focus-within:shadow-md
              sm:h-[42px]
              sm:px-3
            "
          >
            {/* Search Icon */}

            <Image
              src="/akar-icons_search.svg"
              alt="Search"
              width={16}
              height={16}
              className="
                mr-1.5
                h-[13px]
                w-[13px]
                shrink-0
                sm:mr-2
                sm:h-[14px]
                sm:w-[14px]
              "
            />

            {/* Search Input */}

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for properties, locations..."
              className="
                min-w-0
                flex-1
                border-none
                bg-transparent
                text-[10px]
                text-[#2E2E2E]
                outline-none
                placeholder:text-[#A0A0A0]
                sm:text-[11px]
                md:text-[12px]
              "
            />

            {/* ================= LOCATION ================= */}

            <div className="relative ml-1 shrink-0 sm:ml-2">
              <button
                type="button"
                onClick={() => setLocationOpen(!locationOpen)}
                className="
                  flex
                  items-center
                  gap-1
                  border-l
                  border-[#EEEEEE]
                  pl-2
                  transition
                  duration-200
                  hover:opacity-70
                  sm:pl-3
                "
              >
                <Image
                  src="/tenantlocation.svg"
                  alt="Location"
                  width={14}
                  height={14}
                  className="
                    h-[12px]
                    w-[12px]
                    shrink-0
                    sm:h-[13px]
                    sm:w-[13px]
                  "
                />

                <span
                  className="
                    hidden
                    max-w-[75px]
                    truncate
                    text-[9px]
                    font-medium
                    text-[#2E2E2E]
                    md:block
                    lg:max-w-[110px]
                    lg:text-[10px]
                  "
                >
                  {location}
                </span>

                <Image
                  src="/dropdown.svg"
                  alt=""
                  width={12}
                  height={12}
                  className={`
                    h-[9px]
                    w-[9px]
                    transition-transform
                    duration-200
                    sm:h-[10px]
                    sm:w-[10px]
                    ${locationOpen ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* ================= LOCATION DROPDOWN ================= */}

              {locationOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-[calc(100%+12px)]
                    z-50
                    w-[240px]
                    overflow-hidden
                    rounded-lg
                    border
                    border-[#E5E5E5]
                    bg-white
                    p-2
                    shadow-xl
                    sm:top-[calc(100%+14px)]
                    sm:w-[280px]
                  "
                >
                  {/* Location Search */}

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      rounded-md
                      border
                      border-[#EAEAEA]
                      px-3
                      py-2
                    "
                  >
                    <Image
                      src="/search.svg"
                      alt="Search"
                      width={14}
                      height={14}
                      className="h-[13px] w-[13px]"
                    />

                    <input
                      type="text"
                      value={locationSearch}
                      onChange={(e) =>
                        setLocationSearch(e.target.value)
                      }
                      placeholder="Search location..."
                      className="
                        w-full
                        bg-transparent
                        text-[11px]
                        outline-none
                        placeholder:text-[#A0A0A0]
                      "
                    />
                  </div>

                  {/* Locations */}

                  <div className="max-h-[260px] overflow-y-auto">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => selectLocation(item)}
                          className={`
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-md
                            px-3
                            py-3
                            text-left
                            text-[11px]
                            transition
                            duration-200
                            hover:bg-[#F7F7F7]

                            ${
                              location === item
                                ? "bg-[#F1F7F5] font-medium text-[#1E5A4F]"
                                : "text-[#2E2E2E]"
                            }
                          `}
                        >
                          <Image
                            src="/tenantlocation.svg"
                            alt=""
                            width={14}
                            height={14}
                            className="h-[13px] w-[13px]"
                          />

                          <span className="flex-1">
                            {item}
                          </span>

                          {location === item && (
                            <span className="font-semibold">
                              ✓
                            </span>
                          )}
                        </button>
                      ))
                    ) : (
                      <p
                        className="
                          px-3
                          py-5
                          text-center
                          text-[11px]
                          text-[#8A8A8A]
                        "
                      >
                        No location found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* ================= RIGHT ACTIONS ================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1
            sm:gap-2
            md:gap-3
            lg:gap-4
          "
        >
          {/* ================= MESSAGE ================= */}

          <button
            type="button"
            aria-label="Messages"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              transition
              duration-200
              hover:bg-[#F7F7F7]
              hover:scale-105
              active:scale-95
              sm:h-9
              sm:w-9
            "
          >
            <Image
              src="/tenantmessage.svg"
              alt=""
              width={24}
              height={24}
              className="
                h-[21px]
                w-[21px]
                sm:h-[25px]
                sm:w-[25px]
                md:h-[28px]
                md:w-[28px]
              "
            />
          </button>

          {/* ================= NOTIFICATION ================= */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              transition
              duration-200
              hover:bg-[#F7F7F7]
              hover:scale-105
              active:scale-95
              sm:h-9
              sm:w-9
            "
          >
            <Image
              src="/notification.svg"
              alt=""
              width={24}
              height={24}
              className="
                h-[21px]
                w-[21px]
                sm:h-[25px]
                sm:w-[25px]
                md:h-[28px]
                md:w-[28px]
              "
            />
          </button>

          {/* ================= USER ================= */}

          <button
            type="button"
            className="
              flex
              items-center
              gap-1.5
              rounded-lg
              py-1
              transition
              duration-200
              hover:opacity-80
              sm:gap-2
            "
          >
            {/* Avatar */}

            <Image
              src="/tunde.svg"
              alt="Tunde Adeyemi"
              width={38}
              height={38}
              className="
                h-[29px]
                w-[29px]
                rounded-full
                object-cover
                sm:h-[34px]
                sm:w-[34px]
                md:h-[36px]
                md:w-[36px]
              "
            />

            {/* ================= USER INFORMATION ================= */}

            <div
              className="
                hidden
                flex-col
                items-start
                lg:flex
              "
            >
              <div className="flex items-center gap-1">
                <span
                  className="
                    text-[11px]
                    font-semibold
                    tracking-[0.01em]
                    text-[#2E2E2E]
                  "
                >
                  Tunde A.
                </span>

                <Image
                  src="/verify.svg"
                  alt="Verified"
                  width={13}
                  height={13}
                  className="h-[12px] w-[12px] shrink-0"
                />
              </div>

              <span
                className="
                  mt-[1px]
                  text-[9px]
                  font-medium
                  tracking-wide
                  text-[#1E5A4F]
                "
              >
                Verified Tenant
              </span>
            </div>

            {/* Profile Dropdown */}

            <Image
              src="/dropdown.svg"
              alt="Open profile menu"
              width={12}
              height={12}
              className="
                hidden
                h-[10px]
                w-[10px]
                transition-transform
                duration-200
                lg:block
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
}
