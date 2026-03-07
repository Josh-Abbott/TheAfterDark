import { fetchESPN } from "./client";

export async function getSchedule(sportPath: string, teamId: number) {
  return fetchESPN(`${sportPath}/teams/${teamId}/schedule`);
}