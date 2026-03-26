import { fetchCFBD } from "./client";

export async function getMatchupInfoFB(team1: string, team2: string) {
  return fetchCFBD(`/teams/matchup?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`);
}