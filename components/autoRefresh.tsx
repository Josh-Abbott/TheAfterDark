"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function AutoRefresh({ interval = 60000 }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      router.refresh();
    }, interval);

    return () => clearInterval(timer);
  }, [router, interval]);

  return null;
}

export default AutoRefresh;