"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Conversation, Message } from "@/lib/types";
import { Button, Input } from "@/component/ui/primitives";
import { EmptyState } from "@/component/shared/AppStates";

export function ConversationList({
  conversations,
  activeId,
  basePath,
}: {
  conversations: Conversation[];
  activeId?: string;
  basePath: string;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return conversations;
    return conversations.filter(
      (c) =>
        c.propertyTitle?.toLowerCase().includes(query) ||
        c.counterpartName?.toLowerCase().includes(query) ||
        c.lastMessage?.toLowerCase().includes(query),
    );
  }, [conversations, q]);

  return (
    <div className="flex h-full flex-col rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8]">
      <div className="border-b border-[#EEEEEE] p-3">
        <Input
          aria-label="Search conversations"
          placeholder="Search conversations"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <ul className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <li className="p-4">
            <EmptyState
              title="No conversations"
              description="Message a landlord from a property page to start chatting in-app. Phone numbers stay private."
            />
          </li>
        ) : (
          filtered.map((c) => {
            const active = c.id === activeId;
            return (
              <li key={c.id}>
                <Link
                  href={`${basePath}/${c.id}`}
                  className={`block border-b border-[#EEEEEE] px-4 py-3 transition hover:bg-[#F1F7F5] ${
                    active ? "bg-[#EAF3F0]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#2E2E2E]">
                        {c.counterpartName || "Landlord"}
                      </p>
                      <p className="truncate text-xs text-[#1E5A4F]">
                        {c.propertyTitle || "Property"}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#777777]">{c.lastMessage}</p>
                    </div>
                    {(c.unreadCount ?? 0) > 0 && (
                      <span className="rounded-full bg-[#F4B942] px-2 py-0.5 text-[10px] font-bold text-[#1E5A4F]">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export function ChatWindow({
  messages,
  selfId,
  onSend,
  propertyTitle,
  inspectionHref,
}: {
  messages: Message[];
  selfId: string;
  onSend: (content: string) => Promise<void> | void;
  propertyTitle?: string;
  inspectionHref?: string;
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function send() {
    if (!text.trim()) return;
    setSending(true);
    try {
      await onSend(text.trim());
      setText("");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-[8px] border border-[#EEEEEE] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[#EEEEEE] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#2E2E2E]">In-app messages</p>
          <p className="text-xs text-[#777777]">{propertyTitle || "Property conversation"}</p>
        </div>
        {inspectionHref && (
          <Link href={inspectionHref}>
            <Button variant="amber" className="!py-2 text-xs">
              Request inspection
            </Button>
          </Link>
        )}
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-[#8A8A8A]">No messages yet. Say hello.</p>
        )}
        {messages.map((m) => {
          const mine = m.senderId === selfId;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-[8px] px-3 py-2 text-sm ${
                  mine ? "bg-[#1E5A4F] text-white" : "bg-[#F1F7F5] text-[#2E2E2E]"
                }`}
              >
                {m.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 border-t border-[#EEEEEE] p-3">
        <Input
          aria-label="Message"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
        />
        <Button variant="primary" onClick={() => void send()} disabled={sending}>
          Send
        </Button>
      </div>
      <p className="px-4 pb-3 text-[11px] text-[#8A8A8A]">
        Personal phone numbers are not shared by default. Attachments will plug into this input when
        upload APIs are ready.
      </p>
    </div>
  );
}
