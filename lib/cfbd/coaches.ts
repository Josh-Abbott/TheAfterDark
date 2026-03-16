import { fetchCFBD } from "./client";

export async function getCoachesInfo(team: string) {
  return fetchCFBD(`/coaches?team=${encodeURIComponent(team)}`);
}