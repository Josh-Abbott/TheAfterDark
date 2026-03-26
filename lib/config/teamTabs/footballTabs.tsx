// Centralized config for the tabs showcased on the team football pages
import dynamic from "next/dynamic";

const OverviewTab = dynamic(
  () => import("@/components/team-components/tabs/football/overview"),
  {
    ssr: false,
    loading: () => <div className="justify-center text-center">Loading data...</div>,
  }
); 
const ScheduleTab = dynamic(
  () => import("@/components/team-components/tabs/football/schedule"),
  {
    ssr: false,
    loading: () => <div className="justify-center text-center">Loading schedule...</div>,
  }
); 
const StatsTab = dynamic(
  () => import("@/components/team-components/tabs/football/stats"),
  {
    ssr: false,
    loading: () => <div className="justify-center text-center">Loading stats...</div>,
  }
);
const PlayersTab = dynamic(
  () => import("@/components/team-components/tabs/football/players"),
  {
    ssr: false,
    loading: () => <div className="justify-center text-center">Loading player data...</div>,
  }
);

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