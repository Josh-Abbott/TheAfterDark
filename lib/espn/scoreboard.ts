import { fetchESPN } from "./client";

export async function getScoreboard(sportPath: string, date: string, filterbyTeamId?: number) {
  let url = `${sportPath}/scoreboard?dates=${date}&groups=50`;
  if (filterbyTeamId) {
    url += `&teamId=${filterbyTeamId}`;
  }
  return fetchESPN(url);
}