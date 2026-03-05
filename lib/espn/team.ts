import { fetchESPN } from "./client";

export async function getTeam(sportPath: string, teamId: number) {
  return fetchESPN(`${sportPath}/teams/${teamId}`);
}