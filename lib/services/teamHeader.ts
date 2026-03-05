import { SPORTS } from "@/lib/config/sportEndpoints";
import { PAC_TEAMS } from "@/lib/config/pac12Teams";
import { getTeam } from "@/lib/espn/team";
import { transformTeam } from "@/lib/transformers/team";

export async function getTeamHeader(teamName: string, sportName: string) {

  const team = Object.values(PAC_TEAMS).find(
    (t) => t.name === teamName
  );
  const sport = Object.values(SPORTS).find(
    (sport) => sport.label === sportName
  );

  console.log("Team found in config:", team);
  console.log("Sport found in config:", sport);

  if (!team || !sport) {
    throw new Error("Team or sport not found!");
  }

  const responses = await getTeam(sport.path, team.id);
  const teamInfo = transformTeam(responses);

  return teamInfo;
}