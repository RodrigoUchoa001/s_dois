
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { divIcon } from "leaflet";

import {
    MapContainer,
    Marker,
    Polyline,
    TileLayer,
    useMap,
} from "react-leaflet";

import type { PlaceVisit } from "../../../data/couple";

import { HeartMarker } from "./HeartMarker";
import { Polaroid } from "./Polaroid";

interface PlacesMapProps {
    visits: PlaceVisit[];
    selectedVisit: PlaceVisit;
}

function MapCamera({ visit }: { visit: PlaceVisit }) {
    const map = useMap();

    useEffect(() => {
        const target = map.latLngToContainerPoint([
            visit.coordinates.latitude,
            visit.coordinates.longitude,
        ]);

        // Desloca o centro visual para deixar o marcador mais acima.
        const offset = target.subtract([0, -100]);

        const adjustedCenter = map.containerPointToLatLng(offset);

        map.flyTo(adjustedCenter, 16, {
            duration: 1.2,
        });
    }, [
        map,
        visit.id,
        visit.coordinates.latitude,
        visit.coordinates.longitude,
    ]);

    return null;
}

/*
 * Polaroid vinculada geograficamente ao marcador.
 * O portal permite renderizar o componente React dentro
 * do elemento HTML que o Leaflet posiciona no mapa.
 */
function PolaroidMapMarker({
    visit,
}: {
    visit: PlaceVisit;
}) {
    const element = useMemo(
        () => document.createElement("div"),
        [visit.id]
    );

    const icon = useMemo(
        () =>
            divIcon({
                html: element,
                className: "polaroid-map-icon",
                iconSize: [128, 160],

                // Posiciona a polaroid ao lado do marcador.
                iconAnchor: [-16, 65],
            }),
        [element]
    );

    return (
        <>
            <Marker
                position={[
                    visit.coordinates.latitude,
                    visit.coordinates.longitude,
                ]}
                icon={icon}
                interactive={false}
                keyboard={false}
                zIndexOffset={1000}
            />

            {createPortal(
                <Polaroid visit={visit} />,
                element
            )}
        </>
    );
}

export function PlacesMap({
    visits,
    selectedVisit,
}: PlacesMapProps) {
    // Coordenadas dos locais na ordem cadastrada.
    const routePositions = useMemo(
        () =>
            visits.map(
                (visit) =>
                    [
                        visit.coordinates.latitude,
                        visit.coordinates.longitude,
                    ] as [number, number]
            ),
        [visits]
    );

    return (
        <MapContainer
            center={[
                selectedVisit.coordinates.latitude,
                selectedVisit.coordinates.longitude,
            ]}
            zoom={16}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={true}
            doubleClickZoom={false}
            touchZoom={true}
            keyboard={false}
            className="h-full w-full bg-[#080B24]"
        >
            {/* MAPA CLARO — OPENSTREETMAP */}

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* CÂMERA */}

            <MapCamera visit={selectedVisit} />

            {/* LINHA PONTILHADA ENTRE OS LOCAIS */}

            {routePositions.length >= 2 && (
                <Polyline
                    positions={routePositions}
                    pathOptions={{
                        color: "#A99AFF",
                        weight: 3,
                        opacity: 0.9,
                        dashArray: "8 10",
                        lineCap: "round",
                        lineJoin: "round",
                    }}
                    interactive={false}
                />
            )}

            {/* MARCADORES */}

            {visits.map((visit) => (
                <HeartMarker
                    key={visit.id}
                    visit={visit}
                    selected={visit.id === selectedVisit.id}
                />
            ))}

            {/* POLAROID DA VISITA SELECIONADA */}

            <PolaroidMapMarker
                key={`polaroid-${selectedVisit.id}`}
                visit={selectedVisit}
            />
        </MapContainer>
    );
}
