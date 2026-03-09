import Link from "next/link";

import { PAC_TEAMS } from "@/lib/config/pac12Teams";

const TeamSports = async ({ params }: { params: Promise<{ team: string }> }) => {
  const { team: teamURL } = await params;
  const team = PAC_TEAMS.find(t =>  
    t.name.toLowerCase().replace(/\s+/g, '-') === teamURL // Make team name in data match the URL format
  );

  return (
    <main className="flex flex-col w-full min-h-[calc(90vh-4rem)] justify-center items-center px-4 py-16">
      <ul className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {team?.sports.map((sport) => (
          <li key={sport.name} className="p-8 bg-neutral-900 rounded-2xl hover:scale-105 transition">
            <Link
              href={`/teams/${teamURL}/${sport.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
              className="text-2xl font-bold block text-center"
            >
              {sport.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TeamSports;