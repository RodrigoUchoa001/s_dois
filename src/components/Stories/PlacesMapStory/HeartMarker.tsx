import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";

import type { PlaceVisit } from "../../../data/couple";

interface HeartMarkerProps {
    visit: PlaceVisit;
    selected: boolean;
    onSelect: (visitId: string) => void;
}

export function HeartMarker({
    visit,
    selected,
    onSelect,
}: HeartMarkerProps) {
    const icon = divIcon({
        className: "!border-0 !bg-transparent",

        html: `
            <div
                class="flex items-center justify-center ${
                    selected ? "scale-110" : "scale-100"
                } transition-transform duration-200"
                style="filter: drop-shadow(0 0 5px rgba(120,100,255,0.25));"
            >
                <svg
                    viewBox="0 0 32 32"
                    width="36"
                    height="36"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16 28
                            C13 25 3 18 3 10
                            C3 3 12 1 16 8
                            C20 1 29 3 29 10
                            C29 18 19 25 16 28Z"
                        fill="#7864FF"
                        stroke="#E6C889"
                        stroke-width="1.5"
                    />

                    <path
                        d="M16 23
                            C13 20 7 15 7 10
                            C7 6 12 4 16 9"
                        fill="none"
                        stroke="#C2B5FF"
                        stroke-width="1"
                        opacity="0.65"
                    />
                </svg>
            </div>
        `,

        iconSize: [36, 36],
        iconAnchor: [18, 18],
    });

    return (
        <Marker
            position={[
                visit.coordinates.latitude,
                visit.coordinates.longitude,
            ]}
            icon={icon}
            eventHandlers={{
                click: () => onSelect(visit.id),
            }}
        />
    );
}