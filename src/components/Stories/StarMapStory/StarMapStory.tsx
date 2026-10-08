import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import { AnimatePresence, motion } from "motion/react";

import {
    Clock3,
    MapPin,
    Navigation,
    // Sparkles,
} from "lucide-react";
import { couple } from "../../../data/couple";
import { SideRibbon } from "../../SideRibbon/SideRibbon";
import {
    REAL_STARS,
    REAL_CONSTELLATIONS,
    projectStar,
    type RealStar,
} from "./astronomy";

/* ============================================================
   TIPOS
============================================================ */

type Phase =
    | "today"
    | "traveling"
    | "arrival";

/* ============================================================
   CONFIGURAÇÕES
============================================================ */

const MAP_SIZE = 320;
const CENTER = MAP_SIZE / 2;
const RADIUS = 142;

/**
 * Coordenadas aproximadas de Pedro II - PI.
 *
 * Latitude:  -4.4247
 * Longitude: -41.4586
 */
const LOCATION = {
    name: "Pedro II, PI, Brasil",
    coordinates: "4°25′29″ S · 41°27′31″ W",
};

/* ============================================================
   DATA
============================================================ */

function getToday() {
    return new Date();
}

function getStartDate() {
    return new Date(
        couple.startYear,
        couple.startMonth - 1,
        couple.startDay,
        couple.startHour,
        couple.startMinute,
        couple.startSecond,
    );
}

function formatDate(date: Date) {
    const day = date.getDate();

    const month = date
        .toLocaleDateString("pt-BR", {
            month: "short",
        })
        .replace(".", "")
        .toUpperCase();

    const year = date.getFullYear();

    return `${day} DE ${month} DE ${year}`;
}

function formatTime() {
    return [
        couple.startHour,
        couple.startMinute,
        couple.startSecond,
    ]
        .map((value) =>
            String(value).padStart(2, "0"),
        )
        .join(":");
}

/* ============================================================
   ESTRELA
============================================================ */

function StarPoint({
    star,
    arrival,
}: {
    star: RealStar;
    arrival: boolean;
}) {
    const position = projectStar(
        star.ra,
        star.dec,
    );

    const x =
        (position.x / 100) * MAP_SIZE;

    const y =
        (position.y / 100) * MAP_SIZE;

    /*
     * Magnitude menor = estrela mais brilhante.
     *
     * Limitamos o tamanho para evitar estrelas
     * exageradamente grandes ou pequenas.
     */
    const radius = Math.max(
        0.45,
        Math.min(
            2.2,
            2.8 - star.magnitude * 0.35,
        ),
    );

    const opacity = Math.max(
        0.25,
        Math.min(
            1,
            1.15 - star.magnitude * 0.12,
        ),
    );

    function getStarDelay(id: number | string) {
        const value =
            typeof id === "number"
                ? id
                : id
                    .split("")
                    .reduce(
                        (sum, char) =>
                            sum +
                            char.charCodeAt(0),
                        0,
                    );

        return (value % 80) / 100;
    }

    return (
        <motion.circle
            cx={x}
            cy={y}
            r={radius}
            fill="#fff3c7"
            initial={{
                opacity: 0,
                scale: 0,
            }}
            animate={{
                opacity,
                scale: arrival ? 1.15 : 1,
            }}
            transition={{
                duration: 0.45,
                delay: getStarDelay(star.id),
                type: "spring",
                stiffness: 180,
            }}
        />
    );
}

/* ============================================================
   CONSTELAÇÕES
============================================================ */

function ConstellationLines({
    arrival,
}: {
    arrival: boolean;
}) {
    return (
        <>
            {REAL_CONSTELLATIONS.map(
                (constellation, constellationIndex) =>
                    constellation.lines.map(
                        (line, lineIndex) => {
                            const points = line
                                .map(
                                    ([ra, dec]) => {
                                        const position =
                                            projectStar(
                                                ra,
                                                dec,
                                            );

                                        const x =
                                            (position.x /
                                                100) *
                                            MAP_SIZE;

                                        const y =
                                            (position.y /
                                                100) *
                                            MAP_SIZE;

                                        return `${x},${y}`;
                                    },
                                )
                                .join(" ");

                            return (
                                <motion.polyline
                                    key={`${constellation.id}-${lineIndex}`}
                                    points={points}
                                    fill="none"
                                    stroke="#a875ff"
                                    strokeWidth="0.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{
                                        pathLength: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        pathLength:
                                            arrival
                                                ? 1
                                                : 0,
                                        opacity:
                                            arrival
                                                ? 0.8
                                                : 0,
                                    }}
                                    transition={{
                                        delay:
                                            constellationIndex *
                                                0.05 +
                                            lineIndex *
                                                0.1,
                                        duration: 1.1,
                                        ease: "easeInOut",
                                    }}
                                />
                            );
                        },
                    ),
            )}
        </>
    );
}

