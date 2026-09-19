"use client";

import { PageHeader, Surface } from "@/component/ui/Primitives";
import { MOCK_NOTIFICATIONS } from "@/mocks";

export default function HunterNotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" description="Updates on your leads, matches, and earnings." />

      {MOCK_NOTIFICATIONS.length === 0 ? (
        <p className="py-12 text-center text-sm text-[#777777]">No notifications yet.</p>
      ) : (
        <div className="space-y-2">
          {MOCK_NOTIFICATIONS.map((n) => (
            <Surface
              key={n.id}
              className={`flex items-start gap-3 ${!n.isRead ? "border-l-4 border-l-[#1E5A4F]" : ""}`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF3F0] text-sm">
                {n.type === "message" ? "💬" : n.type === "inspection" ? "🏠" : "📌"}
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#2E2E2E]">{n.message}</p>
                <p className="mt-1 text-xs text-[#AAAAAA]">
                  {new Date(n.createdAt).toLocaleString("en-NG", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              {!n.isRead && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#F4B942]" />
              )}
            </Surface>
          ))}
        </div>
      )}
    </div>
  );
}
