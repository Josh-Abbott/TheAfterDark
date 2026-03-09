interface HeaderProps {
  teamInfo: any,
  team: string;
  sport: string;
}

async function Header({ teamInfo, team, sport }: HeaderProps) {
  const teamData = teamInfo.team;

  const isWin = Math.sign(teamData.streak);

  return (
    <div className="justify-center text-center text-3xl md:text-4xl align-top mb-8">
      {/* Name/Rank & Sport */}
      <div className="font-bold">
        {teamData.rank && (
          <span className="text-yellow-400 mr-1">
            #{teamData.rank}
          </span>
        )}
        {teamData.name}
      </div>
      <div className="text-neutral-400">
        {sport}
      </div>
      <br />
      {/* Overall Record, Conf. Record, Conf. Standing, W/L Streak */}
      <div className="text-xl text-neutral-400">
        {teamData.record.overall && <span>{teamData.record.overall} Overall</span>}
        {teamData.record.conference && <span> | {teamData.record.conference} Conference</span>}
        {teamData.standing && <span> | {teamData.standing}</span>}
        {teamData.streak != null && (
          <span> | Streak: {Math.abs(teamData.streak)}</span>
        )}

        {/* Streak Arrow Logic */}
        {isWin !== 0 && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isWin === 1 ? "#22c55e" : "#ef4444"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block ml-1"
          >
            {isWin === 1 ? (
              <polyline points="18 15 12 9 6 15" />
            ) : (
              <polyline points="6 9 12 15 18 9" />
            )}
          </svg>
        )}
      </div>
      {/* Last Game Info */}
      <div className="text-sm text-neutral-500">
        {teamData.lastGame && (
          <span>
            Last Game:
            {teamData.lastGame.oppWin ? (
              <span className="text-red-500"> L </span>
            ) : (
              <span className="text-green-500"> W </span>
            )}
            {teamData.lastGame.mainScore}-{teamData.lastGame.oppScore}
            {teamData.lastGame.homeAway === "home" ? (
              " vs "
            ) : (
              " @ "
            )} {teamData.lastGame.oppTeam} ({teamData.lastGame.date})
          </span>
        )}
      </div>
      {/* Next Game Info */}
      <div className="text-sm text-neutral-500">
        {teamData.nextGame && (
          <span>
            Next Game:
            {teamData.nextGame.homeAway === "home" ? (
              " vs "
            ) : (
              " @ "
            )} {teamData.nextGame.oppTeam} ({teamData.nextGame.date} - {teamData.nextGame.time})
          </span>
        )}
      </div>
    </div >
  );
}

export default Header