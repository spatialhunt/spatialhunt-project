"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Button } from "@/component/ui/primitives";
import { ConversationList, ChatWindow } from "@/component/messaging/Messaging";
import { LoadingState, NotFoundState } from "@/component/shared/AppStates";
import { messagingService } from "@/lib/services/messaging.service";
import { MOCK_CONVERSATIONS } from "@/mocks";
import { getSession } from "@/lib/auth-client";
import type { Conversation, Message } from "@/lib/types";

export default function LandlordConversationPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [active, setActive] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [all, detail] = await Promise.all([
          messagingService.getConversations(),
          messagingService.getConversation(conversationId),
        ]);
        setConversations(all);
        setActive(detail.conversation);
        setMessages(detail.messages);
      } catch {
        // TODO: remove mock fallback when messaging API is live
        const mock = MOCK_CONVERSATIONS;
        setConversations(mock);
        const conv = mock.find((c) => c.id === conversationId) ?? null;
        setActive(conv);
        setMessages(
          conv
            ? [
                {
                  id: "m1",
                  conversationId: conv.id,
                  senderId: conv.tenantId,
                  content: conv.lastMessage ?? "Hello, is this still available?",
                  isRead: true,
                  createdAt: conv.updatedAt ?? new Date().toISOString(),
                },
              ]
            : [],
        );
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [conversationId]);

  const session = getSession();
  const selfId = session?.userId ?? "landlord-1";

  async function handleSend(content: string) {
    try {
      const msg = await messagingService.sendMessage({ conversationId, content });
      setMessages((prev) => [...prev, msg]);
    } catch {
      // TODO: remove mock fallback when /api/messages POST is live
      setMessages((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          conversationId,
          senderId: selfId,
          content,
          isRead: true,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }

  if (loading) return <LoadingState title="Loading conversation" />;
  if (!active) {
    return (
      <NotFoundState
        title="Conversation not found"
        action={
          <Link href="/landlord/messages">
            <Button variant="primary">Back to messages</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader title="Messages" description={active.propertyTitle} />
      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="hidden h-[520px] lg:block">
          <ConversationList
            conversations={conversations}
            activeId={conversationId}
            basePath="/landlord/messages"
          />
        </div>
        <ChatWindow
          messages={messages}
          selfId={selfId}
          onSend={handleSend}
          propertyTitle={active.propertyTitle}
          inspectionHref={`/landlord/inspections`}
        />
      </div>
    </div>
  );
}
