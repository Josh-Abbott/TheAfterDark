import Link from "next/link";

import { PAC_TEAMS } from "@/lib/config/pac12Teams";

const Teams = async () => {
  return (
    <main className="flex flex-col w-full min-h-[calc(90vh-4rem)] justify-center items-center px-4 py-16">
      <ul className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {PAC_TEAMS.map((team) => (
          <li key={team.name} className="p-8 bg-neutral-900 rounded-2xl hover:scale-105 transition">
            <Link
              href={`/teams/${team.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
              className="text-2xl font-bold block text-center"
            >
              {team.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Teams;