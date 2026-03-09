import { fetchESPN } from "./client";

export async function getSchedule(sportPath: string, teamId: number) {
  let schedule = await fetchESPN(`${sportPath}/teams/${teamId}/schedule`);
  let bowls = await fetchESPN(`${sportPath}/teams/${teamId}/schedule?seasontype=3`);

  // If no events found, default to last year
  if (!schedule.events?.length) {
    const year = new Date().getFullYear() - 1;
    schedule = await fetchESPN(`${sportPath}/teams/${teamId}/schedule?season=${year}`);
    bowls = await fetchESPN(`${sportPath}/teams/${teamId}/schedule?season=${year}&seasontype=3`);

  }

  const mergedEvents = [
    ...(schedule.events || []),
    ...(bowls?.events || []),
  ];
  
  return {
    ...schedule,
    events: mergedEvents,
  };
}