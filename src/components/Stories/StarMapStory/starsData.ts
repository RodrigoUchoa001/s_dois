export type Star = {
    id: number;
    x: number;
    y: number;
    radius: number;
    opacity: number;
    delay: number;
};

type Constellation = {
    id: string;
    starIds: number[];
};

/* ============================================================
   ESTRELAS
============================================================ */

/**
 * Estas são estrelas visuais temporárias.
 *
 * Posteriormente podemos substituir este array por estrelas
 * reais calculadas a partir de RA/DEC + data/hora/local.
 */
export const STARS: Star[] = [
    {
        id: 1,
        x: 48,
        y: 27,
        radius: 1.5,
        opacity: 0.8,
        delay: 0.05,
    },
    {
        id: 2,
        x: 61,
        y: 34,
        radius: 2.2,
        opacity: 1,
        delay: 0.1,
    },
    {
        id: 3,
        x: 72,
        y: 43,
        radius: 1.1,
        opacity: 0.65,
        delay: 0.15,
    },
    {
        id: 4,
        x: 36,
        y: 38,
        radius: 1.3,
        opacity: 0.8,
        delay: 0.2,
    },
    {
        id: 5,
        x: 27,
        y: 53,
        radius: 2.1,
        opacity: 0.95,
        delay: 0.25,
    },
    {
        id: 6,
        x: 43,
        y: 52,
        radius: 1.1,
        opacity: 0.65,
        delay: 0.3,
    },
    {
        id: 7,
        x: 55,
        y: 49,
        radius: 1.7,
        opacity: 0.9,
        delay: 0.35,
    },
    {
        id: 8,
        x: 66,
        y: 59,
        radius: 1.2,
        opacity: 0.7,
        delay: 0.4,
    },
    {
        id: 9,
        x: 78,
        y: 64,
        radius: 1.8,
        opacity: 0.9,
        delay: 0.45,
    },
    {
        id: 10,
        x: 34,
        y: 68,
        radius: 1.4,
        opacity: 0.8,
        delay: 0.5,
    },
    {
        id: 11,
        x: 47,
        y: 72,
        radius: 2.3,
        opacity: 1,
        delay: 0.55,
    },
    {
        id: 12,
        x: 58,
        y: 67,
        radius: 1.1,
        opacity: 0.65,
        delay: 0.6,
    },
    {
        id: 13,
        x: 69,
        y: 76,
        radius: 1.5,
        opacity: 0.8,
        delay: 0.65,
    },
    {
        id: 14,
        x: 23,
        y: 76,
        radius: 1.1,
        opacity: 0.7,
        delay: 0.7,
    },
    {
        id: 15,
        x: 84,
        y: 45,
        radius: 1.2,
        opacity: 0.7,
        delay: 0.75,
    },
    {
        id: 16,
        x: 17,
        y: 43,
        radius: 1.6,
        opacity: 0.8,
        delay: 0.8,
    },
    {
        id: 17,
        x: 88,
        y: 57,
        radius: 1.1,
        opacity: 0.65,
        delay: 0.85,
    },
    {
        id: 18,
        x: 42,
        y: 83,
        radius: 1.7,
        opacity: 0.9,
        delay: 0.9,
    },
    {
        id: 19,
        x: 62,
        y: 84,
        radius: 1.2,
        opacity: 0.7,
        delay: 0.95,
    },
    {
        id: 20,
        x: 74,
        y: 27,
        radius: 1.4,
        opacity: 0.75,
        delay: 1,
    },
    {
        id: 21,
        x: 32,
        y: 24,
        radius: 1.1,
        opacity: 0.7,
        delay: 1.05,
    },
    {
        id: 22,
        x: 54,
        y: 19,
        radius: 1.8,
        opacity: 0.9,
        delay: 1.1,
    },
    {
        id: 23,
        x: 81,
        y: 79,
        radius: 1.3,
        opacity: 0.7,
        delay: 1.15,
    },
    {
        id: 24,
        x: 14,
        y: 61,
        radius: 1.2,
        opacity: 0.65,
        delay: 1.2,
    },
];

/* ============================================================
   CONSTELAÇÕES
============================================================ */

export const CONSTELLATIONS: Constellation[] = [
    {
        id: "constellation-1",
        starIds: [1, 2, 7, 8, 9],
    },
    {
        id: "constellation-2",
        starIds: [2, 7, 8],
    },
    {
        id: "constellation-3",
        starIds: [5, 10, 11, 7],
    },
];