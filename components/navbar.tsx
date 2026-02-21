'use client';

import { useState } from "react";
import Link from "next/link";

import { PAC_SPORTS } from "@/lib/pac12Sports";
import { PAC_TEAMS } from "@/lib/pac12Teams";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<'sports' | 'teams' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative bg-slate-900 text-white h-16">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-xl">The After Dark</Link>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-slate-900 md:items-center gap-4 p-4 md:p-0 z-50`}>

          {/* Sport Dropdown*/}
          <li
            className="relative h-16 flex items-center"
            onMouseEnter={() => setOpenDropdown('sports')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href="/sports"
              className="flex items-center h-16 px-4 font-bold hover:text-blue-400"
            >
              Sports
            </Link>

            {openDropdown === 'sports' && (
              <ul className="absolute top-full left-0 w-48 bg-slate-800 rounded shadow-lg max-h-64 overflow-y-auto z-50">
                {PAC_SPORTS.map((sport) => (
                  <li key={sport}>
                    <Link
                      href={`/sports/${sport.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                      className="block px-4 py-2 hover:bg-slate-700"
                    >
                      {sport}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>


          {/* Team Dropdown */}
          <li
            className="relative h-16 flex items-center"
            onMouseEnter={() => setOpenDropdown('teams')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href="/teams"
              className="flex items-center h-16 px-4 font-bold hover:text-blue-400"
            >
              Teams
            </Link>

            {openDropdown === 'teams' && (
              <ul className="absolute top-full left-0 w-48 bg-slate-800 rounded shadow-lg max-h-64 overflow-y-auto z-50">
                {PAC_TEAMS.map((team) => (
                  <li key={team}>
                    <Link
                      href={`/teams/${team.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                      className="block px-4 py-2 hover:bg-slate-700"
                    >
                      {team}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>


          {/* Standard Links */}
          <li><Link href="/big-board" className="hover:text-blue-400 py-2 px-4 ">Big Board</Link></li>
          <li><Link href="/polls" className="hover:text-blue-400 py-2 px-4 ">Polls</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;