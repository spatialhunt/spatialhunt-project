"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { LoadingState, NotFoundState } from "@/component/shared/AppStates";
import { messagingService } from "@/lib/services/messaging.service";
import { MOCK_CONVERSATIONS } from "@/mocks";
import { getSession } from "@/lib/auth-client";
import type { Conversation } from "@/lib/types";

export default function InquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [inquiry, setInquiry] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await messagingService.getConversation(id);
        setInquiry(data.conversation);
      } catch {
        // TODO: remove mock fallback when conversation API is live
        setInquiry(MOCK_CONVERSATIONS.find((c) => c.id === id) ?? null);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [id]);

  if (loading) return <LoadingState title="Loading inquiry" />;
  if (!inquiry) {
    return (
      <NotFoundState
        title="Inquiry not found"
        action={
          <Link href="/landlord/inquiries">
            <Button variant="primary">Back to inquiries</Button>
          </Link>
        }
      />
    );
  }

  const session = getSession();

  return (
    <div>
      <PageHeader
        title={inquiry.counterpartName ?? "Tenant inquiry"}
        description={inquiry.propertyTitle ?? "Property inquiry"}
        actions={
          <Link href={`/landlord/messages/${id}`}>
            <Button variant="primary">Open conversation</Button>
          </Link>
        }
      />
      <Surface>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[#777777]">Tenant</dt>
            <dd className="font-medium text-[#2E2E2E]">{inquiry.counterpartName ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#777777]">Property</dt>
            <dd className="font-medium text-[#2E2E2E]">{inquiry.propertyTitle ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#777777]">Last message</dt>
            <dd className="text-[#2E2E2E]">{inquiry.lastMessage ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#777777]">Updated</dt>
            <dd className="text-[#2E2E2E]">
              {inquiry.updatedAt ? new Date(inquiry.updatedAt).toLocaleString() : "—"}
            </dd>
          </div>
        </dl>
        {session && (
          <p className="mt-4 text-xs text-[#8A8A8A]">
            Logged in as {session.fullName ?? session.email}. Reply in Messages to keep contact details private.
          </p>
        )}
      </Surface>
    </div>
  );
}