/* ============================================================
   MAPA ESTELAR
============================================================ */

function StarMap({
    phase,
    rotation,
}: {
    phase: Phase;
    rotation: number;
}) {
    const traveling = phase === "traveling";
    const arrival = phase === "arrival";

    return (
        <motion.div
            className="relative aspect-square w-[min(78vw,340px)]"
            animate={{
                rotate: rotation,
            }}
            transition={{
                duration: traveling ? 2.8 : 0,
                ease: [0.22, 0.61, 0.36, 1],
            }}
        >
            {/* Brilho */}

            <motion.div
                className="absolute inset-[-18px] rounded-full bg-[#8064ff]/10 blur-2xl"
                animate={{
                    scale: traveling
                        ? [1, 1.2, 1]
                        : arrival
                          ? [1.2, 1]
                          : 1,

                    opacity: traveling
                        ? [0.3, 0.65, 0.3]
                        : 0.35,
                }}
                transition={{
                    duration: traveling ? 1 : 0.8,
                    repeat: traveling
                        ? Infinity
                        : 0,
                }}
            />

            {/* Círculo principal */}

            <div className="absolute inset-0 rounded-full border border-[#fff3c7]/20 bg-[#11113d]/60 shadow-[0_0_60px_rgba(128,100,255,0.15)]" />

            <svg
                viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
                className="absolute inset-0 h-full w-full"
            >
                {/* Círculo externo */}

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    fill="none"
                    stroke="#fff3c7"
                    strokeOpacity="0.08"
                    strokeWidth="0.6"
                />

                {/* Círculo interno */}

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS * 0.72}
                    fill="none"
                    stroke="#fff3c7"
                    strokeOpacity="0.05"
                    strokeWidth="0.5"
                    strokeDasharray="2 6"
                />

                {/* Norte */}

                <text
                    x={CENTER}
                    y="18"
                    textAnchor="middle"
                    fill="#fff3c7"
                    fillOpacity="0.35"
                    fontSize="7"
                    fontWeight="800"
                >
                    N
                </text>

                {/* Sul */}

                <text
                    x={CENTER}
                    y="309"
                    textAnchor="middle"
                    fill="#fff3c7"
                    fillOpacity="0.35"
                    fontSize="7"
                    fontWeight="800"
                >
                    S
                </text>

                {/* Oeste */}

                <text
                    x="14"
                    y={CENTER + 2}
                    textAnchor="middle"
                    fill="#fff3c7"
                    fillOpacity="0.35"
                    fontSize="7"
                    fontWeight="800"
                >
                    O
                </text>

                {/* Leste */}

                <text
                    x="306"
                    y={CENTER + 2}
                    textAnchor="middle"
                    fill="#fff3c7"
                    fillOpacity="0.35"
                    fontSize="7"
                    fontWeight="800"
                >
                    L
                </text>

                {/* Estrelas */}

                {REAL_STARS.map((star) => (
                    <StarPoint
                        key={star.id}
                        star={star}
                        arrival={arrival}
                    />
                ))}

                {/* Constelações */}

                <ConstellationLines
                    arrival={arrival}
                />

                {/* Centro */}

                <motion.circle
                    cx={CENTER}
                    cy={CENTER}
                    r="2"
                    fill="#a875ff"
                    animate={{
                        opacity: arrival
                            ? [0.4, 1, 0.4]
                            : 0.4,

                        scale: arrival
                            ? [1, 1.8, 1]
                            : 1,
                    }}
                    transition={{
                        duration: 2,
                        repeat: arrival
                            ? Infinity
                            : 0,
                    }}
                />
            </svg>
        </motion.div>
    );
}

/* ============================================================
   STAR MAP STORY
============================================================ */

