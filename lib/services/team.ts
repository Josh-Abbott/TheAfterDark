import { SPORTS } from "@/lib/config/sportEndpoints";
import { PAC_TEAMS } from "@/lib/config/pac12Teams";

import { getSchedule } from "@/lib/espn/schedule";
import { getTeam } from "@/lib/espn/team";

import { getCoachesInfoFB } from "@/lib/cfbd/coaches";
import { getRecordInfoFB } from "@/lib/cfbd/records";
import { getRatingInfoFB } from "@/lib/cfbd/rating";
import { getMatchupInfoFB } from "@/lib/cfbd/matchup";
import { getDraftInfoFB } from "@/lib/cfbd/draftPicks";
import { getMetricsInfoFB } from "@/lib/cfbd/metrics";
import { getTeamInfoFB } from "@/lib/cfbd/team";
import { getPlayerInfoFB } from "@/lib/cfbd/player";

import { getTeamInfoBB } from "@/lib/cbbd/team";

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
    const [teamCBBDInfo] = await Promise.all([
      getTeamInfoBB(teamName),
    ]);
    
    transformedTeam = transformBB(sportName, teamData, scheduleData, team);
  } else if (sport.path === "football/college-football") {

    const rival = team.rivalries?.football;

    const [coachesData, recordData, spRatingInfo, draftInfo, predictionInfo, teamCFBDInfo, playerInfo, matchupData,] = await Promise.all([
      getCoachesInfoFB(teamName),
      getRecordInfoFB(teamName),
      getRatingInfoFB("SP+"),
      getDraftInfoFB(teamName),
      getMetricsInfoFB("wp/pregame", teamName),
      getTeamInfoFB(teamName),
      getPlayerInfoFB(teamName),
      rival ? getMatchupInfoFB(teamName, rival) : Promise.resolve(null)
    ]);

    transformedTeam = transformFB(teamData, scheduleData, coachesData, recordData, matchupData, spRatingInfo, draftInfo, predictionInfo, teamCFBDInfo, playerInfo, team);
  } else if (sport.path === "baseball/college-baseball") {
    transformedTeam = transformBaseB(teamData, scheduleData);
  } else {
    throw new Error(`No transformer found for sport: ${sport.path}`);
  }

  return {
    team: transformedTeam,
  };
}