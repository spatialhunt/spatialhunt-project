import { redirect } from "next/navigation";

/** PRD-compatible alias → existing tenant dashboard path */
export default function TenantAliasPage() {
  redirect("/dashboard/tenant");
}
