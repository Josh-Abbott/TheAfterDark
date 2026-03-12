"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type TabsProps = {
  teamInfo: any;
  team: string;
  sport: string;
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "schedule", label: "Schedule" },
  { id: "stats", label: "Team Stats" },
  { id: "players", label: "Player Leaders" },
];

const TeamTabs = ({ teamInfo, team, sport }: TabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Make sure to get valid current tab from URL
  const tabParam = searchParams.get("tab");
  const activeTab = tabs.some(t => t.id === tabParam) ? tabParam : "overview";

  return (
    <div className="justify-center text-center text-3xl md:text-4xl mb-8">
      <div className="flex gap-4">
        {/* Tab Buttons Creation */}
        {tabs.map((tab) => (
          <Link
            href={`?tab=${tab.id}`}
            key={tab.id}
            scroll={false}
            className={`px-4 py-2 ${activeTab === tab.id ? "border-b-2 border-white font-bold" : ""
              }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Tab Content (Components) */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div>
            <p>Overview content for {team} {sport}</p>
          </div>
        )}

        {activeTab === "schedule" && (
          <div>
            <p>Schedule component will go here.</p>
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <p>Advanced stats component will go here.</p>
          </div>
        )}

        {activeTab === "players" && (
          <div>
            <p>Player stats component will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamTabs;