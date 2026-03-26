import { fetchCFBD } from "./client";

export async function getTeamInfoFB(team: string) {
  let year = new Date().getFullYear();
  let teamInfo = await fetchCFBD(`/games/teams?year=${year}&team=${encodeURIComponent(team)}`);

  // If no events found, default to last year
  if (!teamInfo.length) {
    year -= 1;
    teamInfo = await fetchCFBD(`/games/teams?year=${year}&team=${encodeURIComponent(team)}`);
  }

  return teamInfo;
}