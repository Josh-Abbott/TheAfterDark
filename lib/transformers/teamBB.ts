import { getLastGame, getNextGame, parseMBBGame, normalizeRank } from "@/lib/utils";

export function transformBB(teamData: any, scheduleData: any) {
  const team = teamData.team;
  const events = scheduleData.events;

  //console.log("Transforming team data:", data);

  const lastGame = getLastGame(events);
  const nextGame = getNextGame(events);
  const lastGameParsed = parseMBBGame(lastGame, team.id);
  
  return {
    id: team.id,
    name: team.displayName,
    logo: team.logo,
    color: team.color,
    record: {
      overall: team.record.items[0].summary,
      conference: lastGameParsed.mainTeam.record[1].displayValue,
    },
    streak: team.record.items[0].stats.find((s: any) => s.name === "streak")?.value || null,
    standing: team.standingSummary,
    rank: normalizeRank(lastGameParsed.mainTeam.curatedRank?.current),
  };
}