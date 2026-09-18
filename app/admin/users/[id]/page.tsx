"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { NotFoundState } from "@/component/shared/AppStates";
import { MOCK_USERS } from "@/mocks";

export default function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const user = MOCK_USERS.find((u) => u.id === id);

  if (!user) {
    return (
      <NotFoundState
        title="User not found"
        action={
          <Link href="/admin/users">
            <Button variant="primary">Back to users</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={user.fullName}
        description={user.email}
        actions={
          <Link href="/admin/users">
            <Button variant="ghost">Back</Button>
          </Link>
        }
      />
      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>

      <Surface className="max-w-lg">
        <dl className="grid gap-3 text-sm">
          <div><dt className="text-xs text-[#777777]">Role</dt><dd className="font-medium">{user.role}</dd></div>
          <div><dt className="text-xs text-[#777777]">Verified</dt><dd>{user.isVerified ? "Yes" : "No"}</dd></div>
          <div><dt className="text-xs text-[#777777]">Phone</dt><dd>{user.phone ?? "—"}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-[#777777]">
          {/* TODO: wire /api/admin/users/:id when admin user API is available */}
          Full user management requires the admin users API.
        </p>
      </Surface>
    </div>
  );
}
