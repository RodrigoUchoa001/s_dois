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
    onSelectVisit: (visitId: string) => void;
}

function MapCamera({ visit }: { visit: PlaceVisit }) {
    const map = useMap();

    useEffect(() => {
        const targetZoom = Math.max(map.getZoom(), 17);

        const position: [number, number] = [
            visit.coordinates.latitude,
            visit.coordinates.longitude,
        ];

        // Projeta as coordenadas já no zoom de destino.
        const markerPoint = map.project(position, targetZoom);

        // Desloca o centro 100px para baixo,
        // deixando o coração 100px acima do centro visual.
        const adjustedCenterPoint = markerPoint.add([0, 100]);

        const adjustedCenter = map.unproject(
            adjustedCenterPoint,
            targetZoom
        );

        map.stop();

        map.flyTo(adjustedCenter, targetZoom, {
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
    onSelectVisit,
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
            scrollWheelZoom={true}
            dragging={true}
            doubleClickZoom={true}
            touchZoom={true}
            keyboard={false}
            className="h-full w-full bg-[#080B24]"
        >
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

            {/* MARCADORES CLICÁVEIS */}
            {visits.map((visit) => (
                <HeartMarker
                    key={visit.id}
                    visit={visit}
                    selected={visit.id === selectedVisit.id}
                    onSelect={onSelectVisit}
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