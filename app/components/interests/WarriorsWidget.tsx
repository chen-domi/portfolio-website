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
    score?: string;
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

function formatGameDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatGameTime(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
}

export const WarriorsWidget = () => {
    const [nextGame, setNextGame] = useState<ESPNEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/9/schedule')
            .then(r => r.json() as Promise<ESPNScheduleResponse>)
            .then(data => {
                const now = new Date();
                const upcoming = data.events.find(e => {
                    const isFinal = e.competitions[0]?.status?.type?.name === 'STATUS_FINAL';
                    return !isFinal && new Date(e.date) >= now;
                }) ?? null;
                setNextGame(upcoming);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    const competition = nextGame?.competitions[0];
    const warriors = competition?.competitors.find(c => c.team.abbreviation === 'GS');
    const opponent = competition?.competitors.find(c => c.team.abbreviation !== 'GS');
    const isHome = warriors?.homeAway === 'home';

    return (
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#1D428A] flex-shrink-0" />
                <span className="text-sm font-semibold">Warriors</span>
            </div>

            {loading && (
                <div className="space-y-2">
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded h-3 w-3/4" />
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded h-3 w-1/2" />
                </div>
            )}

            {error && (
                <p className="text-xs text-neutral-400">Could not load schedule.</p>
            )}

            {!loading && !error && !nextGame && (
                <p className="text-xs text-neutral-400">No upcoming games.</p>
            )}

            {!loading && !error && nextGame && (
                <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Next Game</p>
                    <p className="text-xs font-medium">
                        {isHome ? 'vs' : '@'} {opponent?.team.shortDisplayName ?? opponent?.team.displayName}
                    </p>
                    {competition?.venue?.fullName && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                            {competition.venue.fullName}
                        </p>
                    )}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatGameDate(nextGame.date)}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatGameTime(nextGame.date)}
                    </p>
                </div>
            )}
        </div>
    );
};
