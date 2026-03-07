import { getTeamData } from "@/lib/services/team";

interface HeaderProps {
  team: string;
  sport: string;
}

async function Header({ team, sport }: HeaderProps) {
  const teamData = await getTeamData(team, sport);

  const isWin = Math.sign(teamData.team.streak);

  return (
    <div className="justify-center text-center text-3xl md:text-4xl align-top mb-8">
      {/* - {sport} | {teamData.team.record.overall} ({teamData.team.standing} */}
      <div className="font-bold">
        {teamData.team.rank && (
          <span className="text-yellow-400 mr-1">
            #{teamData.team.rank}
          </span>
        )}
        {team}
      </div>
      <div className="text-neutral-400">
        {sport}
      </div>
      <br />
      <div className="text-xl text-neutral-400">
        <span>
          {teamData.team.record.overall} Overall | {teamData.team.record.conference} Conference | {teamData.team.standing} | Streak: {Math.abs(teamData.team.streak)}
        </span>
        {/* Streak Arrow Logic*/}
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
    </div>
  );
}

export default Header