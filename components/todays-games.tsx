"use client";

import { useTodaysGames } from "@/hooks/todays-games";

const TodaysGames = () => {
  const { games, loading } = useTodaysGames();

  if (loading) return <p className="text-center text-neutral-400">Loading games...</p>;
  if (games.length === 0)
    return <p className="text-center text-neutral-400">No games tonight.</p>;

  const groupedGames = games.reduce<Record<string, typeof games>>(
    (acc, game) => {
      if (!acc[game.sport]) {
        acc[game.sport] = [];
      }
      acc[game.sport].push(game);
      return acc;
    },
    {}
  );

  const sortGames = (gamesList: typeof games) =>
    [...gamesList].sort((a, b) => {
      const getPriority = (status: string) => {
        switch (status) {
          case "STATUS_IN_PROGRESS":
            return 0; // prioritize live games
          case "STATUS_SCHEDULED":
            return 1;
          case "STATUS_FINAL":
            return 2;
          default:
            return 3;
        }
      };

      const priorityDiff =
        getPriority(a.status) - getPriority(b.status);

      if (priorityDiff !== 0) return priorityDiff;

      // if all games have same status, sort by start time
      return (
        new Date(a.startTime).getTime() -
        new Date(b.startTime).getTime()
      );
    }
  );

  return (
    <section className="px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Today's Games
      </h2>

      <div className="max-w-4xl mx-auto space-y-12">
        {Object.entries(groupedGames).map(([sport, sportGames]) => {
          const sorted = sortGames(sportGames);

          console.log(sport, sorted.map(g => g.status));

          return (
            <div key={sport}>
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-4">
                {sport}
              </h3>

              <div className="divide-y divide-neutral-800">
                {sorted.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    {/* Matchup */}
                    <div className="font-medium">
                      {game.awayTeam.rank && (
                        <span className="text-yellow-400 mr-1">
                          #{game.awayTeam.rank} </span>
                      )}
                      {game.awayTeam.name}

                      <span className="mx-2 text-neutral-500"> @ </span>

                      {game.homeTeam.rank && (
                        <span className="text-yellow-400 mr-1">
                          #{game.homeTeam.rank} </span>
                      )}
                      {game.homeTeam.name}
                    </div>

                    {/* Time / Score */}
                    <div className="text-neutral-400 whitespace-nowrap">
                      {game.status === "STATUS_SCHEDULED" && (
                        new Date(game.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      )}

                      {game.status === "STATUS_IN_PROGRESS" && (
                        <span className="text-white font-semibold">
                          LIVE
                        </span>
                      )}

                      {game.status === "STATUS_FINAL" && (
                        <span className="text-neutral-300">
                          Final {game.awayTeam.score} – {game.homeTeam.score}
                        </span>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TodaysGames;
