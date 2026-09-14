import { PortalLayout } from "@/component/layout/AppShells";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <PortalLayout>{children}</PortalLayout>;
}
