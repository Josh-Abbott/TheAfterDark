// Iterate through the schedule of a team and calculate/determine their season story for overview (FOOTBALL ONLY FOR NOW)
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

    // Season Performance Calculations
    const performanceMargin = win ? margin : -margin;
    let gameScore =
      opponentRating * 0.5 +
      performanceMargin * 0.4 +
      locationBonus * 0.1;

    if (win) { // Give wins a bonus
      gameScore += 10;
    }

    games.push({
      id: game.id,
      date: game.date,
      opponent: opponentName,
      win,
      gameScore,
      tags: finalTags
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

  // Performance Normalization
  const maxScore = Math.max(...games.map(g => Math.abs(g.gameScore)), 1);
  const performance = games.map(g => ({
    ...g,
    normalizedScore: (g.gameScore / maxScore) * 100
  }));

  return {
    bestWins,
    toughestLosses,
    performance,
    games
  }
}

// Get various metrics about the team's schedule from both CFBD and ESPN data 
export function getScheduleSummary(schedule: any[], teamId: number, spLookup: any, predictionsInfo: any[]) {
  let remainingGames = 0;
  let totalRating = 0;
  let ratedGames = 0;
  let projectedWins = 0;

  schedule.forEach(game => {
    const comp = game.competitions?.[0];
    if (!comp) return;

    const competitors = comp.competitors;
    const ourTeam = competitors.find((c: any) => c.team.id === teamId);
    const opponent = competitors.find((c: any) => c.team.id !== teamId);

    if (!ourTeam || !opponent) return;

    // SP+ rating
    const opponentName = opponent.team.location;
    const rating = spLookup[opponentName];

    remainingGames++;
    if (rating) {
      totalRating += rating;
      ratedGames++;
    }

    const prediction = predictionsInfo.find(
      (p: any) => Number(p.gameId) === Number(game.id)
    );

    if (prediction) {
      // Determine if team is home or away (data only includes home prob)
      const winProb = ourTeam.homeAway === "home"
        ? prediction.homeWinProbability
        : 1 - prediction.homeWinProbability;

      projectedWins += winProb;
    }

  });

  const avgOpponentRating = ratedGames > 0 ? (totalRating / ratedGames) : 0;
  const projectedLosses = remainingGames - projectedWins;

  const seasonComplete = schedule.find((game) => game.competitions?.[0].status?.type?.completed === false) // Use previous season info, but correct remaining games
  if (!seasonComplete) {
    remainingGames = 0;
  }

  return {
    remainingGames,
    avgOpponentRating: Number(avgOpponentRating.toFixed(1)),
    projectedRecord: `${Math.round(projectedWins)}–${Math.round(projectedLosses)}`
  };
}

// Get various stats relating specifically to the team using both CFBD and ESPN data
export function getTeamStats(events: any[], teamId: number, teamName: string, spRatingData: any[], teamCFBDInfo: any[]) {
  let gamesPlayed = 0;
  let totalPointsFor = 0;
  let totalPointsAgainst = 0;

  events.forEach(game => {
    const comp = game.competitions?.[0];
    if (!comp) return;

    const competitors = comp.competitors;

    const team = competitors.find((c: any) => c.team.id === teamId);
    const opponent = competitors.find((c: any) => c.team.id !== teamId);

    if (!team || !opponent) return;

    const teamScore = Number(team.score?.value ?? 0);
    const opponentScore = Number(opponent.score?.value ?? 0);

    totalPointsFor += teamScore;
    totalPointsAgainst += opponentScore;

    gamesPlayed++;
  });

  const safeAvg = (total: number, games: number) =>
    games > 0 ? Number((total / games).toFixed(1)) : 0;

  const ppg = safeAvg(totalPointsFor, gamesPlayed);
  const papg = safeAvg(totalPointsAgainst, gamesPlayed);
  const diff = Number((ppg - papg).toFixed(1));

  let statGames = 0;

  let totalYards = 0;
  let totalPassYards = 0;
  let totalRushYards = 0;

  let totalYardsAllowed = 0;
  let totalPassAllowed = 0;
  let totalRushAllowed = 0;

  const getStat = (statsArr: any[], category: string) => {
    const stat = statsArr.find((s: any) => s.category === category);
    return Number(stat?.stat ?? 0);
  };

  teamCFBDInfo.forEach(game => {
    const team = game.teams.find(
      (t: any) => Number(t.teamId) === Number(teamId)
    );
    const opponent = game.teams.find(
      (t: any) => Number(t.teamId) !== Number(teamId)
    );

    if (!team || !opponent) return;

    const teamStats = team.stats || [];
    const oppStats = opponent.stats || [];

    totalYards += getStat(teamStats, "totalYards");
    totalPassYards += getStat(teamStats, "netPassingYards");
    totalRushYards += getStat(teamStats, "rushingYards");

    totalYardsAllowed += getStat(oppStats, "totalYards");
    totalPassAllowed += getStat(oppStats, "netPassingYards");
    totalRushAllowed += getStat(oppStats, "rushingYards");
    
    statGames++;
  });

  const yardsPerGame = safeAvg(totalYards, statGames);
  const passYards = safeAvg(totalPassYards, statGames);
  const rushYards = safeAvg(totalRushYards, statGames);

  const yardsAllowed = safeAvg(totalYardsAllowed, statGames);
  const passAllowed = safeAvg(totalPassAllowed, statGames);
  const rushAllowed = safeAvg(totalRushAllowed, statGames);

  const teamSP = spRatingData.find((t: any) => t.team === teamName);

  const spOverall = teamSP?.rating ?? null;
  const spOffense = teamSP?.offense?.rating ?? null;
  const spDefense = teamSP?.defense?.rating ?? null;

  return {
    ppg,
    papg,
    diff,

    spOverall,
    spOffense,
    spDefense,

    yardsPerGame,
    passYards,
    rushYards,

    yardsAllowed,
    passAllowed,
    rushAllowed
  };
}