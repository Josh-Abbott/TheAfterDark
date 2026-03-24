interface PlayersProps {
  teamInfo: any;
}

function Players({ teamInfo }: PlayersProps) {
  const teamData = teamInfo.team;
  const leaders = teamData.playerLeaders || {};

  const passing = leaders.passing;
  const rushing = leaders.rushing;
  const receiving = leaders.receiving;

  return (
    <div className="max-w-6xl mx-auto px-4">

      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Player Leaders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Passing */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Passing</h3>
          {passing ? (
            <>
              <p className="font-medium">{passing.name}</p>
              <p className="text-sm text-gray-500">
                {passing.yards} YDS • {passing.tds} TD • {passing.compPct}%
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No data</p>
          )}
        </div>

        {/* Rushing */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Rushing</h3>
          {rushing ? (
            <>
              <p className="font-medium">{rushing.name}</p>
              <p className="text-sm text-gray-500">
                {rushing.yards} YDS • {rushing.tds} TD • {rushing.ypc} YPC
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No data</p>
          )}
        </div>

        {/* Receiving */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Receiving</h3>
          {receiving ? (
            <>
              <p className="font-medium">{receiving.name}</p>
              <p className="text-sm text-gray-500">
                {receiving.yards} YDS • {receiving.tds} TD • {receiving.rec} REC
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No data</p>
          )}
        </div>
      </div>

      {/* Defense Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Tackles */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tackles</h3>
          {leaders.defense?.tackles ? (
            <>
              <p className="font-medium">{leaders.defense.tackles.name}</p>
              <p className="text-sm text-gray-500">
                {leaders.defense.tackles.value} total
                {leaders.defense.tackles.solo != null &&
                  <> • {leaders.defense.tackles.solo} solo</>
                }
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No data</p>
          )}
        </div>

        {/* Sacks */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sacks</h3>
          {leaders.defense?.sacks ? (
            <>
              <p className="font-medium">{leaders.defense.sacks.name}</p>
              <p className="text-sm text-gray-500">
                {leaders.defense.sacks.value} sacks
                {leaders.defense.sacks.tfl != null &&
                  <> • {leaders.defense.sacks.tfl} TFL</>
                }
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No data</p>
          )}
        </div>

        {/* Interceptions */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Interceptions</h3>
          {leaders.defense?.interceptions ? (
            <>
              <p className="font-medium">{leaders.defense.interceptions.name}</p>
              <p className="text-sm text-gray-500">
                {leaders.defense.interceptions.value} INT
                {leaders.defense.interceptions.yards != null &&
                  <> • {leaders.defense.interceptions.yards} YDS</>
                }
                {leaders.defense.interceptions.tds != null &&
                  <> • {leaders.defense.interceptions.tds} TD</>
                }
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No data</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Players;