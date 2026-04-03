'use client';

import dynamic from 'next/dynamic';
import { F1Widget } from './F1Widget';
import { WarriorsWidget } from './WarriorsWidget';

const TravelMap = dynamic(() => import('./TravelMap'), {
    ssr: false,
    loading: () => (
        <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-lg h-64" />
    ),
});

export const InterestsSection = () => (
    <div className="mt-3 flex flex-col gap-4">
        <TravelMap />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <F1Widget />
            <WarriorsWidget />
        </div>
    </div>
);
