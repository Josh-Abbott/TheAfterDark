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

// Iterate through the schcedule of a team and calculate/determine their season story for overview (FOOTBALL ONLY FOR NOW)
export function getSeasonStory(schedule: any[], teamId: number, spLookup: any) {
  const wins: any[] = [];
  const losses: any[] = [];
  const games: any[] = []; // Add trend for momentum later?

  schedule.forEach(game => {
    const comp = game.competitions?.[0];
    if (!comp) return

    // Only completed games
    if (!comp.status?.type?.completed) return

    const competitors = comp.competitors;

    const team = competitors.find((c: { team: { id: number } }) => c.team.id === teamId);
    const opponent = competitors.find((c: { team: { id: number } }) => c.team.id !== teamId);

    if (!team || !opponent) return

    const teamScore = Number(team.score?.value ?? 0);
    const opponentScore = Number(opponent.score?.value ?? 0);

    const opponentName = opponent.team.location;
    const opponentRating = spLookup[opponentName] ?? 0;

    if (!opponentRating) return

    const homeAway = team.homeAway;
    const win = teamScore > opponentScore;

    // Margin
    const rawMargin = Math.abs(teamScore - opponentScore);
    const margin = win
      ? Math.min(rawMargin, 21)
      : rawMargin

    // Home/Away
    let locationBonus = 0;
    if (homeAway === "away") locationBonus = 5;
    if (homeAway === "neutral") locationBonus = 3;

    // Ranking
    let rankingBonus = 0;
    const rank = opponent.curatedRank?.current;

    if (rank && rank <= 25) {
      rankingBonus = 3
    }

    // Game Tag Parts
    const tags: string[] = [];

    let hasSpecialTag = false;
    let hasOpponentTag = false;
    let hasStyleTag = false;
    let hasOutcomeTag = false;

    const totalPoints = teamScore + opponentScore;

    // Special Tags (highest priority)
    if (!hasSpecialTag) {
      if (opponentScore === 0 && win) {
        tags.push("Shutout");
        hasSpecialTag = true;
      } else if (teamScore === 0 && !win) {
        tags.push("Shutout Loss");
        hasSpecialTag = true;
      }
    }

    // Opponent Strength (could add other metrics later if calculations change)
    if (!hasOpponentTag) {
      if (opponentRating >= 30) {
        tags.push("Top-10 SP+");
        hasOpponentTag = true;
      } else if (opponentRating >= 25) {
        tags.push("Top-15 SP+");
        hasOpponentTag = true;
      } else if (opponentRating >= 20) {
        tags.push("Top-25 SP+");
        hasOpponentTag = true;
      }
    }

    // Game Style (skip if shutout already)
    if (!hasStyleTag && !hasSpecialTag) {
      if (totalPoints >= 60 && rawMargin <= 14) {
        tags.push("Shootout");
        hasStyleTag = true;
      } else if (totalPoints <= 30) {
        tags.push("Defensive Game");
        hasStyleTag = true;
      }
    }

    // Outcome (only ONE outcome tag, skip if special tag exists)
    if (!hasOutcomeTag && !hasSpecialTag) {
      if (!win && rawMargin <= 3) {
        tags.push("Heartbreaker");
        hasOutcomeTag = true;
      } else if (rawMargin <= 8) {
        tags.push(win ? "Close Win" : "Close Loss");
        hasOutcomeTag = true;
      } else if (rawMargin >= 14) {
        tags.push(win ? "Dominant Win" : "Blowout Loss");
        hasOutcomeTag = true;
      }
    }

    // Location (these can stack with anything)
    if (homeAway === "away") tags.push("Road Game");

    const finalTags = tags.slice(0, 2); // Keep it to 2 max (change later?)

    // Season Momentum Calculations
    const performanceMargin = win ? margin : -margin;
    const gameScore =
      opponentRating * 0.6 +
      performanceMargin * 0.3 +
      locationBonus * 0.1;

    games.push({
      id: game.id,
      date: game.date,
      opponent: opponentName,
      win,
      gameScore
    });

    // Best/Worst Scoring

    let score;

    if (win) {
      score =
        opponentRating * 0.8 +
        margin * 0.15 +
        locationBonus * 0.05 +
        rankingBonus

      wins.push({
        id: game.id,
        date: game.date,
        opponent: opponentName,
        teamScore,
        opponentScore,
        homeAway,
        score,
        tags: finalTags
      })
    } else {
      const closeScore = Math.max(0, 14 - margin);

      score =
        opponentRating * 0.65 +
        closeScore * 0.30 +
        locationBonus * 0.05

      losses.push({
        id: game.id,
        date: game.date,
        opponent: opponentName,
        teamScore,
        opponentScore,
        homeAway,
        score,
        tags: finalTags
      })
    }
  })

  // Select 3 max (make sure can be less)
  const bestWins = wins
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  const toughestLosses = losses
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  // Momentum Normalization
  const maxScore = Math.max(...games.map(g => Math.abs(g.gameScore)), 1);
  const momentum = games.map(g => ({
    ...g,
    normalizedScore: (g.gameScore / maxScore) * 100
  }));

  return {
    bestWins,
    toughestLosses,
    momentum
  }
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