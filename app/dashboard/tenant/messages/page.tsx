"use client";

import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { ConversationList } from "@/component/messaging/Messaging";
import { PageHeader } from "@/component/ui/Primitives";
import { MOCK_CONVERSATIONS } from "@/mocks";

export default function MessagesPage() {
  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Messages"
        description="Chat with landlords in-app. Your phone number stays private."
      />
      <div className="h-[min(70vh,640px)]">
        <ConversationList
          conversations={MOCK_CONVERSATIONS}
          basePath="/dashboard/tenant/messages"
        />
      </div>
    </TenantDashboardLayout>
  );
}
