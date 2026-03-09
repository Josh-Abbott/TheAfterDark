import { fetchESPN } from "./client";

export async function getSchedule(sportPath: string, teamId: number) {
  let schedule = await fetchESPN(`${sportPath}/teams/${teamId}/schedule`);

  if (!schedule.events?.length) {
    const year = new Date().getFullYear() - 1;
    schedule = await fetchESPN(`${sportPath}/teams/${teamId}/schedule?season=${year}`);
  }

  return schedule;
}