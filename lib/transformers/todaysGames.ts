import { normalizeRank } from "@/lib/espn/espnUtils";

export function transformScoreboard (data: any,sportLabel: string) {
  if (!data.events) return [];

  return data.events.map((event: any) => {
    const competition = event.competitions?.[0];
    const competitors = competition?.competitors || [];

    const home = competitors.find((c: any) => c.homeAway === "home");
    const away = competitors.find((c: any) => c.homeAway === "away");

    const broadcast = competition?.broadcasts?.find(
      (b: any) => b.market === "national"
    );

    const network = broadcast?.names?.[0] ?? null;

    return {
      id: event.id,
      sport: sportLabel,
      status: event.status?.type?.name,
      startTime: event.date,
      network,

      homeTeam: {
        name: home?.team?.displayName ?? "TBD",
        score: home?.score ? Number(home.score) : undefined,
        rank: normalizeRank(home?.curatedRank?.current),
      },

      awayTeam: {
        name: away?.team?.displayName ?? "TBD",
        score: away?.score ? Number(away.score) : undefined,
        rank: normalizeRank(away?.curatedRank?.current),
      },
    };
  });
}