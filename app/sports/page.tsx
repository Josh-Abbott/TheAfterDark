import Link from "next/link";

import { PAC_SPORTS } from "@/lib/pac12Sports";

const Sports = async () => {
  return (
    <main className="flex flex-col w-full min-h-[calc(90vh-4rem)] justify-center items-center px-4 py-16">
      <ul className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {PAC_SPORTS.map((sport) => (
          <li key={sport} className="p-8 bg-neutral-900 rounded-2xl hover:scale-105 transition">
            <Link
              href={`/sports/${sport.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
              className="text-2xl font-bold block text-center"
            >
              {sport}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Sports;