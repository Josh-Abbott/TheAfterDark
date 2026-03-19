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

// Iterate through the /records CFBD data to look for program bowl info
export function getBowlData(recordsData: any[]) {
  let appearances = 0;
  let wins = 0;
  let losses = 0;
  let lastYear: number | null = null;

  for (const season of recordsData) {
    const postseason = season.postseason;
    if (!postseason || postseason.games === 0) continue; // Skip if no bowl game

    appearances += postseason.games;
    wins += postseason.wins;
    losses += postseason.losses;

    // Keep track of most recent bowl year
    if (!lastYear || season.year > lastYear) {
      lastYear = season.year;
    }
  };

  return {
    appearances,
    wins,
    losses,
    lastYear
  };
}

// Iterate through the /records CFBD data and gather the most recent seasons
export function getRecentSeasons(records: any[], numberOfSeasons = 5) {
  // Sort descending by year
  const sorted = records
    .sort((a, b) => b.year - a.year)
    .slice(0, numberOfSeasons); // take only the most recent N seasons

  return sorted.map(season => ({
    year: season.year,
    totalGames: season.total?.games ?? 0,
    wins: season.total?.wins ?? 0,
    losses: season.total?.losses ?? 0,
    winPct: season.total?.games
      ? (season.total.wins / season.total.games)
      : 0,
    expectedWins: season.expectedWins ?? 0,
    postseasonGames: season.postseason?.games ?? 0,
    postseasonWins: season.postseason?.wins ?? 0,
    postseasonLosses: season.postseason?.losses ?? 0
  }));
}