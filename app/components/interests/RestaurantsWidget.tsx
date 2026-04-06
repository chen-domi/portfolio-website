const restaurants = [
    { name: 'Rochambeau' },
    { name: 'Yume Ga Arukura' },
    { name: 'Mountain House' },
];

export const RestaurantsWidget = () => (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold">Top Restaurants in Boston</span>
        </div>
        <ol className="space-y-1 mb-3">
            {restaurants.map((r, i) => (
                <li key={r.name} className="flex items-center gap-2 text-xs">
                    <span className="text-neutral-400 dark:text-neutral-500 w-3 shrink-0">{i + 1}.</span>
                    <span>{r.name}</span>
                </li>
            ))}
        </ol>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
            Full list coming soon via Beli.
        </p>
    </div>
);
