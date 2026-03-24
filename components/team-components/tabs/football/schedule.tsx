import { ScheduleCard } from "@/components/team-components/scheduleCard"

interface ScheduleProps {
  teamInfo: any;
}

function Schedule({ teamInfo }: ScheduleProps) {
  const teamData = teamInfo.team;
  const scheduleSummary = teamData.scheduleSummary || {};
  const remainingGames = scheduleSummary.remainingGames ?? 0;
  const avgOpponentRating = scheduleSummary.avgOpponentRating ?? 0;
  const schedule = teamData.schedule || [];

  // Determine if it's offseason (no remaining games)
  const isOffseason = remainingGames === 0;
  const projectedRecord = scheduleSummary.projectedRecord;

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* Schedule Overview */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Schedule Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Remaining Games */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Remaining Games
          </h3>
          <p className="text-2xl font-semibold">
            {remainingGames}
          </p>
          <p className="text-sm text-gray-500">
            {isOffseason ? "Season Complete" : "Left this season"}
          </p>
        </div>

        {/* Avg Opponent Rating */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Avg Opponent (SP+)
          </h3>
          <p className="text-2xl font-semibold">
            {avgOpponentRating}
          </p>
          <p className="text-sm text-gray-500">
            {isOffseason
              ? "No remaining games"
              : "Remaining schedule"}
          </p>
        </div>

        {/* Projected Record */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Projected Record
          </h3>
          <p className="text-2xl font-semibold">
            {projectedRecord}
          </p>
          <p className="text-sm text-gray-500">
            {isOffseason
              ? `Final Results: ${teamData.record.overall}`
              : "Based on projections"}
          </p>
        </div>
      </div>

      {/* Game List */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Full Schedule
      </h2>

      <div>
        {schedule.length > 0 ? (
          schedule.map((game: any) => (
            <ScheduleCard key={game.id} game={game} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No games scheduled yet</p>
        )}
      </div>
    </div>
  );
}

export default Schedule;