"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/component/ui/Primitives";
import { ConversationList } from "@/component/messaging/Messaging";
import { LoadingState } from "@/component/shared/AppStates";
import { messagingService } from "@/lib/services/messaging.service";
import { MOCK_CONVERSATIONS } from "@/mocks";
import type { Conversation } from "@/lib/types";

export default function LandlordMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setConversations(await messagingService.getConversations());
      } catch {
        // TODO: remove mock fallback when messaging API is live
        setConversations(MOCK_CONVERSATIONS);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) return <LoadingState title="Loading messages" />;

  return (
    <div>
      <PageHeader title="Messages" description="In-app conversations with prospective tenants." />
      <div className="h-[520px]">
        <ConversationList conversations={conversations} basePath="/landlord/messages" />
      </div>
    </div>
  );
}
