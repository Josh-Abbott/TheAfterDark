import { formatDateMDHM } from "@/lib/date/dateUtils";

interface GameCardProps {
  game: any;
}

export function ScheduleCard({ game }: GameCardProps) {
  const opponent = game.opponent;
  const completed = game.completed;
  const dateStr = formatDateMDHM(game.date);

  const homeWinProb = game.winProb?.homeWinProbability;

  const winProbability =
    game.homeAway === "home"
      ? homeWinProb
      : homeWinProb !== undefined
        ? 1 - homeWinProb
        : undefined;

  // Difficulty Sorting/Calculation
  // Below 5 = Easy, Above 5 = Medium, Above 15 = Hard, add more?
  const opponentRating = game.spRating ?? 0;
  let difficultyColor = "text-green-600";
  let difficultyLabel = "Easy";
  if (opponentRating > 15) {
    difficultyColor = "text-red-600";
    difficultyLabel = "Hard";
  } else if (opponentRating > 5) {
    difficultyColor = "text-yellow-500";
    difficultyLabel = "Medium";
  }

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition">

      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div className="text-base font-semibold">
          {game.homeAway === "home" ? "vs " : "@ "} {opponent}
          {game.neutral === true && (
            <span className="ml-2 text-xs text-gray-400">(Neutral)</span>
          )}
        </div>
        <div className={`text-sm font-semibold ${difficultyColor}`}>
          {difficultyLabel}
        </div>
      </div>

      {/* Secondary Info */}
      <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
        <div>{dateStr}</div>
        {game.channel && <div>{game.channel}</div>}
      </div>

      {/* Win Probability */}
      {winProbability !== undefined && !completed && (
        <div className="mt-3 text-sm text-gray-600">
          Win Probability:{" "}
          <span className="font-medium">
            {Math.round(winProbability * 100)}%
          </span>
        </div>
      )}

      {/* Result Section */}
      {completed ? (
        <div className="mt-3 border-t pt-3">
          <p className="font-semibold">
            <span className={game.win ? "text-green-600" : "text-red-600"}>
              {game.win ? "W " : "L "}
            </span>
            {game.teamScore} – {game.opponentScore}{" "}
          </p>

          {game.tags?.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {game.tags.join(" • ")}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-3 text-xs text-gray-400">
          Upcoming game
        </div>
      )}
    </div>
  );
}