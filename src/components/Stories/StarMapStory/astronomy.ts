import starsData from "../../../data/astronomy/stars.json";
import constellationsData from "../../../data/astronomy/constellations.json";

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
 * Limita a quantidade de estrelas.
 *
 * Quanto menor o valor de magnitude,
 * mais brilhante é a estrela.
 */
export const VISIBLE_STARS: RealStar[] =
    REAL_STARS
        .filter((star) => star.magnitude <= 3.5)
        .sort((a, b) => a.magnitude - b.magnitude)
        .slice(0, 1000);

export const REAL_CONSTELLATIONS: ConstellationLine[] =
    constellations.features.map((feature) => ({
        id: feature.id,
        lines: feature.geometry.coordinates,
    }));


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
 * RA:
 *   graus
 *
 * DEC:
 *   graus
 */
export function equatorialToHorizontal(
    ra: number,
    dec: number,
    date: Date,
    latitude: number,
    longitude: number,
) {
    /*
     * Tempo sideral local
     */
    const lst = normalizeDegrees(
        getGreenwichSiderealTime(date) + longitude,
    );

    /*
     * Ângulo horário
     */
    const hourAngle = normalizeDegrees(lst - ra);

    const H = toRadians(hourAngle);
    const decRad = toRadians(dec);
    const latRad = toRadians(latitude);

    /*
     * ALTITUDE
     */
    const sinAltitude =
        Math.sin(decRad) * Math.sin(latRad) +
        Math.cos(decRad) *
            Math.cos(latRad) *
            Math.cos(H);

    const altitude = toDegrees(
        Math.asin(sinAltitude),
    );

    /*
     * AZIMUTE
     *
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
    /*
     * Abaixo do horizonte não aparece.
     */
    if (altitude < 0) {
        return null;
    }

    const center = mapSize / 2;

    /*
     * Zenith:
     * altitude 90 → centro
     *
     * Horizonte:
     * altitude 0 → borda
     */
    const normalizedRadius =
        ((90 - altitude) / 90) * radius;

    const azimuthRad = toRadians(azimuth);

    /*
     * Norte para cima
     * Leste para direita
     * Sul para baixo
     * Oeste para esquerda
     */
    const x =
        center +
        normalizedRadius *
            Math.sin(azimuthRad);

    const y =
        center -
        normalizedRadius *
            Math.cos(azimuthRad);

    /*
     * Segurança extra.
     */
    const distance = Math.sqrt(
        (x - center) ** 2 +
            (y - center) ** 2,
    );

    if (distance > radius + 0.1) {
        return null;
    }

    return {
        x,
        y,
    };
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
    const horizontal =
        equatorialToHorizontal(
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