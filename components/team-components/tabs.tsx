"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

  // Get current tab from URL
  const activeTab = searchParams.get("tab") || "overview";

  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="justify-center text-center text-3xl md:text-4xl mb-8">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`px-4 py-2 ${activeTab === tab.id ? "border-b-2 border-white font-bold" : ""
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content (Components) */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p>Overview content for {team} {sport}</p>
          </div>
        )}

        {activeTab === "schedule" && (
          <div>
            <h2 className="text-xl font-semibold">Schedule & Results</h2>
            <p>Schedule component will go here.</p>
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <h2 className="text-xl font-semibold">Team Stats</h2>
            <p>Advanced stats component will go here.</p>
          </div>
        )}

        {activeTab === "players" && (
          <div>
            <h2 className="text-xl font-semibold">Player Leaders</h2>
            <p>Player stats component will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamTabs;