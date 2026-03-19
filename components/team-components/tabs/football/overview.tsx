import { formatDate } from "@/lib/date/dateUtils"
import { Bar, BarChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface HeaderProps {
  teamInfo: any;
  sport: any;
}

const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  const isPositive = payload.score >= 0;

  // Make sure losses get shown as downward (apparently issue for custom bars)
  const correctedHeight = Math.abs(height);
  const correctedY = height < 0 ? y + height : y;

  return (
    <rect
      x={x}
      y={correctedY}
      width={width}
      height={correctedHeight}
      rx={3}
      fill={isPositive ? "#22c55e" : "#ef4444"}
    />
  );
};

function Overview({ teamInfo, sport }: HeaderProps) {
  const teamData = teamInfo.team;
  const currentDate = new Date();

  const perfData = teamData.seasonStory.performance.map((game: any, index: number, arr: any[]) => {
    const windowSize = 3;
    const start = Math.max(0, index - windowSize + 1);
    const slice = arr.slice(start, index + 1);

    const trend =
      slice.reduce((sum: number, g: any) => sum + g.normalizedScore, 0) /
      slice.length;

    return {
      game: index + 1,
      score: game.normalizedScore,
      trend,
      opponent: game.opponent,
      result: game.win ? "W" : "L",
      date: formatDate(game.date)
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* About The Program */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        About the Program
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Head Coach */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Head Coach
          </h3>
          <p className="text-xl font-semibold">{teamData.coachName}</p>
          <p className="text-sm text-gray-500">Year {teamData.coachYear}</p>
        </div>

        {/* Stadium */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Home Stadium
          </h3>
          <p className="text-xl font-semibold">{teamData.stadium.name}</p>
          <p className="text-sm text-gray-500">Capacity: {new Intl.NumberFormat('en-US').format(teamData.stadium.capacity)}</p>
        </div>

        {/* All-Time Record */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            All-Time Record
          </h3>
          <p className="text-xl font-semibold">{teamData.atRecord}</p>
          <p className="text-sm text-gray-500">{teamData.winPct.toFixed(3).replace(/^0/, "")} Win %</p>
        </div>

        {/* Program Founded */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Program Founded
          </h3>
          <p className="text-xl font-semibold">{sport.founded}</p>
          <p className="text-sm text-gray-500">{Math.abs(sport.founded - currentDate.getFullYear())} seasons</p>
        </div>

        {/* Rivalry */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Primary Rival
          </h3>
          <p className="text-xl font-semibold">{teamData.rival}</p>
          <p className="text-sm text-gray-500">Series: {teamData.rivalRecord} ({teamData.rivalWinPct.toFixed(3).replace(/^0/, "")})</p>
        </div>

        {/* Location */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Location
          </h3>
          <p className="text-xl font-semibold">{teamData.city}, {teamData.state}</p>
          <p className="text-sm text-gray-500">{teamData.school} University</p>
        </div>
      </div>

      {/* Season Story */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Season Story
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-center">

        {/* Best Wins */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Best Wins</h3>
          <div className="space-y-3">
            {teamData.seasonStory.bestWins.length > 0 ? (
              teamData.seasonStory.bestWins.map((game: any) => (
                <div key={game.id}>
                  <p className="text-sm text-gray-500">
                    {game.homeAway === "away" && "@ "}
                    {game.homeAway === "home" && "vs "}
                    {game.opponent}
                  </p>
                  <p className="font-semibold text-xl">{game.teamScore} – {game.opponentScore}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(game.date)}
                    {game.tags?.length > 0 && " • "}
                    {game.tags?.join(" • ")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No notable wins yet
              </p>
            )}
          </div>
        </div>

        {/* Toughest Losses */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Toughest Losses</h3>
          <div className="space-y-3">
            {teamData.seasonStory.toughestLosses.length > 0 ? (
              teamData.seasonStory.toughestLosses.map((game: any) => (
                <div key={game.id}>
                  <p className="text-sm text-gray-500">
                    {game.homeAway === "away" && "@ "}
                    {game.homeAway === "home" && "vs "}
                    {game.opponent}
                  </p>
                  <p className="font-semibold text-xl">{game.teamScore} – {game.opponentScore}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(game.date)}
                    {game.tags?.length > 0 && " • "}
                    {game.tags?.join(" • ")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No tough losses yet
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Season Performance */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-center">
          Season Performance
        </h3>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Game-by-game performance based on opponent strength and margin
        </p>

        {perfData.length > 0 ? (
          <div className="w-full min-w-0">
            <ResponsiveContainer width="100%" aspect={3}>

              <BarChart data={perfData}>
                <ReferenceLine y={0} stroke="#888" />

                {/* X Axis (Game Number) */}
                <XAxis
                  dataKey="game"
                  tick={{ fontSize: 12 }}
                />

                {/* Y Axis hidden (needed for scaling) */}
                <YAxis hide domain={[-100, 100]} />

                {/* Tooltip */}
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const data = payload[0].payload;

                    return (
                      <div className="bg-white border rounded p-3 text-sm shadow text-black">
                        <p className="font-semibold">
                          {data.opponent}
                        </p>
                        <p>{data.result} • {data.date}</p>
                        <p>Performance: {Math.round(data.score)}</p>
                      </div>
                    );
                  }}
                />

                <Bar dataKey="score" shape={CustomBar} />

                <Line
                  type="monotone"
                  dataKey="trend"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                />

              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No games played yet
          </p>
        )}
      </div>

      {/* Program Profile */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mt-12 mb-8">
        Program Profile
      </h2>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Bowl Appearances */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Bowl Appearances
          </h3>
          <p className="text-2xl font-semibold">
            {teamData.bowlRecord.appearances ?? 0}
          </p>
          <p className="text-sm text-gray-500">
            Record: {teamData.bowlRecord.wins} - {teamData.bowlRecord.losses}
          </p>
          <p className="text-sm text-gray-500">
            Last: {teamData.bowlRecord.lastYear ?? "N/A"}
          </p>
        </div>

        {/* NFL Draft Picks */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            NFL Draft Picks
          </h3>
          <p className="text-2xl font-semibold">
            {teamData.draftPicks.length ?? 0}
          </p>
          <p className="text-sm text-gray-500">
            First Round: {teamData.draftPicks.filter((picks: { round: number; }) => picks.round === 1).length ?? 0}
          </p>
          <p className="text-sm text-gray-500">
            Since 1967
          </p>
        </div>

      </div>

      {/* Recent Seasons */}
      <div className="border rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-6">
          Recent Seasons
        </h3>

        {teamData.recentSeasons?.length > 0 ? (
          <div className="space-y-2">

            {teamData.recentSeasons.map((season: any) => {
              const winPct =
                season.wins + season.losses > 0
                  ? season.wins / (season.wins + season.losses)
                  : 0;

              let color = "text-gray-500";

              if (winPct >= 0.65) color = "text-green-500";
              else if (winPct <= 0.45) color = "text-red-500";

              return (
                <div
                  key={season.year}
                  className="flex justify-between max-w-xs mx-auto text-sm md:text-base"
                >
                  <span className="font-medium">{season.year}</span>
                  <span className={color}>
                    {season.wins}–{season.losses}
                  </span>
                </div>
              );
            })}

          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No recent season data available
          </p>
        )}
      </div>
    </div>
  );
}

export default Overview;