// Centralized config for the tabs showcased on the team basketball pages

import OverviewTab from "@/components/team-components/tabs/football/overview"; // temp set to fb for testing
import ScheduleTab from "@/components/team-components/tabs/football/schedule";
import StatsTab from "@/components/team-components/tabs/football/stats";
import PlayersTab from "@/components/team-components/tabs/football/players";

export const BB_TABS = [
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