import { NextResponse } from "next/server";

import { PAC_TEAMS } from "@/lib/config/pac12Teams";

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports"; // BASE URL, CAN REUSE FOR OTHER ENDPOINTS
const SPORTS = [ // Homepage games only include football, MBB, WBB but can add more if wanted
  { path: "football/college-football", label: "Football" },
  { path: "basketball/mens-college-basketball", label: "Men's Basketball" },
  { path: "basketball/womens-college-basketball", label: "Women's Basketball" },
];

// ESPN API requires date in YYYYMMDD format
function formatDateForESPN() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

// ESPN sets unranked teams to 99, need to convert back to null for frontend
const normalizeRank = (rank?: number) => {
  if (!rank || rank === 99) return null;
  return rank;
};

export async function GET() {
  try {
    const formattedDate = formatDateForESPN();

    const requests = SPORTS.map((sport) =>
      fetch(
        `${ESPN_BASE}/${sport.path}/scoreboard?dates=${formattedDate}&groups=50`,
        { next: { revalidate: 300 } } // 5 minute cache (change to lower?)
      ).then((res) => res.json())
    );

    const responses = await Promise.all(requests);

    const games = responses.flatMap((data, index) => {
      if (!data.events) return [];

      return data.events.map((event: any) => {
        const competition = event.competitions?.[0];
        const competitors = competition?.competitors || [];

        const home = competitors.find((c: any) => c.homeAway === "home");
        const away = competitors.find((c: any) => c.homeAway === "away");

        return {
          id: event.id,
          sport: SPORTS[index].label,
          status: event.status?.type?.name,
          startTime: event.date,

          homeTeam: {
            name: home?.team?.displayName ?? "TBD",
            score: home?.score ? Number(home.score) : undefined,
            rank: normalizeRank(home?.curatedRank?.current),
          },

          awayTeam: {
            name: away?.team?.displayName ?? "TBD",
            score: away?.score ? Number(away.score) : undefined,
            rank: normalizeRank(away?.curatedRank?.current),
          },
        };

      });
    });

    const pac12Games = games.filter((game) =>
      PAC_TEAMS.some(team => game.homeTeam.name.includes(team.name)) ||
      PAC_TEAMS.some(team => game.awayTeam.name.includes(team))
    );

    return NextResponse.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
