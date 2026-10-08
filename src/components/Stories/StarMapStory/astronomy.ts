import starsData from "../../../data/astronomy/stars.json";
import constellationsData from "../../../data/astronomy/constellations.json";

/* ============================================================
   TIPOS
============================================================ */

export type RealStar = {
    id: number | string;
    ra: number;
    dec: number;
    magnitude: number;
};

export type ConstellationLine = {
    id: string;
    lines: [number, number][][];
};

type StarFeature = {
    type: "Feature";
    id: number | string;
    properties: {
        mag: number;
        bv?: string;
    };
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
};

type StarFeatureCollection = {
    type: "FeatureCollection";
    features: StarFeature[];
};

type ConstellationFeature = {
    type: "Feature";
    id: string;
    properties: {
        rank?: string;
    };
    geometry: {
        type: "MultiLineString";
        coordinates: [number, number][][];
    };
};

type ConstellationFeatureCollection = {
    type: "FeatureCollection";
    features: ConstellationFeature[];
};

const stars =
    starsData as StarFeatureCollection;

const constellations =
    constellationsData as ConstellationFeatureCollection;

/* ============================================================
   ESTRELAS REAIS
============================================================ */

export const REAL_STARS: RealStar[] =
    stars.features.map((feature) => ({
        id: feature.id,
        ra: feature.geometry.coordinates[0],
        dec: feature.geometry.coordinates[1],
        magnitude: feature.properties.mag,
    }));

/* ============================================================
   CONSTELAÇÕES REAIS
============================================================ */

export const REAL_CONSTELLATIONS: ConstellationLine[] =
    constellations.features.map((feature) => ({
        id: feature.id,
        lines: feature.geometry.coordinates,
    }));

/* ============================================================
   PROJEÇÃO
============================================================ */

export function projectStar(
    ra: number,
    dec: number,
) {
    const x =
        ((ra + 180) / 360) * 100;

    const y =
        ((90 - dec) / 180) * 100;

    return {
        x,
        y,
    };
}