import { getCurrentCoachInfo, calculateAllTimeRecord, getBowlData, getRecentSeasons, getPlayerLeaders, getBestSeason } from "@/lib/cfbd/cfbdUtils";
import { getSeasonStory, getScheduleSummary, getTeamStats } from "@/lib/analytics/team/analyticsUtils";
import { getLastGame, getNextGame, parseGame, normalizeRank } from "@/lib/espn/espnUtils";
import { calculateStreak } from "@/lib/sports/teamStats";

// Type Definitions
interface TeamData {
  team: {
    id: number;
    displayName: string;
    location: string;
    logos: { href: string }[];
    color: string;
    alternateColor: string;
    standingSummary: any;
  };
}

interface ScheduleData {
  events: any[];
}

interface Metadata {
  name: string;
  mascot?: {
    name?: string;
    year?: number;
  }
  fightSong?: {
    name?: string;
    year?: number;
  }
  city: string;
  state: string;
  stadium?: {
    name?: string;
    capacity?: number;
  };
  confHistory?: string[];
  traditions?: any;
  alumni?: any;
  rivalries?: any;
  sports: any;
}

interface SPTeamRating {
  team: string;
  rating: number;
}

// Create the spLookup to grab SP+ info for teams
function buildSpLookup(spRatingData: SPTeamRating[]): Record<string, number> {
  const spLookup: Record<string, number> = {};
  spRatingData?.forEach((team) => {
    spLookup[team.team] = team.rating;
  });
  return spLookup;
}

// Normalize schedule for frontend, keep key info and store SP+ rating
function normalizeSchedule(events: any[], teamId: number, spLookup: Record<string, number>, predictionsInfo: any[], seasonStory: any) {
  return events
    .map((game) => {
      const comp = game.competitions?.[0];
      if (!comp) return null;

      const competitors = comp?.competitors;
      const teamComp = competitors?.find((c: any) => c.team.id === teamId);
      const oppComp = competitors?.find((c: any) => c.team.id !== teamId);
      if (!teamComp || !oppComp) return null;

      const opponentName = oppComp?.team?.location;
      const opponentRating = spLookup[opponentName] ?? 0;
      const homeAway = teamComp?.homeAway;
      const neutral = comp?.neutralSite;
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
    })
    .filter(Boolean);
}

