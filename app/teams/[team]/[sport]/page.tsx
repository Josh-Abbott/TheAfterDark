import { PAC_TEAMS } from "@/lib/config/pac12Teams";

import HeaderBB from "@/components/team-components/headerBB";

const TeamSport = async ({ params }: { params: Promise<{ team: string, sport: string }> }) => {
  const { team: teamURL, sport: sportURL } = await params;

  // Search for the team in data that matches the URL variable
  const teamData = PAC_TEAMS.find(t =>
    t.name.toLowerCase().replace(/\s+/g, '-') === teamURL
  );
  const sportName = teamData?.sports.find(s =>
    s.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '') === sportURL
  );

  // Required by code otherwise error
  if (!teamData || !sportName) {
    return <div>Loading team data...</div>;
  }

  return (
    <main className="flex flex-col w-full min-h-[calc(90vh-4rem)] justify-top items-center px-4 py-16">
      <HeaderBB team={teamData?.name} sport={sportName} />
    </main>
  );
};

export default TeamSport;