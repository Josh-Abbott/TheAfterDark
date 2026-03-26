import { fetchCFBD } from "./client";

export async function getRecordInfoFB(team: string) {
  return fetchCFBD(`/records?team=${encodeURIComponent(team)}`);
}