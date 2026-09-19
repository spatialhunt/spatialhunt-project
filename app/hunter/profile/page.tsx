"use client";

import { useState } from "react";
import { PageHeader, Surface, Input, Textarea, Button, Select } from "@/component/ui/Primitives";
import { useAuthSession } from "@/lib/use-auth-session";
import { MOCK_HUNTER_PROFILE } from "@/mocks";

export default function HunterProfilePage() {
  const session = useAuthSession();
  const profile = MOCK_HUNTER_PROFILE;

  const [fullName, setFullName] = useState(session?.fullName ?? "");
  const [email] = useState(session?.email ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [areas, setAreas] = useState(profile.coverageAreas.join(", "));
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Update your hunter profile visible to landlords and tenants."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <form onSubmit={handleSave} className="space-y-5">
          <Surface>
            <h2 className="mb-4 font-semibold text-[#2E2E2E]">Personal Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input label="Email" value={email} disabled />
            </div>
            <div className="mt-4">
              <Textarea
                label="Bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell landlords and tenants about your experience…"
              />
            </div>
            <div className="mt-4">
              <Input
                label="Coverage Areas (comma-separated)"
                value={areas}
                onChange={(e) => setAreas(e.target.value)}
                placeholder="e.g. Lekki, Yaba, Surulere"
              />
            </div>
          </Surface>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="amber">
              Save Changes
            </Button>
            {saved && (
              <span className="text-sm font-medium text-[#117E25]">
                ✅ Profile saved
              </span>
            )}
          </div>
        </form>

        {/* profile summary card */}
        <div className="space-y-5">
          <Surface>
            <h2 className="mb-3 font-semibold text-[#2E2E2E]">Account Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-[#777777]">Status</span>
                <span className="rounded-[5px] bg-[#DDF2E4] px-2.5 py-1 text-xs font-semibold text-[#117E25]">
                  {profile.status}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#777777]">Tier</span>
                <span className="rounded-[5px] bg-[#FFF6D9] px-2.5 py-1 text-xs font-bold text-[#C99A20]">
                  {profile.tier}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#777777]">Commission rate</span>
                <span className="font-semibold text-[#2E2E2E]">{profile.commissionRate}%</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#777777]">Matches</span>
                <span className="font-semibold text-[#2E2E2E]">{profile.successfulMatches}</span>
              </div>
            </div>
          </Surface>

          <Surface>
            <h2 className="mb-3 font-semibold text-[#2E2E2E]">Tier Benefits</h2>
            <ul className="space-y-2 text-xs text-[#777777]">
              <li className="flex items-start gap-2">
                <span className="text-[#117E25]">✓</span>
                Access to all verified listings
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#117E25]">✓</span>
                In-app lead management tools
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#117E25]">✓</span>
                Automated commission calculation
              </li>
              {profile.tier !== "STARTER" && (
                <li className="flex items-start gap-2">
                  <span className="text-[#117E25]">✓</span>
                  Priority verification queue access
                </li>
              )}
              {profile.tier === "ELITE" && (
                <li className="flex items-start gap-2">
                  <span className="text-[#117E25]">✓</span>
                  Dedicated account manager
                </li>
              )}
            </ul>
          </Surface>
        </div>
      </div>
    </div>
  );
}
