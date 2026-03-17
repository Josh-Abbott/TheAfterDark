import { PAC_TEAMS } from "@/lib/config/pac12Teams";

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