// Centralized config for the tabs showcased on the team football pages
import dynamic from "next/dynamic";

import OverviewTab from "@/components/team-components/tabs/football/overview";
import ScheduleTab from "@/components/team-components/tabs/football/schedule";
const StatsTab = dynamic(
  () => import("@/components/team-components/tabs/football/stats"),
  {
    ssr: false,
    loading: () => <div>Loading stats...</div>,
  }
);
import PlayersTab from "@/components/team-components/tabs/football/players";

export const FB_TABS = [
  {
    id: "overview",
    label: "Overview",
    component: OverviewTab
  },
  {
    id: "schedule",
    label: "Schedule",
    component: ScheduleTab
  },
  {
    id: "stats",
    label: "Team Stats",
    component: StatsTab
  },
  {
    id: "players",
    label: "Player Leaders",
    component: PlayersTab
  },
];