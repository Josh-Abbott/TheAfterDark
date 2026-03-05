import { fetchESPN } from "./client";

export async function getScoreboard(sportPath: string, date: string) {
  return fetchESPN(`${sportPath}/scoreboard?dates=${date}&groups=50`);
}