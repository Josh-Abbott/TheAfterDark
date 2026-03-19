import { fetchCFBD } from "./client";

export async function getDraftInfo(team: string) {
  return fetchCFBD(`/draft/picks?school=${encodeURIComponent(team)}`);
}