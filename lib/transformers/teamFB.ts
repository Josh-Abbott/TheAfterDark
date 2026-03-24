import { getCurrentCoachInfo, calculateAllTimeRecord, getBowlData, getRecentSeasons, getPlayerLeaders } from "@/lib/cfbd/cfbdUtils";
import { getSeasonStory, getScheduleSummary, getTeamStats } from "@/lib/analytics/team/analyticsUtils";
import { getLastGame, getNextGame, parseGame, normalizeRank } from "@/lib/espn/espnUtils";
import { calculateStreak } from "@/lib/sports/teamStats"

export function transformFB(teamData: any, scheduleData: any, coachesData: any, recordData: any, matchupData: any, spRatingData: any, draftInfo: any, predictionsInfo: any, teamCFBDInfo: any, playerInfo: any, metadata: any) {
  const team = teamData.team;
  const events = scheduleData.events;

  const lastGame = getLastGame(events);
  const nextGame = getNextGame(events);

  const lastGameParsed = parseGame(lastGame, team.id);
  const nextGameParsed = nextGame ? parseGame(nextGame, team.id) : null;

  const coachInfo = getCurrentCoachInfo(coachesData);
  const allTimeRecord = calculateAllTimeRecord(recordData);
  const bowlInfo = getBowlData(recordData);
  const recentSeasons = getRecentSeasons(recordData);

  const spLookup: Record<string, number> = {}
  spRatingData.forEach((team: { team: string | number; rating: any; }) => {
    spLookup[team.team] = team.rating
  })

  const scheduleSummary = getScheduleSummary(events, team.id, spLookup, predictionsInfo);
  const seasonStory = getSeasonStory(events, team.id, spLookup);

  const teamStats = getTeamStats(events, team.id, team.location, spRatingData, teamCFBDInfo);

  const playerLeaders = getPlayerLeaders(playerInfo);
  console.log(playerLeaders);

  if (!coachInfo) {
    throw new Error("No coach found for this team!");
  }

  // Normalize schedule for frontend, keep key info and store SP+ rating
  const normalizedSchedule = events.map((game: any) => {
    const comp = game.competitions?.[0];
    if (!comp) return null;

    const competitors = comp.competitors;
    const teamComp = competitors.find((c: any) => c.team.id === team.id);
    const oppComp = competitors.find((c: any) => c.team.id !== team.id);
    if (!teamComp || !oppComp) return null;

    const opponentName = oppComp.team.location;
    const opponentRating = spLookup[opponentName] ?? 0;

    const homeAway = teamComp.homeAway;
    const neutral = comp.neutralSite;
    const teamScore = Number(teamComp.score?.value ?? 0);
    const opponentScore = Number(oppComp.score?.value ?? 0);
    const completed = comp.status?.type?.completed ?? false;
    const win = completed && teamScore > opponentScore;

    const prediction = predictionsInfo.find(
      (p: any) => Number(p.gameId) === Number(game.id)
    );

    return {
      id: game.id,
      date: game.date,
      completed,
      homeAway,
      neutral,
      teamScore,
      opponentScore,
      win,
      opponent: opponentName,
      channel: comp.broadcasts?.[0]?.media?.shortName ?? null,
      spRating: opponentRating,
      winProb: prediction,
      tags: seasonStory.games.find((g: any) => g.id === game.id)?.tags ?? [],
    };
  }).filter(Boolean);

  return {
    id: team.id,
    name: team.displayName,
    school: metadata.name,
    city: metadata.city,
    state: metadata.state,
    stadium: metadata.stadium,
    logo: team.logos[0]?.href,
    color: team.color,

    coachName: coachInfo.name,
    coachYear: coachInfo.tenure,

    draftPicks: draftInfo,

    record: {
      overall: lastGameParsed.mainTeam.record[0].displayValue,
      conference: lastGameParsed.mainTeam.record[1].displayValue,
    },

    atRecord: `${allTimeRecord.wins}-${allTimeRecord.losses}-${allTimeRecord.ties}`,
    winPct: (allTimeRecord.wins + (allTimeRecord.ties * 0.5)) / allTimeRecord.total,
    bowlRecord: bowlInfo,

    recentSeasons,

    playerLeaders,

    rival: metadata.rivalries.football,
    rivalRecord: `${matchupData.team1Wins}-${matchupData.team2Wins}-${matchupData.ties}`,
    rivalWinPct: (matchupData.team1Wins + (matchupData.ties * 0.5)) / (matchupData.team1Wins + matchupData.team2Wins + matchupData.ties),

    streak: calculateStreak(events, team.id),
    standing: team.standingSummary,
    rank: normalizeRank(lastGameParsed.mainTeam.curatedRank?.current),

    seasonStory,
    teamStats,

    scheduleSummary,
    spRatingData,
    schedule: normalizedSchedule,

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