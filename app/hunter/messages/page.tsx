"use client";

import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";
import { MOCK_CONVERSATIONS } from "@/mocks";

export default function HunterMessagesPage() {
  return (
    <div>
      <PageHeader
        title="Messages"
        description="In-app conversations with landlords and tenants."
      />

      {MOCK_CONVERSATIONS.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Once you start connecting tenants with landlords, conversations will appear here."
        />
      ) : (
        <div className="space-y-2">
          {MOCK_CONVERSATIONS.map((c) => (
            <Surface key={c.id} className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF3F0] text-sm font-bold text-[#1E5A4F]">
                  {(c.counterpartName ?? "?")[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2E2E2E]">{c.counterpartName}</p>
                  <p className="text-xs text-[#777777]">{c.propertyTitle}</p>
                  {c.lastMessage && (
                    <p className="mt-0.5 text-xs text-[#888888] line-clamp-1">{c.lastMessage}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {(c.unreadCount ?? 0) > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4B942] text-[10px] font-bold text-[#1E5A4F]">
                    {c.unreadCount}
                  </span>
                )}
                <Link
                  href={`/hunter/messages/${c.id}`}
                  className="rounded-[5px] border border-[#DDDDDD] px-3 py-1.5 text-xs font-semibold text-[#444444] hover:border-[#1E5A4F]"
                >
                  Open
                </Link>
              </div>
            </Surface>
          ))}
        </div>
      )}
    </div>
  );
}
