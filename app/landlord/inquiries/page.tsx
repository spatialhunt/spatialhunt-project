"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/Primitives";
import { LoadingState, EmptyState } from "@/component/shared/AppStates";
import { messagingService } from "@/lib/services/messaging.service";
import { MOCK_CONVERSATIONS } from "@/mocks";
import type { Conversation } from "@/lib/types";

export default function LandlordInquiriesPage() {
  const [inquiries, setInquiries] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setInquiries(await messagingService.getConversations());
      } catch {
        // TODO: remove mock fallback when /api/messages/conversations is live
        setInquiries(MOCK_CONVERSATIONS);
        setDemo(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) return <LoadingState title="Loading inquiries" />;

  return (
    <div>
      <PageHeader
        title="Inquiries"
        description="Tenant questions routed through in-app messaging."
      />
      {demo && <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>}

      {inquiries.length === 0 ? (
        <EmptyState
          title="No inquiries yet"
          description="When tenants message you about a listing, conversations appear here."
        />
      ) : (
        <div className="space-y-3">
          {inquiries.map((c) => (
            <Surface key={c.id}>
              <Link href={`/landlord/inquiries/${c.id}`} className="block hover:opacity-90">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#2E2E2E]">{c.counterpartName ?? "Tenant"}</p>
                    <p className="text-sm text-[#1E5A4F]">{c.propertyTitle}</p>
                    <p className="mt-2 text-sm text-[#777777]">{c.lastMessage}</p>
                  </div>
                  {(c.unreadCount ?? 0) > 0 && (
                    <span className="rounded-full bg-[#F4B942] px-2 py-0.5 text-xs font-bold text-[#1E5A4F]">
                      {c.unreadCount} new
                    </span>
                  )}
                </div>
              </Link>
            </Surface>
          ))}
        </div>
      )}
    </div>
  );
}
