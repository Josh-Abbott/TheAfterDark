import { getLastGame, getNextGame, parseGame, normalizeRank } from "@/lib/utils";

export function transformBB(teamData: any, scheduleData: any) {
  const team = teamData.team;
  const events = scheduleData.events;

  const lastGame = getLastGame(events);
  const nextGame = getNextGame(events);

  const lastGameParsed = parseGame(lastGame, team.id);
  const nextGameParsed = nextGame ? parseGame(nextGame, team.id) : null;

  return {
    id: team.id,
    name: team.displayName,
    logo: team.logo,
    color: team.color,
    record: {
      overall: team.record.items[0].summary,
      conference: lastGameParsed.mainTeam.record[1].displayValue,
    },
    streak: team.record.items[0].stats.find((s: any) => s.name === "streak")?.value,
    standing: team.standingSummary,
    rank: normalizeRank(lastGameParsed.mainTeam.curatedRank?.current),
    lastGame: lastGame ? {
      oppTeam: lastGameParsed.oppTeam.team.abbreviation,
      oppWin: lastGameParsed.oppTeam.winner,
      oppScore: lastGameParsed.oppTeam.score.displayValue,
      mainScore: lastGameParsed.mainTeam.score.displayValue,
      homeAway: lastGameParsed.mainTeam.homeAway,
      date: new Date(lastGame.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    } : null,
    nextGame: nextGame && nextGameParsed ? {
      oppTeam: nextGameParsed.oppTeam.team.abbreviation,
      homeAway: nextGameParsed.mainTeam.homeAway,
      date: new Date(nextGame.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      time: new Date(nextGame.date).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
    } : null,
  };
}