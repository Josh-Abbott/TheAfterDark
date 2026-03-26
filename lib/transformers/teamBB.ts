import { getLastGame, getNextGame, parseGame, normalizeRank } from "@/lib/espn/espnUtils";

// Type Definitions
interface TeamData {
  team: {
    id: number;
    displayName: string;
    location: string;
    logos: { href: string }[];
    color: string;
    standingSummary: any;
    record: any;
  };
}

interface ScheduleData {
  events: any[];
}

interface Metadata {
  name: string;
  city: string;
  state: string;
  arena?: {
    name?: string;
    capacity?: number;
  };
  rivalries?: {
    football?: string;
    basketball?: string;
  };
  sports: any;
}

// Main Transformer
export function transformBB(sportName: string, teamData: TeamData, scheduleData: ScheduleData, metadata: Metadata) {
  const team = teamData?.team ?? {};
  const events = scheduleData?.events;

  const sportData = metadata?.sports.find((s: any) => s.name === sportName)

  const lastGame = getLastGame(events);
  const nextGame = getNextGame(events);

  const lastGameParsed = parseGame(lastGame, team.id);
  const nextGameParsed = nextGame ? parseGame(nextGame, team.id) : null;

  const currentDate = new Date();

  return {
    id: team.id,
    name: team.displayName,
    school: metadata?.name,
    city: metadata?.city,
    state: metadata?.state,
    arena: metadata?.arena,
    logo: team.logos[0]?.href,
    color: team.color,

    coachName: sportData?.coach,
    coachYear: Math.abs(sportData?.coachStart - currentDate.getFullYear()),

    rival: metadata?.rivalries?.basketball,

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