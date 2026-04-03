'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Fix Leaflet's broken default icon paths when bundled with webpack/Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const TRAVEL_LOCATIONS: { name: string; lat: number; lng: number }[] = [
    { name: 'Hong Kong',         lat: 22.3193,  lng: 114.1694 },
    { name: 'Fuzhou, China',     lat: 26.0745,  lng: 119.2965 },
    { name: 'Shanghai, China',   lat: 31.2304,  lng: 121.4737 },
    { name: 'Beijing, China',    lat: 39.9042,  lng: 116.4074 },
    { name: 'Vienna, Austria',   lat: 48.2082,  lng: 16.3738  },
    { name: 'Turin, Italy',      lat: 45.0703,  lng: 7.6869   },
    { name: 'Paris, France',     lat: 48.8566,  lng: 2.3522   },
    { name: 'Montreal, Canada',  lat: 45.5017,  lng: -73.5673 },
    { name: 'Budapest, Hungary', lat: 47.4979,  lng: 19.0402  },
];

export const TravelMapInner = () => (
    <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 h-64">
        <MapContainer
            center={[30, 60]}
            zoom={2}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {TRAVEL_LOCATIONS.map((loc) => (
                <Marker key={loc.name} position={[loc.lat, loc.lng]}>
                    <Popup>{loc.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    </div>
);
