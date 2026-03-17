import { SPORTS } from "@/lib/config/sportEndpoints";
import { getScoreboard } from "@/lib/espn/scoreboard";
import { formatDateForESPN } from "@/lib/date/dateUtils";
import { transformScoreboard } from "@/lib/transformers/todaysGames";

export async function getTodaysGames() {
  const date = formatDateForESPN();

  const homepageSports = Object.values(SPORTS).filter(
    (sport) => sport.showOnHomepage
  );

  const responses = await Promise.all(
    homepageSports.map((sport) =>
      getScoreboard(sport.path, date)
    )
  );

  const games = responses.flatMap((data, index) =>
    transformScoreboard(
      data,
      homepageSports[index].label
    )
  );

  return games;
}