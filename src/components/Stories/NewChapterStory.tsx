import { motion } from "motion/react";
import { Plane, Heart, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { SideRibbon } from "../SideRibbon/SideRibbon";
import { couple } from "../../data/couple";

/* =========================================================
   TIPOS
========================================================= */

type Milestone = {
    label: string;
    months: number;
};

type MilestoneState = {
    previous: Milestone;
    next: Milestone;
    previousDate: Date;
    nextDate: Date;
    progress: number;
    remainingDays: number;
};

/* =========================================================
   METAS
========================================================= */

const MILESTONES: Milestone[] = [
    { label: "1 mês", months: 1 },
    { label: "3 meses", months: 3 },
    { label: "6 meses", months: 6 },
    { label: "1 ano", months: 12 },
    { label: "2 anos", months: 24 },
    { label: "3 anos", months: 36 },
    { label: "5 anos", months: 60 },
    { label: "10 anos", months: 120 },
    { label: "15 anos", months: 180 },
    { label: "20 anos", months: 240 },
];

/* =========================================================
   DATA INICIAL
========================================================= */

const START_DATE = new Date(
    couple.startYear,
    couple.startMonth - 1,
    couple.startDay,
);

/* =========================================================
   FUNÇÕES
========================================================= */

/**
 * Adiciona meses mantendo o dia original sempre que possível.
 */
function addMonths(date: Date, months: number) {
    const result = new Date(date);

    const originalDay = result.getDate();

    result.setDate(1);
    result.setMonth(result.getMonth() + months);

    const lastDay = new Date(
        result.getFullYear(),
        result.getMonth() + 1,
        0,
    ).getDate();

    result.setDate(Math.min(originalDay, lastDay));

    return result;
}

/**
 * Retorna a quantidade de dias entre duas datas.
 */
function differenceInDays(from: Date, to: Date) {
    const fromUTC = Date.UTC(
        from.getFullYear(),
        from.getMonth(),
        from.getDate(),
    );

    const toUTC = Date.UTC(
        to.getFullYear(),
        to.getMonth(),
        to.getDate(),
    );

    return Math.max(
        0,
        Math.ceil((toUTC - fromUTC) / 86_400_000),
    );
}

/**
 * Descobre a meta anterior e a próxima meta.
 */
function getMilestoneState(now: Date): MilestoneState {
    let previousIndex = -1;

    for (let i = 0; i < MILESTONES.length; i++) {
        const milestoneDate = addMonths(
            START_DATE,
            MILESTONES[i].months,
        );

        if (milestoneDate <= now) {
            previousIndex = i;
        } else {
            break;
        }
    }

    const nextIndex = previousIndex + 1;

    // Caso todas as metas cadastradas já tenham passado.
    if (nextIndex >= MILESTONES.length) {
        const last = MILESTONES[MILESTONES.length - 1];

        const next = {
            label: `${last.months / 12 + 1} anos`,
            months: last.months + 12,
        };

        const previousDate = addMonths(
            START_DATE,
            last.months,
        );

        const nextDate = addMonths(
            START_DATE,
            next.months,
        );

        const totalDays = differenceInDays(
            previousDate,
            nextDate,
        );

        const elapsedDays = differenceInDays(
            previousDate,
            now,
        );

        return {
            previous: last,
            next,
            previousDate,
            nextDate,
            progress: Math.min(
                100,
                elapsedDays / totalDays * 100,
            ),
            remainingDays: differenceInDays(
                now,
                nextDate,
            ),
        };
    }

    const previous =
        previousIndex >= 0
            ? MILESTONES[previousIndex]
            : {
                  label: "Início",
                  months: 0,
              };

    const next = MILESTONES[nextIndex];

    const previousDate = addMonths(
        START_DATE,
        previous.months,
    );

    const nextDate = addMonths(
        START_DATE,
        next.months,
    );

    const totalDays = differenceInDays(
        previousDate,
        nextDate,
    );

    const elapsedDays = differenceInDays(
        previousDate,
        now,
    );

    const progress =
        totalDays === 0
            ? 0
            : Math.min(
                  100,
                  Math.max(
                      0,
                      (elapsedDays / totalDays) * 100,
                  ),
              );

    return {
        previous,
        next,
        previousDate,
        nextDate,
        progress,
        remainingDays: differenceInDays(
            now,
            nextDate,
        ),
    };
}

/**
 * Formata uma data como:
 *
 * 11 SET 2027
 */
function formatDate(date: Date) {
    const months = [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ",
    ];

    return `${String(date.getDate()).padStart(2, "0")} ${
        months[date.getMonth()]
    } ${date.getFullYear()}`;
}

/* =========================================================
   STORY
========================================================= */

export function NextChapterStory() {
    const [now, setNow] = useState(() => new Date());

    /**
     * Atualiza a cada segundo para manter
     * a contagem regressiva viva.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const milestone = useMemo(
        () => getMilestoneState(now),
        [now],
    );

    /* =====================================================
       CONTAGEM REGRESSIVA
    ====================================================== */

    const countdown = useMemo(() => {
        const difference =
            milestone.nextDate.getTime() -
            now.getTime();

        const totalSeconds = Math.max(
            0,
            Math.floor(difference / 1000),
        );

        const hours = Math.floor(
            totalSeconds / 3600,
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60,
        );

        const seconds = totalSeconds % 60;

        return {
            hours,
            minutes,
            seconds,
        };
    }, [milestone.nextDate, now]);

    const percentage = Math.round(
        milestone.progress,
    );

    return (
        <motion.div
            key="next-chapter"
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
                ease: "easeOut",
            }}
            className="
                relative
                h-full
                w-full
                overflow-hidden
                bg-[#0b0b2b]
                text-[#fff3c7]
            "
        >
            {/* =================================================
                BACKGROUND
            ================================================= */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.4,
                }}
                animate={{
                    opacity: 0.2,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                }}
                className="
                    absolute
                    -right-32
                    -top-32
                    h-80
                    w-80
                    rounded-full
                    bg-[#8064ff]
                    blur-[110px]
                "
            />

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.4,
                }}
                animate={{
                    opacity: 0.14,
                    scale: 1,
                }}
                transition={{
                    duration: 1.2,
                    delay: 0.2,
                }}
                className="
                    absolute
                    -bottom-40
                    -left-20
                    h-96
                    w-96
                    rounded-full
                    bg-[#a875ff]
                    blur-[120px]
                "
            />

            {/* Estrelas */}

            <motion.div
                animate={{
                    y: [0, -6, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    right-16
                    top-14
                    text-[#fff3c7]
                "
            >
                <Heart
                    size={15}
                    fill="currentColor"
                />
            </motion.div>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 1, 0.4],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    bottom-28
                    left-8
                    text-[#a875ff]
                "
            >
                ✦
            </motion.div>

            {/* =================================================
                FITA LATERAL
            ================================================= */}

            <SideRibbon text="Próximo capítulo" />

            {/* =================================================
                CONTEÚDO
            ================================================= */}

            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    px-7
                    pb-7
                    pr-14
                    pt-8
                "
            >
                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.15,
                    }}
                >
                    <div className="mb-4 flex items-center gap-3">
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-[#fff3c7]
                                text-[#0b0b2b]
                            "
                        >
                            <Plane
                                size={18}
                                strokeWidth={2.5}
                            />
                        </div>

                        <p
                            className="
                                text-xs
                                font-black
                                uppercase
                                tracking-[0.22em]
                            "
                        >
                            Nossa próxima aventura
                        </p>
                    </div>

                    <h1
                        className="
                            max-w-xs
                            text-4xl
                            font-black
                            uppercase
                            leading-[0.9]
                            tracking-tight
                        "
                    >
                        Próximo
                        <br />
                        capítulo.
                    </h1>

                    <p
                        className="
                            mt-4
                            max-w-xs
                            text-sm
                            font-medium
                            leading-relaxed
                            text-[#fff3c7]/55
                        "
                    >
                        Contagem regressiva para{" "}
                        <span className="font-black text-[#fff3c7]/90">
                            {milestone.next.label}
                        </span>
                    </p>
                </motion.div>

                {/* =================================================
                    PAINEL DE EMBARQUE
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.35,
                        duration: 0.6,
                    }}
                    className="
                        mt-5
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#fff3c7]/10
                        bg-[#15153d]/80
                        shadow-[0_15px_40px_rgba(0,0,0,0.25)]
                        backdrop-blur-md
                    "
                >
                    {/* Cabeçalho do painel */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-[#fff3c7]/10
                            px-4
                            py-3
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-[9px]
                                    font-black
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#fff3c7]/40
                                "
                            >
                                Painel de embarque
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    font-black
                                    uppercase
                                "
                            >
                                Próxima parada
                            </p>
                        </div>

                        <div
                            className="
                                rounded-full
                                bg-[#a875ff]/15
                                px-3
                                py-1.5
                                text-[9px]
                                font-black
                                uppercase
                                tracking-wider
                                text-[#a875ff]
                            "
                        >
                            {milestone.next.label}
                        </div>
                    </div>

                    {/* Informações */}

                    <div className="px-4 py-4">
                        <div className="flex items-end justify-between">
                            <div>
                                <p
                                    className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-[#fff3c7]/40
                                    "
                                >
                                    Faltam
                                </p>

                                <motion.p
                                    key={milestone.remainingDays}
                                    initial={{
                                        opacity: 0,
                                        y: 6,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className="
                                        mt-1
                                        text-3xl
                                        font-black
                                        leading-none
                                    "
                                >
                                    {milestone.remainingDays}
                                    <span
                                        className="
                                            ml-1
                                            text-sm
                                            text-[#fff3c7]/45
                                        "
                                    >
                                        dias
                                    </span>
                                </motion.p>
                            </div>

                            <div className="text-right">
                                <p
                                    className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-[#fff3c7]/40
                                    "
                                >
                                    Contagem regressiva
                                </p>

                                <div
                                    className="
                                        mt-1
                                        flex
                                        items-center
                                        gap-1
                                        font-mono
                                        text-sm
                                        font-black
                                    "
                                >
                                    <span>
                                        {String(
                                            countdown.hours,
                                        ).padStart(2, "0")}
                                    </span>

                                    <span className="text-[#a875ff]">
                                        :
                                    </span>

                                    <span>
                                        {String(
                                            countdown.minutes,
                                        ).padStart(2, "0")}
                                    </span>

                                    <span className="text-[#a875ff]">
                                        :
                                    </span>

                                    <motion.span
                                        key={
                                            countdown.seconds
                                        }
                                        initial={{
                                            opacity: 0.3,
                                        }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                    >
                                        {String(
                                            countdown.seconds,
                                        ).padStart(2, "0")}
                                    </motion.span>
                                </div>
                            </div>
                        </div>

                        {/* Divisória */}

                        <div
                            className="
                                my-4
                                h-px
                                bg-[#fff3c7]/10
                            "
                        />

                        {/* Chegada + Status */}

                        <div className="flex items-end justify-between">
                            <div>
                                <p
                                    className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-[#fff3c7]/40
                                    "
                                >
                                    Chegada
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-lg
                                        font-black
                                        tracking-tight
                                    "
                                >
                                    {formatDate(
                                        milestone.nextDate,
                                    )}
                                </p>
                            </div>

                            <div className="text-right">
                                <p
                                    className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-[#fff3c7]/40
                                    "
                                >
                                    Status
                                </p>

                                <div
                                    className="
                                        mt-1
                                        flex
                                        items-center
                                        gap-1.5
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-wider
                                        text-[#a875ff]
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-4
                                            w-4
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#a875ff]
                                            text-[#0b0b2b]
                                        "
                                    >
                                        <Check
                                            size={10}
                                            strokeWidth={4}
                                        />
                                    </span>

                                    Confirmado
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* =================================================
                    ROTA
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.8,
                    }}
                    className="relative mt-auto pt-7"
                >
                    {/* Título */}

                    <div className="mb-1 flex items-center justify-between">
                        <p
                            className="
                                text-[9px]
                                font-black
                                uppercase
                                tracking-[0.2em]
                                text-[#fff3c7]/40
                            "
                        >
                            Rota do nosso amor
                        </p>

                        <motion.p
                            key={percentage}
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            className="
                                text-[10px]
                                font-black
                                text-[#a875ff]
                            "
                        >
                            {percentage}% do caminho
                        </motion.p>
                    </div>

                    {/* SVG DA ROTA */}

                    <div className="relative h-24 w-full">
                        <svg
                            viewBox="0 0 320 100"
                            preserveAspectRatio="none"
                            className="
                                absolute
                                inset-0
                                h-full
                                w-full
                                overflow-visible
                            "
                        >
                            {/* Linha base */}

                            <path
                                d="M 18 75 C 90 75, 90 20, 160 40 S 235 75, 302 25"
                                fill="none"
                                stroke="rgba(255,243,199,0.12)"
                                strokeWidth="2"
                                strokeDasharray="5 6"
                            />

                            {/* Linha percorrida */}

                            <motion.path
                                d="M 18 75 C 90 75, 90 20, 160 40 S 235 75, 302 25"
                                fill="none"
                                stroke="#a875ff"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                pathLength={1}
                                initial={{
                                    pathLength: 0,
                                }}
                                animate={{
                                    pathLength:
                                        milestone.progress /
                                        100,
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                }}
                            />
                        </svg>

                        {/* =================================================
                            PONTO INICIAL
                        ================================================= */}

                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                flex
                                -translate-x-1/2
                                flex-col
                                items-center
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-3
                                    w-3
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#fff3c7]
                                    ring-4
                                    ring-[#fff3c7]/10
                                "
                            />

                            <div className="mt-2 text-center">
                                <p
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                    "
                                >
                                    {milestone.previous.label}
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-[8px]
                                        font-bold
                                        text-[#fff3c7]/35
                                    "
                                >
                                    {formatDate(
                                        milestone.previousDate,
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* =================================================
                            PONTO ATUAL
                        ================================================= */}

                        <motion.div
                            className="
                                absolute
                                left-[54%]
                                top-[24px]
                                flex
                                -translate-x-1/2
                                flex-col
                                items-center
                            "
                            animate={{
                                y: [0, -3, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div
                                className="
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#a875ff]
                                    text-[#0b0b2b]
                                    shadow-[0_0_0_5px_rgba(168,117,255,0.12)]
                                "
                            >
                                <Plane
                                    size={13}
                                    fill="currentColor"
                                    strokeWidth={2.5}
                                    className="-rotate-12"
                                />
                            </div>

                            <div className="mt-2 text-center">
                                <p
                                    className="
                                        text-[9px]
                                        font-black
                                        uppercase
                                        text-[#a875ff]
                                    "
                                >
                                    Agora
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-[8px]
                                        font-bold
                                        text-[#fff3c7]/40
                                    "
                                >
                                    {percentage}% do caminho
                                </p>
                            </div>
                        </motion.div>

                        {/* =================================================
                            PONTO FINAL
                        ================================================= */}

                        <div
                            className="
                                absolute
                                right-0
                                top-0
                                flex
                                translate-x-1/2
                                flex-col
                                items-center
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-3
                                    w-3
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#fff3c7]
                                    ring-4
                                    ring-[#fff3c7]/10
                                "
                            />

                            <div className="mt-2 text-center">
                                <p
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                    "
                                >
                                    {milestone.next.label}
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-[8px]
                                        font-bold
                                        text-[#fff3c7]/35
                                    "
                                >
                                    {formatDate(
                                        milestone.nextDate,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* =================================================
                    RODAPÉ
                ================================================= */}

                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 1.2,
                    }}
                    className="
                        mt-1
                        text-center
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#fff3c7]/25
                    "
                >
                    Próximo destino confirmado ♡
                </motion.p>
            </div>
        </motion.div>
    );
}