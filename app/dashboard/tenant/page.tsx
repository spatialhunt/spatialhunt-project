import React from "react";
import TenantHero from "@/component/tenant-dashboard/tenantHero";
import TenantSidebar from "@/component/tenant-dashboard/tenantSidebar";
import DashboardStats from "@/component/tenant-dashboard/dashboardStats";
import Recommended from "@/component/tenant-dashboard/recommended";
import MyEnquiry from "@/component/tenant-dashboard/myEnquiry";
import AccountOverview from "@/component/tenant-dashboard/accountOverview";
import RecentActivity from "@/component/tenant-dashboard/recentActivity";
import QuickActions from "@/component/tenant-dashboard/quickActions";

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* =====================================================
          TENANT HERO
      ====================================================== */}
      <TenantHero />

      {/* =====================================================
          DASHBOARD WRAPPER
      ====================================================== */}
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          py-5
          sm:px-5
          md:px-6
          lg:px-7
          xl:px-8
          2xl:px-10
        "
      >
        {/* =================================================
            DESKTOP DASHBOARD GRID

            LEFT   = Sidebar
            CENTER = Main dashboard
            RIGHT  = Account information
        ================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-5

            md:grid-cols-[200px_minmax(0,1fr)]
            md:gap-5

            lg:grid-cols-[200px_minmax(0,1fr)_235px]
            lg:gap-5

            xl:grid-cols-[210px_minmax(0,1fr)_250px]
            xl:gap-6
          "
        >
          {/* =================================================
              LEFT COLUMN — SIDEBAR
          ================================================== */}
          <aside className="w-full">
            <TenantSidebar />
          </aside>

          {/* =================================================
              CENTER COLUMN — MAIN DASHBOARD
          ================================================== */}
          <main className="min-w-0 md:px-6">
            {/* Dashboard Stats */}
            <DashboardStats />

            {/* Recommended */}
            <div className="mt-4 sm:mt-5">
              <Recommended />
            </div>

             {/* Enquiry */}
            <div className="mt-4 sm:mt-5">
              <MyEnquiry />
            </div>
          </main>

          {/* =================================================
              RIGHT COLUMN — ACCOUNT INFORMATION
          ================================================== */}
          <aside
            className="
              flex
              w-full
              flex-col
              gap-4

              md:col-span-2

              lg:col-span-1
            "
          >
            {/* Account Overview */}
            <AccountOverview />

            {/* Recent Activity */}
            <RecentActivity />

            {/* Quick Actions */}
            <QuickActions />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Page;