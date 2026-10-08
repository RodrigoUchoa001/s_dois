import {
    AnimatePresence,
    motion,
} from "motion/react";
import { Plane, Heart, Check } from "lucide-react";
import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { SideRibbon } from "../SideRibbon/SideRibbon";
import { couple } from "../../data/couple";

type Milestone = {
    label: string;
    months: number;
};

type Point = {
    x: number;
    y: number;
};

type MilestoneState = {
    previous: Milestone;
    next: Milestone;
    previousDate: Date;
    nextDate: Date;
    progress: number;
};

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

const START_DATE = new Date(
    couple.startYear,
    couple.startMonth - 1,
    couple.startDay,
    couple.startHour ?? 0,
    couple.startMinute ?? 0,
    couple.startSecond ?? 0,
);

const ROUTE_PATH =
    "M 18 75 C 90 75, 90 20, 160 40 S 235 75, 302 25";

function addMonths(date: Date, months: number) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function differenceInDays(
    from: Date,
    to: Date,
) {
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
        Math.ceil(
            (toUTC - fromUTC) /
                86_400_000,
        ),
    );
}

function getMilestoneState(
    now: Date,
): MilestoneState {
    let previousIndex = -1;

    for (
        let i = 0;
        i < MILESTONES.length;
        i++
    ) {
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

    const nextIndex =
        previousIndex + 1;

    /*
     * Caso já tenha passado da última
     * meta previamente cadastrada.
     */
    if (
        nextIndex >=
        MILESTONES.length
    ) {
        const last =
            MILESTONES[
                MILESTONES.length - 1
            ];

        const next = {
            label: `${
                last.months / 12 + 1
            } anos`,
            months: last.months + 12,
        };

        const previousDate =
            addMonths(
                START_DATE,
                last.months,
            );

        const nextDate =
            addMonths(
                START_DATE,
                next.months,
            );

        const totalDays =
            differenceInDays(
                previousDate,
                nextDate,
            );

        const elapsedDays =
            differenceInDays(
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
                (elapsedDays /
                    totalDays) *
                    100,
            ),
        };
    }

    const previous =
        previousIndex >= 0
            ? MILESTONES[
                  previousIndex
              ]
            : {
                  label: "Início",
                  months: 0,
              };

    const next =
        MILESTONES[nextIndex];

    const previousDate =
        addMonths(
            START_DATE,
            previous.months,
        );

    const nextDate =
        addMonths(
            START_DATE,
            next.months,
        );

    const totalDays =
        differenceInDays(
            previousDate,
            nextDate,
        );

    const elapsedDays =
        differenceInDays(
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
                      (elapsedDays /
                          totalDays) *
                          100,
                  ),
              );

    return {
        previous,
        next,
        previousDate,
        nextDate,
        progress,
    };
}

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

    return `${String(
        date.getDate(),
    ).padStart(2, "0")} ${
        months[date.getMonth()]
    } ${date.getFullYear()}`;
}

