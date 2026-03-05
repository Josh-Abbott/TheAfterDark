import { getTeamHeader } from "@/lib/services/teamHeader";

interface HeaderProps {
  team: string;
  sport: string;
}

async function Header({team, sport}: HeaderProps) {
  const teamData = await getTeamHeader(team, sport);
  
  return (
    <div className="flex justify-left items-center w-full h-24 bg-slate-800 text-white px-6 rounded-lg mb-8">
      <h1>{team} - {sport}</h1>
    </div>
  )
}

export default Header