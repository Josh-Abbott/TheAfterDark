// Centralized config for the tabs showcased on the team basketball pages
import dynamic from "next/dynamic";

const OverviewTab = dynamic(
  () => import("@/components/team-components/tabs/basketball/overview"),
  {
    ssr: false,
    loading: () => <div className="justify-center text-center">Loading data...</div>,
  }
);

export const BB_TABS = [
  {
    id: "overview",
    label: "Overview",
    component: OverviewTab
  }
];