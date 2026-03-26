import { fetchCFBD } from "./client";

export async function getCoachesInfoFB(team: string) {
  return fetchCFBD(`/coaches?team=${encodeURIComponent(team)}`);
}