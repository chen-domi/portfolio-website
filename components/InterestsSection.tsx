"use client";

import { useEffect, useState } from "react";
import { fetchF1Standings, fetchTeamRecord, F1Standings, TeamRecord } from "@/lib/sports";

function F1Widget() {
  const [data, setData] = useState<F1Standings | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchF1Standings()
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="text-[14px] text-ink-soft italic">Live standings unavailable right now.</p>;
  }

  if (!data) {
    return <p className="text-[14px] text-ink-soft italic">fetching live standings…</p>;
  }

  return (
    <div>
      <div className="flex gap-8 mb-5">
        {data.constructors.map((c) => (
          <div key={c.id}>
            <div className="font-mono text-[22px] text-accent leading-none">P{c.position}</div>
            <div className="text-[14px]">{c.name}</div>
            <div className="font-mono text-[11px] text-ink-soft">{c.points} pts</div>
          </div>
        ))}
      </div>
      <div className="font-mono text-[13px] mb-3">
        {data.drivers.map((d) => (
          <div key={d.id} className="flex justify-between border-b border-rule-light py-1.5">
            <span>
              <span className="text-accent">P{d.position}</span> {d.name} ({d.code})
            </span>
            <span className="text-ink-soft">
              {d.team} · {d.points} pts
            </span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-ink-soft">
        live · F1 {data.season} round {data.round} · via Ergast API
      </p>
    </div>
  );
}

function TeamRecordRow({
  sport,
  league,
  slug,
  label,
}: {
  sport: "basketball" | "football";
  league: "nba" | "nfl";
  slug: string;
  label: string;
}) {
  const [data, setData] = useState<TeamRecord | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTeamRecord(sport, league, slug)
      .then(setData)
      .catch(() => setError(true));
  }, [sport, league, slug]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1.5 sm:gap-5.5 mb-6">
      <div className="font-mono text-[11px] text-accent uppercase tracking-wide pt-0.5">
        {label}
      </div>
      <div className="text-[14px]">
        {error && <p className="text-ink-soft italic">Live record unavailable right now.</p>}
        {!error && !data && <p className="text-ink-soft italic">fetching live record…</p>}
        {data && (
          <div className="font-mono text-[13px]">
            <div>{data.standingSummary ?? data.displayName}</div>
            {data.overallSummary && (
              <div className="text-ink-soft">record: {data.overallSummary}</div>
            )}
            {data.nextEvent && (
              <div className="text-ink-soft">next: {data.nextEvent.name}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function InterestsSection() {
  return (
    <div>
      <p className="text-ink-soft text-[15px] mb-5">
        Formula 1, the Warriors, and the 49ers — pulled live, not pasted in.
      </p>
      <F1Widget />
      <div className="mt-8">
        <TeamRecordRow sport="basketball" league="nba" slug="gsw" label="Warriors" />
        <TeamRecordRow sport="football" league="nfl" slug="sf" label="49ers" />
      </div>
    </div>
  );
}
