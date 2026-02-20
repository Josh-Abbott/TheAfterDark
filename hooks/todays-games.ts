"use client";

import { useEffect, useState, useCallback } from "react";

export interface Game {
  id: string;
  sport: string;
  status: string;
  startTime: string;
  homeTeam: {
    name: string;
    score?: number;
    rank?: number | null;
  };
  awayTeam: {
    name: string;
    score?: number;
    rank?: number | null;
  };
}

export const useTodaysGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);

      const res = await fetch("/api/todays-games", {
        cache: "no-store", // Ensure we always get latest data from API route
      });

      const data: Game[] = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames(true);

    // Poll every 60 seconds
    const interval = setInterval(() => {
      fetchGames(false);
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchGames]);

  return { games, loading };
};
