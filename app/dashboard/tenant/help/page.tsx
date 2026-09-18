import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { PageHeader, Surface } from "@/component/ui/Primitives";

const helpLinks = [
  {
    title: "How SpatialHunt works",
    description: "Learn about verified listings, inspections, and escrow payments.",
    href: "/howitworks",
  },
  {
    title: "Browse help articles",
    description: "Guides for tenants on searching, messaging, and paying rent safely.",
    href: "/resources",
  },
  {
    title: "Contact support",
    description: "Email support@spatialhunt.com — we typically respond within one business day.",
    href: "mailto:support@spatialhunt.com",
  },
  {
    title: "Report a problem",
    description: "Flag a listing, payment issue, or safety concern for review.",
    href: "/dashboard/tenant/messages",
  },
];

export default function HelpPage() {
  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Help & Support"
        description="Answers and resources for your tenant journey."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {helpLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Surface className="h-full !bg-white transition hover:border-[#1E5A4F]/40">
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
        <h2 className="text-base font-bold text-[#2E2E2E]">Quick tips</h2>
        <ul className="mt-3 space-y-2 text-sm text-[#777777]">
          <li>• Always inspect a property before paying rent through escrow.</li>
          <li>• Keep conversations in-app until you trust the landlord.</li>
          <li>• Save searches to get alerts when new verified listings match.</li>
        </ul>
      </Surface>
    </TenantDashboardLayout>
  );
}
