"use client";

import Image from "next/image";
import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { PageHeader } from "@/component/ui/primitives";

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

export default function EnquiriesPage() {
  return (
    <TenantDashboardLayout>
      <PageHeader
        title="My Enquiries"
        description="Track messages and responses from landlords about properties you've asked about."
      />

      <section className="w-full min-w-0 rounded-[8px] border border-[#EEEEEE] bg-white">
        <div className="flex items-center gap-5 overflow-x-auto border-b border-[#E5E5E5] px-4 pt-2 sm:gap-7">
          <span className="shrink-0 border-b-2 border-[#1E5A4F] pb-3 text-sm font-semibold text-[#1E5A4F] sm:text-base">
            My Enquiries
          </span>
          <Link
            href="/dashboard/tenant/applications"
            className="shrink-0 pb-3 text-sm font-medium text-[#444444] sm:text-base"
          >
            My Applications
          </Link>
          <Link
            href="/dashboard/tenant/messages"
            className="shrink-0 pb-3 text-sm font-medium text-[#444444] sm:text-base"
          >
            Messages
          </Link>
        </div>

        <div className="w-full px-2 sm:px-4">
          {enquiries.map((item, index) => (
            <div key={item.propertyId} className="w-full border-b border-[#EEEEEE] py-4">
              <div className="hidden w-full items-center gap-2 sm:flex lg:gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3 sm:basis-[39%] lg:basis-[40%]">
                  <Image
                    src={item.propertyImage}
                    alt={item.propertyName}
                    width={120}
                    height={80}
                    className="h-[68px] w-[96px] shrink-0 rounded-md object-cover md:h-[72px] md:w-[105px] lg:w-[110px]"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-[16px] font-semibold text-[#2E2E2E] lg:text-[17px]">
                      {item.propertyName}
                    </h3>
                    <p className="mt-1 truncate text-xs text-[#777777]">{item.location}</p>
                    <p className="mt-1 truncate text-[11px] text-[#999999]">{item.date}</p>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col justify-center sm:w-[20%] lg:w-[19%]">
                  {index === 0 && (
                    <p className="mb-1 text-sm font-medium text-[#777777] lg:text-[15px]">
                      Landlord
                    </p>
                  )}
                  <div className="flex min-w-0 items-center gap-2">
                    <Image
                      src={item.landlordImage}
                      alt={item.landlord}
                      width={38}
                      height={38}
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-[#2E2E2E] lg:text-[16px]">
                        {item.landlord}
                      </p>
                      <div className="mt-1 flex w-fit items-center gap-1 rounded bg-[#DDF2E4] px-2 py-[3px]">
                        <Image src="/verify.svg" alt="" width={11} height={11} className="h-[11px] w-[11px]" />
                        <span className="text-[9px] font-medium text-[#378653]">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col justify-center sm:w-[17%] lg:w-[16%]">
                  <p className="mb-1 text-sm font-medium text-[#777777] lg:text-[15px]">Status</p>
                  <span
                    className={`w-fit whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium lg:text-[11px] ${item.statusStyle}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex shrink-0 sm:w-[13%]">
                  <Link
                    href={`/properties/${item.propertyId}`}
                    className="flex w-fit items-center justify-center whitespace-nowrap rounded-md border border-[#DDDDDD] px-3 py-2 text-[10px] font-medium text-[#444444] transition-colors hover:border-[#1E5A4F] hover:bg-[#1E5A4F] hover:text-white lg:text-[11px]"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:hidden">
                <div className="flex min-w-0 items-center gap-3">
                  <Image
                    src={item.propertyImage}
                    alt={item.propertyName}
                    width={120}
                    height={80}
                    className="h-[76px] w-[105px] shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[16px] font-semibold leading-tight text-[#2E2E2E]">
                      {item.propertyName}
                    </h3>
                    <p className="mt-1 text-xs text-[#777777]">{item.location}</p>
                    <p className="mt-1 text-[11px] text-[#999999]">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <Image
                      src={item.landlordImage}
                      alt={item.landlord}
                      width={34}
                      height={34}
                      className="h-[34px] w-[34px] shrink-0 rounded-full object-cover"
                    />
                    <p className="truncate text-[14px] font-semibold text-[#2E2E2E]">
                      {item.landlord}
                    </p>
                  </div>
                  <span
                    className={`whitespace-nowrap rounded-md px-2 py-1 text-[9px] font-medium ${item.statusStyle}`}
                  >
                    {item.status}
                  </span>
                </div>
                <Link
                  href={`/properties/${item.propertyId}`}
                  className="flex w-full items-center justify-center rounded-md border border-[#DDDDDD] px-3 py-2 text-xs font-medium text-[#444444] transition-colors hover:border-[#1E5A4F] hover:bg-[#1E5A4F] hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </TenantDashboardLayout>
  );
}
