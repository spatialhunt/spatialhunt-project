"use client";

import Image from "next/image";
import Link from "next/link";

const enquiries = [
  {
    propertyImage: "/bedroom2.svg",
    propertyName: "2 Bedroom Apartment",
    location: "Surulere, Lagos",
    date: "Enquired on: Aug 18, 2026",
    landlordImage: "/johnson.svg",
    landlord: "Mr. Johnson",
    status: "Awaiting Response",
    statusStyle: "bg-[#FFF6D9] text-[#C99A20]",
    propertyId: "two-bedroom-apartment",
  },
  {
    propertyImage: "/bedroom3.svg",
    propertyName: "3 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    date: "Enquired on: Aug 28, 2026",
    landlordImage: "/Adeyemi.svg",
    landlord: "Mrs. Adeyemi",
    status: "Responded",
    statusStyle: "bg-[#DDF2E4] text-[#378653]",
    propertyId: "three-bedroom-apartment",
  },
  {
    propertyImage: "/miniflat2.svg",
    propertyName: "Mini Flat",
    location: "Yaba, Lagos",
    date: "Enquired on: Aug 20, 2026",
    landlordImage: "/Ibrahim.svg",
    landlord: "Mr. Ibrahim",
    status: "Closed",
    statusStyle: "bg-[#E5E5E5] text-[#555555]",
    propertyId: "mini-flat",
  },
];

