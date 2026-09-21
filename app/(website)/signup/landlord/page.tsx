import { SignupForm } from "@/component/auth/SignupForms";

export default function SignupLandlordPage() {
  return (
    <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-white px-4 py-12">
      <SignupForm role="LANDLORD" />
    </div>
  );
}