function formatGameForFrontend(gameParsed: any, gameRaw: any) {
  if (!gameParsed) return null;

  return {
    oppTeam: gameParsed?.oppTeam?.team?.abbreviation,
    oppWin: gameParsed?.oppTeam?.winner,
    oppScore: gameParsed?.oppTeam?.score?.displayValue,
    mainScore: gameParsed?.mainTeam?.score?.displayValue,
    homeAway: gameParsed?.mainTeam?.homeAway,
    date: new Date(gameRaw?.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
  };
}

function formatNextGameForFrontend(nextGameParsed: any, nextGameRaw: any) {
  if (!nextGameParsed) return null;

  return {
    oppTeam: nextGameParsed?.oppTeam?.team?.abbreviation,
    homeAway: nextGameParsed?.mainTeam?.homeAway,
    date: new Date(nextGameRaw?.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    time: new Date(nextGameRaw?.date).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
  };
}

function computeRivalStats(matchupData: any) {
  const totalGames = (matchupData?.team1Wins ?? 0) + (matchupData?.team2Wins ?? 0) + (matchupData?.ties ?? 0);
  const games = Array.isArray(matchupData.games) ? [...matchupData.games] : [];

  const sortedMatchups = games
    .filter((game: any) => game?.date)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const mostRecentMatchup = sortedMatchups[sortedMatchups.length - 1] ?? null;

  let streakType: "win" | "loss" | "tie" | null = null;
  let streakCount = 0;

  for (let i = sortedMatchups.length - 1; i >= 0; i--) {
    const game = sortedMatchups[i];
    if (!game?.winner) break;

    const result = game.winner === matchupData.team1 ? "win" : game.winner === matchupData.team2 ? "loss" : "tie";
    if (streakType === null) {
      streakType = result;
      streakCount = 1;
    } else if (result === streakType) {
      streakCount += 1;
    } else {
      break;
    }
  }

  const formattedStreak = streakType
    ? `${streakType === "win" ? "W" : streakType === "loss" ? "L" : "T"}${streakCount}`
    : null;

  return {
    rivalRecord: `${matchupData?.team1Wins ?? 0}-${matchupData?.team2Wins ?? 0}-${matchupData?.ties ?? 0}`,
    rivalWinPct: totalGames > 0 ? ((matchupData?.team1Wins ?? 0) + ((matchupData?.ties ?? 0) * 0.5)) / totalGames : 0,
    rivalRecentMatchup: mostRecentMatchup?.season ?? null,
    rivalStreak: formattedStreak,
  };
}

// Main Transformer
export function transformFB(teamData: TeamData, scheduleData: ScheduleData, coachesData: any[], recordData: any, matchupData: any, spRatingData: SPTeamRating[], draftInfo: any[], predictionsInfo: any[], teamCFBDInfo: any, playerInfo: any[], metadata: Metadata) {
  const team = teamData?.team ?? {};
  const events = scheduleData?.events;

  // Last and next games
  const lastGame = getLastGame(events);
  const nextGame = getNextGame(events);

  const lastGameParsed = parseGame(lastGame, team.id);
  const nextGameParsed = nextGame ? parseGame(nextGame, team.id) : null;

  // Coach and records
  const coachInfo = getCurrentCoachInfo(coachesData);
  if (!coachInfo) throw new Error("No coach found for this team!");

  const allTimeRecord = calculateAllTimeRecord(recordData);
  const bowlInfo = getBowlData(recordData);
  const recentSeasons = getRecentSeasons(recordData);
  const bestSeason = getBestSeason(recordData);

  // SP+ ratings lookup
  const spLookup = buildSpLookup(spRatingData);

  // Analytics
  const scheduleSummary = getScheduleSummary(events, team.id, spLookup, predictionsInfo);
  const seasonStory = getSeasonStory(events, team.id, spLookup);
  const teamStats = getTeamStats(events, team.id, team.location, spRatingData, teamCFBDInfo);

  // Players
  const playerLeaders = getPlayerLeaders(playerInfo);

  // Normalized schedule
  const normalizedSchedule = normalizeSchedule(events, team.id, spLookup, predictionsInfo, seasonStory);

  // Get rivalry info
  const rivalryData = metadata?.rivalries.find((s: any) => s.sport === "Football")

  // Rival stats
  const {rivalRecord, rivalWinPct, rivalRecentMatchup, rivalStreak,} = computeRivalStats(matchupData);

  return {
    id: team.id,
    name: team.displayName,
    school: metadata?.name,
    mascot: metadata?.mascot,
    fightSong: metadata?.fightSong,
    city: metadata?.city,
    state: metadata?.state,
    stadium: metadata?.stadium,
    logo: team.logos[0]?.href,
    color: team.color,
    alternateColor: team.alternateColor,

    confHistory: metadata?.confHistory,

    coachName: coachInfo?.name,
    coachYear: coachInfo?.tenure,

    draftPicks: draftInfo,

    traditions: metadata?.traditions,

    alumni: metadata?.alumni,

    record: {
      overall: lastGameParsed?.mainTeam?.record[0]?.displayValue,
      conference: lastGameParsed?.mainTeam?.record[1]?.displayValue,
    },

    bestSeason: bestSeason,
    atRecord: `${allTimeRecord?.wins}-${allTimeRecord?.losses}-${allTimeRecord?.ties}`,
    winPct: (allTimeRecord?.wins + allTimeRecord?.ties * 0.5) / allTimeRecord?.total,
    bowlRecord: bowlInfo,

    recentSeasons,
    playerLeaders,

    rivalry: rivalryData,
    rivalRecord,
    rivalWinPct,
    rivalRecentMatchup,
    rivalStreak,

    streak: calculateStreak(events, team.id),
    standing: team.standingSummary,
    rank: normalizeRank(lastGameParsed?.mainTeam?.curatedRank?.current),

    seasonStory,
    teamStats,

    scheduleSummary,
    spRatingData,
    schedule: normalizedSchedule,

    lastGame: lastGame ? formatGameForFrontend(lastGameParsed, lastGame) : null,
    nextGame: nextGame && nextGameParsed ? formatNextGameForFrontend(nextGameParsed, nextGame) : null,
  };
}