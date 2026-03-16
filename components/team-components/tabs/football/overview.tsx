// Program Snapshot (HC, Stadium, Location, Established year, all-time record (?))
// Season story (best win, worst loss, avg. margin of victory, avg. margin of loss, home record, road record), 
// Program Profile (rivalries, bowl appearances, 5-season trend (bar chart?), 1st round draft picks, etc.)

interface HeaderProps {
  teamInfo: any;
  sport: any;
}

function Overview({ teamInfo, sport }: HeaderProps) {
  const teamData = teamInfo.team;
  const currentDate = new Date();

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        About the Program
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <p className="text-sm text-gray-500">{teamData.winPct.toFixed(3)} Win %</p>
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
          <p className="text-sm text-gray-500">Series: {teamData.rivalRecord} ({teamData.rivalWinPct.toFixed(3)})</p>
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
    </div>
  );
}

export default Overview;