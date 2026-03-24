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

// A helper function to organize the player data by combining them with their respective stats
function groupPlayerStats(data: any[]) {
  const players: Record<string, any> = {};

  data.forEach(row => {
    const id = row.playerId;

    if (!players[id]) {
      players[id] = {
        name: row.player,
        position: row.position,
        stats: {}
      };
    }

    players[id].stats[row.statType] = Number(row.stat);
  });

  return Object.values(players);
}

// A helper function to reduce the player lists in order to find the leader
const getLeader = (rows: any[], statKey: string, validPositions?: string[]) => {
  let players = groupPlayerStats(rows);

  if (validPositions) {
    players = players.filter(p => validPositions.includes(p.position));
  }

  if (players.length === 0) return null;

  return players.reduce((best, player) => {
    const val = player.stats[statKey] || 0;
    return val > (best.stats[statKey] || 0) ? player : best;
  }, players[0]);
};

// Use the CFBD /stats/player/season data to calculate and determine the player leaders
export function getPlayerLeaders(data: any[]) {
  const filterCategory = (cat: string) =>
    data.filter(d => d.category === cat);

  const passing = getLeader(
    filterCategory("passing"),
    "YDS",
    ["QB"] // only quarterbacks
  );

  const rushing = getLeader(
    filterCategory("rushing"),
    "YDS",
    ["RB", "QB"] // allow mobile QBs
  );

  const receiving = getLeader(
    filterCategory("receiving"),
    "YDS",
    ["WR", "TE", "RB"] // realistic receivers
  );

  const defensiveRows = filterCategory("defensive");
  const interceptionRows = filterCategory("interceptions");

  const tacklesLeader = getLeader(
    defensiveRows,
    "TOT"
  );

  const sacksLeader = getLeader(
    defensiveRows,
    "SACKS"
  );

  const interceptionsLeader = getLeader(
    interceptionRows,
    "INT"
  );

  return {
    passing: passing && {
      name: passing.name,
      yards: passing.stats.YDS ?? 0,
      tds: passing.stats.TD ?? 0,
      compPct: passing.stats.PCT ?? 0
    },

    rushing: rushing && {
      name: rushing.name,
      yards: rushing.stats.YDS ?? 0,
      tds: rushing.stats.TD ?? 0,
      ypc: rushing.stats.CAR
        ? (rushing.stats.YDS / rushing.stats.CAR).toFixed(1)
        : 0
    },

    receiving: receiving && {
      name: receiving.name,
      yards: receiving.stats.YDS ?? 0,
      tds: receiving.stats.TD ?? 0,
      rec: receiving.stats.REC ?? 0
    },

    defense: {
      tackles: tacklesLeader && {
        name: tacklesLeader.name,
        value: tacklesLeader.stats.TOT ?? 0,
        solo: tacklesLeader.stats.SOLO ?? null
      },
      sacks: sacksLeader && {
        name: sacksLeader.name,
        value: sacksLeader.stats.SACKS ?? 0,
        tfl: sacksLeader.stats.TFL ?? null
      },
      interceptions: interceptionsLeader && {
        name: interceptionsLeader.name,
        value: interceptionsLeader.stats.INT ?? 0,
        yards: interceptionsLeader.stats.YDS ?? null,
        tds: interceptionsLeader.stats.TD ?? null
      }
    }
  };
}