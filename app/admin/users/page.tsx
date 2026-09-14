"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/primitives";
import { ConfirmationModal } from "@/component/shared/ConfirmationModal";
import { MOCK_USERS } from "@/mocks";
import type { UserSummary } from "@/lib/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<(UserSummary & { suspended?: boolean })[]>(
    MOCK_USERS.map((u) => ({ ...u, suspended: u.id === "landlord-2" })),
  );
  const [modal, setModal] = useState<{ id: string; action: "suspend" | "reactivate" } | null>(null);

  function confirm() {
    if (!modal) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === modal.id ? { ...u, suspended: modal.action === "suspend" } : u,
      ),
    );
    setModal(null);
  }

  return (
    <div>
      <PageHeader title="Users" description="Tenant, landlord, and admin accounts." />
      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>

      <Surface className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[#EEEEEE]">
                <td className="px-4 py-3">
                  <Link href={`/admin/users/${u.id}`} className="font-medium text-[#1E5A4F] hover:underline">
                    {u.fullName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[#777777]">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">{u.suspended ? "Suspended" : "Active"}</td>
                <td className="px-4 py-3">
                  {u.suspended ? (
                    <Button variant="ghost" className="!px-2 !py-1 text-xs" onClick={() => setModal({ id: u.id, action: "reactivate" })}>
                      Reactivate
                    </Button>
                  ) : (
                    <Button variant="ghost" className="!px-2 !py-1 text-xs text-[#C58D16]" onClick={() => setModal({ id: u.id, action: "suspend" })}>
                      Suspend
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Surface>

      <ConfirmationModal
        open={!!modal}
        title={modal?.action === "suspend" ? "Suspend user?" : "Reactivate user?"}
        description={
          modal?.action === "suspend"
            ? "The user will lose access until reactivated."
            : "The user will regain access to their account."
        }
        confirmLabel={modal?.action === "suspend" ? "Suspend" : "Reactivate"}
        tone={modal?.action === "suspend" ? "danger" : "default"}
        onConfirm={confirm}
        onCancel={() => setModal(null)}
      />
    </div>
  );
}
