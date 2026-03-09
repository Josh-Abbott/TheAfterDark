import { getLastGame, getNextGame, parseGame, normalizeRank, calculateStreak } from "@/lib/utils";

export function transformFB(teamData: any, scheduleData: any) {
  const team = teamData.team;
  const events = scheduleData.events;

  console.log("Team:", team);
  console.log("Events:", scheduleData);

  const lastGame = getLastGame(events);
  const nextGame = getNextGame(events);

  const lastGameParsed = parseGame(lastGame, team.id);
  const nextGameParsed = nextGame ? parseGame(nextGame, team.id) : null;

  console.log("Last Game:", lastGameParsed);
  console.log("Next Game:", nextGameParsed);

  return {
    id: team.id,
    name: team.displayName,
    logo: team.logos[0].href,
    color: team.color,
    record: {
      overall: lastGameParsed.mainTeam.record[0].displayValue,
      conference: lastGameParsed.mainTeam.record[1].displayValue,
    },
    streak: calculateStreak(events, team.id),
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