import {
    useEffect,
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
} from "motion/react";

import {
    Clock3,
    MapPin,
    Navigation,
} from "lucide-react";

import { couple } from "../../../data/couple";

import { SideRibbon } from "../../SideRibbon/SideRibbon";

import {
    VISIBLE_STARS,
    REAL_CONSTELLATIONS,
    projectStar,
    type RealStar,
} from "./astronomy";


/* =========================================================
   TIPOS
========================================================= */

type Phase =
    | "today"
    | "traveling"
    | "arrival";


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

    coordinates:
        "4°25′29″ S · 41°27′31″ W",

    latitude: -4.4247,

    longitude: -41.4586,
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
    return date.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        },
    );
}


function formatTime(date: Date) {
    return date.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        },
    );
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
                relative
                aspect-square
                w-[min(78vw,340px)]
                overflow-hidden
                rounded-full
            "
            animate={{
                rotate: rotation,
            }}
            transition={{
                duration: traveling ? 2.8 : 0,
                ease: [
                    0.22,
                    0.61,
                    0.36,
                    1,
                ],
            }}
        >
            {/* =================================================
                GLOW
            ================================================= */}

            <div
                className="
                    absolute
                    inset-0
                    rounded-full
                    bg-[#8064ff]/10
                    blur-2xl
                "
            />

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[80%]
                    w-[80%]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#8064ff]/10
                    blur-3xl
                "
            />

            {/* =================================================
                CÍRCULO DO MAPA
            ================================================= */}

            <div
                className="
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-[#fff3c7]/20
                    bg-[#0b0b2b]/80
                "
            />

            {/* =================================================
                SVG
            ================================================= */}

            <svg
                viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                "
            >
                {/* =============================================
                    CÍRCULO INTERNO
                ============================================= */}

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    fill="none"
                    stroke="#fff3c7"
                    strokeWidth="0.6"
                    opacity="0.15"
                />

                {/* =============================================
                    CÍRCULOS DE ALTITUDE
                ============================================= */}

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS * 0.66}
                    fill="none"
                    stroke="#fff3c7"
                    strokeWidth="0.5"
                    opacity="0.06"
                />

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS * 0.33}
                    fill="none"
                    stroke="#fff3c7"
                    strokeWidth="0.5"
                    opacity="0.06"
                />

                {/* =============================================
                    LINHAS CARDINAIS
                ============================================= */}

                <line
                    x1={CENTER}
                    y1={CENTER - RADIUS}
                    x2={CENTER}
                    y2={CENTER + RADIUS}
                    stroke="#fff3c7"
                    strokeWidth="0.4"
                    opacity="0.06"
                />

                <line
                    x1={CENTER - RADIUS}
                    y1={CENTER}
                    x2={CENTER + RADIUS}
                    y2={CENTER}
                    stroke="#fff3c7"
                    strokeWidth="0.4"
                    opacity="0.06"
                />

                {/* =============================================
                    ESTRELAS
                ============================================= */}

                <g>
                    {VISIBLE_STARS.map(
                        (star) => (
                            <StarPoint
                                key={star.id}
                                star={star}
                                date={
                                    phase === "traveling"
                                        ? getToday()
                                        : date
                                }
                            />
                        ),
                    )}
                </g>

                {/* =============================================
                    CONSTELAÇÕES
                ============================================= */}

                <ConstellationLines
                    date={date}
                    arrival={arrival}
                />

                {/* =============================================
                    CENTRO / ZENITE
                ============================================= */}

                <motion.circle
                    cx={CENTER}
                    cy={CENTER}
                    r={2}
                    fill="#fff3c7"
                    animate={{
                        opacity:
                            arrival
                                ? [0.4, 1, 0.4]
                                : 0.5,
                        scale:
                            arrival
                                ? [1, 1.6, 1]
                                : 1,
                    }}
                    transition={{
                        duration: 2,
                        repeat:
                            arrival
                                ? Infinity
                                : 0,
                        ease: "easeInOut",
                    }}
                />

                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={6}
                    fill="none"
                    stroke="#a875ff"
                    strokeWidth="0.7"
                    opacity="0.4"
                />
            </svg>

            {/* =================================================
                PONTOS CARDEAIS
            ================================================= */}

            <span
                className="
                    absolute
                    left-1/2
                    top-3
                    -translate-x-1/2
                    text-[10px]
                    font-black
                    tracking-widest
                    text-[#fff3c7]/60
                "
            >
                N
            </span>

            <span
                className="
                    absolute
                    bottom-3
                    left-1/2
                    -translate-x-1/2
                    text-[10px]
                    font-black
                    tracking-widest
                    text-[#fff3c7]/60
                "
            >
                S
            </span>

            <span
                className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[10px]
                    font-black
                    tracking-widest
                    text-[#fff3c7]/60
                "
            >
                O
            </span>

            <span
                className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[10px]
                    font-black
                    tracking-widest
                    text-[#fff3c7]/60
                "
            >
                L
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

    /*
     * Abaixo do horizonte.
     */
    if (!position) {
        return null;
    }

    /*
     * Estrelas mais brilhantes
     * ficam maiores.
     */
    const radius = Math.max(
        0.45,
        Math.min(
            2.4,
            2.8 -
                star.magnitude *
                    0.35,
        ),
    );

    const opacity = Math.max(
        0.25,
        Math.min(
            1,
            1.15 -
                star.magnitude *
                    0.12,
        ),
    );

    return (
        <circle
            cx={position.x}
            cy={position.y}
            r={radius}
            fill="#fff3c7"
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
            {REAL_CONSTELLATIONS.map(
                (
                    constellation,
                    constellationIndex,
                ) =>
                    constellation.lines.map(
                        (
                            line,
                            lineIndex,
                        ) => {
                            const points =
                                line
                                    .map(
                                        (
                                            [
                                                ra,
                                                dec,
                                            ],
                                        ) => {
                                            const position =
                                                projectStar(
                                                    {
                                                        id: `${constellation.id}-${lineIndex}`,
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

                                            if (
                                                !position
                                            ) {
                                                return null;
                                            }

                                            return `${position.x},${position.y}`;
                                        },
                                    )
                                    .filter(
                                        (
                                            point,
                                        ): point is string =>
                                            point !==
                                            null,
                                    )
                                    .join(
                                        " ",
                                    );

                            if (
                                !points
                            ) {
                                return null;
                            }

                            return (
                                <motion.polyline
                                    key={`${constellation.id}-${lineIndex}`}
                                    points={
                                        points
                                    }
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
                                                ? 0.75
                                                : 0,
                                    }}
                                    transition={{
                                        delay:
                                            constellationIndex *
                                                0.015 +
                                            lineIndex *
                                                0.08,
                                        duration: 0.9,
                                        ease:
                                            "easeInOut",
                                    }}
                                />
                            );
                        },
                    ),
            )}
        </>
    );
}


/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export function StarMapStory() {
    const [phase, setPhase] =
        useState<Phase>("today");

    const [displayDate, setDisplayDate] =
        useState<Date>(() => getToday());

    const [mapRotation, setMapRotation] =
        useState(0);

    /*
     * Essas datas são criadas apenas uma vez.
     */
    const [today] =
        useState<Date>(() => getToday());

    const [startDate] =
        useState<Date>(() => getStartDate());


    /* =====================================================
       INÍCIO DA ANIMAÇÃO
    ===================================================== */

    useEffect(() => {
        const timeout =
            window.setTimeout(
                () => {
                    setMapRotation(
                        1080,
                    );

                    setPhase(
                        "traveling",
                    );
                },
                1300,
            );

        return () =>
            window.clearTimeout(
                timeout,
            );
    }, []);


    /* =====================================================
       VIAGEM NO TEMPO
    ===================================================== */

    useEffect(() => {
        if (phase !== "traveling") {
            return;
        }

        const totalSteps = 45;

        let currentStep = 0;

        const startTimestamp =
            today.getTime();

        const targetTimestamp =
            startDate.getTime();

        const interval =
            window.setInterval(() => {
                currentStep++;

                const progress = Math.min(
                    currentStep / totalSteps,
                    1,
                );

                /*
                * Ease in/out
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
                    startTimestamp +
                    (targetTimestamp -
                        startTimestamp) *
                        eased;

                setDisplayDate(
                    new Date(timestamp),
                );

                /*
                * Chegou ao destino.
                */
                if (
                    currentStep >=
                    totalSteps
                ) {
                    window.clearInterval(
                        interval,
                    );

                    setDisplayDate(
                        new Date(
                            targetTimestamp,
                        ),
                    );

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
                relative
                flex
                min-h-screen
                w-full
                flex-col
                items-center
                justify-center
                overflow-hidden
                bg-[#0b0b2b]
                px-6
                py-10
                text-[#fff3c7]
                pr-15
            "
        >
            {/* =================================================
                DECORAÇÃO
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    -top-32
                    h-80
                    w-80
                    rounded-full
                    bg-[#8064ff]/15
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -right-32
                    h-96
                    w-96
                    rounded-full
                    bg-[#a875ff]/10
                    blur-3xl
                "
            />

            {/* =================================================
                SIDE RIBBON
            ================================================= */}

            <SideRibbon text="NOSSO CÉU" />


            {/* =================================================
                CONTEÚDO
            ================================================= */}

            <div
                className="
                    relative
                    z-10
                    flex
                    w-full
                    max-w-xl
                    flex-col
                    items-center
                "
            >
                {/* =================================================
                    HEADER
                ================================================= */}

                <motion.div
                    className="
                        mb-7
                        text-center
                    "
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                >
                    <p
                        className="
                            mb-2
                            text-[11px]
                            font-black
                            uppercase
                            tracking-[0.3em]
                            text-[#a875ff]
                        "
                    >
                        {phase ===
                        "today"
                            ? "O CÉU DE HOJE"
                            : phase ===
                                "traveling"
                              ? "VOLTANDO NO TEMPO"
                              : "AQUELA NOITE"}
                    </p>

                    <h2
                        className="
                            text-3xl
                            font-black
                            uppercase
                            leading-none
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        {phase ===
                        "arrival"
                            ? "O céu quando tudo começou"
                            : "Nosso mapa estelar"}
                    </h2>
                </motion.div>


                {/* =================================================
                    MAPA
                ================================================= */}

                <StarMap
                    phase={phase}
                    rotation={
                        mapRotation
                    }
                    date={
                        displayDate
                    }
                />


                {/* =================================================
                    INFORMAÇÕES
                ================================================= */}

                <AnimatePresence
                    mode="wait"
                >
                    {phase ===
                        "today" && (
                        <motion.div
                            key="today-info"
                            className="
                                mt-8
                                text-center
                            "
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -15,
                            }}
                        >
                            <p
                                className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-widest
                                    text-[#fff3c7]/50
                                "
                            >
                                Preparando nossa
                                viagem pelo tempo...
                            </p>
                        </motion.div>
                    )}


                    {phase ===
                        "traveling" && (
                        <motion.div
                            key="traveling-info"
                            className="
                                mt-8
                                text-center
                            "
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                        >
                            <p
                                className="
                                    text-xs
                                    font-black
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#a875ff]
                                "
                            >
                                Retornando para
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-lg
                                    font-black
                                "
                            >
                                {formatDate(
                                    displayDate,
                                )}
                            </p>
                        </motion.div>
                    )}


                    {phase ===
                        "arrival" && (
                        <motion.div
                            key="arrival-info"
                            className="
                                mt-8
                                w-full
                            "
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                        >
                            {/* =====================================
                                DATA / HORA
                            ===================================== */}

                            <div
                                className="
                                    mb-4
                                    grid
                                    grid-cols-2
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-[#fff3c7]/10
                                        bg-[#fff3c7]/5
                                        p-4
                                    "
                                >
                                    <Clock3
                                        size={
                                            17
                                        }
                                        className="
                                            mb-2
                                            text-[#a875ff]
                                        "
                                    />

                                    <p
                                        className="
                                            text-[9px]
                                            font-black
                                            uppercase
                                            tracking-widest
                                            text-[#fff3c7]/40
                                        "
                                    >
                                        Data e hora
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-lg
                                            font-black
                                        "
                                    >
                                        {formatDate(
                                            startDate,
                                        )}
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-lg
                                            font-black
                                        "
                                    >
                                        {formatTime(
                                            startDate,
                                        )}
                                    </p>
                                </div>


                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-[#fff3c7]/10
                                        bg-[#fff3c7]/5
                                        p-4
                                    "
                                >
                                    <MapPin
                                        size={
                                            17
                                        }
                                        className="
                                            mb-2
                                            text-[#a875ff]
                                        "
                                    />

                                    <p
                                        className="
                                            text-[9px]
                                            font-black
                                            uppercase
                                            tracking-widest
                                            text-[#fff3c7]/40
                                        "
                                    >
                                        Onde
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            font-black
                                        "
                                    >
                                        {
                                            LOCATION.name
                                        }
                                    </p>
                                </div>
                            </div>


                            {/* =====================================
                                COORDENADAS
                            ===================================== */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-2xl
                                    border
                                    border-[#a875ff]/20
                                    bg-[#8064ff]/10
                                    px-4
                                    py-3
                                "
                            >
                                <Navigation
                                    size={
                                        14
                                    }
                                    className="
                                        text-[#a875ff]
                                    "
                                />

                                <span
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-widest
                                        text-[#fff3c7]/60
                                    "
                                >
                                    {
                                        LOCATION.coordinates
                                    }
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* =================================================
                    FRASE FINAL
                ================================================= */}

                <AnimatePresence>
                    {phase ===
                        "arrival" && (
                        <motion.p
                            className="
                                mt-8
                                max-w-sm
                                text-center
                                text-sm
                                font-black
                                uppercase
                                leading-relaxed
                                tracking-widest
                                text-[#fff3c7]/70
                            "
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 1,
                                duration: 0.7,
                            }}
                        >
                            O céu quando nossos
                            mundos se colidiram.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}