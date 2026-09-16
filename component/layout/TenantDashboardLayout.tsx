"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import TenantHero from "@/component/tenant-dashboard/TenantHero";
import TenantSidebar from "@/component/tenant-dashboard/TenantSidebar";
import { useAuthSession } from "@/lib/use-auth-session";
import { UnauthorizedState } from "@/component/shared/AppStates";
import { Button } from "@/component/ui/primitives";

/**
 * Reuses existing tenant chrome (TenantHero + TenantSidebar).
 * Soft client-side role gate — backend auth remains authoritative.
 */
export default function TenantDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const session = useAuthSession();
  const blocked =
    !!session && session.role !== "TENANT" && session.role !== "ADMIN";

  if (blocked) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <UnauthorizedState
          description="This area is for tenant accounts. Switch account or go to your landlord dashboard."
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={() => router.push("/landlord/dashboard")}>Landlord dashboard</Button>
              <Button variant="secondary" onClick={() => router.push("/logout")}>
                Sign out
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TenantHero />
      <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-5 md:px-6 lg:px-7 xl:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="w-full">
            <TenantSidebar />
          </aside>
          <main className="min-w-0 md:px-4 lg:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
