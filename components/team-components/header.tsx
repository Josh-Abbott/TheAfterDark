import { getTeamData } from "@/lib/services/team";

interface HeaderProps {
  team: string;
  sport: string;
}

async function Header({ team, sport }: HeaderProps) {
  const teamData = await getTeamData(team, sport);
  const teamInfo = teamData.team;

  const isWin = Math.sign(teamInfo.streak);

  return (
    <div className="justify-center text-center text-3xl md:text-4xl align-top mb-8">
      {/* Name/Rank & Sport */}
      <div className="font-bold">
        {teamInfo.rank && (
          <span className="text-yellow-400 mr-1">
            #{teamInfo.rank}
          </span>
        )}
        {teamInfo.name}
      </div>
      <div className="text-neutral-400">
        {sport}
      </div>
      <br />
      {/* Overall Record, Conf. Record, Conf. Standing, W/L Streak */}
      <div className="text-xl text-neutral-400">
        <span>
          {teamInfo.record.overall} Overall | {teamInfo.record.conference} Conference | {teamInfo.standing} | Streak: {Math.abs(teamInfo.streak)}
        </span>
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
        {teamInfo.lastGame && (
          <span>
            Last Game:
            {teamInfo.lastGame.oppWin ? (
              <span className="text-red-500"> L </span>
            ) : (
              <span className="text-green-500"> W </span>
            )}
            {teamInfo.lastGame.mainScore}-{teamInfo.lastGame.oppScore}
            {teamInfo.lastGame.homeAway === "home" ? (
              " vs "
            ) : (
              " @ "
            )} {teamInfo.lastGame.oppTeam} ({teamInfo.lastGame.date})
          </span>
        )}
      </div>
      {/* Next Game Info */}
      <div className="text-sm text-neutral-500">
        {teamInfo.nextGame && (
          <span>
            Next Game:
            {teamInfo.nextGame.homeAway === "home" ? (
              " vs "
            ) : (
              " @ "
            )} {teamInfo.nextGame.oppTeam} ({teamInfo.nextGame.date} - {teamInfo.nextGame.time})
          </span>
        )}
      </div>
    </div >
  );
}

export default Header