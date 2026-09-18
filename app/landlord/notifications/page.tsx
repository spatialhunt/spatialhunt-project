"use client";

import { useEffect, useState } from "react";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { LoadingState, EmptyState } from "@/component/shared/AppStates";
import { MOCK_NOTIFICATIONS } from "@/mocks";
import type { NotificationItem } from "@/lib/types";

export default function LandlordNotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // TODO: wire notificationService.getMine when API is available
        const { notificationService } = await import("@/lib/services/notification.service");
        setItems(await notificationService.list());
      } catch {
        setItems(MOCK_NOTIFICATIONS);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) return <LoadingState title="Loading notifications" />;

  return (
    <div>
      <PageHeader title="Notifications" description="Updates about inquiries, inspections, and verification." />
      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>

      {items.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up." />
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <Surface key={n.id} className={n.isRead ? "opacity-70" : ""}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#2E2E2E]">{n.message}</p>
                  <p className="mt-1 text-xs text-[#777777]">
                    {new Date(n.createdAt).toLocaleString()} · {n.type}
                  </p>
                </div>
                {!n.isRead && (
                  <Button
                    variant="ghost"
                    className="!px-2 !py-1 text-xs"
                    onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)))}
                  >
                    Mark read
                  </Button>
                )}
              </div>
            </Surface>
          ))}
        </ul>
      )}
    </div>
  );
}
