
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { Clock3, MapPin, Navigation } from "lucide-react";

import { couple } from "../../../data/couple";
import { SideRibbon } from "../../SideRibbon/SideRibbon";

import {
    VISIBLE_STARS,
    getVisibleConstellations,
    projectStar,
    type RealStar,
} from "./astronomy";

/* =========================================================
   TIPOS
========================================================= */

type Phase = "today" | "traveling" | "arrival";

/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const MAP_SIZE = 320;
const CENTER = MAP_SIZE / 2;
const RADIUS = 142;

/*
 * Pedro II - PI
 */
const LOCATION = {
    name: "Pedro II, PI, Brasil",
    coordinates: "4°25′29″ S · 41°27′31″ W",
    latitude: -4.4247,
    longitude: -41.4586,
};

/* =========================================================
   PALETA VISUAL
========================================================= */

const COLORS = {
    ink: "#FFF3D8",
    muted: "#C5BEDD",
    purple: "#C0A5FF",
    lilac: "#D0B5FF",
    warmWhite: "#FFF3D8",
    border: "rgba(168, 117, 255, 0.22)",
};

/* =========================================================
   DATAS
========================================================= */

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
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function formatTime(date: Date) {
    return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

/* =========================================================
   STAR MAP
========================================================= */

function StarMap({
    phase,
    rotation,
    date,
}: {
    phase: Phase;
    rotation: number;
    date: Date;
}) {
    const arrival = phase === "arrival";
    const traveling = phase === "traveling";

    return (
        <motion.div
            className="
                relative aspect-square
                w-[min(78vw,340px)]
                overflow-hidden rounded-full
                shadow-[0_22px_65px_rgba(63,48,110,0.22)]
            "
            animate={{ rotate: rotation }}
            transition={{
                duration: traveling ? 2.8 : 0,
                ease: [0.22, 0.61, 0.36, 1],
            }}
        >
            {/* GLOW EXTERNO */}

            <div
                className="
                    absolute inset-0 rounded-full
                    bg-[#A875FF]/15 blur-2xl
                "
            />

            <div
                className="
                    absolute left-1/2 top-1/2
                    h-[80%] w-[80%]
                    -translate-x-1/2 -translate-y-1/2
                    rounded-full bg-[#8064FF]/15 blur-3xl
                "
            />

            {/* CÍRCULO DO MAPA */}

            <div
                className="
                    absolute inset-0 rounded-full
                    border border-white/20
                    bg-[#10152F]
                "
                style={{
                    background:
                        "radial-gradient(circle at 45% 38%, #252344 0%, #151832 52%, #0B1026 100%)",
                }}
            />

            {/* SVG ASTRONÔMICO */}

            <svg
                viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
                className="absolute inset-0 h-full w-full"
            >
                {/* CÍRCULOS DE ALTITUDE */}

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    fill="none"
                    stroke={COLORS.warmWhite}
                    strokeWidth="0.6"
                    opacity="0.22"
                />

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS * 0.66}
                    fill="none"
                    stroke={COLORS.warmWhite}
                    strokeWidth="0.5"
                    opacity="0.11"
                />

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS * 0.33}
                    fill="none"
                    stroke={COLORS.warmWhite}
                    strokeWidth="0.5"
                    opacity="0.09"
                />

                {/* LINHAS CARDINAIS */}

                <line
                    x1={CENTER}
                    y1={CENTER - RADIUS}
                    x2={CENTER}
                    y2={CENTER + RADIUS}
                    stroke={COLORS.warmWhite}
                    strokeWidth="0.4"
                    opacity="0.12"
                />

                <line
                    x1={CENTER - RADIUS}
                    y1={CENTER}
                    x2={CENTER + RADIUS}
                    y2={CENTER}
                    stroke={COLORS.warmWhite}
                    strokeWidth="0.4"
                    opacity="0.12"
                />

                {/* ESTRELAS */}

                <g>
                    {VISIBLE_STARS.map((star) => (
                        <StarPoint
                            key={star.id}
                            star={star}
                            date={
                                phase === "traveling"
                                    ? getToday()
                                    : date
                            }
                        />
                    ))}
                </g>

                {/* CONSTELAÇÕES */}

                <ConstellationLines
                    date={date}
                    arrival={arrival}
                />

                {/* CENTRO / ZÊNITE */}

                <motion.circle
                    cx={CENTER}
                    cy={CENTER}
                    r={2}
                    fill={COLORS.warmWhite}
                    animate={{
                        opacity: arrival ? [0.4, 1, 0.4] : 0.5,
                        scale: arrival ? [1, 1.6, 1] : 1,
                    }}
                    transition={{
                        duration: 2,
                        repeat: arrival ? Infinity : 0,
                        ease: "easeInOut",
                    }}
                />

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={6}
                    fill="none"
                    stroke={COLORS.lilac}
                    strokeWidth="0.8"
                    opacity="0.7"
                />
            </svg>

            {/* PONTOS CARDEAIS */}

            <span
                className="
                    absolute left-1/2 top-3
                    -translate-x-1/2
                    text-[10px] font-black tracking-widest
                    text-[#FFF3D8]/75
                "
            >
                N
            </span>

            <span
                className="
                    absolute bottom-3 left-1/2
                    -translate-x-1/2
                    text-[10px] font-black tracking-widest
                    text-[#FFF3D8]/75
                "
            >
                S
            </span>

            <span
                className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-[10px] font-black tracking-widest
                    text-[#FFF3D8]/75
                "
            >
                L
            </span>

            <span
                className="
                    absolute right-3 top-1/2
                    -translate-y-1/2
                    text-[10px] font-black tracking-widest
                    text-[#FFF3D8]/75
                "
            >
                O
            </span>
        </motion.div>
    );
}

/* =========================================================
   ESTRELA
========================================================= */

function StarPoint({
    star,
    date,
}: {
    star: RealStar;
    date: Date;
}) {
    const position = projectStar(
        star,
        date,
        LOCATION.latitude,
        LOCATION.longitude,
        MAP_SIZE,
        RADIUS,
    );

    // Estrelas abaixo do horizonte não são exibidas.
    if (!position) return null;

    const radius = Math.max(
        0.45,
        Math.min(2.4, 2.8 - star.magnitude * 0.35),
    );

    const opacity = Math.max(
        0.25,
        Math.min(1, 1.15 - star.magnitude * 0.12),
    );

    return (
        <circle
            cx={position.x}
            cy={position.y}
            r={radius}
            fill={COLORS.warmWhite}
            opacity={opacity}
        />
    );
}

/* =========================================================
   CONSTELAÇÕES
========================================================= */

function ConstellationLines({
    date,
    arrival,
}: {
    date: Date;
    arrival: boolean;
}) {
    return (
        <>
            {getVisibleConstellations().map(
                (constellation, constellationIndex) =>
                    constellation.lines.map((line, lineIndex) => {
                        const segments = getVisibleLineSegments(
                            line,
                            date,
                        );

                        return segments.map((points, segmentIndex) => (
                            <motion.polyline
                                key={`${constellation.id}-${lineIndex}-${segmentIndex}`}
                                points={points}
                                fill="none"
                                stroke={COLORS.lilac}
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{
                                    pathLength: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    pathLength: arrival ? 1 : 0,
                                    opacity: arrival ? 0.8 : 0,
                                }}
                                transition={{
                                    delay:
                                        constellationIndex * 0.015 +
                                        lineIndex * 0.08,
                                    duration: 0.9,
                                    ease: "easeInOut",
                                }}
                            />
                        ));
                    }),
            )}
        </>
    );
}

function getVisibleLineSegments(
    line: [number, number][],
    date: Date,
): string[] {
    const segments: string[] = [];
    let currentSegment: string[] = [];

    for (const [ra, dec] of line) {
        const position = projectStar(
            {
                id: `constellation-${ra}-${dec}`,
                ra,
                dec,
                magnitude: 0,
            },
            date,
            LOCATION.latitude,
            LOCATION.longitude,
            MAP_SIZE,
            RADIUS,
        );

        if (!position) {
            if (currentSegment.length >= 2) {
                segments.push(currentSegment.join(" "));
            }

            currentSegment = [];
            continue;
        }

        currentSegment.push(`${position.x},${position.y}`);
    }

    if (currentSegment.length >= 2) {
        segments.push(currentSegment.join(" "));
    }

    return segments;
}

/* =========================================================
   CARTÃO DE INFORMAÇÃO
========================================================= */

function InfoCard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                rounded-2xl border
                bg-[#fff3c7]/5 p-4
                shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                backdrop-blur-xl
            "
            style={{
                borderColor: "rgba(168, 117, 255, 0.22)",
            }}
        >
            {children}
        </div>
    );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export function StarMapStory() {
    const [phase, setPhase] = useState<Phase>("today");

    const [displayDate, setDisplayDate] = useState<Date>(
        () => getToday(),
    );

    const [mapRotation, setMapRotation] = useState(0);

    const [today] = useState<Date>(() => getToday());

    const [startDate] = useState<Date>(() => getStartDate());

    /* =====================================================
       INÍCIO DA ANIMAÇÃO
    ===================================================== */

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setMapRotation(1080);
            setPhase("traveling");
        }, 1300);

        return () => window.clearTimeout(timeout);
    }, []);

    /* =====================================================
       VIAGEM NO TEMPO
    ===================================================== */

    useEffect(() => {
        if (phase !== "traveling") return;

        const totalSteps = 45;
        let currentStep = 0;

        const startTimestamp = today.getTime();
        const targetTimestamp = startDate.getTime();

        const interval = window.setInterval(() => {
            currentStep++;

            const progress = Math.min(
                currentStep / totalSteps,
                1,
            );

            const eased =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 -
                      Math.pow(-2 * progress + 2, 2) / 2;

            const timestamp =
                startTimestamp +
                (targetTimestamp - startTimestamp) * eased;

            setDisplayDate(new Date(timestamp));

            if (currentStep >= totalSteps) {
                window.clearInterval(interval);

                setDisplayDate(new Date(targetTimestamp));

                window.setTimeout(() => {
                    setPhase("arrival");
                }, 500);
            }
        }, 55);

        return () => {
            window.clearInterval(interval);
        };
    }, [phase, startDate, today]);

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div
            className="
                relative flex min-h-screen w-full flex-col
                items-center justify-center overflow-hidden
                bg-[#0b0b2b] px-6 py-10 pr-15
                text-[#fff3c7]
            "
        >
            {/* =================================================
                BRILHOS SUAVES
            ================================================= */}

            <motion.div
                className="
                    pointer-events-none absolute
                    -left-32 -top-32 h-80 w-80
                    rounded-full bg-[#B7A0FF]/35 blur-3xl
                "
                animate={{ opacity: [0.45, 0.75, 0.45] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="
                    pointer-events-none absolute
                    -bottom-40 -right-32 h-96 w-96
                    rounded-full bg-[#F7BFCF]/40 blur-3xl
                "
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div
                className="
                    pointer-events-none absolute
                    right-[12%] top-[12%]
                    h-28 w-28 rounded-full
                    bg-white/30 blur-3xl
                "
            />

            {/* SIDE RIBBON */}

            <SideRibbon text="NOSSO CÉU" />

            {/* CONTEÚDO */}

            <div
                className="
                    relative z-10 flex w-full max-w-xl
                    flex-col items-center
                "
            >
                {/* HEADER */}

                <motion.div
                    className="mb-7 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p
                        className="
                            mb-2 text-[11px] font-black
                            uppercase tracking-[0.3em]
                        "
                        style={{ color: COLORS.purple }}
                    >
                        {phase === "today"
                            ? "O CÉU DE HOJE"
                            : phase === "traveling"
                              ? "VOLTANDO NO TEMPO"
                              : "AQUELA NOITE"}
                    </p>

                    <h2
                        className="
                            text-3xl font-black uppercase
                            leading-tight tracking-tight
                            sm:text-4xl
                        "
                        style={{ color: COLORS.ink }}
                    >
                        {phase === "arrival"
                            ? "O céu quando tudo começou"
                            : "Nosso mapa estelar"}
                    </h2>

                    <div
                        className="
                            mx-auto mt-3 h-1 w-12
                            rounded-full
                        "
                        style={{
                            background:
                                "linear-gradient(90deg, #8064FF, #E1A6D5)",
                        }}
                    />
                </motion.div>

                {/* MAPA */}

                <StarMap
                    phase={phase}
                    rotation={mapRotation}
                    date={displayDate}
                />

                {/* INFORMAÇÕES */}

                <AnimatePresence mode="wait">
                    {phase === "today" && (
                        <motion.div
                            key="today-info"
                            className="mt-8 text-center"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                        >
                            <p
                                className="
                                    text-xs font-bold uppercase
                                    tracking-widest
                                "
                                style={{ color: COLORS.muted }}
                            >
                                Preparando nossa
                                <br />
                                viagem pelo tempo...
                            </p>
                        </motion.div>
                    )}

                    {phase === "traveling" && (
                        <motion.div
                            key="traveling-info"
                            className="mt-8 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p
                                className="
                                    text-xs font-black uppercase
                                    tracking-[0.2em]
                                "
                                style={{ color: COLORS.purple }}
                            >
                                Retornando para
                            </p>

                            <p
                                className="mt-1 text-lg font-black"
                                style={{ color: COLORS.ink }}
                            >
                                {formatDate(displayDate)}
                            </p>
                        </motion.div>
                    )}

                    {phase === "arrival" && (
                        <motion.div
                            key="arrival-info"
                            className="mt-8 w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* DATA / HORA */}

                            <div className="mb-4 grid grid-cols-2 gap-3">
                                <InfoCard>
                                    <Clock3
                                        size={18}
                                        className="mb-2"
                                        color={COLORS.purple}
                                    />

                                    <p
                                        className="
                                            text-[9px] font-black
                                            uppercase tracking-widest
                                        "
                                        style={{ color: COLORS.muted }}
                                    >
                                        Data e hora
                                    </p>

                                    <p
                                        className="mt-1 text-lg font-black"
                                        style={{ color: COLORS.ink }}
                                    >
                                        {formatDate(startDate)}
                                    </p>

                                    <p
                                        className="mt-1 text-lg font-black"
                                        style={{ color: COLORS.ink }}
                                    >
                                        {formatTime(startDate)}
                                    </p>
                                </InfoCard>

                                <InfoCard>
                                    <MapPin
                                        size={18}
                                        className="mb-2"
                                        color={COLORS.purple}
                                    />

                                    <p
                                        className="
                                            text-[9px] font-black
                                            uppercase tracking-widest
                                        "
                                        style={{ color: COLORS.muted }}
                                    >
                                        Onde
                                    </p>

                                    <p
                                        className="mt-1 text-sm font-black"
                                        style={{ color: COLORS.ink }}
                                    >
                                        {LOCATION.name}
                                    </p>

                                    <p
                                        className="mt-1 text-xs"
                                        style={{ color: COLORS.muted }}
                                    >
                                        Piauí, Brasil
                                    </p>
                                </InfoCard>
                            </div>

                            {/* COORDENADAS */}

                            <div
                                className="
                                    flex items-center justify-center
                                    gap-2 rounded-2xl border
                                    bg-white/40 px-4 py-3
                                    backdrop-blur-xl
                                "
                                style={{ borderColor: COLORS.border }}
                            >
                                <Navigation
                                    size={14}
                                    color={COLORS.purple}
                                />

                                <span
                                    className="
                                        text-[10px] font-black
                                        uppercase tracking-widest
                                    "
                                    style={{ color: COLORS.muted }}
                                >
                                    {LOCATION.coordinates}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FRASE FINAL */}

                <AnimatePresence>
                    {phase === "arrival" && (
                        <motion.p
                            className="
                                mt-8 max-w-sm text-center
                                text-sm font-black uppercase
                                leading-relaxed tracking-widest
                            "
                            style={{ color: COLORS.ink }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 1,
                                duration: 0.7,
                            }}
                        >
                            O céu quando nossos
                            <br />
                            mundos se colidiram.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}