export function StarMapStory() {
    const startDate = useMemo(
        () => getStartDate(),
        [],
    );

    const [phase, setPhase] =
        useState<Phase>("today");

    const [displayDate, setDisplayDate] =
        useState(getToday);

    /*
     * Rotação atual do mapa.
     *
     * Importante:
     * esse valor começa em 0 e vai para 1080.
     * Nunca volta para 0 quando chega em "arrival".
     */
    const [mapRotation, setMapRotation] =
        useState(0);

    /* ========================================================
       INÍCIO DA VIAGEM
    ======================================================== */

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setMapRotation(1080);
            setPhase("traveling");
        }, 1300);

        return () => {
            window.clearTimeout(timeout);
        };
    }, []);

    /* ========================================================
       ANIMAÇÃO DO TEMPO
    ======================================================== */

    useEffect(() => {
        if (phase !== "traveling") {
            return;
        }

        const today = getToday();

        const difference =
            today.getTime() -
            startDate.getTime();

        const steps = 45;
        const intervalDuration = 55;

        let step = 0;

        const interval = window.setInterval(() => {
            step++;

            const progress = Math.min(
                step / steps,
                1,
            );

            /*
             * Ease-in-out.
             *
             * Começa devagar,
             * acelera,
             * depois desacelera perto da chegada.
             */
            const eased =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 -
                      Math.pow(
                          -2 * progress + 2,
                          2,
                      ) /
                          2;

            const timestamp =
                today.getTime() -
                difference * eased;

            setDisplayDate(
                new Date(timestamp),
            );

            if (step >= steps) {
                window.clearInterval(interval);

                setDisplayDate(startDate);

                window.setTimeout(() => {
                    setPhase("arrival");
                }, 400);
            }
        }, intervalDuration);

        return () => {
            window.clearInterval(interval);
        };
    }, [phase, startDate]);

    /* ========================================================
       TEXTOS
    ======================================================== */

    const phaseLabel =
        phase === "today"
            ? "HOJE"
            : phase === "traveling"
              ? "VOLTANDO NO TEMPO"
              : "AQUELA NOITE";

    return (
        <motion.div
            key="star-map"
            initial={{
                opacity: 0,
                scale: 1.04,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                scale: 0.96,
            }}
            transition={{
                duration: 0.6,
            }}
            className="relative h-full w-full overflow-hidden bg-[#0b0b2b] text-[#fff3c7]"
        >
            {/* =================================================
                BACKGROUND
            ================================================= */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 0.18,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                }}
                className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#8064ff] blur-[110px]"
            />

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    opacity: 0.12,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                    delay: 0.2,
                }}
                className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#a875ff] blur-[110px]"
            />

            {/* =================================================
                FITA
            ================================================= */}

            <SideRibbon text="O céu daquela noite" />

            {/* =================================================
                CONTEÚDO
            ================================================= */}

            <div className="relative z-10 flex h-full flex-col items-center px-7 pb-7 pr-14 pt-7">
                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.1,
                    }}
                    className="flex items-center gap-2"
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff3c7] text-[#0b0b2b]">
                        <Navigation
                            size={14}
                            strokeWidth={2.5}
                        />
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Nosso céu
                    </p>
                </motion.div>

                {/* =================================================
                    MAPA
                ================================================= */}

                <div className="flex min-h-0 flex-1 items-center justify-center">
                    <StarMap
                        phase={phase}
                        rotation={mapRotation}
                    />
                </div>

                {/* =================================================
                    DATA
                ================================================= */}

                <div className="flex w-full flex-col items-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={phaseLabel}
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -8,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="text-center text-xs font-black uppercase tracking-[0.22em] text-[#a875ff]"
                        >
                            {phaseLabel}
                        </motion.p>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={displayDate
                                .toISOString()
                                .slice(0, 10)}
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -8,
                            }}
                            transition={{
                                duration: 0.15,
                            }}
                            className="mt-1 text-center text-2xl font-black uppercase leading-none tracking-tight"
                        >
                            {formatDate(
                                displayDate,
                            )}
                        </motion.h1>
                    </AnimatePresence>

                    {/* =================================================
                        INFORMAÇÕES
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity:
                                phase === "arrival"
                                    ? 1
                                    : 0,
                            y:
                                phase === "arrival"
                                    ? 0
                                    : 8,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="mt-4 flex flex-col items-center gap-1.5"
                    >
                        <div className="flex items-center gap-1.5">
                            <Clock3
                                size={12}
                                className="text-[#a875ff]"
                            />

                            <span className="text-[11px] font-bold text-[#fff3c7]/70">
                                {formatTime()}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <MapPin
                                size={12}
                                className="text-[#a875ff]"
                            />

                            <span className="text-[11px] font-bold text-[#fff3c7]/70">
                                {LOCATION.name}
                            </span>
                        </div>

                        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#fff3c7]/35">
                            {LOCATION.coordinates}
                        </span>
                    </motion.div>

                    {/* =================================================
                        FRASE FINAL
                    ================================================= */}

                    <AnimatePresence>
                        {phase === "arrival" && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 1.5,
                                    duration: 0.8,
                                }}
                                className="mt-5 max-w-xs text-center"
                            >
                                <div className="mx-auto mb-2 h-px w-10 bg-[#a875ff]/50" />

                                <p className="text-[10px] font-black uppercase leading-relaxed tracking-[0.18em] text-[#fff3c7]/75">
                                    O CÉU QUANDO NOSSOS
                                    <br />
                                    MUNDOS SE COLIDIRAM
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}