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