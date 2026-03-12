"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { FB_TABS } from "@/lib/config/teamTabs/footballTabs";
import { BB_TABS } from "@/lib/config/teamTabs/basketballTabs";

type TabsProps = {
  teamInfo: any;
  sport: string;
};

const TeamTabs = ({ teamInfo, sport }: TabsProps) => {
  const tabs =
    sport.toLowerCase() === "football"
      ? FB_TABS
      : BB_TABS;

  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const activeTab =
    tabs.find(tab => tab.id === tabParam) ?? tabs[0];

  const ActiveComponent = activeTab.component;

  return (
    <div className="justify-center text-center text-3xl md:text-4xl mb-8">
      <div className="flex gap-4">
        {/* Tab Buttons Creation */}
        {tabs.map((tab) => (
          <Link
            href={`?tab=${tab.id}`}
            key={tab.id}
            scroll={false}
            className={`px-4 py-2 ${tab.id === activeTab.id
                ? "border-b-2 border-white font-bold"
                : ""
              }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Tab Content (Components) */}
      <div className="mt-6">
        <ActiveComponent teamInfo={teamInfo} sport={sport} />
      </div>
    </div>
  );
};

export default TeamTabs;