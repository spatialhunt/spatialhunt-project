"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthSession } from "@/lib/use-auth-session";

const AccountOverview = () => {
  const session = useAuthSession();
  const joinDate = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

  return (
    <section
      className="
        w-full
        rounded-[6px]
        border
        border-[#EEEEEE]
        bg-[#FAFAF8]
        p-3
        sm:p-4
      "
    >
      {/* ================= HEADER ================= */}

      <div className="mb-3">
        <h2
          className="
            text-sm
            font-bold
            leading-tight
            text-[#2E2E2E]
            sm:text-[15px]
          "
        >
          Account Overview
        </h2>
      </div>

      {/* ================= ACCOUNT DETAILS ================= */}

      <div className="space-y-2.5">
        {/* Account Status */}

        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3">
          <p
            className="
              whitespace-nowrap
              text-[10px]
              font-medium
              text-[#5F5F5F]
              sm:text-[11px]
            "
          >
            Account Status
          </p>

          <div className="flex justify-end">
            <span
              className="
                inline-flex
                items-center
                justify-center
                rounded-[3px]
                bg-[#117E2526]
                px-2
                py-1
                text-[9px]
                font-semibold
                leading-none
                text-[#117E25]
                sm:text-[10px]
              "
            >
              Active
            </span>
          </div>
        </div>

        {/* Member Since */}

        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3">
          <p
            className="
              whitespace-nowrap
              text-[10px]
              font-medium
              text-[#5F5F5F]
              sm:text-[11px]
            "
          >
            Member Since
          </p>

          <p className="min-w-0 text-right text-[10px] text-[#4F4F4F] sm:text-[11px]">
            {joinDate}
          </p>
        </div>

        {/* Email */}

        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3">
          <p
            className="
              whitespace-nowrap
              text-[10px]
              font-medium
              text-[#5F5F5F]
              sm:text-[11px]
            "
          >
            Email
          </p>

          <p className="min-w-0 truncate text-right text-[9px] text-[#4F4F4F] sm:text-[10px]" title={session?.email}>
            {session?.email ?? "—"}
          </p>
        </div>

        {/* Phone */}

        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3">
          <p
            className="
              whitespace-nowrap
              text-[10px]
              font-medium
              text-[#5F5F5F]
              sm:text-[11px]
            "
          >
            Phone
          </p>

          <p className="min-w-0 text-right text-[10px] text-[#4F4F4F] sm:text-[11px]">
            {session ? "+234 —" : "—"}
          </p>
        </div>
      </div>

      {/* ================= EDIT PROFILE ================= */}

      <Link
        href="/dashboard/tenant/profile"
        className="
          mt-4
          flex
          h-[30px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-[3px]
          border
          border-[#E5E5E5]
          bg-white
          text-[9px]
          font-medium
          text-[#4A4A4A]
          transition-all
          duration-200
          hover:border-[#1E5A4F]
          hover:bg-[#F7FAF8]
          hover:text-[#1E5A4F]
          active:scale-[0.98]
          sm:h-[32px]
          sm:text-[10px]
        "
      >
        <Image
          src="/profile.svg"
          alt=""
          width={15}
          height={15}
          className="
            h-[14px]
            w-[14px]
            shrink-0
            object-contain
            transition-transform
            duration-200
          "
        />

        <span>Edit Profile</span>
      </Link>
    </section>
  );
};

export default AccountOverview;