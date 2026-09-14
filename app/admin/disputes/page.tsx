"use client";

import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/primitives";
import { MOCK_DISPUTES } from "@/mocks";

const statusStyle: Record<string, string> = {
  OPEN: "bg-[#FFF6D9] text-[#C99A20]",
  UNDER_REVIEW: "bg-[#EAF3F0] text-[#1E5A4F]",
  AWAITING_RESPONSE: "bg-[#FFF6D9] text-[#C99A20]",
  RESOLVED: "bg-[#DDF2E4] text-[#117E25]",
  ESCALATED: "bg-[#FFF6D9] text-[#C58D16]",
  CLOSED: "bg-[#E5E5E5] text-[#555555]",
};

export default function AdminDisputesPage() {
  return (
    <div>
      <PageHeader title="Disputes" description="Escrow and listing disputes requiring ops review." />
      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>

      <Surface className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Summary</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Filed</th>
              <th className="px-4 py-3">View</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DISPUTES.map((d) => (
              <tr key={d.id} className="border-b border-[#EEEEEE]">
                <td className="px-4 py-3">{d.category}</td>
                <td className="max-w-xs truncate px-4 py-3">{d.summary}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-[5px] px-2 py-1 text-xs font-semibold ${statusStyle[d.status]}`}>
                    {d.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3">{new Date(d.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/disputes/${d.id}`} className="text-[#1E5A4F] hover:underline">Open</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Surface>
    </div>
  );
}
