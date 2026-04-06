'use client';

import { useEffect, useState } from 'react';

interface ESPNTeam {
    id: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
}
interface ESPNCompetitor {
    homeAway: 'home' | 'away';
    team: ESPNTeam;
    score?: string | { value: number; displayValue: string };
    record?: Array<{ type: string; displayValue: string }>;
}
interface ESPNStatusType {
    name: string;        // "STATUS_SCHEDULED", "STATUS_FINAL", etc.
    description: string;
    detail: string;      // "7:30 PM ET", "Final"
}
interface ESPNEvent {
    id: string;
    date: string;
    name: string;
    competitions: Array<{
        competitors: ESPNCompetitor[];
        status: { type: ESPNStatusType };
        venue?: { fullName: string };
    }>;
}
interface ESPNScheduleResponse {
    events: ESPNEvent[];
}

function scoreStr(score: string | { value: number; displayValue: string } | undefined): string | undefined {
    if (score === undefined) return undefined;
    return typeof score === 'string' ? score : score.displayValue;
}

function formatGameDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatGameTime(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
}

export const WarriorsWidget = () => {
    const [lastGame, setLastGame] = useState<ESPNEvent | null>(null);
    const [nextGame, setNextGame] = useState<ESPNEvent | null>(null);
    const [record, setRecord] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/9/schedule')
            .then(r => r.json() as Promise<ESPNScheduleResponse>)
            .then(data => {
                const now = new Date();
                const finals = data.events.filter(e =>
                    e.competitions[0]?.status?.type?.name === 'STATUS_FINAL'
                );
                const lastFinal = finals[finals.length - 1] ?? null;
                setLastGame(lastFinal);
                const warriorsInLast = lastFinal?.competitions[0]?.competitors.find(c => c.team.abbreviation === 'GS');
                const overallRecord = warriorsInLast?.record?.find(r => r.type === 'total');
                if (overallRecord) setRecord(overallRecord.displayValue);
                const upcoming = data.events.find(e => {
                    const isFinal = e.competitions[0]?.status?.type?.name === 'STATUS_FINAL';
                    return !isFinal && new Date(e.date) >= now;
                }) ?? null;
                setNextGame(upcoming);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    const lastComp = lastGame?.competitions[0];
    const lastWarriors = lastComp?.competitors.find(c => c.team.abbreviation === 'GS');
    const lastOpponent = lastComp?.competitors.find(c => c.team.abbreviation !== 'GS');
    const lastIsHome = lastWarriors?.homeAway === 'home';
    const warriorsScore = scoreStr(lastWarriors?.score);
    const opponentScore = scoreStr(lastOpponent?.score);
    const warriorsWon = warriorsScore !== undefined && opponentScore !== undefined
        ? parseInt(warriorsScore) > parseInt(opponentScore)
        : null;

    const nextComp = nextGame?.competitions[0];
    const nextWarriors = nextComp?.competitors.find(c => c.team.abbreviation === 'GS');
    const nextOpponent = nextComp?.competitors.find(c => c.team.abbreviation !== 'GS');
    const nextIsHome = nextWarriors?.homeAway === 'home';

    return (
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#1D428A] flex-shrink-0" />
                    <span className="text-sm font-semibold">Warriors</span>
                </div>
                {record && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{record}</span>
                )}
            </div>

            {loading && (
                <div className="space-y-2">
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded h-3 w-3/4" />
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded h-3 w-1/2" />
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded h-3 w-2/3" />
                </div>
            )}

            {error && (
                <p className="text-xs text-neutral-400">Could not load schedule.</p>
            )}

            {!loading && !error && (
                <>
                    {lastGame && (
                        <div className="mb-3">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Last Game</p>
                            <p className="text-xs font-medium">
                                {lastIsHome ? 'vs' : '@'} {lastOpponent?.team.shortDisplayName ?? lastOpponent?.team.displayName}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {formatGameDate(lastGame.date)}
                            </p>
                            {warriorsScore !== undefined && opponentScore !== undefined && (
                                <p className="text-xs font-medium mt-1">
                                    <span className={warriorsWon ? 'text-green-600 dark:text-green-400' : 'text-red-500'}>
                                        {warriorsWon ? 'W' : 'L'}
                                    </span>
                                    <span className="text-neutral-500 dark:text-neutral-400 ml-1">
                                        {warriorsScore}–{opponentScore}
                                    </span>
                                </p>
                            )}
                        </div>
                    )}

                    {nextGame && (
                        <>
                            <div className="border-t border-neutral-100 dark:border-neutral-800 my-3" />
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Next Game</p>
                                <p className="text-xs font-medium">
                                    {nextIsHome ? 'vs' : '@'} {nextOpponent?.team.shortDisplayName ?? nextOpponent?.team.displayName}
                                </p>
                                {nextComp?.venue?.fullName && (
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                        {nextComp.venue.fullName}
                                    </p>
                                )}
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {formatGameDate(nextGame.date)}
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {formatGameTime(nextGame.date)}
                                </p>
                            </div>
                        </>
                    )}

                    {!lastGame && !nextGame && (
                        <p className="text-xs text-neutral-400">No games found.</p>
                    )}
                </>
            )}
        </div>
    );
};
