import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Rectangle, LabelList } from 'recharts';

const DynamicColorBar = (props: any) => {
  const { wins } = props;
  const isElite = wins >= 10;

  return (
    <Rectangle
      {...props}
      fill={isElite ? "#d4af37" : getBarColor(wins)}
      // 10+ win seasons are elite and get glow
      style={{
        filter: isElite ? 'drop-shadow(0px 0px 8px rgba(234, 179, 8, 0.6))' : 'none'
      }}
    />
  );
};

const getBarColor = (wins: number): string => {
  if (wins >= 8) return "#22c55e"; // Green
  if (wins >= 5) return "#facc15"; // Bright Yellow
  return "#ef4444";                // Red
};

interface IdentityProps {
  teamInfo: any;
  sport: any;
}

function Identity({ teamInfo, sport }: IdentityProps) {
  const teamData = teamInfo.team;

  // Recent Seasons chart prep work
  const recentSeasonsData =
    teamData.recentSeasons?.map((season: any) => ({
      year: String(season.year),
      wins: season.wins,
      losses: season.losses,
      winPct:
        season.wins + season.losses > 0
          ? season.wins / (season.wins + season.losses)
          : 0,
    })) ?? [];

  // Draft picks helpers
  const firstRoundPicks = (teamData.draftPicks ?? [])
    .filter((p: any) => Number(p.round) === 1)
    .slice()
    .sort((a: any, b: any) => (Number(b.year) || 0) - (Number(a.year) || 0));
  const mostRecentFirstRound = firstRoundPicks.length > 0 ? firstRoundPicks[0] : undefined;

  const sortedAllPicks = (teamData.draftPicks ?? [])
    .slice()
    .sort((a: any, b: any) => (Number(b.year) || 0) - (Number(a.year) || 0));
  const mostRecentOverall = sortedAllPicks.length > 0 ? sortedAllPicks[0] : undefined;

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/*PROGRAM IDENTITY*/}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Program Identity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

        {/* Head Coach */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Head Coach
          </h3>
          <p className="text-xl font-semibold">{teamData.coachName}</p>
          <p className="text-sm text-gray-500">
            Year {teamData.coachYear} at {teamData.school}
          </p>
          {sport.coachPrev && (
            <p className="text-sm text-gray-500 mt-1">
              {sport.coachPrev}
            </p>
          )}
        </div>

        {/* Home Stadium */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Home Stadium
          </h3>
          <p className="text-xl font-semibold">{teamData.stadium.name}</p>
          <p className="text-sm text-gray-500">
            Capacity: {new Intl.NumberFormat("en-US").format(teamData.stadium.capacity)}
          </p>
          {teamData.stadium.yearOpened && (
            <p className="text-sm text-gray-500">Est. {teamData.stadium.yearOpened}</p>
          )}
          <p className="text-sm text-gray-500">
            {teamData.city}, {teamData.state}
          </p>
        </div>

        {/* Team Mascot */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Team Mascot
          </h3>
          <p className="text-xl font-semibold">{teamData.mascot.name}</p>
          <p className="text-sm text-gray-500">Since {teamData.mascot.year}</p>
          {teamData.mascot.description && (
            <p className="text-sm text-gray-500 mt-1">
              {teamData.mascot.description}
            </p>
          )}
        </div>

        {/* Fight Song */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Fight Song
          </h3>
          <p className="text-xl font-semibold">{teamData.fightSong.name}</p>
          <p className="text-sm text-gray-500">
            Written in {teamData.fightSong.year}
          </p>
          {teamData.fightSong.listenUrl && (
            <a
              href={teamData.fightSong.listenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline mt-2 inline-block"
            >
              Listen
            </a>
          )}
        </div>

        {/* Program Founded */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Program Founded
          </h3>
          <p className="text-xl font-semibold">{sport.founded}</p>
          <p className="text-sm text-gray-500">
            {sport.foundedText}
          </p>
        </div>

        {/* Program Colors */}
        <div className="border rounded-lg p-6 text-center flex flex-col justify-between h-full">
          <div>
            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">
              Program Colors
            </h3>

            {/* Dynamic Color Swatches */}
            <div className="flex justify-center gap-4 mb-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full shadow-inner border border-gray-200"
                  style={{ backgroundColor: `#${teamData.color}` }}
                />
                <span className="text-xs text-gray-400 mt-1 uppercase font-mono">#{teamData.color}</span>
              </div>

              {teamData.alternateColor && (
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full shadow-inner border border-gray-200"
                    style={{ backgroundColor: `#${teamData.alternateColor}` }}
                  />
                  <span className="text-xs text-gray-400 mt-1 uppercase font-mono">#{teamData.alternateColor}</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/*TRADITIONS*/}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Traditions
      </h2>

      {teamData.traditions?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {teamData.traditions.map((tradition: any, i: number) => (
            <div key={i} className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{tradition.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {tradition.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center mb-16">
          No traditions data available.
        </p>
      )}

      {/*PROGRAM HISTORY*/}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Program History
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">

        {/* All-Time Record */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            All-Time Record
          </h3>
          <p className="text-xl font-semibold">{teamData.atRecord}</p>
          <p className="text-sm text-gray-500">
            {teamData.winPct?.toFixed(3).replace(/^0/, "")} win %
          </p>
        </div>

        {/* Conference Champs */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Conference Championships
          </h3>
          <p className="text-2xl font-semibold">
            {sport.confChamp ?? 0}
          </p>
          <p className="text-sm text-gray-500">Last: {sport.lastChamp}</p>
        </div>

        {/* Bowl History */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Bowl History
          </h3>
          <p className="text-2xl font-semibold">
            {teamData.bowlRecord?.appearances ?? 0} Appearances
          </p>
          <p className="text-sm text-gray-500">
            Record: {teamData.bowlRecord?.wins} – {teamData.bowlRecord?.losses}
          </p>
          {teamData.bowlRecord?.firstYear ? (
            <p className="text-sm text-gray-500">
              {teamData.bowlRecord.firstYear} – {teamData.bowlRecord?.lastYear ?? "N/A"}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Last: {teamData.bowlRecord?.lastYear ?? "N/A"}
            </p>
          )}
        </div>

        {/* NFL Draft Picks */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            NFL Draft Picks
          </h3>
          <p className="text-2xl font-semibold">
            {teamData.draftPicks?.length ?? 0}
          </p>
          <p className="text-sm text-gray-500">
            First Round: {firstRoundPicks.length}
          </p>
          {mostRecentOverall?.name && (
            <p className="text-sm text-gray-500">
              Latest Pick: {mostRecentOverall.name}
              {mostRecentOverall.year ? ` (${mostRecentOverall.year})` : ""}
            </p>
          )}
          {mostRecentFirstRound?.name && (
            <p className="text-sm text-gray-500">
              Latest 1st Rounder: {mostRecentFirstRound.name}
              {mostRecentFirstRound.year ? ` (${mostRecentFirstRound.year})` : ""}
            </p>
          )}
        </div>

        {/* Consensus All-Americans */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Consensus All-Americans
          </h3>
          <p className="text-2xl font-semibold">
            {sport.allAmerican ?? 0}
          </p>
          {sport.latestAA && (
            <p className="text-sm text-gray-500">
              Latest: {sport.latestAA}
            </p>
          )}
        </div>

        {/* Single-Season Win Peak */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Single-Season Win Peak
          </h3>
          <p className="text-2xl font-semibold">
            {teamData.bestSeason ? `${teamData.bestSeason.wins} Wins` : "—"}
          </p>
          <p className="text-sm text-gray-500">
            {teamData.bestSeason
              ? `${teamData.bestSeason.latestYear} (${teamData.bestSeason.wins}–${teamData.bestSeason.losses}${teamData.bestSeason.ties > 0 ? `–${teamData.bestSeason.ties}` : ''})`
              : "No record data available"
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {teamData.bestSeason?.occurrenceCount > 1
              ? `Achieved ${teamData.bestSeason.occurrenceCount} times in school history`
              : "The winningest season in program history"
            }
          </p>
        </div>
      </div>

      {/* Conference History Timeline */}
      {teamData.confHistory?.length > 0 && (
        <div className="border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-center mb-6">
            Conference Affiliation History
          </h3>
          <div className="relative border-l border-gray-200 ml-4 md:ml-8 space-y-6">
            {teamData.confHistory.map((era: string, i: number) => {
              // Quick string split logic assuming "Conference Name (Years)" format
              const match = era.match(/(.*)\s\((.*)\)/);
              const confName = match ? match[1] : era;
              const years = match ? match[2] : "";
              const isCurrent = i === 0; // first item in array is the current era

              return (
                <div key={i} className="relative pl-6 md:pl-8 group">
                  <div
                    className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors duration-200
                      ${isCurrent
                        ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-100'
                        : 'bg-white border-gray-300'
                      }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <p className={`font-medium ${isCurrent ? ' font-semibold' : 'text-gray-500'}`}>
                      {confName}
                    </p>
                    <p className={`text-sm sm:text-right ${isCurrent ? 'text-white font-semibold' : 'text-gray-500'}`}>
                      {years}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notable Alumni */}
      {teamData.alumni?.length > 0 && (
        <div className="border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-center mb-6">
            Notable Alumni
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamData.alumni.map((alumni: any, i: number) => (
              <div key={i} className="text-center">
                <p className="font-semibold">{alumni.name}</p>
                <p className="text-sm text-gray-500">{alumni.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Seasons */}
      <div className="border rounded-lg p-6 mb-16">
        <h3 className="text-lg font-semibold text-center mb-2">
          Recent Seasons
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Win totals over the last five seasons
        </p>

        {recentSeasonsData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={recentSeasonsData} barSize={40} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 14]} hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white border rounded p-3 text-sm shadow text-black">
                      <p className="font-semibold">{d.year}</p>
                      <p>
                        {d.wins}–{d.losses}
                      </p>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="wins"
                radius={[4, 4, 0, 0]}
                shape={<DynamicColorBar />}
              >
                <LabelList
                  dataKey="wins"
                  position="top"
                  fill="#ffffff"
                  fontSize={12}
                  fontWeight="bold"
                  offset={8}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No recent season data available.
          </p>
        )}
      </div>

      {/*THE RIVALRY*/}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        The Rivalry
      </h2>

      <div className="border rounded-lg p-6">

        {/* Rivalry name + opponent */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold">
            {teamData.rivalry.name ?? teamData.rivalry.team}
          </p>
          <p className="text-sm text-gray-500">vs. {teamData.rivalry.team}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">

          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              Series Record
            </p>
            <p className="text-lg font-semibold">{teamData.rivalRecord}</p>
            <p className="text-sm text-gray-500">
              {teamData.rivalWinPct?.toFixed(3).replace(/^0/, "")} win %
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              First Played
            </p>
            <p className="text-lg font-semibold">
              {teamData.rivalry.startYear ?? "—"}
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              Current Streak
            </p>
            <p className="text-lg font-semibold">
              {teamData.rivalStreak ?? "—"}
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              Last Matchup
            </p>
            <p className="text-lg font-semibold">
              {teamData.rivalRecentMatchup ?? "—"}
            </p>
          </div>
        </div>

        {teamData.rivalry.description && (
          <p className="text-sm text-gray-500 text-center leading-relaxed border-t pt-6">
            {teamData.rivalry.description}
          </p>
        )}

      </div>
    </div>
  );
}

export default Identity;