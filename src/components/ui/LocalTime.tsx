"use client";

import { useEffect, useRef } from "react";

/**
 * Live local time for a city. Server/first paint renders a neutral
 * placeholder (times can't be prerendered); the client writes the real
 * value straight to the DOM once a minute — no React re-renders.
 */
export function LocalTime({
  timeZone,
  className,
  withPeriod = true,
}: {
  timeZone: string;
  className?: string;
  withPeriod?: boolean;
}) {
  const ref = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    let timeout = 0;
    const write = () => {
      const now = new Date();
      const parts = fmt.formatToParts(now);
      const hm = parts
        .filter((p) => p.type === "hour" || p.type === "minute" || p.type === "literal")
        .map((p) => p.value)
        .join("")
        .trim();
      const period = parts.find((p) => p.type === "dayPeriod")?.value ?? "";
      el.textContent = withPeriod ? `${hm} ${period}` : hm;
      el.dateTime = now.toISOString();
      // Tick on the minute boundary.
      timeout = window.setTimeout(write, 60_000 - (now.getTime() % 60_000) + 50);
    };
    write();
    return () => window.clearTimeout(timeout);
  }, [timeZone, withPeriod]);

  return (
    <time ref={ref} className={className} suppressHydrationWarning>
      --:--
    </time>
  );
}
