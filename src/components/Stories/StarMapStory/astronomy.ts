
import starsData from "../../../data/astronomy/stars.json";
import constellationsData from "../../../data/astronomy/constellations.json";

export type RealStar = {
    id: number | string;
    ra: number;
    dec: number;
    magnitude: number;
};

export type NamedStar = RealStar & {
    name: string;
    labelDx?: number;
    labelDy?: number;
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

const stars = starsData as StarFeatureCollection;
const constellations =
    constellationsData as ConstellationFeatureCollection;

export const REAL_STARS: RealStar[] =
    stars.features.map((feature) => ({
        id: feature.id,
        ra: feature.geometry.coordinates[0],
        dec: feature.geometry.coordinates[1],
        magnitude: feature.properties.mag,
    }));

/*
 * Catálogo de estrelas conhecidas.
 *
 * RA e DEC estão em graus.
 * Magnitudes menores representam estrelas mais brilhantes.
 *
 * labelDx e labelDy controlam o deslocamento dos nomes
 * em relação à posição real de cada estrela no mapa.
 */
export const NAMED_STARS: NamedStar[] = [
    {
        id: "sirius",
        name: "Sirius",
        ra: 101.287,
        dec: -16.716,
        magnitude: -1.46,
        labelDx: 5,
        labelDy: -5,
    },
    {
        id: "canopus",
        name: "Canopus",
        ra: 95.988,
        dec: -52.696,
        magnitude: -0.74,
        labelDx: 5,
        labelDy: -5,
    },
    {
        id: "alpha-centauri",
        name: "Alpha Centauri",
        ra: 219.902,
        dec: -60.834,
        magnitude: -0.27,
        labelDx: 5,
        labelDy: 11,
    },
    {
        id: "achernar",
        name: "Achernar",
        ra: 24.428,
        dec: -57.237,
        magnitude: 0.46,
        labelDx: 5,
        labelDy: -5,
    },
    {
        id: "acrux",
        name: "Acrux",
        ra: 186.65,
        dec: -63.099,
        magnitude: 0.76,
        labelDx: -5,
        labelDy: -7,
    },
    {
        id: "hadar",
        name: "Hadar",
        ra: 210.956,
        dec: -60.373,
        magnitude: 0.61,
        labelDx: 5,
        labelDy: -7,
    },
    {
        id: "betelgeuse",
        name: "Betelgeuse",
        ra: 88.793,
        dec: 7.407,
        magnitude: 0.42,
        labelDx: 5,
        labelDy: -6,
    },
    {
        id: "rigel",
        name: "Rigel",
        ra: 78.634,
        dec: -8.202,
        magnitude: 0.13,
        labelDx: 5,
        labelDy: 11,
    },
    {
        id: "procyon",
        name: "Procyon",
        ra: 114.825,
        dec: 5.225,
        magnitude: 0.34,
        labelDx: 5,
        labelDy: -6,
    },
    {
        id: "spica",
        name: "Spica",
        ra: 201.298,
        dec: -11.161,
        magnitude: 0.97,
        labelDx: 5,
        labelDy: -6,
    },
    {
        id: "antares",
        name: "Antares",
        ra: 247.352,
        dec: -26.432,
        magnitude: 1.06,
        labelDx: 5,
        labelDy: 11,
    },
    {
        id: "vega",
        name: "Vega",
        ra: 279.234,
        dec: 38.784,
        magnitude: 0.03,
        labelDx: 5,
        labelDy: -6,
    },
    {
        id: "altair",
        name: "Altair",
        ra: 297.696,
        dec: 8.868,
        magnitude: 0.77,
        labelDx: 5,
        labelDy: 11,
    },
    {
        id: "deneb",
        name: "Deneb",
        ra: 310.358,
        dec: 45.28,
        magnitude: 1.25,
        labelDx: 5,
        labelDy: -6,
    },
    {
        id: "fomalhaut",
        name: "Fomalhaut",
        ra: 344.413,
        dec: -29.622,
        magnitude: 1.16,
        labelDx: 5,
        labelDy: -6,
    },
    {
        id: "aldebaran",
        name: "Aldebaran",
        ra: 68.98,
        dec: 16.509,
        magnitude: 0.86,
        labelDx: 5,
        labelDy: -6,
    },
    {
        id: "pollux",
        name: "Pollux",
        ra: 116.329,
        dec: 28.026,
        magnitude: 1.14,
        labelDx: 5,
        labelDy: -6,
    },
    {
        id: "capella",
        name: "Capella",
        ra: 79.172,
        dec: 45.998,
        magnitude: 0.08,
        labelDx: 5,
        labelDy: -6,
    },
];

export const VISIBLE_STARS: RealStar[] =
    REAL_STARS
        .filter((star) => star.magnitude <= 3.8)
        .sort((a, b) => a.magnitude - b.magnitude)
        .slice(0, 1000);

export const REAL_CONSTELLATIONS: ConstellationLine[] =
    constellations.features.map((feature) => ({
        id: feature.id,
        lines: feature.geometry.coordinates,
    }));

export function getVisibleConstellations(): ConstellationLine[] {
    // Preserva os segmentos originais das constelações.
    // A visibilidade é determinada durante a projeção
    // de cada segmento no mapa.
    return REAL_CONSTELLATIONS;
}

/* =========================================================
   ASTRONOMIA
========================================================= */

function normalizeDegrees(value: number) {
    return ((value % 360) + 360) % 360;
}

function toRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number) {
    return (radians * 180) / Math.PI;
}

