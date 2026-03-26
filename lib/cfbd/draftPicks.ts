import { fetchCFBD } from "./client";

export async function getDraftInfoFB(team: string) {
  return fetchCFBD(`/draft/picks?school=${encodeURIComponent(team)}`);
}