import { AdminLayout } from "@/component/layout/AppShells";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
