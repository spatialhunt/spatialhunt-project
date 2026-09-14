import { Suspense } from "react";
import LoginForm from "@/component/auth/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-[#777777]">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
