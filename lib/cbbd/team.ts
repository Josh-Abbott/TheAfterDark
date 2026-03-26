import { fetchCBBD } from "./client";

export async function getTeamInfoBB(team: string) {
  let year = new Date().getFullYear();
  let teamInfo = await fetchCBBD(`/games/teams?team=${encodeURIComponent(team)}&season=${year}`);

  // If no events found, default to last year
  if (!teamInfo.length) {
    year -= 1;
    teamInfo = await fetchCBBD(`/games/teams?team=${encodeURIComponent(team)}&season=${year}`);
  }

  return teamInfo;
}