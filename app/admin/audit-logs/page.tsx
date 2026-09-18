"use client";

import { useMemo, useState } from "react";
import { PageHeader, Surface, Input } from "@/component/ui/Primitives";
import { MOCK_AUDIT_LOGS } from "@/mocks";

export default function AdminAuditLogsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_AUDIT_LOGS;
    return MOCK_AUDIT_LOGS.filter(
      (log) =>
        log.action.toLowerCase().includes(q) ||
        log.entityType.toLowerCase().includes(q) ||
        log.entityId.toLowerCase().includes(q) ||
        (log.userId ?? "").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Audit logs"
        description="Immutable record of platform actions. Logs cannot be deleted from this UI."
      />
      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>

      <Surface className="mb-4 max-w-md">
        <Input
          label="Search logs"
          placeholder="Action, entity, user ID…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Surface>

      <Surface className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Entity</th>
              <th className="px-4 py-3">User</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className="border-b border-[#EEEEEE]">
                <td className="px-4 py-3 whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 font-medium">{log.action}</td>
                <td className="px-4 py-3">{log.entityType} · {log.entityId}</td>
                <td className="px-4 py-3">{log.userId ?? "System"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Surface>
    </div>
  );
}
