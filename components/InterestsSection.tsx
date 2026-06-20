"use client";

import { useEffect, useState } from "react";
import {
  fetchF1Standings,
  fetchF1LastRace,
  fetchF1NextRace,
  fetchTeamRecord,
  fetchLastGame,
  F1Standings,
  F1LastRace,
  F1NextRace,
  TeamRecord,
  LastGame,
} from "@/lib/sports";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function F1Card() {
  const [standings, setStandings] = useState<F1Standings | null>(null);
  const [lastRace, setLastRace] = useState<F1LastRace | null>(null);
  const [nextRace, setNextRace] = useState<F1NextRace | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([fetchF1Standings(), fetchF1LastRace(), fetchF1NextRace()])
      .then(([s, last, next]) => {
        setStandings(s);
        setLastRace(last);
        setNextRace(next);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div className="border border-rule p-5 mb-5">
      <div className="font-mono text-[11px] text-accent uppercase tracking-wide mb-4">
        Formula 1
      </div>

      {error && <p className="text-[14px] text-ink-soft italic">Live data unavailable right now.</p>}

      {!error && !standings && (
        <p className="text-[14px] text-ink-soft italic">fetching live standings…</p>
      )}

      {standings && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <div className="flex gap-8 mb-4">
              {standings.constructors.map((c) => (
                <div key={c.id}>
                  <div className="font-mono text-[22px] text-accent leading-none">P{c.position}</div>
                  <div className="text-[14px]">{c.name}</div>
                  <div className="font-mono text-[11px] text-ink-soft">{c.points} pts</div>
                </div>
              ))}
            </div>
            <div className="font-mono text-[13px]">
              {standings.drivers.map((d) => (
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
            <p className="font-mono text-[10px] text-ink-soft mt-2">
              F1 {standings.season} round {standings.round}
            </p>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-rule-light pt-4 sm:pt-0 sm:pl-6">
            {lastRace && (
              <div className="mb-4">
                <div className="font-mono text-[10px] text-ink-soft uppercase tracking-wide mb-1.5">
                  Last race
                </div>
                <div className="text-[14px] mb-0.5">{lastRace.raceName}</div>
                <div className="font-mono text-[11px] text-ink-soft mb-2">
                  {lastRace.locality}, {lastRace.country}
                </div>
                <div className="font-mono text-[12px]">
                  {lastRace.podium.map((p) => (
                    <div key={p.position} className="flex justify-between py-0.5">
                      <span>
                        <span className="text-accent">{p.position}</span> {p.code}
                      </span>
                      <span className="text-ink-soft">{p.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {nextRace && (
              <div>
                <div className="font-mono text-[10px] text-ink-soft uppercase tracking-wide mb-1.5">
                  Next race
                </div>
                <div className="text-[14px] mb-0.5">{nextRace.raceName}</div>
                <div className="font-mono text-[11px] text-ink-soft">
                  {nextRace.locality}, {nextRace.country} · {formatDate(nextRace.date)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TeamCard({
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
  const [record, setRecord] = useState<TeamRecord | null>(null);
  const [lastGame, setLastGame] = useState<LastGame | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTeamRecord(sport, league, slug)
      .then((r) => {
        setRecord(r);
        return fetchLastGame(sport, league, slug, r.id);
      })
      .then(setLastGame)
      .catch(() => setError(true));
  }, [sport, league, slug]);

  return (
    <div className="border border-rule p-5">
      <div className="font-mono text-[11px] text-accent uppercase tracking-wide mb-3">
        {label}
      </div>

      {error && <p className="text-[14px] text-ink-soft italic">Live data unavailable right now.</p>}

      {!error && !record && <p className="text-[14px] text-ink-soft italic">fetching live record…</p>}

      {record && (
        <div className="font-mono text-[13px]">
          <div className="mb-3">
            {record.standingSummary ?? record.displayName}
            {record.overallSummary && (
              <span className="text-ink-soft"> · {record.overallSummary}</span>
            )}
          </div>

          {lastGame && (
            <div className="mb-3">
              <div className="text-[10px] text-ink-soft uppercase tracking-wide mb-1">
                Last game
              </div>
              <div className="flex justify-between">
                <span>
                  <span className="text-accent">{lastGame.result}</span>{" "}
                  {lastGame.isHome ? "vs" : "@"} {lastGame.opponent}
                </span>
                <span className="text-ink-soft">
                  {lastGame.teamScore}-{lastGame.opponentScore}
                </span>
              </div>
            </div>
          )}

          {record.nextEvent && (
            <div>
              <div className="text-[10px] text-ink-soft uppercase tracking-wide mb-1">
                Next game
              </div>
              <div className="flex justify-between">
                <span>{record.nextEvent.name}</span>
                <span className="text-ink-soft">{formatDate(record.nextEvent.date)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function InterestsSection() {
  return (
    <div>
      <F1Card />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TeamCard sport="basketball" league="nba" slug="gsw" label="Warriors" />
        <TeamCard sport="football" league="nfl" slug="sf" label="49ers" />
      </div>
    </div>
  );
}
