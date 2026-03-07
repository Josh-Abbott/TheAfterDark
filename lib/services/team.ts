import { SPORTS } from "@/lib/config/sportEndpoints";
import { PAC_TEAMS } from "@/lib/config/pac12Teams";
import { getSchedule } from "@/lib/espn/schedule";
import { getTeam } from "@/lib/espn/team";
import { transformBB } from "@/lib/transformers/teamBB";

export async function getTeamData(teamName: string, sportName: string) {

  const team = Object.values(PAC_TEAMS).find(
    (t) => t.name === teamName
  );
  const sport = Object.values(SPORTS).find(
    (sport) => sport.label === sportName
  );

  if (!team || !sport) {
    throw new Error("Team or sport not found!");
  }

  const [teamData, scheduleData] = await Promise.all([
    getTeam(sport.path, team.id),
    getSchedule(sport.path, team.id)
  ]);

  let transformedTeam;

  if (sport.path === "basketball/mens-college-basketball" || sport.path === "basketball/womens-college-basketball") {
    transformedTeam = transformBB(teamData, scheduleData);
  } else {
    throw new Error(`No transformer found for sport: ${sport.path}`);
  }

  return {
    team: transformedTeam,
  };
}