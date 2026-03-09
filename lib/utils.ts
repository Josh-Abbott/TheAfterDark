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
    .filter((e) => e.competitions[0].status.type.completed)
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