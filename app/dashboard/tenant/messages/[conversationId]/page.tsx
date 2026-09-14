"use client";

import { use, useEffect, useState } from "react";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { ChatWindow, ConversationList } from "@/component/messaging/Messaging";
import { PageHeader } from "@/component/ui/primitives";
import { MOCK_CONVERSATIONS } from "@/mocks";
import { messagingService } from "@/lib/services/messaging.service";
import type { Conversation, Message } from "@/lib/types";

const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    conversationId: "conv-1",
    senderId: "landlord-1",
    content: "Hello! Thanks for your interest in the Lekki apartment.",
    isRead: true,
    createdAt: "2026-09-13T09:00:00Z",
  },
  {
    id: "m2",
    conversationId: "conv-1",
    senderId: "tenant-1",
    content: "I'd like to schedule an inspection this week if possible.",
    isRead: true,
    createdAt: "2026-09-13T10:15:00Z",
  },
  {
    id: "m3",
    conversationId: "conv-1",
    senderId: "landlord-1",
    content: "Inspection confirmed for Thursday 10am.",
    isRead: false,
    createdAt: "2026-09-14T08:30:00Z",
  },
];

const SELF_ID = "tenant-1";

export default function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = use(params);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await messagingService.getConversation(conversationId);
        if (!cancelled) {
          setConversation(data.conversation);
          setMessages(data.messages);
        }
      } catch {
        if (!cancelled) {
          const conv =
            MOCK_CONVERSATIONS.find((c) => c.id === conversationId) ||
            MOCK_CONVERSATIONS[0];
          setConversation(conv);
          setMessages(
            MOCK_MESSAGES.filter((m) => m.conversationId === conv.id).length > 0
              ? MOCK_MESSAGES.filter((m) => m.conversationId === conv.id)
              : MOCK_MESSAGES,
          );
          setUsingMock(true);
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [conversationId]);

  async function handleSend(content: string) {
    try {
      const msg = await messagingService.sendMessage({ conversationId, content });
      setMessages((prev) => [...prev, msg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          conversationId,
          senderId: SELF_ID,
          content,
          isRead: true,
          createdAt: new Date().toISOString(),
        },
      ]);
      setUsingMock(true);
    }
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Messages"
        description={
          conversation?.propertyTitle ||
          "Continue your conversation with the landlord."
        }
      />

      {usingMock && (
        <p className="mb-4 rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-4 py-2 text-xs text-[#C99A20]">
          Using demo messages — messaging API unavailable.
        </p>
      )}

      <div className="grid h-[min(75vh,680px)] grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <ConversationList
            conversations={MOCK_CONVERSATIONS}
            activeId={conversationId}
            basePath="/dashboard/tenant/messages"
          />
        </div>
        <ChatWindow
          messages={messages}
          selfId={SELF_ID}
          onSend={handleSend}
          propertyTitle={conversation?.propertyTitle}
          inspectionHref={
            conversation?.propertyId
              ? `/properties/${conversation.propertyId}`
              : undefined
          }
        />
      </div>
    </TenantDashboardLayout>
  );
}
