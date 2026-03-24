// Overview Team PErformance
// Advanced Metrics (SP+ for now, can expand later)
// Offense/Defense Breakdown

interface StatProps {
  teamInfo: any;
}

function Stats({ teamInfo }: StatProps) {
  const teamData = teamInfo.team;

  const stats = teamData.teamStats || {};

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* Team Performance */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Team Performance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase text-gray-500 mb-2">
            Points Per Game
          </h3>
          <p className="text-2xl font-semibold">
            {stats.ppg ?? "--"}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase text-gray-500 mb-2">
            Points Allowed
          </h3>
          <p className="text-2xl font-semibold">
            {stats.papg ?? "--"}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase text-gray-500 mb-2">
            Point Differential
          </h3>
          <p className="text-2xl font-semibold">
            {stats.diff ?? "--"}
          </p>
        </div>

      </div>

      {/* Advanced Metrics */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Advanced Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase text-gray-500 mb-2">
            SP+ Rating
          </h3>
          <p className="text-2xl font-semibold">
            {stats.spOverall ?? "--"}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase text-gray-500 mb-2">
            Offensive SP+
          </h3>
          <p className="text-2xl font-semibold">
            {stats.spOffense ?? "--"}
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase text-gray-500 mb-2">
            Defensive SP+
          </h3>
          <p className="text-2xl font-semibold">
            {stats.spDefense ?? "--"}
          </p>
        </div>

      </div>

      {/* Offense / Defense Breakdown */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Breakdown
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Offense */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Offense</h3>
          <div className="space-y-2 text-sm">
            <p>Yards/Game: {stats.yardsPerGame ?? "--"}</p>
            <p>Pass Yards: {stats.passYards ?? "--"}</p>
            <p>Rush Yards: {stats.rushYards ?? "--"}</p>
          </div>
        </div>

        {/* Defense */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Defense</h3>
          <div className="space-y-2 text-sm">
            <p>Yards Allowed: {stats.yardsAllowed ?? "--"}</p>
            <p>Pass Allowed: {stats.passAllowed ?? "--"}</p>
            <p>Rush Allowed: {stats.rushAllowed ?? "--"}</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Stats;