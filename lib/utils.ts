import { PAC_TEAMS } from "@/lib/config/pac12Teams";

// ESPN API requires date in YYYYMMDD format
function formatDateForESPN(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}
export { formatDateForESPN };

// ESPN sets unranked teams to 99, need to convert back to null for frontend
function normalizeRank(rank?: number) {
  if (!rank || rank === 99) return null;
  return rank;
}
export { normalizeRank };

// Gets the last played game
export function getLastGame(events: any[]) {
  return [...events].reverse().find(e => e.competitions[0].status.type.name === "STATUS_FINAL") || null;
}

// Gets the next scheduled game
export function getNextGame(events: any[]) {
  return events.find((event: {
    competitions: any; status: { type: { name: string; }; };
  }) =>
    event.competitions[0].status.type.name === "STATUS_SCHEDULED" ||
    event.competitions[0].status.type.name === "STATUS_IN_PROGRESS"
  ) || null;
}

// Parses a game to extract relevant info for team page
export function parseGame(event: any, teamId: number) {
  const competition = event.competitions[0];

  const team = competition.competitors.find(
    (c: { team: { id: string; }; }) => c.team.id === String(teamId)
  );

  const opponent = competition.competitors.find(
    (c: { team: { id: string; }; }) => c.team.id !== String(teamId)
  );

  return {
    mainTeam: team,
    oppTeam: opponent,
  };
}

// Calculates current team's streak if info isn't provided in API
export function calculateStreak(events: any[], teamId: number): number {
  const completed = events
    .filter((e) => e.competitions[0].status.type.name === "STATUS_FINAL")
    .reverse(); // most recent first

  if (completed.length === 0) return 0;

  let streak = 0;
  let direction: number | null = null;

  for (const event of completed) {
    const comp = event.competitions[0];
    const team = comp.competitors.find((c: any) => c.team.id == teamId);

    const result = team.winner ? 1 : -1;

    if (direction === null) {
      direction = result;
    }

    if (result !== direction) {
      break;
    }

    streak += result;
  }

  return streak;
}

// Calculates the current record of the program using their schedule, can work for conference or overall
export function calculateRecord(events: any[], teamId: number, sportName: string, conferenceOnly = false) {
  const completed = events
    .filter((e) => e.competitions[0].status.type.name === "STATUS_FINAL")
    .reverse(); // most recent first

  if (completed.length === 0) return "0-0";

  let wins = 0;
  let losses = 0;

  // Create set of Pac-12 teams & their IDs for checking conf games
  const pac12TeamIds = new Set(
    PAC_TEAMS.flatMap((team) =>
      team.sports
        .filter((s) => s.name === sportName)
        .map((s) => s.id)
    )
  );

  for (const event of completed) {
    const comp = event.competitions[0];
    const team = comp.competitors.find((c: any) => c.team.id == teamId);
    const opponent = comp.competitors.find((c: any) => c.team.id != teamId);

    if (conferenceOnly && !pac12TeamIds.has(Number(opponent.team.id))) {
      continue; // skip non-conference games
    }

    const result = team.winner ? 1 : -1;

    if (result === 1) {
      wins++;
    } else {
      losses++;
    }
  }

  return `${wins}-${losses}`;
}

// Search for most recent/current coach and gather info on them from CFBD data (FOOTBALL ONLY FOR NOW)
export function getCurrentCoachInfo(coachesData: any[]) {
  let latestYear = 0;

  for (const coach of coachesData) {
    for (const season of coach.seasons || []) {
      if (season.year > latestYear) {
        latestYear = season.year;
      }
    }
  }

  const currentCoach = coachesData.find(coach =>
    coach.seasons?.some((season: { year: number; }) => season.year === latestYear)
  );

  if (!currentCoach) return null;

  return {
    name: `${currentCoach.firstName} ${currentCoach.lastName}`,
    firstYear: Math.min(...currentCoach.seasons.map((s: any) => s.year)),
    tenure: currentCoach.seasons.length
  };
}

// Iterate through the /records CFBD data to calculate all time record (FOOTBALL ONLY FOR NOW)
export function calculateAllTimeRecord(recordsData: any[]) {
  let total = 0;
  let wins = 0;
  let losses = 0;
  let ties = 0;

  for (const season of recordsData) {
    total += season.total.games ?? 0;
    wins += season.total.wins ?? 0;
    losses += season.total.losses ?? 0;
    ties += season.total.ties ?? 0;
  }

  return {
    total,
    wins,
    losses,
    ties,
  };
}
