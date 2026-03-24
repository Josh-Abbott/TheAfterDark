import { fetchCFBD } from "./client";

export async function getPlayerInfo(team: string) {
  let year = new Date().getFullYear();
  let playerInfo = await fetchCFBD(`/stats/player/season?year=${year}&team=${encodeURIComponent(team)}`);

  // If no events found, default to last year
  if (!playerInfo.length) {
    year -= 1;
    playerInfo = await fetchCFBD(`/stats/player/season?year=${year}&team=${encodeURIComponent(team)}`);
  }

  return playerInfo;
}