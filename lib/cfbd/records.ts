import { fetchCFBD } from "./client";

export async function getRecordInfo(team: string) {
  return fetchCFBD(`/records?team=${encodeURIComponent(team)}`);
}