export default function EnquiriesSection() {
  return (
    <section className="w-full min-w-0">
      {/* =========================
          TABS
      ========================== */}
      <div className="flex items-center gap-5 overflow-x-auto border-b border-[#E5E5E5] px-1 sm:gap-7">
        <button
          type="button"
          className="
            shrink-0
            border-b-2
            border-[#1E5A4F]
            pb-3
            text-sm
            font-semibold
            text-[#1E5A4F]
            sm:text-base
          "
        >
          My Enquiries
        </button>

        <button
          type="button"
          className="
            shrink-0
            pb-3
            text-sm
            font-medium
            text-[#444444]
            sm:text-base
          "
        >
          My Applications
        </button>

        <button
          type="button"
          className="
            shrink-0
            pb-3
            text-sm
            font-medium
            text-[#444444]
            sm:text-base
          "
        >
          Messages
        </button>
      </div>

      {/* =========================
          ENQUIRY LIST
      ========================== */}
      <div className="w-full">
        {enquiries.map((item, index) => (
          <div
            key={item.propertyId}
            className="
              w-full
              border-b
              border-[#EEEEEE]
              py-4
              sm:py-4
            "
          >
            {/* ==================================================
                DESKTOP / TABLET
            ================================================== */}
            <div
              className="
                hidden
                w-full
                items-center
                gap-2
                sm:flex
                lg:gap-3
              "
            >
              {/* =========================
                  PROPERTY
              ========================== */}
              <div
                className="
                  flex
                  min-w-0
                  flex-1
                  items-center
                  gap-3
                  sm:basis-[39%]
                  lg:basis-[40%]
                "
              >
                <Image
                  src={item.propertyImage}
                  alt={item.propertyName}
                  width={120}
                  height={80}
                  className="
                    h-[68px]
                    w-[96px]
                    shrink-0
                    rounded-md
                    object-cover
                    md:h-[72px]
                    md:w-[105px]
                    lg:w-[110px]
                  "
                />

                <div className="min-w-0">
                  <h3
                    className="
                      truncate
                      text-[16px]
                      font-semibold
                      text-[#2E2E2E]
                      lg:text-[17px]
                    "
                  >
                    {item.propertyName}
                  </h3>

                  <p className="mt-1 truncate text-xs text-[#777777]">
                    {item.location}
                  </p>

                  <p className="mt-1 truncate text-[11px] text-[#999999]">
                    {item.date}
                  </p>
                </div>
              </div>

              {/* =========================
                  LANDLORD

                  "Landlord" ONLY appears
                  on the first row.
              ========================== */}
              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  justify-center
                  sm:w-[20%]
                  lg:w-[19%]
                "
              >
                {index === 0 && (
                  <p
                    className="
                      mb-1
                      text-sm
                      font-medium
                      text-[#777777]
                      lg:text-[15px]
                    "
                  >
                    Landlord
                  </p>
                )}

                {/* Landlord photo + name */}
                <div className="flex min-w-0 items-center gap-2">
                  <Image
                    src={item.landlordImage}
                    alt={item.landlord}
                    width={38}
                    height={38}
                    className="
                      h-9
                      w-9
                      shrink-0
                      rounded-full
                      object-cover
                    "
                  />

                  <div className="min-w-0">
                    {/* LANDLORD NAME */}
                    <div className="flex min-w-0 items-center">
                      <p
                        className="
                          truncate
                          text-[15px]
                          font-semibold
                          text-[#2E2E2E]
                          lg:text-[16px]
                        "
                      >
                        {item.landlord}
                      </p>
                    </div>

                    {/* VERIFIED BADGE */}
                    <div
                      className="
                        mt-1
                        flex
                        w-fit
                        items-center
                        gap-1
                        rounded
                        bg-[#DDF2E4]
                        px-2
                        py-[3px]
                      "
                    >
                      <Image
                        src="/verify.svg"
                        alt=""
                        width={11}
                        height={11}
                        className="h-[11px] w-[11px]"
                      />

                      <span
                        className="
                          text-[9px]
                          font-medium
                          text-[#378653]
                        "
                      >
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================
                  STATUS

                  Status appears on
                  EVERY row.
              ========================== */}
              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  justify-center
                  sm:w-[17%]
                  lg:w-[16%]
                "
              >
                <p
                  className="
                    mb-1
                    text-sm
                    font-medium
                    text-[#777777]
                    lg:text-[15px]
                  "
                >
                  Status
                </p>

                <span
                  className={`
                    w-fit
                    whitespace-nowrap
                    rounded-md
                    px-2
                    py-1
                    text-[10px]
                    font-medium
                    lg:text-[11px]
                    ${item.statusStyle}
                  `}
                >
                  {item.status}
                </span>
              </div>

              {/* =========================
                  VIEW DETAILS
              ========================== */}
              <div className="flex shrink-0 sm:w-[13%]">
                <Link
                  href={`/properties/${item.propertyId}`}
                  className="
                    flex
                    w-fit
                    items-center
                    justify-center
                    whitespace-nowrap
                    rounded-md
                    border
                    border-[#DDDDDD]
                    px-3
                    py-2
                    text-[10px]
                    font-medium
                    text-[#444444]
                    transition-colors
                    hover:border-[#1E5A4F]
                    hover:bg-[#1E5A4F]
                    hover:text-white
                    lg:px-3
                    lg:text-[11px]
                  "
                >
                  View Details
                </Link>
              </div>

              {/* =========================
                  THREE DOTS
              ========================== */}
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  justify-end
                  sm:w-[4%]
                "
              >
                <button
                  type="button"
                  aria-label={`More options for ${item.propertyName}`}
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-md
                    hover:bg-[#F5F5F5]
                  "
                >
                  <Image
                    src="/dots.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px]"
                  />
                </button>
              </div>
            </div>

            {/* ==================================================
                MOBILE
            ================================================== */}
            <div className="flex flex-col gap-4 sm:hidden">
              {/* =========================
                  PROPERTY
              ========================== */}
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={item.propertyImage}
                  alt={item.propertyName}
                  width={120}
                  height={80}
                  className="
                    h-[76px]
                    w-[105px]
                    shrink-0
                    rounded-md
                    object-cover
                  "
                />

                <div className="min-w-0 flex-1">
                  <h3
                    className="
                      text-[16px]
                      font-semibold
                      leading-tight
                      text-[#2E2E2E]
                    "
                  >
                    {item.propertyName}
                  </h3>

                  <p className="mt-1 text-xs text-[#777777]">
                    {item.location}
                  </p>

                  <p className="mt-1 text-[11px] text-[#999999]">
                    {item.date}
                  </p>
                </div>
              </div>

              {/* =========================
                  MOBILE DETAILS
              ========================== */}
              <div
                className="
                  grid
                  w-full
                  grid-cols-[1fr_auto_auto]
                  items-start
                  gap-3
                "
              >
                {/* =========================
                    LANDLORD
                ========================== */}
                <div className="min-w-0">
                  {/* ONLY FIRST ROW */}
                  {index === 0 && (
                    <p
                      className="
                        mb-1
                        text-sm
                        font-medium
                        text-[#777777]
                      "
                    >
                      Landlord
                    </p>
                  )}

                  <div className="flex min-w-0 items-center gap-2">
                    <Image
                      src={item.landlordImage}
                      alt={item.landlord}
                      width={34}
                      height={34}
                      className="
                        h-[34px]
                        w-[34px]
                        shrink-0
                        rounded-full
                        object-cover
                      "
                    />

                    <div className="min-w-0">
                      {/* LANDLORD NAME */}
                      <div className="flex min-w-0 items-center">
                        <p
                          className="
                            truncate
                            text-[14px]
                            font-semibold
                            text-[#2E2E2E]
                          "
                        >
                          {item.landlord}
                        </p>
                      </div>

                      {/* VERIFIED BADGE */}
                      <div
                        className="
                          mt-1
                          flex
                          w-fit
                          items-center
                          gap-1
                          rounded
                          bg-[#DDF2E4]
                          px-2
                          py-[2px]
                        "
                      >
                        <Image
                          src="/verify.svg"
                          alt=""
                          width={10}
                          height={10}
                          className="h-[10px] w-[10px]"
                        />

                        <span
                          className="
                            text-[8px]
                            font-medium
                            text-[#378653]
                          "
                        >
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =========================
                    STATUS

                    ALWAYS SHOW
                ========================== */}
                <div className="shrink-0">
                  <p
                    className="
                      mb-1
                      text-sm
                      font-medium
                      text-[#777777]
                    "
                  >
                    Status
                  </p>

                  <span
                    className={`
                      block
                      w-fit
                      whitespace-nowrap
                      rounded-md
                      px-2
                      py-1
                      text-[9px]
                      font-medium
                      ${item.statusStyle}
                    `}
                  >
                    {item.status}
                  </span>
                </div>

                {/* =========================
                    DOTS
                ========================== */}
                <button
                  type="button"
                  aria-label={`More options for ${item.propertyName}`}
                  className="
                    mt-4
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    hover:bg-[#F5F5F5]
                  "
                >
                  <Image
                    src="/dots.svg"
                    alt=""
                    width={17}
                    height={17}
                    className="h-[17px] w-[17px]"
                  />
                </button>
              </div>

              {/* =========================
                  MOBILE VIEW DETAILS
              ========================== */}
              <Link
                href={`/properties/${item.propertyId}`}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-[#DDDDDD]
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-[#444444]
                  transition-colors
                  hover:border-[#1E5A4F]
                  hover:bg-[#1E5A4F]
                  hover:text-white
                "
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}