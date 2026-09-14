import { apiFetch } from "@/lib/services/http";
import type { Conversation, Message } from "@/lib/types";

export const messagingService = {
  async getConversations(): Promise<Conversation[]> {
    return apiFetch<Conversation[]>("/api/messages/conversations", {}, true);
  },

  async getConversation(id: string): Promise<{
    conversation: Conversation;
    messages: Message[];
  }> {
    return apiFetch(`/api/messages/conversations/${id}`, {}, true);
  },

  async sendMessage(payload: {
    conversationId?: string;
    propertyId?: string;
    landlordId?: string;
    content: string;
  }): Promise<Message> {
    return apiFetch<Message>(
      "/api/messages",
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  },
};
