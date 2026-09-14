"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/auth.service";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    authService.logout();
    router.replace("/login");
  }, [router]);
  return (
    <div className="py-16 text-center text-sm text-[#777777]">Signing you out…</div>
  );
}
