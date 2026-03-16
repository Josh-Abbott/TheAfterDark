import { getLastGame, getNextGame, parseGame, normalizeRank, calculateStreak, getCurrentCoachInfo, calculateAllTimeRecord } from "@/lib/utils";
import { match } from "assert";

export function transformFB(teamData: any, scheduleData: any, coachesData: any, recordData: any, matchupData: any, metadata: any) {
  const team = teamData.team;
  const events = scheduleData.events;

  const lastGame = getLastGame(events);
  const nextGame = getNextGame(events);

  const lastGameParsed = parseGame(lastGame, team.id);
  const nextGameParsed = nextGame ? parseGame(nextGame, team.id) : null;

  const coachInfo = getCurrentCoachInfo(coachesData);
  const allTimeRecord = calculateAllTimeRecord(recordData);

  if (!coachInfo) {
    throw new Error("No coach found for this team!");
  }

  return {
    id: team.id,
    name: team.displayName,
    school: metadata.name,
    city: metadata.city,
    state: metadata.state,
    stadium: metadata.stadium,
    logo: team.logos[0].href,
    color: team.color,

    coachName: coachInfo.name,
    coachYear: coachInfo.tenure,

    record: {
      overall: lastGameParsed.mainTeam.record[0].displayValue,
      conference: lastGameParsed.mainTeam.record[1].displayValue,
    },
    atRecord: `${allTimeRecord.wins}-${allTimeRecord.losses}-${allTimeRecord.ties}`,
    winPct: (allTimeRecord.wins + (allTimeRecord.ties * 0.5)) / allTimeRecord.total,

    rival: metadata.rivalries.football,
    rivalRecord: `${matchupData.team1Wins}-${matchupData.team2Wins}-${matchupData.ties}`,
    rivalWinPct: (matchupData.team1Wins + (matchupData.ties * 0.5)) / (matchupData.team1Wins + matchupData.team2Wins + matchupData.ties),

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