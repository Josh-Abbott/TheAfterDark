interface HeaderProps {
  teamInfo: any;
  sport: any;
}

function Overview({ teamInfo, sport }: HeaderProps) {
  const teamData = teamInfo.team;
  const currentDate = new Date();

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

        {/* Arena */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Arena
          </h3>
          <p className="text-xl font-semibold">{teamData.arena.name}</p>
          <p className="text-sm text-gray-500">Capacity: {new Intl.NumberFormat('en-US').format(teamData.arena.capacity)}</p>
        </div>

        {/* All-Time Record */}
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            All-Time Record
          </h3>
          <p className="text-xl font-semibold"></p>
          <p className="text-sm text-gray-500"> Win %</p>
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