/* =========================================================
   JULIAN DATE
========================================================= */

function getJulianDate(date: Date) {
    return date.getTime() / 86400000 + 2440587.5;
}

/* =========================================================
   TEMPO SIDERAL
========================================================= */

function getGreenwichSiderealTime(date: Date) {
    const jd = getJulianDate(date);
    const T = (jd - 2451545.0) / 36525;

    const gmst =
        280.46061837 +
        360.98564736629 * (jd - 2451545.0) +
        0.000387933 * T * T -
        (T * T * T) / 38710000;

    return normalizeDegrees(gmst);
}

/* =========================================================
   RA / DEC → ALT / AZ
========================================================= */

/**
 * latitude:
 *   norte positivo
 *   sul negativo
 *
 * longitude:
 *   leste positivo
 *   oeste negativo
 *
 * RA e DEC em graus.
 */
export function equatorialToHorizontal(
    ra: number,
    dec: number,
    date: Date,
    latitude: number,
    longitude: number,
) {
    const lst = normalizeDegrees(
        getGreenwichSiderealTime(date) + longitude,
    );

    const hourAngle = normalizeDegrees(lst - ra);

    const H = toRadians(hourAngle);
    const decRad = toRadians(dec);
    const latRad = toRadians(latitude);

    const sinAltitude =
        Math.sin(decRad) * Math.sin(latRad) +
        Math.cos(decRad) *
            Math.cos(latRad) *
            Math.cos(H);

    const altitude = toDegrees(
        Math.asin(
            Math.max(-1, Math.min(1, sinAltitude)),
        ),
    );

    /*
     * Azimute:
     * 0   = Norte
     * 90  = Leste
     * 180 = Sul
     * 270 = Oeste
     */
    const azimuth = normalizeDegrees(
        toDegrees(
            Math.atan2(
                -Math.sin(H) * Math.cos(decRad),
                Math.sin(decRad) * Math.cos(latRad) -
                    Math.cos(decRad) *
                        Math.sin(latRad) *
                        Math.cos(H),
            ),
        ),
    );

    return {
        altitude,
        azimuth,
    };
}

/* =========================================================
   ALT / AZ → MAPA CIRCULAR
========================================================= */

export function projectToSkyMap(
    altitude: number,
    azimuth: number,
    mapSize: number,
    radius: number,
) {
    // Não exibe objetos abaixo do horizonte.
    if (altitude < 0 || altitude > 90) {
        return null;
    }

    const center = mapSize / 2;

    // Zênite no centro e horizonte na borda.
    const normalizedRadius =
        ((90 - altitude) / 90) * radius;

    const azimuthRad = toRadians(azimuth);

    /*
     * Orientação do mapa:
     * Norte: cima
     * Sul: baixo
     * Leste: esquerda
     * Oeste: direita
     */
    const x =
        center - normalizedRadius * Math.sin(azimuthRad);

    const y =
        center - normalizedRadius * Math.cos(azimuthRad);

    return { x, y };
}

/* =========================================================
   ESTRELA → POSIÇÃO NO MAPA
========================================================= */

export function projectStar(
    star: RealStar,
    date: Date,
    latitude: number,
    longitude: number,
    mapSize: number,
    radius: number,
) {
    const horizontal = equatorialToHorizontal(
        star.ra,
        star.dec,
        date,
        latitude,
        longitude,
    );

    const position = projectToSkyMap(
        horizontal.altitude,
        horizontal.azimuth,
        mapSize,
        radius,
    );

    if (!position) {
        return null;
    }

    return {
        ...position,
        altitude: horizontal.altitude,
        azimuth: horizontal.azimuth,
    };
}
