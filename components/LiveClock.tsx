"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      });
      setTime(formatted);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time ?? ""}</span>;
}
