import { fetchESPN } from "./client";

export async function getSchedule(sportPath: string, teamId: number) {
  let schedule = await fetchESPN(`${sportPath}/teams/${teamId}/schedule`);

  let postseason: any = { events: [] };

  if (sportPath === "football/college-football") {
    postseason = await fetchESPN(`${sportPath}/teams/${teamId}/schedule?seasontype=3`);
  }

  // If no events found, default to last year
  if (!schedule.events?.length) {
    let year = new Date().getFullYear();
    if (!sportPath.includes("basketball")) {
      year -= 1;
    }
    schedule = await fetchESPN(`${sportPath}/teams/${teamId}/schedule?season=${year}&seasontype=2`);

    if (sportPath === "football/college-football") {
      postseason = await fetchESPN(`${sportPath}/teams/${teamId}/schedule?season=${year}&seasontype=3`);
    }
  }

  const mergedEvents = [
    ...(schedule.events || []),
    ...(postseason?.events || []),
  ];

  return {
    ...schedule,
    events: mergedEvents,
  };
}