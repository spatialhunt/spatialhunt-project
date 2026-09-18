"use client";

import { useEffect, useState } from "react";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { EmptyState, LoadingState } from "@/component/shared/AppStates";
import { Button, PageHeader, Surface } from "@/component/ui/Primitives";
import { MOCK_NOTIFICATIONS } from "@/mocks";
import { notificationService } from "@/lib/services/notification.service";
import type { NotificationItem } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    inspection: "Inspection",
    message: "Message",
    payment: "Payment",
    application: "Application",
  };
  return map[type] || type;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await notificationService.list();
        if (!cancelled) {
          setNotifications(data.length > 0 ? data : MOCK_NOTIFICATIONS);
          setUsingMock(data.length === 0);
        }
      } catch {
        if (!cancelled) {
          setNotifications(MOCK_NOTIFICATIONS);
          setUsingMock(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function markRead(id: string) {
    try {
      await notificationService.markRead(id);
    } catch {
      /* mock fallback */
    }
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  }

  async function markAllRead() {
    try {
      await notificationService.markAllRead();
    } catch {
      /* mock fallback */
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Notifications"
        description={
          unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
            : "You're all caught up."
        }
        actions={
          unreadCount > 0 ? (
            <Button variant="secondary" onClick={() => void markAllRead()}>
              Mark all read
            </Button>
          ) : undefined
        }
      />

      {usingMock && (
        <p className="mb-4 rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-4 py-2 text-xs text-[#C99A20]">
          Showing demo notifications — connect notifications API for live updates.
        </p>
      )}

      {loading ? (
        <LoadingState title="Loading notifications" />
      ) : notifications.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="Updates about inspections, messages, and payments will appear here."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((item) => (
            <Surface
              key={item.id}
              className={`!bg-white transition ${!item.isRead ? "border-[#1E5A4F]/30 bg-[#F1F7F5]" : ""}`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-[5px] bg-[#EAF3F0] px-2 py-0.5 text-[10px] font-semibold uppercase text-[#1E5A4F]">
                      {typeLabel(item.type)}
                    </span>
                    {!item.isRead && (
                      <span className="h-2 w-2 rounded-full bg-[#F4B942]" aria-hidden />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-[#2E2E2E]">{item.message}</p>
                  <p className="mt-1 text-xs text-[#999999]">{formatDate(item.createdAt)}</p>
                </div>
                {!item.isRead && (
                  <Button
                    variant="ghost"
                    className="!py-1.5 text-xs shrink-0"
                    onClick={() => void markRead(item.id)}
                  >
                    Mark read
                  </Button>
                )}
              </div>
            </Surface>
          ))}
        </div>
      )}
    </TenantDashboardLayout>
  );
}
