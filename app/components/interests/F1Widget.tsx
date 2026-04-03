'use client';

import { useEffect, useState } from 'react';

interface F1Driver {
    code: string;
    givenName: string;
    familyName: string;
}
interface F1Constructor {
    name: string;
}
interface F1Result {
    position: string;
    Driver: F1Driver;
    Constructor: F1Constructor;
    Time?: { time: string };
    status: string;
}
interface F1Race {
    raceName: string;
    Circuit: {
        circuitName: string;
        Location: { locality: string; country: string };
    };
    date: string;
    time?: string;
    Results?: F1Result[];
}
interface JolpicaResponse {
    MRData: {
        RaceTable: { Races: F1Race[] };
    };
}

function formatRaceDate(date: string, time?: string): string {
    const d = new Date(date + 'T' + (time ?? '12:00:00'));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export const F1Widget = () => {
    const [lastRace, setLastRace] = useState<F1Race | null>(null);
    const [nextRace, setNextRace] = useState<F1Race | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch('https://api.jolpi.ca/ergast/f1/current/last/results.json').then(r => r.json() as Promise<JolpicaResponse>),
            fetch('https://api.jolpi.ca/ergast/f1/current/next.json').then(r => r.json() as Promise<JolpicaResponse>),
        ])
            .then(([lastData, nextData]) => {
                setLastRace(lastData.MRData.RaceTable.Races[0] ?? null);
                setNextRace(nextData.MRData.RaceTable.Races[0] ?? null);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                <span className="text-sm font-semibold">Formula 1</span>
            </div>

            {loading && (
                <div className="space-y-2">
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded h-3 w-3/4" />
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded h-3 w-1/2" />
                    <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded h-3 w-2/3" />
                </div>
            )}

            {error && (
                <p className="text-xs text-neutral-400">Could not load F1 data.</p>
            )}

            {!loading && !error && (
                <>
                    {lastRace && (
                        <div className="mb-3">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Last Race</p>
                            <p className="text-xs font-medium truncate">{lastRace.raceName}</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                                {lastRace.Circuit.Location.locality}, {lastRace.Circuit.Location.country}
                            </p>
                            <div className="space-y-1">
                                {lastRace.Results?.slice(0, 3).map((result) => (
                                    <div key={result.position} className="grid grid-cols-[1rem_1fr_auto] gap-2 items-center">
                                        <span className="text-xs text-neutral-400 tabular-nums">{result.position}</span>
                                        <span className="text-xs truncate">
                                            {result.Driver.givenName[0]}. {result.Driver.familyName}
                                        </span>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                            {result.Time?.time ?? result.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {nextRace && (
                        <>
                            <div className="border-t border-neutral-100 dark:border-neutral-800 my-3" />
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Next Race</p>
                                <p className="text-xs font-medium truncate">{nextRace.raceName}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {nextRace.Circuit.Location.locality}, {nextRace.Circuit.Location.country}
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {formatRaceDate(nextRace.date, nextRace.time)}
                                </p>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
