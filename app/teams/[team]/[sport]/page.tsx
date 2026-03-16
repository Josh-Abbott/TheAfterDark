import { PAC_TEAMS } from "@/lib/config/pac12Teams";
import { getTeamData } from "@/lib/services/team";

import Header from "@/components/team-components/header";
import TeamTabs from "@/components/team-components/tabs";

const TeamSport = async ({ params }: { params: Promise<{ team: string, sport: string }> }) => {
  const { team: teamURL, sport: sportURL } = await params;

  // Search for the team in data that matches the URL variable
  const teamData = PAC_TEAMS.find(t =>
    t.name.toLowerCase().replace(/\s+/g, '-') === teamURL
  );

  const sportData = teamData?.sports.find(s =>
    s.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '') === sportURL
  );

  if (!teamData || !sportData) {
    return <div>Loading team data...</div>;
  }

  const teamInfo = await getTeamData(teamData?.name, sportData.name);

  return (
    <main className="flex flex-col w-full min-h-[calc(90vh-4rem)] justify-top items-center px-4 py-16">
      <Header teamInfo={teamInfo} sport={sportData.name} />
      <TeamTabs
        teamInfo={teamInfo}
        sport={sportData}
      />
    </main>
  );
};

export default TeamSport;