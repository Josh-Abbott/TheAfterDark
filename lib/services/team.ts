import { SPORTS } from "@/lib/config/sportEndpoints";
import { PAC_TEAMS } from "@/lib/config/pac12Teams";

import { getSchedule } from "@/lib/espn/schedule";
import { getTeam } from "@/lib/espn/team";
import { getCoachesInfo } from "@/lib/cfbd/coaches";
import { getRecordInfo } from "@/lib/cfbd/records";
import { getRatingInfo } from "@/lib/cfbd/rating";
import { getMatchupInfo } from "@/lib/cfbd/matchup";
import { getDraftInfo } from "@/lib/cfbd/draftPicks";

import { transformBB } from "@/lib/transformers/teamBB";
import { transformFB } from "@/lib/transformers/teamFB";
import { transformBaseB } from "@/lib/transformers/teamBaseB";

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

  const teamSport = team.sports.find((s) => s.name === sport.label);

  if (!teamSport) {
    throw new Error("Team sport not found!");
  }

  const [teamData, scheduleData] = await Promise.all([
    getTeam(sport.path, teamSport.id),
    getSchedule(sport.path, teamSport.id)
  ]);

  let transformedTeam;

  if (sport.path === "basketball/mens-college-basketball" || sport.path === "basketball/womens-college-basketball") {
    transformedTeam = transformBB(teamData, scheduleData);
  } else if (sport.path === "football/college-football") {

    const rival = team.rivalries?.football;

    const [coachesData, recordData, spRatingInfo, draftInfo, matchupData] = await Promise.all([
      getCoachesInfo(teamName),
      getRecordInfo(teamName),
      getRatingInfo("SP+"),
      getDraftInfo(teamName),
      rival ? getMatchupInfo(teamName, rival) : Promise.resolve(null)
    ]);

    const spLookup: Record<string, number> = {}

    spRatingInfo.forEach((team: { team: string | number; rating: any; }) => {
      spLookup[team.team] = team.rating
    })

    transformedTeam = transformFB(teamData, scheduleData, coachesData, recordData, matchupData, spLookup, draftInfo, team);
  } else if (sport.path === "baseball/college-baseball") {
    transformedTeam = transformBaseB(teamData, scheduleData);
  } else {
    throw new Error(`No transformer found for sport: ${sport.path}`);
  }

  return {
    team: transformedTeam,
  };
}