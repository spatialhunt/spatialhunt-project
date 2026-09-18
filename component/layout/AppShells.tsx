"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { clearSession } from "@/lib/auth-client";
import { useAuthSession } from "@/lib/use-auth-session";
import type { Role } from "@/lib/types";
import { UnauthorizedState } from "@/component/shared/AppStates";
import { Button } from "@/component/ui/Primitives";

type NavItem = { name: string; href: string };

function AppShell({
  brandHref,
  title,
  nav,
  requiredRoles,
  children,
}: {
  brandHref: string;
  title: string;
  nav: NavItem[];
  requiredRoles: Role[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useAuthSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [session, pathname, router]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[#777777]">
        Checking access…
      </div>
    );
  }

  const allowed = requiredRoles.includes(session.role);

  if (!allowed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <UnauthorizedState
          action={
            <Button onClick={() => router.push("/")}>Go home</Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#EAEAEA] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6">
          <Link href={brandHref} className="flex items-center gap-2">
            <img src="/SH-LOGO.svg" alt="SpatialHunt" className="h-10 w-auto" />
            <div>
              <p className="text-sm font-bold">
                <span className="text-[#F4B942]">SPATIAL</span>
                <span className="text-[#1E5A4F]">HUNT</span>
              </p>
              <p className="text-xs text-[#777777]">{title}</p>
            </div>
          </Link>
          <button
            type="button"
            className="rounded-md bg-[#1E5A4F] px-3 py-2 text-sm font-semibold text-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
          >
            Menu
          </button>
          <button
            type="button"
            className="hidden text-sm font-medium text-[#777777] hover:text-[#1E5A4F] lg:block"
            onClick={() => {
              clearSession();
              router.push("/login");
            }}
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside
          className={`${mobileOpen ? "block" : "hidden"} overflow-hidden rounded-[8px] bg-[#1E5A4F] lg:block`}
        >
          <nav className="flex flex-col gap-1 p-3">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-[6px] px-3 py-3 text-sm font-medium transition-all ${
                    active ? "bg-[#117E2540] text-white" : "text-[#D8E4E1] hover:bg-[#117E2540]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              type="button"
              className="mt-2 rounded-[6px] px-3 py-3 text-left text-sm font-medium text-[#D8E4E1] hover:bg-[#117E2540] lg:hidden"
              onClick={() => {
                clearSession();
                router.push("/login");
              }}
            >
              Log out
            </button>
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

const landlordNav: NavItem[] = [
  { name: "Dashboard", href: "/landlord/dashboard" },
  { name: "Verification", href: "/landlord/verification" },
  { name: "My Listings", href: "/landlord/listings" },
  { name: "Inquiries", href: "/landlord/inquiries" },
  { name: "Inspections", href: "/landlord/inspections" },
  { name: "Messages", href: "/landlord/messages" },
  { name: "Analytics", href: "/landlord/analytics" },
  { name: "Payments", href: "/landlord/payments" },
  { name: "Billing", href: "/landlord/billing" },
  { name: "Notifications", href: "/landlord/notifications" },
  { name: "Profile", href: "/landlord/profile" },
  { name: "Settings", href: "/landlord/settings" },
];

const adminNav: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Users", href: "/admin/users" },
  { name: "Properties", href: "/admin/properties" },
  { name: "Verifications", href: "/admin/verifications" },
  { name: "Disputes", href: "/admin/disputes" },
  { name: "Transactions", href: "/admin/transactions" },
  { name: "Reports", href: "/admin/reports" },
  { name: "Audit logs", href: "/admin/audit-logs" },
  { name: "Settings", href: "/admin/settings" },
];

const portalNav: NavItem[] = [
  { name: "Dashboard", href: "/portal/dashboard" },
  { name: "Properties", href: "/portal/properties" },
  { name: "Bulk upload", href: "/portal/properties/bulk-upload" },
  { name: "Analytics", href: "/portal/analytics" },
  { name: "Team", href: "/portal/team" },
  { name: "Agreements", href: "/portal/agreements" },
  { name: "Settings", href: "/portal/settings" },
];

export function LandlordLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      brandHref="/landlord/dashboard"
      title="Landlord"
      nav={landlordNav}
      requiredRoles={["LANDLORD", "ADMIN"]}
    >
      {children}
    </AppShell>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      brandHref="/admin/dashboard"
      title="Operations"
      nav={adminNav}
      requiredRoles={["ADMIN"]}
    >
      {children}
    </AppShell>
  );
}

export function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      brandHref="/portal/dashboard"
      title="Property Manager Portal"
      nav={portalNav}
      requiredRoles={["LANDLORD", "ADMIN"]}
    >
      {children}
    </AppShell>
  );
}
