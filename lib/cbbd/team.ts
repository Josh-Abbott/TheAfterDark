import { fetchCBD } from "./client";
import { formatTeamName } from "@/lib/cbbd/cbbdUtils";

export async function getScheduleTest(team: string, year: number) {
  const formattedTeam = formatTeamName(team);

  return fetchCBD(
    `torvik/team_schedules?team=${formattedTeam}&year=${year}`
  );
}