export function NextChapterStory({
    isOpen = true,
}: {
    isOpen?: boolean;
}) {
    const [now, setNow] =
        useState(() => new Date());

    const routePathRef =
        useRef<SVGPathElement>(null);

    const previousMilestoneRef =
        useRef<string | null>(null);

    const celebrationTimeoutRef =
        useRef<
            ReturnType<
                typeof setTimeout
            > | null
        >(null);

    const [
        isCelebrating,
        setIsCelebrating,
    ] = useState(false);

    const [
        celebrationData,
        setCelebrationData,
    ] = useState<{
        completed: Milestone;
        next: Milestone;
    } | null>(null);

    const [
        routePoints,
        setRoutePoints,
    ] = useState<{
        start: Point;
        current: Point;
        end: Point;
    }>({
        start: {
            x: 18,
            y: 75,
        },
        current: {
            x: 18,
            y: 75,
        },
        end: {
            x: 302,
            y: 25,
        },
    });

    /*
     * Relógio utilizado pelo countdown.
     */
    useEffect(() => {
        const interval =
            setInterval(() => {
                setNow(new Date());
            }, 1000);

        return () =>
            clearInterval(interval);
    }, []);

    const milestone = useMemo(
        () =>
            getMilestoneState(now),
        [now],
    );

    /*
     * Detecta a virada de uma meta.
     *
     * A comparação é feita pela próxima meta.
     * Quando ela muda, significa que a meta
     * anterior acabou de ser atingida.
     *
     * A comemoração só acontece se o Story
     * estiver aberto naquele momento.
     */
    useEffect(() => {
        const milestoneKey = `${milestone.next.months}-${milestone.next.label}`;

        /*
         * Primeira renderização:
         * apenas registra qual era a meta.
         */
        if (
            previousMilestoneRef.current ===
            null
        ) {
            previousMilestoneRef.current =
                milestoneKey;

            return;
        }

        /*
         * A próxima meta mudou.
         */
        if (
            previousMilestoneRef.current !==
                milestoneKey &&
            isOpen
        ) {
            setCelebrationData({
                completed:
                    milestone.previous,
                next: milestone.next,
            });

            setIsCelebrating(true);

            if (
                celebrationTimeoutRef.current
            ) {
                clearTimeout(
                    celebrationTimeoutRef.current,
                );
            }

            celebrationTimeoutRef.current =
                setTimeout(() => {
                    setIsCelebrating(
                        false,
                    );
                }, 4200);
        }

        previousMilestoneRef.current =
            milestoneKey;
    }, [
        milestone.next,
        milestone.previous,
        isOpen,
    ]);

    /*
     * Limpa o timeout quando o componente
     * for desmontado.
     */
    useEffect(() => {
        return () => {
            if (
                celebrationTimeoutRef.current
            ) {
                clearTimeout(
                    celebrationTimeoutRef.current,
                );
            }
        };
    }, []);

    /*
     * Countdown completo:
     *
     * 337 dias
     * 14:23:10
     */
    const countdown = useMemo(() => {
        const difference =
            milestone.nextDate.getTime() -
            now.getTime();

        const totalSeconds =
            Math.max(
                0,
                Math.floor(
                    difference / 1000,
                ),
            );

        const days = Math.floor(
            totalSeconds / 86_400,
        );

        const remainingAfterDays =
            totalSeconds % 86_400;

        const hours = Math.floor(
            remainingAfterDays / 3600,
        );

        const minutes = Math.floor(
            (remainingAfterDays %
                3600) /
                60,
        );

        const seconds =
            remainingAfterDays % 60;

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    }, [
        milestone.nextDate,
        now,
    ]);

    const percentage = Math.round(
        milestone.progress,
    );

    /*
     * Obtém os três pontos diretamente da
     * mesma curva usada pelo SVG.
     */
    useLayoutEffect(() => {
        const path =
            routePathRef.current;

        if (!path) return;

        const length =
            path.getTotalLength();

        const start =
            path.getPointAtLength(0);

        const current =
            path.getPointAtLength(
                length *
                    (milestone.progress /
                        100),
            );

        const end =
            path.getPointAtLength(
                length,
            );

        setRoutePoints({
            start: {
                x: start.x,
                y: start.y,
            },
            current: {
                x: current.x,
                y: current.y,
            },
            end: {
                x: end.x,
                y: end.y,
            },
        });
    }, [milestone.progress]);

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
            {/* =========================================================
                CELEBRAÇÃO DA META
            ========================================================== */}

            <AnimatePresence>
                {isCelebrating &&
                    celebrationData && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.35,
                            }}
                            className="
                                absolute
                                inset-0
                                z-[100]
                                flex
                                items-center
                                justify-center
                                overflow-hidden
                                bg-[#0b0b2b]
                            "
                        >
                            {/* FLASH */}

                            <motion.div
                                initial={{
                                    scale: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    scale: [
                                        0,
                                        1.5,
                                        3,
                                    ],
                                    opacity: [
                                        0,
                                        0.8,
                                        0,
                                    ],
                                }}
                                transition={{
                                    duration: 1.1,
                                    ease: "easeOut",
                                }}
                                className="
                                    absolute
                                    h-40
                                    w-40
                                    rounded-full
                                    bg-[#a875ff]
                                    blur-3xl
                                "
                            />

                            {/* PRIMEIRO ANEL */}

                            <motion.div
                                initial={{
                                    scale: 0.2,
                                    opacity: 0,
                                }}
                                animate={{
                                    scale: [
                                        0.2,
                                        1,
                                        1.8,
                                    ],
                                    opacity: [
                                        0,
                                        0.6,
                                        0,
                                    ],
                                }}
                                transition={{
                                    duration: 1.8,
                                    delay: 0.2,
                                    ease: "easeOut",
                                }}
                                className="
                                    absolute
                                    h-44
                                    w-44
                                    rounded-full
                                    border-2
                                    border-[#a875ff]/50
                                "
                            />

                            {/* SEGUNDO ANEL */}

                            <motion.div
                                initial={{
                                    scale: 0.2,
                                    opacity: 0,
                                }}
                                animate={{
                                    scale: [
                                        0.2,
                                        1,
                                        2.3,
                                    ],
                                    opacity: [
                                        0,
                                        0.35,
                                        0,
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    delay: 0.4,
                                    ease: "easeOut",
                                }}
                                className="
                                    absolute
                                    h-44
                                    w-44
                                    rounded-full
                                    border
                                    border-[#fff3c7]/30
                                "
                            />

                            {/* PARTÍCULAS */}

                            {Array.from({
                                length: 18,
                            }).map(
                                (
                                    _,
                                    index,
                                ) => {
                                    const angle =
                                        (index /
                                            18) *
                                        Math.PI *
                                        2;

                                    const distance =
                                        100 +
                                        (index %
                                            3) *
                                            35;

                                    const x =
                                        Math.cos(
                                            angle,
                                        ) *
                                        distance;

                                    const y =
                                        Math.sin(
                                            angle,
                                        ) *
                                        distance;

                                    return (
                                        <motion.div
                                            key={
                                                index
                                            }
                                            initial={{
                                                x: 0,
                                                y: 0,
                                                scale: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                x,
                                                y,
                                                scale: [
                                                    0,
                                                    1,
                                                    0.4,
                                                ],
                                                opacity:
                                                    [
                                                        0,
                                                        1,
                                                        0,
                                                    ],
                                            }}
                                            transition={{
                                                duration: 1.6,
                                                delay:
                                                    0.25 +
                                                    (index %
                                                        5) *
                                                        0.05,
                                                ease: "easeOut",
                                            }}
                                            className="
                                                absolute
                                                h-1.5
                                                w-1.5
                                                rounded-full
                                                bg-[#fff3c7]
                                            "
                                        />
                                    );
                                },
                            )}

                            {/* CORAÇÕES / ESTRELAS */}

                            {[
                                "♡",
                                "✦",
                                "♡",
                                "✧",
                            ].map(
                                (
                                    symbol,
                                    index,
                                ) => (
                                    <motion.span
                                        key={
                                            index
                                        }
                                        initial={{
                                            opacity: 0,
                                            scale: 0,
                                            y: 30,
                                        }}
                                        animate={{
                                            opacity: [
                                                0,
                                                1,
                                                0,
                                            ],
                                            scale: [
                                                0,
                                                1.2,
                                                0.8,
                                            ],
                                            y: [
                                                30,
                                                -20 -
                                                    index *
                                                        12,
                                                -70 -
                                                    index *
                                                        15,
                                            ],
                                            x:
                                                index %
                                                    2 ===
                                                0
                                                    ? -60 -
                                                      index *
                                                          20
                                                    : 60 +
                                                      index *
                                                          20,
                                        }}
                                        transition={{
                                            duration: 2.2,
                                            delay:
                                                0.3 +
                                                index *
                                                    0.15,
                                            ease: "easeOut",
                                        }}
                                        className="
                                            absolute
                                            text-2xl
                                            font-black
                                            text-[#a875ff]
                                        "
                                    >
                                        {
                                            symbol
                                        }
                                    </motion.span>
                                ),
                            )}

                            {/* CONTEÚDO CENTRAL */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.55,
                                    duration: 0.65,
                                    ease: [
                                        0.16,
                                        1,
                                        0.3,
                                        1,
                                    ],
                                }}
                                className="
                                    relative
                                    z-10
                                    flex
                                    flex-col
                                    items-center
                                    text-center
                                "
                            >
                                {/* ÍCONE */}

                                <motion.div
                                    animate={{
                                        rotate: [
                                            0,
                                            -8,
                                            8,
                                            -4,
                                            4,
                                            0,
                                        ],
                                        scale: [
                                            1,
                                            1.1,
                                            1,
                                        ],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        delay: 0.7,
                                    }}
                                    className="
                                        mb-6
                                        flex
                                        h-20
                                        w-20
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#fff3c7]
                                        text-[#0b0b2b]
                                        shadow-[0_0_50px_rgba(255,243,199,0.2)]
                                    "
                                >
                                    <Heart
                                        size={
                                            34
                                        }
                                        fill="currentColor"
                                        strokeWidth={
                                            2.5
                                        }
                                    />
                                </motion.div>

                                <p
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-[0.35em]
                                        text-[#a875ff]
                                    "
                                >
                                    Capítulo
                                    concluído
                                </p>

                                <motion.h2
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.9,
                                    }}
                                    className="
                                        mt-3
                                        text-4xl
                                        font-black
                                        uppercase
                                        leading-none
                                        tracking-tight
                                    "
                                >
                                    {
                                        celebrationData
                                            .completed
                                            .label
                                    }
                                </motion.h2>

                                <motion.p
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    transition={{
                                        delay: 1.15,
                                    }}
                                    className="
                                        mt-4
                                        max-w-xs
                                        text-sm
                                        font-medium
                                        leading-relaxed
                                        text-[#fff3c7]/50
                                    "
                                >
                                    Mais uma
                                    parte da
                                    nossa
                                    história
                                    acaba de
                                    ser
                                    escrita.
                                </motion.p>

                                {/* NOVA META */}

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
                                        delay: 1.55,
                                        duration: 0.5,
                                    }}
                                    className="
                                        mt-8
                                        rounded-full
                                        border
                                        border-[#fff3c7]/10
                                        bg-[#15153d]
                                        px-5
                                        py-3
                                    "
                                >
                                    <p
                                        className="
                                            text-[8px]
                                            font-black
                                            uppercase
                                            tracking-[0.2em]
                                            text-[#fff3c7]/35
                                        "
                                    >
                                        Próximo
                                        destino
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            font-black
                                            uppercase
                                            text-[#a875ff]
                                        "
                                    >
                                        {
                                            celebrationData
                                                .next
                                                .label
                                        }{" "}
                                        ♡
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* LINHA DE PASSAGEM */}

                            <motion.div
                                initial={{
                                    x: "-120%",
                                }}
                                animate={{
                                    x: "120%",
                                }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease: "easeInOut",
                                }}
                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    h-px
                                    w-1/2
                                    bg-gradient-to-r
                                    from-transparent
                                    via-[#a875ff]
                                    to-transparent
                                    opacity-50
                                "
                            />
                        </motion.div>
                    )}
            </AnimatePresence>

            {/* =========================================================
                BACKGROUND
            ========================================================== */}

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
                    opacity: [
                        0.4,
                        1,
                        0.4,
                    ],
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

            <SideRibbon text="Próximo capítulo" />

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
                {/* =====================================================
                    CABEÇALHO
                ====================================================== */}

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
                            Nossa próxima
                            aventura
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
                        Contagem regressiva
                        para{" "}
                        <span className="font-black text-[#fff3c7]/90">
                            {
                                milestone.next
                                    .label
                            }
                        </span>
                    </p>
                </motion.div>

                {/* =====================================================
                    PAINEL DE EMBARQUE
                ====================================================== */}

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
                                Painel de
                                embarque
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
                            {
                                milestone.next
                                    .label
                            }
                        </div>
                    </div>

                    <div className="px-4 py-4">
                        <div className="flex items-end justify-between">
                            {/* DIAS */}

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
                                    key={
                                        countdown.days
                                    }
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
                                    {
                                        countdown.days
                                    }

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

                            {/* HORAS / MINUTOS / SEGUNDOS */}

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
                                    Contagem
                                    regressiva
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
                                        ).padStart(
                                            2,
                                            "0",
                                        )}
                                    </span>

                                    <span className="text-[#a875ff]">
                                        :
                                    </span>

                                    <span>
                                        {String(
                                            countdown.minutes,
                                        ).padStart(
                                            2,
                                            "0",
                                        )}
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
                                        ).padStart(
                                            2,
                                            "0",
                                        )}
                                    </motion.span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="
                                my-4
                                h-px
                                bg-[#fff3c7]/10
                            "
                        />

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
                                            size={
                                                10
                                            }
                                            strokeWidth={
                                                4
                                            }
                                        />
                                    </span>

                                    Confirmado
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* =====================================================
                    ROTA
                ====================================================== */}

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
                    <div className="mb-1 flex items-center justify-between pb-5">
                        <p
                            className="
                                text-[9px]
                                font-black
                                uppercase
                                tracking-[0.2em]
                                text-[#fff3c7]/40
                            "
                        >
                            Rota do nosso
                            amor
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
                            {percentage}% do
                            caminho
                        </motion.p>
                    </div>

                    <div className="relative h-24 w-full">
                        {/* SVG DA ROTA */}

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
                            {/* BRILHO */}

                            <path
                                d={
                                    ROUTE_PATH
                                }
                                fill="none"
                                stroke="#a875ff"
                                strokeWidth="5"
                                strokeLinecap="round"
                                opacity="0.08"
                                filter="blur(4px)"
                            />

                            {/* ROTA COMPLETA */}

                            <path
                                ref={
                                    routePathRef
                                }
                                d={
                                    ROUTE_PATH
                                }
                                fill="none"
                                stroke="rgba(255,243,199,0.12)"
                                strokeWidth="2"
                                strokeDasharray="5 6"
                                strokeLinecap="round"
                            />

                            {/* ROTA PERCORRIDA */}

                            <motion.path
                                d={
                                    ROUTE_PATH
                                }
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
                            META ANTERIOR
                        ================================================== */}

                        <motion.div
                            className="
                                absolute
                                z-20
                                flex
                                -translate-x-1/2
                                -translate-y-1/2
                                flex-col
                                items-center
                            "
                            style={{
                                left: `${
                                    (routePoints
                                        .start
                                        .x /
                                        320) *
                                    100
                                }%`,
                                top: `${
                                    (routePoints
                                        .start
                                        .y /
                                        100) *
                                    100
                                }%`,
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: 0.9,
                                duration: 0.4,
                            }}
                        >
                            <div
                                className="
                                    relative
                                    h-3
                                    w-3
                                    rounded-full
                                    bg-[#fff3c7]
                                    ring-4
                                    ring-[#fff3c7]/10
                                "
                            />

                            <div className="mt-2 whitespace-nowrap text-center">
                                <p
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                    "
                                >
                                    {
                                        milestone
                                            .previous
                                            .label
                                    }
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
                        </motion.div>

                        {/* =================================================
                            AVIÃO / MOMENTO ATUAL
                        ================================================== */}

                        <motion.div
                            className="
                                pointer-events-none
                                absolute
                                z-30
                                flex
                                -translate-x-1/2
                                -translate-y-1/2
                                flex-col
                                items-center
                            "
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                left: `${
                                    (routePoints
                                        .current
                                        .x /
                                        320) *
                                    100
                                }%`,
                                top: `${
                                    (routePoints
                                        .current
                                        .y /
                                        100) *
                                    100
                                }%`,
                            }}
                            transition={{
                                opacity: {
                                    delay: 1.1,
                                    duration: 0.4,
                                },
                                scale: {
                                    delay: 1.1,
                                    duration: 0.4,
                                },
                                left: {
                                    duration: 0.8,
                                    ease: "easeInOut",
                                },
                                top: {
                                    duration: 0.8,
                                    ease: "easeInOut",
                                },
                            }}
                        >
                            <motion.div
                                animate={{
                                    y: [
                                        0,
                                        -3,
                                        0,
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    relative
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
                                <motion.div
                                    className="
                                        absolute
                                        inset-[-5px]
                                        rounded-full
                                        border
                                        border-[#a875ff]/30
                                    "
                                    animate={{
                                        scale: [
                                            1,
                                            1.35,
                                            1,
                                        ],
                                        opacity: [
                                            0.7,
                                            0,
                                            0.7,
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut",
                                    }}
                                />

                                <Plane
                                    size={
                                        13
                                    }
                                    fill="currentColor"
                                    strokeWidth={
                                        2.5
                                    }
                                    className="-rotate-12"
                                />
                            </motion.div>

                            <div className="mt-2 whitespace-nowrap text-center">
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
                                    {percentage}%
                                    do
                                    caminho
                                </p>
                            </div>
                        </motion.div>

                        {/* =================================================
                            PRÓXIMA META
                        ================================================== */}

                        <motion.div
                            className="
                                absolute
                                z-20
                                flex
                                -translate-x-1/2
                                -translate-y-1/2
                                flex-col
                                items-center
                            "
                            style={{
                                left: `${
                                    (routePoints
                                        .end
                                        .x /
                                        320) *
                                    100
                                }%`,
                                top: `${
                                    (routePoints
                                        .end
                                        .y /
                                        100) *
                                    100
                                }%`,
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: 1.5,
                                duration: 0.4,
                            }}
                        >
                            <div
                                className="
                                    relative
                                    h-3
                                    w-3
                                    rounded-full
                                    bg-[#fff3c7]
                                    ring-4
                                    ring-[#fff3c7]/10
                                "
                            />

                            <div className="mt-2 whitespace-nowrap text-center">
                                <p
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                    "
                                >
                                    {
                                        milestone
                                            .next
                                            .label
                                    }
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
                        </motion.div>
                    </div>
                </motion.div>

                {/* RODAPÉ */}

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
                    Próximo destino
                    confirmado ♡
                </motion.p>
            </div>
        </motion.div>
    );
}