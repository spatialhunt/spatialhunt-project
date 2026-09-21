import { Suspense } from "react";
import LoginForm from "@/component/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-white px-4 py-12">
      <Suspense fallback={<div className="text-sm text-[#777]">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
