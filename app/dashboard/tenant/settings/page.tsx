import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { PageHeader, Surface } from "@/component/ui/Primitives";

const settingsLinks = [
  {
    href: "/dashboard/tenant/security",
    title: "Security",
    description: "Password, sessions, and account deletion",
  },
  {
    href: "/dashboard/tenant/preferences",
    title: "Preferences",
    description: "Budget, locations, and property criteria",
  },
  {
    href: "/dashboard/tenant/profile",
    title: "Profile",
    description: "Name, email, phone, and location",
  },
];

export default function SettingsPage() {
  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Settings"
        description="Manage your account, security, and rental preferences."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {settingsLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Surface className="!bg-white transition hover:border-[#1E5A4F]/40">
              <h2 className="text-base font-bold text-[#2E2E2E]">{link.title}</h2>
              <p className="mt-1 text-sm text-[#777777]">{link.description}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-[#1E5A4F]">
                Open →
              </span>
            </Surface>
          </Link>
        ))}
      </div>

      <Surface className="mt-6">
        <h2 className="text-base font-bold text-[#2E2E2E]">Privacy</h2>
        <p className="mt-2 text-sm text-[#777777]">
          SpatialHunt keeps your contact details private until you choose to share them with a
          landlord. We never sell your personal data. Identity documents uploaded for verification
          are stored securely and are not shown on your public profile.
        </p>
        <p className="mt-3 text-sm text-[#777777]">
          For full details, see our privacy policy when it is published on the website.
        </p>
      </Surface>
    </TenantDashboardLayout>
  );
}
