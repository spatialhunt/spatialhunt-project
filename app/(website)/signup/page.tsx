import { SignupRolePicker } from "@/component/auth/SignupForms";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-white px-4 py-12">
      <SignupRolePicker />
    </div>
  );
}
