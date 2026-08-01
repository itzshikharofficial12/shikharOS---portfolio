"use client";

import { useEffect, useState } from "react";

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const interval = window.setInterval(() => setCurrentTime(new Date()), 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return currentTime;
}